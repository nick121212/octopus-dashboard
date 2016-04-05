module.exports = (sequelize, DataTypes) => {
    var inteface = sequelize.define('interface', {
        baseUrl: {
            type: DataTypes.STRING
        },
        port: {
            type: DataTypes.INTEGER
        },
        api: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verb: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValu: 'GET'
        },
        prefix: {
            type: DataTypes.STRING,
            defaultValu: 'filter'
        },
        key: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        needParams: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        needDatas: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isAllParam: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        params: {
            type: DataTypes.TEXT
        },
        fields: {
            type: DataTypes.TEXT
        },
        isSystem: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        type: {
            type: DataTypes.INTEGER
        }
    });

    inteface.beforeCreate((inteface, options) => {
        if (inteface) {
            if (typeof inteface.params === "object") {
                inteface.params = JSON.stringify(inteface.params);
            }
            if (typeof inteface.fields === "object") {
                inteface.fields = JSON.stringify(inteface.fields);
            }
        }
    });

    return inteface;
};