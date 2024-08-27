import { closeDB, cleanCollection, setupAccounts } from "./setup.js";
import { createTransfer } from "./transfer.js";

const transferInfo = { fromAccount: 101, toAccount: 102, amount: 1000, remark: 'Transfer from 101 to 102' };

async function main() {
    try {
        await cleanCollection();
        await setupAccounts();
        await createTransfer(transferInfo.fromAccount, transferInfo.toAccount, transferInfo.amount, transferInfo.remark);
    }
    catch (e) {
        console.error(`Cannot transfer: ${e}`);
    }
    finally {
        await closeDB();
    }
}

main();