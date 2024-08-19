
// Creating tables
const createTables = `
CREATE TABLE account (
  account_number INT PRIMARY KEY,
  balance DECIMAL(10, 2)
);

CREATE TABLE account_changes (
  change_number INT PRIMARY KEY AUTO_INCREMENT,
  account_number INT,
  amount DECIMAL(10, 2),
  changed_date DATE,
  remark VARCHAR(255),
  FOREIGN KEY (account_number) REFERENCES account(account_number)
);
`;

// Inserting sample data
const insertValues = `
INSERT INTO account (account_number, balance) VALUES (101, 5000), (102, 3000);

INSERT INTO account_changes (account_number, amount, changed_date, remark) 
VALUES (101, 5000, '2024-08-18', 'Initial Deposit'), 
       (102, 3000, '2024-08-18', 'Initial Deposit');
`;

// Transaction to transfer money
const transaction = `
BEGIN TRANSACTION;

UPDATE account SET balance = balance - 1000 WHERE account_number = 101;
UPDATE account SET balance = balance + 1000 WHERE account_number = 102;

INSERT INTO account_changes (account_number, amount, changed_date, remark) 
VALUES (101, -1000, CURDATE(), 'Transfer to 102'), 
       (102, 1000, CURDATE(), 'Received from 101');

COMMIT;
`;

// Exporting the SQL scripts for use in a database setup or transaction
module.exports = {
  createTables,
  insertValues,
  transaction,
};
