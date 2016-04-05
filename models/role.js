
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('role', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        title: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        description: { type: DataTypes.TEXT, allowNull: true },
    });
};