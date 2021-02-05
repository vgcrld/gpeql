const mysql = require("mysql");
class GpeMySQL {

  constructor(dbname) {
  
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "rdavis",
      password: "qJS@H!sFOMmy",
      database: dbname,
    });
    
  }
}
module.exports = GpeMySQL;
