
const createConnection = require('mysql2').createConnection;


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

// Insert values into the account table

const insertAccountValues = `
INSERT INTO account (account_number, balance) VALUES
(1001, 5000.00),
(1002, 10000.00),
(1003, 15000.00),
(1004, 20000.00),
(1005, 25000.00);
`;

connection.query(insertAccountValues, (err) => {
    if (err) {
        console.error('Error inserting values into account table: ' + err.stack);
        return;
    }
    console.log('Values inserted into account table successfully.');
});

// Insert values into the account_changes table

const insertAccountChangesValues = `
INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
(1001, 5000.00, '2021-01-01', 'Initial deposit'),
(1002, 10000.00, '2021-01-01', 'Initial deposit'),
(1003, 15000.00, '2021-01-01', 'Initial deposit'),
(1004, 20000.00, '2021-01-01', 'Initial deposit'),
(1005, 25000.00, '2021-01-01', 'Initial deposit');
`;

connection.query(insertAccountChangesValues, (err) => {
    if (err) {
        console.error('Error inserting values into account_changes table: ' + err.stack);
        return;
    }
    console.log('Values inserted into account_changes table successfully.');
});

// Close the database connection

connection.end((err) => {
    if (err) {
        console.error('Error closing the database connection: ' + err.stack);
        return;
    }
    console.log('Database connection closed.');
});