const mysql = require('mysql');
const dbConfig = require('../config/DBConfig');

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.db_host,
  user: dbConfig.db_user,
  password: dbConfig.db_password,
  database: dbConfig.db_database,
  multipleStatements: true
});

connection.connect((error) => {
  if (error) return console.log('error when connecting to db:', error)
  console.log('Connection established');
});

module.exports = connection;
