
const { createConnection } = require('mysql2');


// Create a connection to the database
const connection = createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'Transactions',
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});

connection.beginTransaction((err) => {
    if (err) {
        console.error('Error starting transaction: ' + err.stack);
        return;
    }

    const senderAccountNumber = 1001;
    const receiverAccountNumber = 1002;
    const amount = 1000;

    // Deduct the amount from the sender's account

    // Declaring queries as constants
    const deductAmountFromSenderAccount = `UPDATE account SET balance = balance - ${amount} WHERE account_number = ${senderAccountNumber}`;
    const addAmountToReceiverAccount = `UPDATE account SET balance = balance + ${amount} WHERE account_number = ${receiverAccountNumber}`;
    const logSenderTransaction = `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (${senderAccountNumber}, -${amount}, CURDATE(), 'Transfer to account ${receiverAccountNumber}')`;
    const logReceiverTransaction = `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (${receiverAccountNumber}, ${amount}, CURDATE(), 'Transfer from account ${senderAccountNumber}')`;

    connection.query(deductAmountFromSenderAccount, [amount, senderAccountNumber], (err, result) => {
        if (err) {
            connection.rollback(() => {
                console.error('Error deducting amount from sender account: ' + err.stack);
                return;
            });
        }

        // Add the amount to the receiver's account
        connection.query(addAmountToReceiverAccount, (err, result) => {
            if (err) {
                connection.rollback(() => {
                    console.error('Error adding amount to receiver account: ' + err.stack);
                    return;
                });
            }

            // Log the transaction in the account_changes table for sender
            connection.query(logSenderTransaction, (err, result) => {
                if (err) {
                    connection.rollback(() => {
                        console.error('Error logging transaction: ' + err.stack);
                        return;
                    });
                }
                // Log the transaction in the account_changes table for receiver
                connection.query(logReceiverTransaction, (err, result) => {
                    if (err) {
                        connection.rollback(() => {
                            console.error('Error logging transaction: ' + err.stack);
                            return;
                        });
                    }

                    // Commit the transaction
                    connection.commit((err) => {
                        if (err) {
                            connection.rollback(() => {
                                console.error('Error committing transaction: ' + err.stack);
                                return;
                            });
                        }

                        console.log('Transaction completed successfully.');
                        connection.end((err) => {
                            if (err) {
                                console.error('Error closing the database connection: ' + err.stack);
                                return;
                            }
                            console.log('Connection closed.');
                        });
                    });
                });
            });
        });
    });
});