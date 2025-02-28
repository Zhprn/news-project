module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        nama : {
            type : DataTypes.STRING,
            allowNull : false
        },
        spesialis : {
            type : DataTypes.STRING,
            allowNull : false
        },
        posisi : {
            type : DataTypes.STRING,
            allowNull : false
        },
        deskripsi : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        foto : {
            type : DataTypes.BLOB,
            allowNull : false
        },
        portofolio : {
            type : DataTypes.BLOB,
            allowNull : false
        },
        instagram : {
            type : DataTypes.STRING,
            allowNull : false
        },
        linkedin : {
            type : DataTypes.STRING,
            allowNull : false
        }
    });
    return Team;
}