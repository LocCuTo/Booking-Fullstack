require('dotenv').config();
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: null,
        database: process.env.DB_DATABASE_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
        query: { raw: true },
        timezone: '+07:00',
    },
    test: {
        username: process.env.DB_USERNAME,
        password: null,
        database: process.env.DB_DATABASE_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: null,
        database: process.env.DB_DATABASE_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
};
