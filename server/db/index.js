const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  password: "StaffNbcc001",
  user: "admin",
  database: "staff",
  host: "staff-wellness-app.c97g5kpuab3n.us-east-1.rds.amazonaws.com",
  port: "3311",
});

let staffDB = {};

staffDB.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM user`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

staffDB.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM user where staff_id = ? `, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

staffDB.GetContent = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select * from content`, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

staffDB.GetContentByName = (name) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from content where resource_id = (select resource_id from resources where resource_name = ?);`,
      name,
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

module.exports = staffDB;
