module.exports = (sequelize, DataTypes) => {
    let action = sequelize.define('action', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        parentKey: {
            type: DataTypes.STRING(50),
        },
        type: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        optype: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        title: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING(10),
        },
        searchSchemaKey: {
            type: DataTypes.STRING(50)
        },
        formSchemaKey: {
            type: DataTypes.STRING(50)
        },
        dataSchemaKey: {
            type: DataTypes.STRING(50)
        },
        templateUrl: {
            type: DataTypes.STRING(100)
        },
        controller: {
            type: DataTypes.STRING(50)
        },
        linkUrl: {
            type: DataTypes.STRING(30)
        },
        columns: {
            type: DataTypes.TEXT
        },
        clearCurrentItem: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        interfaces: {
            type: DataTypes.TEXT
        },
        isList: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isRefresh: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isNeedDetail:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        defaultDatas: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: { type: DataTypes.STRING, allowNull: true }
    });

    action.beforeCreate((action, options) => {
        if (typeof action.columns === "object") {
            action.columns = JSON.stringify(action.columns);
        }
        if (typeof action.interfaces === "object") {
            action.interfaces = JSON.stringify(action.interfaces);
        }
        if (typeof action.defaultDatas === "object") {
            action.defaultDatas = JSON.stringify(action.defaultDatas);
        }
    });

    return action;
};


