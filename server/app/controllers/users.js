var config = require('../../config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('', '', null, config.database);
var User = require('../models/user');
var jsonWebToken = require('jsonwebtoken');


function putUser(req, res) {
  User.findAll({
      where: {
        username: req.body.username
      }
    })
    .then(function (user) {
      if (user.length == 0) {
        User.sync().then(function () {
          return User.create({
            username: req.body.username,
            password: req.body.password
          });
        }, function () {
          res.json({
            message: 'Error'
          });
        });
        res.json({
          message: 'Added'
        });
      } else {
        res.json("Error");
      }
    });
}

function getUsers(req, res) {
  User.findAll({
    attributes: ['username']
  }).then(function (user) {
    res.json(user);
  })
}

function getUser(req, res) {
  User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(function (user) {
      res.json(user);
    }, function () {
      res.json({
        message: 'User not found!'
      });
    });
}

function deleteUser(req, res) {
  User.destroy({
      where: {
        username: req.body.username
      }
    })
    .then(function (user) {

      res.json({
        message: 'User deleted!'
      });
    }, function () {
      res.json({
        message: 'User not found!'
      });
    });


}



function authUser(request, response) {
  var tmp = request.headers['authorization'].split(' ');
  var buf = new Buffer(tmp[1], 'base64');
  var plain_auth = buf.toString();
  var creds = plain_auth.split(':');
  var username = creds[0];
  var password = creds[1];

  User.findOne({
    where: {
      username: username,
      password: password
    }
  }).then(function (usr) {
    console.log(usr);
    if (usr) {
      var accessToken = jsonWebToken.sign({
        userid: usr.id
      }, config.secret, {
        expiresIn: "7d"
      });
      console.log('Authentication is done successfully.....');
      response.json({
        authsuccess: true,
        description: 'Sending the Access Token',
        accessToken: accessToken,
        userid: usr.id
      });
    } else {
      response.json({
        authsuccess: false,
        description: 'Invalid username or password'
      });
    }



  })


}

module.exports = {
  put: putUser,
  delete: deleteUser,
  get: getUser,
  auth: authUser
};