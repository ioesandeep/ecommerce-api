const {ObjectID} = require('mongodb');
const stripe = require('stripe')('sk_test_4quWezbnkmlhLybWd0CGmmom00976mBzp4');
const mongo = require('../../db');

class OrderService {

    async chargeViaStripe(order) {
        const user = {
            email: order.user.email,
            source: order.payment.id
        };

        const customer = await stripe
            .customers
            .create(user);
        order.stripe = customer;

        const res = await stripe
            .charges
            .create({
                amount: parseInt(order.total * 100),
                currency: "usd",
                customer: customer.id,
            });

        order.stripe.charge = res;
    }

    async addAnOrder(data) {
        const db = await mongo.db();
        await this.chargeViaStripe(data);

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

    async updateOrder(id, update) {
        const db = await mongo.db();
        const res = await db.collection('orders').updateOne({_id: ObjectID(id)}, {$set: update});
        return res.modifiedCount > 0;
    }
}

module.exports = OrderService;
