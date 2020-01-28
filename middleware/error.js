const logger = require('../startup/logger');
//Error logging middleware
module.exports = function(err, req, res, next) {
    logger.log('error', err.message, err);

    // error
    // warn 
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something went wrong!');
}