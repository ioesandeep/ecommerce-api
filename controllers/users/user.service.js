const mongo = require('../../db');
const {ObjectID} = require("mongodb");
const userID = "5ce2286544e6f33c6c7fcdd0";

class UserService {


    async getUsers() {
        const db = await mongo.db();
        return db.collection('users').find().toArray();
    }

    async addUser(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const res = await db.collection('users').insertOne(data);
        console.log(res);
        if (!res || !res.ops) {
            throw new Error("User could not be saved.");
        }

        return res.ops[0];
    }

    async updateUser(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const res = await db.collection('users').updateOne({_id: ObjectID(data._id)}, {
            $set: {
                name: data.name,
                mobile: data.mobile
            }
        });

        console.log(res);
        if (!res || !res.ops) {
            throw new Error("User could not be saved.");
        }

        return data;
    }

    async deleteUser(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }

        const db = await mongo.db();

        const res = await db.collection('users').remove({"_id": ObjectID(data._id)});
        //working fine
        //const res = await db.collection('users').remove({"name":  data.name });
        console.log(res);
        if (!res || !res.ops) {
            throw new Error("User could not be saved.");
        }
        return res.ops[0];
    }

    async getAddresses(data) {
        const db = await mongo.db();
        //console.log(data._id);

        console.log(userID);

        const res = await db.collection('users').find({_id: ObjectID(userID)}).project({
            _id: 0,
            addresses: 1
        }).toArray();

        console.log(res);
        return res;
    }

    async addAddress(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const save = {_id: new ObjectID(), ...data};
        const res = await db.collection('users').updateOne(
            {_id: ObjectID(userID)},
            {$push: {addresses: save}}
        );

        console.log(res);
        if (!res || res.modifiedCount === 0) {
            throw new Error("Address could not be saved.");
        }
        return save;
    }

    async updateAddress(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        console.log(data);

        const res = await db.collection('users').updateOne(
            {_id: ObjectID(userID), "addresses._id": ObjectID(data._id)},
            {$set: {"addresses.$": {...data}}}
        );
        console.log(res);
        if (!res || !res.modifiedCount) {
            throw new Error("Address could not be updated.");
        }
        return data;
    }

    async deleteAddress(id) {
        if (!id) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const res = await db.collection('users').updateOne(
            {_id: ObjectID(userID)},
            {$pull: {addresses: {_id: ObjectID(id)}}}
        );

        if (!res || !res.modifiedCount) {
            throw new Error("Address could not be deleted.");
        }

        return true
    }


    async getPayments(data) {
        const db = await mongo.db();
        console.log(data._id);
        const res = await db.collection('users').find({_id: ObjectID(data._id)}).project({
            _id: 0,
            payments: 1
        }).toArray();

        console.log(res);
        return res;
    }

    async addPayement(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();

        console.log(userID);
        console.log(data);

        const save = {_id: new ObjectID(), ...data};
        const res = await db.collection('users').updateOne(
            {_id: ObjectID(userID)},
            {$push: {payments: save}}
        );

        console.log(res);
        if (!res || res.modifiedCount === 0) {
            throw new Error("Payment Method could not be saved.");
        }
        return save;
    }

    async updatePayment(data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        console.log(data);

        const res = await db.collection('users').updateOne(
            {_id: ObjectID(userID), "payments._id": ObjectID(data._id)},
            {$set: {"payments.$": {...data}}}
        );
        console.log(res);
        if (!res || !res.modifiedCount) {
            throw new Error("Payment Method could not be updated.");
        }
        return data;
    }

    async deletePayment(id) {
        if (!id) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const res = await db.collection('users').updateOne(
            {_id: ObjectID(userID)},
            {$pull: {payments: {_id: ObjectID(id)}}}
        );

        if (!res || !res.modifiedCount) {
            throw new Error("Payments Method could not be deleted.");
        }

        return true
    }

}

module.exports = UserService;
