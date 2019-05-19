const CouponsService = require('./coupons.service');

class CouponsController {
    constructor() {
        this.service = new CouponsService();
    }

    async getCoupons(req, res) {
        try {
            const coupons = await this.service.getCoupons();
            res.json({status: 200, coupons: coupons || []});
        } catch (e) {
            res.json({...e, status: 400 || e.status});
        }
    }

    async addCoupon(req, res) {
        try {
            const coupon = await this.service.addCoupon(req.body);
            res.json({status: 200, coupon});
        } catch (e) {
            res.json({status: 400 || e.status, message: e.message});
        }
    }

    async deleteCoupon(req, res) {
        try {
            const deleted = await this.service.deleteCoupon(req.params.id);
            if (!deleted) {
                throw new Error("Coupon could not be deleted.")
            }
            res.json({status: 200, message: "Coupon deleted successfully."});
        } catch (e) {
            console.log(e)
            res.json({...e, status: 400 || e.status});
        }
    }

    async updateCoupon(req, res) {
        try {
            const coupon = await this.service.updateCoupon(req.body);
            res.json({status: 200, coupon});
        } catch (e) {
            res.json({ status: 400 || e.status, message:e.message});
        }
    }
}

module.exports = new CouponsController();
