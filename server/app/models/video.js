var Sequelize = require('sequelize');
var config = require('../..//config');
var sequelize = new Sequelize('', '', null, config.database);


module.exports = sequelize.define('video', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
        type: Sequelize.INTEGER
    },
    filename: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    code: {
        type: Sequelize.STRING
    }
});