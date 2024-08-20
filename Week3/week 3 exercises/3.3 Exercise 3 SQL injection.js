//1. Example of SQL Injection
function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
      function (err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }

// The original function is vulnerable to SQL injection. An attacker could exploit this by passing the following values:
// name: ' OR '1'='1
// code: ' OR '1'='1
// This would result in the following SQL query:
//SELECT Population FROM Countries WHERE Name = '' OR '1'='1' AND code = '' OR '1'='1'
//This query would retrieve all records from the Countries table, bypassing the intended filtering.



// 2. Rewritten Secure Function
function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    const query = `SELECT Population FROM ?? WHERE Name = ? AND code = ?`;
    const values = [Country, name, code];
  
    conn.query(query, values, function (err, result) {
      if (err) return cb(err);
      if (result.length === 0) return cb(new Error("Not found"));
      cb(null, result[0].Population);
    });
  }
  