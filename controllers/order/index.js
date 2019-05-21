const controller = require('./order.controller');
module.exports = {
    getAll: (req, res) => controller.getAllOrders(req, res),
    getUserOrders: (req, res) => controller.getUserOrders(req, res),
    getOrder: (req, res) => controller.get(req, res),
    updateOrder: (req, res) => controller.updateOrder(req, res),
    add: (req, res) => controller.add(req, res)
};
