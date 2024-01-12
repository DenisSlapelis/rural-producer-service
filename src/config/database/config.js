const fs = require('fs');

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: './src/config/database/rural_producer_db.sqlite',
        logging: console.log,
    },
    test: {
        dialect: 'sqlite',
        storage: './src/config/database/rural_producer_db.sqlite',
        logging: console.log,
    },
};
