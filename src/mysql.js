class GpeMySQL {
  constructor(dbname) {
    const mysql = require("mysql");

    this.connection = mysql.createConnection({
      host: "localhost",
      user: "reporting_app",
      password: "password123",
      database: dbname,
    });
  }


  query(sql,callback) {
      this.connection.connect();
      this.connection.query(sql, callback)
      this.connection.end();
  }
}

module.exports = GpeMySQL;
