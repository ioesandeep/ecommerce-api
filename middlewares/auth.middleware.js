const user = require('./user.middleware');
const admin = require('./admin.middleware');

class UserMiddleware {
    async verify(req, res, next) {
        const userType = req.headers['x-user-type'] || 'user';
        if (userType === 'user') {
            return user.verify(req, res, next);
        }

        if (userType === 'admin') {
            return admin.verify(req, res, next);
        }

        return next();
    }
}

module.exports = new UserMiddleware();
