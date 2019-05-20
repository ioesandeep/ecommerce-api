const mongo = require('../../db');
const {ObjectID} = require('mongodb');

class CategoryService {
    async getCategories() {
        const db = await mongo.db();
        return db.collection('categories').find().toArray();
    }

    async getCategory(match) {
        const db = await mongo.db();
        return await db.collection('categories').findOne(match);
    }

    async add(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }

        const db = await mongo.db();
        const res = await db.collection('categories').insertOne(data);
        if (!res || !res.ops) {
            throw new Error("Category could not be saved.");
        }

        return res.ops[0];
    }

    async update(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }

        if (!data._id) {
            throw new Error("Category not selected.");
        }

        const id = data._id;
        const category = await this.getCategory({_id: ObjectID(id)});

        if (!category && !category._id) {
            throw new Error("The category your are trying to update does not exist.");
        }

        const db = await mongo.db();
        delete data._id;
        const res = await db.collection('categories').updateOne({_id: ObjectID(id)}, {$set: data});
        if (!res || res.modifiedCount === 0) {
            throw new Error("Category could not be saved.");
        }

        return data;
    }

    async delete(id) {
        const category = await this.getCategory({_id: ObjectID(id)});
        if (!category && !category._id) {
            throw new Error("The category your are trying to delete does not exist.");
        }

        const db = await mongo.db();
        const res = await db.collection('categories').deleteOne({_id: ObjectID(id)});
        if (res.deletedCount === 0) {
            throw new Error("Category could not be deleted.");
        }
        return category;
    }
}

module.exports = CategoryService;
