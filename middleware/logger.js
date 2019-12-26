const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

module.exports = createLogger({
    format: combine(label({ label: "Vidly App!" }), timestamp(), prettyPrint()),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logfile.log" })
    ]
});