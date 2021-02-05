p = (p) => console.log(p);

const mysql = require("mysql");

const ms = mysql.createConnection({
  host: "127.0.0.1",
  user: "rdavis",
  password: "qJS@H!sFOMmy",
  database: "data__atsgroup",
});

const configNames = {};

const getConfig = new Promise((resolve, reject) => {
  ms.query(`select * from config_names limit 10`, (error, result, fields) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
  ms.end();
});

const data = getConfig
  .then((r) => {
    p(2)
    configNames.data = r;
  })
  .catch((e) => p(e.sqlMessage));

p(1)
p(configNames);
p(3)