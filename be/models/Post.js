module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        judul : {
            type : DataTypes.STRING,
            allowNull : false
        },
        slug : {
            type : DataTypes.STRING,
            allowNull : false
        },
        kategori : {
            type : DataTypes.STRING,
            allowNull : false
        },
        foto : {
            type : DataTypes.BLOB,
            allowNull : false
        },
        body : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })
    return Post;
}