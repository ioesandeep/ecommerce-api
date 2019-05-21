const auth = require('./auth.middleware');
const user = require('./user.middleware');
const admin = require('./admin.middleware');
module.exports = {
    auth: function (req, res, next) {
        return auth.verify(req, res, next);
    },
    user: function (req, res, next) {
        return user.verify(req, res, next);
    },
    admin: function (req, res, next) {
        return admin.verify(req, res, next);
    }
};
