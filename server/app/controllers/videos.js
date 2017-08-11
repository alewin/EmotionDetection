var config = require('../../config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('', '', null, config.database);
var Video = require('../models/video');
var jsonWebToken = require('jsonwebtoken');
var InfoCodeEncode = require("../modules/infoCodeEncode");
var InfoCodeDecode = require("../modules/infoCodeDecode");

var fs = require('fs');


function putVideo(req, res) {
  if (req.file) {
    var accessToken = req.headers['x-access-token'];
    var decoded = jsonWebToken.verify(accessToken, config.secret);

    var nome_file = req.params.nome_file;
    var pathfile = __dirname + "/../../public/uploads/videos/" + decoded.userid + "/" + nome_file;

    var info = req.body.video_info;
    var ic = new InfoCodeEncode(info);
    var cod = ic.getCode();


    if (fs.existsSync(pathfile)) {
      console.log(info)
      Video.sync().then(function () {
        return Video.create({
          userid: decoded.userid,
          filename: decoded.userid + "/" + nome_file,
          title: ic.getTitle(),
          code: cod
        });
      }, function () {
        res.json({
          message: 'DB error'
        });
      });
      res.json({
        message: 'Added'
      });
    } else {
      res.json({
        message: 'File is not uploaded'
      });
    }
  }
}

function deleteVideo(req, res) {
  Video.destroy({
      where: {
        id: req.body.id
      }
    })
    .then(function (vid) {
      res.json({
        message: 'Video deleted!'
      });
    }, function () {
      res.json({
        message: 'Video not found!'
      });
    });

}

function getVideos(req, res) {
  Video.findAll({
      where: {
        userid: req.params.userid
      }
    })
    .then(function (vid) {
      res.json(vid);
    }, function () {
      res.json({
        message: 'no Video found!'
      });
    });
}

function getVideo(req, res) {

  Video.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function (vid) {
      
      var d = new InfoCodeDecode(vid.code);
      vid.code = JSON.stringify(d.getInfo());
 
      res.json(vid);
    }, function () {
      res.json({
        message: 'Video not found!'
      });
    });
}

module.exports = {
  put: putVideo,
  delete: deleteVideo,
  get: getVideo,
  gets: getVideos
};