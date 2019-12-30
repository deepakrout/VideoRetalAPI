const { createLogger, format, transports, handleException } = require('winston');
const { combine, timestamp, label, prettyPrint, colorize } = format;
const config = require('config');
require('winston-mongodb')

module.exports = createLogger({
    format: combine(label({ label: "Vidly App!" }), timestamp(), prettyPrint(), colorize()),
    transports: [
        new transports.Console({ handleExceptions: true, format: format.combine(format.colorize()) }),
        new transports.File({ filename: "logfile.log", handleExceptions: true, level: 'error' }),
        new transports.MongoDB({ db: config.get('loggerDbConnection'), handleExceptions: true, level: 'error' })
    ]
});