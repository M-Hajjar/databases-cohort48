import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB, closeDB, connectCollection, setupAccounts, cleanCollection } from './setup.js';

const transferInfo = { fromAccount: 101, toAccount: 102, amount: 1000, remark: 'Transfer from 101 to 102' };
const transferInfo2 = { fromAccount: 102, toAccount: 101, amount: 500, remark: 'Transfer from 102 to 101' };

// creat transfer function

export async function createTransfer(fromAccount, toAccount, amount, remark) {
    // connect to collection and start session
    const collection = await connectCollection();
    const client = collection.s.db.client;
    const session = client.startSession();

    try {
        // start transaction
        session.startTransaction();
        const opts = { session };

        // find accounts
        const fromAccountDoc = await collection.findOne({ account_number: fromAccount }, opts);
        const toAccountDoc = await collection.findOne({ account_number: toAccount }, opts);

        // check if accounts exist and have enough balance
        if (!fromAccountDoc || !toAccountDoc) {
            throw new Error('Account not found');
        }
        if (fromAccountDoc.balance < amount) {
            throw new Error('Insufficient balance');
        }

        // declaring accounts changes 
        const fromAccountChanges = fromAccountDoc.account_changes.concat({
            change_number: fromAccountDoc.account_changes.length + 1,
            amount: -amount,
            remark,
            date: new Date(),
        });

        const toAccountChanges = toAccountDoc.account_changes.concat({
            change_number: toAccountDoc.account_changes.length + 1,
            amount,
            remark,
            date: new Date(),
        });

        // update accounts

        await collection.updateOne({ account_number: fromAccount }, {
            $inc: { balance: -amount },
            $set: {account_changes: fromAccountChanges},
        },opts);
        await collection.updateOne({ account_number: toAccount }, { 
            $inc: { balance: amount }, 
            $set: {
                account_changes: toAccountChanges,
                },
        }, opts);
        
        console.log('Transfer completed');
        await session.commitTransaction();
    }
    catch (e) {
        console.error(`Cannot transfer: ${e}`);
        await session.abortTransaction();
    }
    finally {
        session.endSession();
    }
}

