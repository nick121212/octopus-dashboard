module.exports = (sequelize, DataTypes) => {
    let schema = sequelize.define('schema', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        type: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        content: { type: DataTypes.TEXT, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true }
    });

    schema.beforeCreate((schema, options) => {
        if (typeof schema.content === "object") {
            schema.content = JSON.stringify(schema.content);
        }
    });

    return schema;
};