const jwt = require('jsonwebtoken');
const UserService = require('../controllers/users/user.service');

class UserMiddleware {
    constructor() {
        this.service = new UserService();
    }

    async verify(req, res, next) {
        try {
            const u = jwt.verify(req.headers.authorization.replace('Bearer ', ''), 'mwa2019');
            if (!u || !u._id) {
                throw new Error("Request not authorized");
            }

            const user = await this.service.getUser(u._id);
            if (!user || !user._id) {
                throw new Error("User does not exist.");
            }

            return next();
        } catch (e) {
            res.status(403);
            next(e);
        }
    }
}

module.exports = new UserMiddleware();
