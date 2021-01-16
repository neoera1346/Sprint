var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) { // a function which produces all the messages
      let sql = `SELECT m.text, m.roomname, u.username FROM messages m 
      LEFT JOIN users u ON m.userId=u.id`;
      db.query(sql, (err, result) => {
        callback(err, result);
      })
    }, 
    post: function (arg, callback) {
      let sql = `INSERT INTO messages (text, roomname, userId) 
      VALUES (?, ?, (SELECT id FROM users WHERE username = ? limit 1))`;
      db.query(sql, arg, (err, result) => {
        callback(err, result);
      })
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      let sql = `SELECT * FROM users`;
      db.query(sql, (err, result) => {
        callback(err, result);
      })
    },
    post: function (arg, callback) {
      let sql = `INSERT INTO users (username) VALUES ('?')`;
      db.query(sql, arg, (err, result) => {
        callback(err, result);
      });
    }
  }
};

