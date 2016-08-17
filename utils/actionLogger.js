var logger = require('../utils/logger');

module.exports = function(req, res, err) {
    logger.log('info', "Session ID: ", req.sessionID);
    logger.log('info', "Remote address: " + req.connection.remoteAddress);

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.log('info', req.method + " " + fullUrl);

    logger.log('info', "Status: " + res.statusCode);

}