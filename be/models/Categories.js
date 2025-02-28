module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categories', {
        nama_kategori : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Slug : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })
    
    return Categories
}