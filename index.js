const express = require("express");
require('express-async-errors');
const app = express();

const logger = require('./startup/logger');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config');
require('./startup/validation');

process.on('uncaughtException', (ex) => {
    logger.error(ex.message, ex);
    process.exit(1);
})

process.on('unhandledRejection', (ex) => {
    logger.error(ex.message, ex);
    process.exit(1);
})

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));