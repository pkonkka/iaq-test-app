var logger = require('../../utils/actionLogger');

module.exports = function(app) {

   app.get('*', function(req, res, next) {
       var err = new Error();
       err.status = 404;
       next(err); 
    });
    
    app.use(function(err, req, res, next) {
        if(err.status != 404) {
            return next();
        } 
        
        var mess = {
            "status": 404,
            "message": "Page not found :(",
            "developerMessage": "Something bad happened :(",
            "moreInfo": "http://www.sensoan.com"
        };
              
        res.status(404).jsonp({success: false, error: mess});

        logger(req, res);
    });


}