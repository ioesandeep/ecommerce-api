const mongo = require('../../db');
const {ObjectID} = require('mongodb');

class CouponsService {
    async getCoupons() {
        const db = await mongo.db();
        return db.collection('coupons').find().toArray();
    }

    async addCoupon(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }

        const db = await mongo.db();
        const checked = await this.checkCoupon({code: data.code});

        if (!checked) {
            const res = await db.collection('coupons').insertOne(data);
            if (!res || !res.ops) {
                throw new Error("Coupons could not be saved.");
            }
            return res.ops[0];
        }

        throw new Error("Coupon exists.");
    }

    async checkCoupon(coupon) {
        const db = await mongo.db();
        return await db.collection('coupons').findOne(coupon);
    }

    async deleteCoupon(id) {
        const db = await mongo.db();
        const res = await db.collection('coupons').deleteOne({_id: ObjectID(id)});
        return res.deletedCount === 1;
    }

    async getCoupon(coupon) {
        const db = await mongo.db();
        return await db.collection('coupons').findOne(coupon);
    }


    async updateCoupon(data) {
        const db = await mongo.db();
        const coupon = await this.getCoupon({_id: ObjectID(data._id)});
        if (!coupon) {
            throw new Error("Coupon not found.");
        }
        const checked = await this.checkCoupon({code: data.code});

        if (!checked) {
            const res = await db.collection('coupons').updateOne({_id: ObjectID(data._id)}, {
                $set: {
                    code: data.code,
                    discountType: data.discountType,
                    discountAmount: data.discountAmount,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    minimumCost: data.minimumCost,
                    maximumCost: data.maximumCost,
                    status: data.status
                }
            });

            if (!res || !res.result || res.result.nModified === 0) {
                throw new Error("Coupon could not be updated.");
            }
            return data;
        }
        throw  new Error("Coupon exists");

    }
}

module.exports = CouponsService;
