var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, result) => {
        if(err) {
          res.send(err);
        } 
        res.status(200).json(result);
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      let arg = [req.body.text, req.body.roomname, req.body.username];
      models.messages.post(arg, (err, result) => {
        if(err) {
          res.send(err);
        }
        console.log(req.body);
        res.status(201).json(result);
      })
    } // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {
      models.users.get((err, result) => {
        if(err) {
          res.send(err);
        }
        res.status(200).json(result);
      })
    }, // a function which handles a get request for all users
    post: function (req, res) {
      let arg = [req.body.username];
      models.users.post(arg, (err, result) => {
        if(err) {
          res.send(err);
        }
        res.status(201).json(result);
      })
    } // a function which handles posting a user to the database
  }
};

