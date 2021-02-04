p = (p) => console.log(p);

let mysql = require("mysql");

var ms = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "v0Et7jsjrnPQ",
  database: "data__atsgroup",
});

let data = await ms.query(sql, async (error, result, fields));


p("calling");
const x = query("select * from config_names limit 2");
p("done");
console.log(x);

