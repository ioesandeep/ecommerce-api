const mongo = require('../../db');
const {ObjectID} = require('mongodb');

class OrderService {
    async addAnOrder(data) {
        const db = await mongo.db();
        data.status = 1;
        data.orderDate = new Date();
        const res = await db.collection('orders').insertOne(data);
        if (!res || !res.ops) {
            throw new Error("Order could not be saved.");
        }
        return res.ops[0];
    }

    async getOrder(id) {
        const db = await mongo.db();
        const res = await db.collection('orders').findOne({_id: ObjectID(id)});
        if (!res || !res._id) {
            throw new Error("Order not found.");
        }
        return res;
    }

    async getUserOrders(id) {
        const db = await mongo.db();
        const res = await db.collection('orders').find({'user._id': id}).toArray();
        return res || [];
    }

    async getAllOrders() {
        const db = await mongo.db();
        const res = await db.collection('orders').find({}).toArray();
        return res || [];
    }
}

module.exports = OrderService;
