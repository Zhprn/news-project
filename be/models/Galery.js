module.exports = (sequelize, DataTypes) => {
    const Galery = sequelize.define('Galery', {
        foto : {
            type : DataTypes.BLOB,
            allowNull : false
        }
    })
    return Galery;
}