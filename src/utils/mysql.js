const mysql = require("mysql");
const config = require("../config");
const connection = mysql.createConnection(config.mysql);

connection.connect();

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO " + table + " SET ?",
      data,
      function (error, results, fields) {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
}

module.exports = {
  insert,
};
