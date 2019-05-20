const controller = require('./coupons.controller');

module.exports = {
    getCoupons: (req, res) => {
        controller.getCoupons(req, res);
    },
    addCoupon: (req, res) => {
        controller.addCoupon(req, res);
    },
    deleteCoupon: (req, res) =>{
        controller.deleteCoupon(req, res);
    },
    updateCoupon: (req, res) =>{
        controller.updateCoupon(req, res);
    }
};
