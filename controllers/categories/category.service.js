const mongo = require('../../db');

class CategoryService {
    async getCategories() {
        const db = await mongo.db();
        return db.collection('categories').find().toArray();
    }

    async add(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }

        const db = await mongo.db();
        const res = await db.collection('categories').insertOne(data);
        console.log(res);
        if (!res || !res.ops) {
            throw new Error("Category could not be saved.");
        }

        return res.ops[0];
    }
}

module.exports = CategoryService;
