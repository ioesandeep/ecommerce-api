const jwt = require('jsonwebtoken');
const mongo = require('../db');
const {ObjectID} = require('mongodb');

class AdminMiddleware {

    async verify(req, res, next) {
        try {
            const u = jwt.verify(req.headers.authorization.replace('Bearer ', ''), 'mwa2019');
            if (!u || !u._id) {
                throw new Error("Request not authorized");
            }

            const db = await mongo.db();
            const user = await db.collection('admins').findOne({_id: ObjectID(u._id)});
            if (!user || !user._id) {
                throw new Error("User does not exist.");
            }

            return next();
        } catch (e) {
            //res.status(403);
            next();
            //next(e);
        }
    }
}

module.exports = new AdminMiddleware();
