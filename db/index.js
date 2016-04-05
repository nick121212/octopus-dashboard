import Sequelize from 'sequelize';
import sequelizeImport from 'sequelize-import';
import _ from 'lodash';
import async from 'async';
import config from '../config';

let sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.options);
let models = sequelizeImport(__dirname + '/../models', sequelize, {
    exclude: ['index.js']
});

// 初始化数据库
sequelize.sync({ force: false }).then(() => {

}, function(err) {
    console.log(err);
});

export default {
    sequelize: sequelize,
    Sequelize: Sequelize,
    models: models
};
