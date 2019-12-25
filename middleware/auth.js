const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).send('Access denied. Unauthenicated request.');
    }
    try {
        const decodedtoken = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedtoken;
        next();

    } catch (ex) {
        console.log(ex)
        res.status(400).send('Access denied. Invalid or Unauthenicated request.');
    }
}