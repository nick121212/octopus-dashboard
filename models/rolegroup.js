
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('rolegroup', {
        groupKey: {
            type: DataTypes.STRING(50)
        },
        roleKey: {
            type: DataTypes.STRING(50)
        }
    });
};