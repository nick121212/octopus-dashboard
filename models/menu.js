module.exports = (sequelize, DataTypes) => {
    return sequelize.define('menu', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        title: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        icon: DataTypes.STRING,
        link: DataTypes.STRING,
        lft: DataTypes.INTEGER,
        rgt: DataTypes.INTEGER,
        parentKey: DataTypes.STRING,
        description: { type: DataTypes.TEXT, allowNull: true },
        isShow: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
};