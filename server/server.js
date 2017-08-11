// =================================================================
//  packages =======================================================
// =================================================================
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors')
var jwt = require('express-jwt');
var fs = require('fs-extra');
var jsonWebToken = require('jsonwebtoken');
var uuid = require('uuid');

var config = require('./config'); // get our config file
var InfoCodeEncode = require("./app/modules/infoCodeEncode");
var InfoCodeDecode = require("./app/modules/infoCodeDecode");


const Users = require('./app/controllers/users');
const Videos = require('./app/controllers/videos');


// =================================================================
// configuration ===================================================
// =================================================================
var app = express();
var port = process.env.PORT || 5001; // used to create, sign, and verify tokens
var router = express.Router();

app.use(express.static(__dirname + '/public'));

app.set('jwtSecret', config.secret);
app.use(bodyParser.urlencoded({
	limit: '50mb',
	extended: true
}));
app.use(cors())



var upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, callback) => {

			var accessToken = req.headers['x-access-token'];
			var decoded = jsonWebToken.verify(accessToken, config.secret);

			let path = "./public/uploads/videos/" + decoded.userid;
			fs.mkdirsSync(path);
			callback(null, path);
		},
		filename: (req, file, callback) => {

    		var name = uuid.v4() + file.originalname;
			req.params.nome_file = name;
			callback(null, name);
		}
	})
});


// =================================================================
// routes ==========================================================
// =================================================================

router.route('/auth/login').post(Users.auth);
router.route('/users').put(Users.put);
router.route('/users/:userid').get(Users.get).delete(Users.delete);
router.route('/users/:userid/videos/').get(Videos.gets);

router.route('/videos/').put(upload.single('video_input'), Videos.put);
router.route('/videos/:id').get(Videos.get).delete(Videos.delete);




router.use(function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secret, function (err, decoded) {
			if (err) {
				return res.json({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				console.log("you can pass");
				next();
			}

		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
});

app.use('/api', router);


// =================================================================
// start server ===================================================
// =================================================================

app.listen(port);
console.log('Magic happens on port http://localhost:' + port + "\n-------------------------------------------------------");