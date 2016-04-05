export default {
    db: {
        username: 'root',
        password: '111111',
        database: 'express4',
        options: {
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            charset: 'utf8',
            collation: 'utf8_swedish_ci',
            define: {
                timestamps: true,
                freezeTableName: true
            },
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    },
    whitelist:[]
};