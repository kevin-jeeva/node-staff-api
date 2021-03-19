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
      console.log(results);
      if (err || !results.length) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

staffDB.GetUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select staff_id, user_name, first_name, last_name, email, admin, active, password from user where email = LOWER(?)`,
      email,
      (err, result) => {
        if (err || !result.length) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

staffDB.GetPhoneById = (userId) => {
  return new Promise((resolve, reject) => {
    console.log(userId);
    pool.query(
      `select user_phone_no from user_phone where user_id = ?`,
      userId,
      (err, result) => {
        if (err || !result.length) {
          return reject(err);
        }
        return resolve(result);
      }
    );
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

staffDB.GetContentByName = (resource) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from content where resource_id = (select resource_id from resources where resource_name = ?);`,
      resource,
      (error, result) => {
        if (error || !result.length) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

staffDB.GetContentById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from content where content_id = ?`,
      id,
      (error, result) => {
        if (error || !result.length) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

staffDB.GetVideos = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select media_path from media where media_path like '%.mp4'`,
      (error, result) => {
        if (error || !result.length) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

staffDB.GetResourceInProgress = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select resource_name from resources where resource_id IN (select resource_id from content group by resource_id);`,
      (error, result) => {
        if (error || !result.length) return reject(error);
        return resolve(result);
      }
    );
  });
};

staffDB.GetContentIdsByName = (resourceName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select content_id from content where resource_id = (select resource_id from resources where resource_name = ?)`,
      resourceName,
      (error, result) => {
        if (error || !result.length) return reject(error);
        return resolve(result);
      }
    );
  });
};

staffDB.GetProgressByResourceName = (resourceName, staffId = 18) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM progress where user_id = ? and content_id in (select content_id from content where resource_id = (select resource_id from resources where resource_name = ?))`,
      [staffId, resourceName],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

staffDB.GetSuggested = (staff_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select content.content_title,content.content_id,content.content_description,date_format(content.date_created, '%m/%d/%y') as date_created from content inner join resources on content.resource_id = resources.resource_id where resources.resource_name NOT IN ('Exercise Video', 'Exercise Sound') and content.content_id  NOT in (select pg.content_id from progress pg where user_id = ?) order by rand() limit 2;`,
      staff_id,
      (error, result) => {
        if (error || !result.length) return reject(error);
        return resolve(result);
      }
    );
  });
};

staffDB.GetMostViewed = (staff_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from progress where user_id = ? and content_id != 0 order by views desc Limit 4`,
      staff_id,
      (error, result) => {
        if (error || !result.length) return reject(error);
        return resolve(result);
      }
    );
  });
};

staffDB.UpdatePassword = (email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Update user set password = ? where email = ?`,
      [password, email],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};

staffDB.UpdatePhone = (id, phone) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `Update user_phone set user_phone_no = ? where user_id = ?`,
      [phone, id],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
};

module.exports = staffDB;
