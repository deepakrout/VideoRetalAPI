const config = require("config");
module.exports = function() {
    if (!config.get("jwtPrivateKey")) {
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
        process.exit(1);
    }

    if (!config.get("dbConnection")) {
        throw new Error("FATAL ERROR: dbConnection not defined.");
        process.exit(1);
    }
}