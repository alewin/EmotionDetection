var Sequelize = require('sequelize');
var config = require('../../config');
var sequelize = new Sequelize('', '', null, config.database);


module.exports = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
}, {
	freezeTableName: true
});