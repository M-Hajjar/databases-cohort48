import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const  uri  = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Connect to the MongoDB cluster

export async function connectDB() {
    try {
        await client.connect();
        const db = client.db('databaseWeek4');
        return db;
    }
    catch (e) {
        console.error(`Cannot connect to MongoDB: ${e}`);
    }
}

// Close the connection to the MongoDB cluster

export async function closeDB() {
    await client.close();
    console.log('Disconnected from MongoDB');
}

// connect to collection

export async function connectCollection() {
    try {
        const db = await connectDB();
        return db.collection('accounts');
    }
    catch (e) {
        console.error(`Cannot connect to collection: ${e}`);
    }
}

// clean up collection

export async function cleanCollection() {
    try {
        const collection = await connectCollection();
        await collection.deleteMany({});
    }
    catch (e) {
        console.error(`Cannot clean collection: ${e}`);
    }
}

// setup accounts

export async function setupAccounts() {
    try {
        const collection = await connectCollection();
        const accounts = [
            { account_number: 101, balance: 10000, account_changes: [] },
            { account_number: 102, balance: 50000, account_changes: [] },
            { account_number: 103, balance: 100000, account_changes: [] },
        ];
        await collection.insertMany(accounts);
        console.log('Accounts setup completed');
    }
    catch (e) {
        console.error(`Cannot setup accounts: ${e}`);
    }
}



