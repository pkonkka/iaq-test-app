var configValues = require('./config');

module.exports = {
    "database": "mongodb://" + configValues.mongo_account[0].uname + ":" + configValues.mongo_account[0].pwd + "@ds029665.mlab.com:29665/iaqtest2"
}
