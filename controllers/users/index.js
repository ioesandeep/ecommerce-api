const controller = require('./user.controller');

module.exports = {
    getUsers: (req, res) => {
        controller.getUsers(req, res);
    },
    addUser: (req, res) => {
        controller.addUser(req, res);
    },
    updateUser: (req, res) => {
        controller.updateUser(req, res);
    },
    changePassword: (req, res) => {
        controller.changePassword(req, res);
    },
    deleteUser: (req, res) => {
        controller.deleteUser(req, res);
    },
    getAddresses: (req, res) => {
        controller.getAddresses(req, res);
    },
    addAddress: (req, res) => {
        controller.addAddress(req, res);
    },
    updateAddress: (req, res) => {
        controller.updateAddress(req, res);
    },
    deleteAddress: (req, res) => {
        controller.deleteAddress(req, res);
    },
    getPayments: (req, res) => {
        controller.getPayments(req, res);
    },
    addPayments: (req, res) => {
        controller.addPayments(req, res);
    },
    updatePayments: (req, res) => {
        controller.updatePayments(req, res);
    },
    deletePayments: (req, res) => {
        controller.deletePayments(req, res);
    }
};
