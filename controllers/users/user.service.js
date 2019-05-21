const mongo = require('../../db');
const {ObjectID} = require("mongodb");
const token = require('jsonwebtoken');

class UserService {
    async getUsers() {
        const db = await mongo.db();
        return db.collection('users').find().toArray();
    }


    async getUser(id) {
        const db = await mongo.db();
        return db.collection('users').findOne({_id: ObjectID(id)});
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

    async updateUser(uid, data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const res = await db.collection('users').updateOne({_id: ObjectID(uid)}, {
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

    async changePassword(uid, data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const res = await db.collection('users').updateOne({_id: ObjectID(uid)}, {
            $set: {
                password: data.newPassword
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

    async getAddresses(uid) {
        const db = await mongo.db();


        const res = await db.collection('users').findOne({_id: ObjectID(uid)}, {projection: {_id: 0, addresses: 1}});

        console.log(res);
        return res.addresses;
    }

    async addAddress(uid, data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const save = {_id: new ObjectID(), ...data};
        const res = await db.collection('users').updateOne(
            {_id: ObjectID(uid)},
            {$push: {addresses: save}}
        );

        console.log(res);
        if (!res || res.modifiedCount === 0) {
            throw new Error("Address could not be saved.");
        }
        return save;
    }

    async updateAddress(uid, data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();

        const id = data._id;
        delete data._id;

        const res = await db.collection('users').updateOne(
            {_id: ObjectID(uid), "addresses._id": ObjectID(id)},
            {$set: {"addresses.$": {...data, _id: ObjectID(id)}}}
        );

        if (!res || !res.modifiedCount) {
            throw new Error("Address could not be updated.");
        }
        return data;
    }

    async deleteAddress(uid, id) {
        if (!id) {
            throw new Error("Data required with this request.");
        }

        const db = await mongo.db();
        const res = await db.collection('users').updateOne(
            {_id: ObjectID(uid)},
            {$pull: {addresses: {_id: ObjectID(id)}}}
        );

        if (!res || !res.modifiedCount) {
            throw new Error("Address could not be deleted.");
        }

        return true;
    }


    async getPayments(uid) {
        const db = await mongo.db();
        const res = await db.collection('users').findOne({_id: ObjectID(uid)}, {projection: {_id: 0, payments: 1}});

        console.log(res);
        return res.payments || [];
    }

    async addPayement(uid, data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const save = {_id: new ObjectID(), ...data};
        const res = await db.collection('users').updateOne(
            {_id: ObjectID(uid)},
            {$push: {payments: save}}
        );

        if (!res || res.modifiedCount === 0) {
            throw new Error("Payment Method could not be saved.");
        }
        return save;
    }

    async updatePayment(uid, data) {
        if (!data) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const res = await db.collection('users').updateOne(
            {_id: ObjectID(uid), "payments._id": ObjectID(data._id)},
            {$set: {"payments.$": {...data}}}
        );
        console.log(res);
        if (!res || !res.modifiedCount) {
            throw new Error("Payment Method could not be updated.");
        }
        return data;
    }

    async deletePayment(uid, id) {
        if (!id) {
            throw new Error("Data required with this request.");
        }
        const db = await mongo.db();
        const res = await db.collection('users').updateOne(
            {_id: ObjectID(uid)},
            {$pull: {payments: {_id: ObjectID(id)}}}
        );

        if (!res || !res.modifiedCount) {
            throw new Error("Payments Method could not be deleted.");
        }
        return true
    }

    async authUser(email, password) {
        const db = await mongo.db();
        const user = await db.collection('users').findOne({email: email, password: password});
        if (!user) {
            throw new Error("User not found.");
        }

        const signed = token.sign({_id: user._id, name: user.name, email: user.email}, 'mwa2019');
        db.collection('users').updateOne({_id: user._id}, {$set: {token: signed}});

        user.token = signed;
        return user;
    }

    async getByToken(token) {
        const db = await mongo.db();
        const user = await db.collection('users').findOne({token: token});
        if (!user) {
            throw new Error("User not found.");
        }

        return user;
    }

}

module.exports = UserService;
