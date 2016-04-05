module.exports = (sequelize, DataTypes) => {
    return sequelize.define('server', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        title: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        baseUrl: {
            type: DataTypes.STRING
        },
        port: {
            type: DataTypes.INTEGER
        },
        verb: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValu: 'HTTP'
        },
        type: {
            type: DataTypes.INTEGER
        },
        description: { type: DataTypes.TEXT, allowNull: true },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
};