const logger = require('./logger');
const mongoose = require("mongoose");
const config = require("config");

module.exports = function() {
    mongoose
        .connect(config.get("dbConnection"))
        .then(() => logger.info('Connected to MongoDB....'))
        .catch(err => console.error("Could not connect to MongoDB..."));
}