const dbconfig = require('../config/db.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        host: dbconfig.HOST,
        dialect: dbconfig.dialect,
        logging: false,
        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle,
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Database berhasil dijalankan");
    })
    .catch(err => {
        console.error("Database gagal dijalankan: " + err.message);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./User.js')(sequelize, DataTypes);
db.categories = require('./Categories.js')(sequelize, DataTypes);
db.post = require('./Post.js')(sequelize, DataTypes);
db.team = require('./Team.js')(sequelize, DataTypes);
db.galery = require('./Galery.js')(sequelize, DataTypes);
db.position = require('./Position.js')(sequelize, DataTypes);

db.sequelize.sync({force : false})
    .then(() => {
    console.log('Sync database berhasil')
})

module.exports = db;