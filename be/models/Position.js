module.exports = (sequelize, DataTypes) => {
    const Position = sequelize.define('Position', {
        kategori : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })
    return Position;
}