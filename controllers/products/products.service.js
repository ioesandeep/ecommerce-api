const mongo = require('../../db');
const {ObjectID} = require('mongodb');

class ProductsService {
    async getProducts(match = {}) {
        const db = await mongo.db();
        return db.collection('products').find(match).toArray();
    }

    async getProduct(match) {
        const db = await mongo.db();
        return await db.collection('products').findOne(match);
    }

    async getProductBySlug(slug) {
        return await this.getProduct({slug: slug});
    }

    async add(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }

        const db = await mongo.db();
        const res = await db.collection('products').insertOne(data);
        if (!res || !res.ops) {
            throw new Error("Product could not be saved.");
        }

        return res.ops[0];
    }

    async update(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }

        if (!data._id) {
            throw new Error("Product not selected.");
        }

        const id = data._id;
        const product = await this.getProduct({_id: ObjectID(id)});

        if (!product && !product._id) {
            throw new Error("The product your are trying to update does not exist.");
        }

        const db = await mongo.db();
        delete data._id;
        const res = await db.collection('products').updateOne({_id: ObjectID(id)}, {$set: data});
        if (!res || res.modifiedCount === 0) {
            throw new Error("Product could not be saved.");
        }

        return data;
    }

    async delete(id) {
        const product = await this.getProduct({_id: ObjectID(id)});
        if (!product && !product._id) {
            throw new Error("The product your are trying to delete does not exist.");
        }

        const db = await mongo.db();
        const res = await db.collection('products').deleteOne({_id: ObjectID(id)});
        if (res.deletedCount === 0) {
            throw new Error("Product could not be deleted.");
        }
        return product;
    }
}

module.exports = ProductsService;
