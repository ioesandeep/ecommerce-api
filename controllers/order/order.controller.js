const OrderService = require('./order.service');

class OrderController {
    constructor(props) {
        this.service = new OrderService();
    }

    async add(req, res) {
        try {
            if (!req.body) {
                throw new Error("Data expected with this request.");
            }

            const order = await this.service.addAnOrder(req.body);
            order.status = 1;
            res.json({status: 200, order, message: "Order added successfully."});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async get(req, res) {
        try {
            if (!req.params.id) {
                throw new Error("Data expected with this request.");
            }

            const order = await this.service.getOrder(req.params.id);
            res.json({status: 200, order});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async getUserOrders(req, res) {
        try {
            if (!req.params.uid) {
                throw new Error("Data expected with this request.");
            }

            const orders = await this.service.getUserOrders(req.params.uid);
            res.json({status: 200, orders: orders || []});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await this.service.getAllOrders();
            res.json({status: 200, orders: orders || []});
        } catch (e) {
            res.json({status: 400, message: e.message});
        }
    }

}

module.exports = new OrderController();
