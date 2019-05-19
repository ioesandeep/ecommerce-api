const controller = require('./category.controller');

module.exports = {
    getAll: (req, res) => {
        controller.getAll(req, res);
    },
    add: (req, res) => {
        controller.add(req, res);
    }
};
