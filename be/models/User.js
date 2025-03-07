module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    role : {
        type : DataTypes.STRING,
        allowNull : true
    }
    });

    return User;
};