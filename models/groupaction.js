
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('groupaction', {
        groupKey: {
            type: DataTypes.STRING(50)
        },
        actionKey: {
            type: DataTypes.STRING(50)
        }
    });
};