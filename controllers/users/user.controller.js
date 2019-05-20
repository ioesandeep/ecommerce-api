const UserService = require('./user.service');

class UserController {
    constructor() {
        this.service = new UserService();
    }

    //CRUD User
    async getUsers(req, res) {
        try {
            const users = await this.service.getUsers();
            res.json({status: 200, users: users || []});
        } catch (e) {
            res.json({...e, status: 400 || e.status});
        }
    }

    async addUser(req, res) {
        try {
            const user = this.service.addUser(req.body);
            res.json({status: 200, user});
        } catch (e) {
            console.log(e);
            res.json({...e, status: 400 || e.status});
        }
    }

    async updateUser(req, res) {
        try {
            const user = this.service.updateUser(req.body);
            res.json({status: 200, user});
        } catch (e) {
            console.log(e);
            res.json({...e, status: 400 || e.status});
        }
    }

    async deleteUser(req, res) {
        try {
            const user = this.service.deleteUser(req.body);
            res.json({status: 200, user});
        } catch (e) {
            console.log(e);
            res.json({...e, status: 400 || e.status});
        }
    }

    //CRUD User Address
    async getAddresses(req, res) {
        try {
            const users = await this.service.getAddresses(req.body);
            res.json({status: 200, users: users || []});
        } catch (e) {
            res.json({...e, status: 400 || e.status});
        }
    }

    async addAddress(req, res) {
        try {
            const users = await this.service.addAddress(req.body);
            res.json({status: 200, users: users || []});
        } catch (e) {
            res.json({...e, status: 400 || e.status});
        }
    }

    async updateAddress(req, res) {
        try {
            const address = this.service.updateAddress(req.body);
            res.json({status: 200, address});
        } catch (e) {
            console.log(e);
            res.json({...e, status: 400 || e.status});
        }
    }

    async deleteAddress(req, res) {
        try {
            const deleted = await this.service.deleteAddress(req.params.id);
            if (!deleted) {
                throw new Error("Address could not be deleted.")
            }
            res.json({status: 200, message: "Address deleted successfully."});
        } catch (e) {
            console.log(e);
            res.json({...e, status: 400 || e.status});
        }
    }

    //CRUD User Payments
    async getPayments(req, res) {
        try {
            const payments = await this.service.getPayments(req.body);
            res.json({status: 200, payments: payments || []});
        } catch (e) {
            res.json({...e, status: 400 || e.status});
        }
    }

    async addPayments(req, res) {
        try {
            const payment = await this.service.addPayement(req.body);
            res.json({status: 200, users: payment || []});
        } catch (e) {
            console.log(e);
            res.json({...e, status: 400 || e.status});
        }
    }

    async updatePayments(req, res) {
        try {
            const payment = await this.service.updatePayments(req.body);
            res.json({status: 200, payment});
        } catch (e) {
            console.log(e);
            res.json({...e, status: 400 || e.status});
        }
    }

    async deletePayments(req, res) {

        try {
            const deleted = await this.service.deletePayment(req.params.id);
            if (!deleted) {
                throw new Error("Payment method could not be deleted.")
            }
            res.json({status: 200, message: "Payment method deleted successfully."});
        } catch (e) {
            console.log(e);
            res.json({...e, status: 400 || e.status});
        }
    }

    async authenticate(req, res) {
        try {
            if (!req.body) {
                throw new Error("Data expected with this request.");
            }

            const data = req.body;
            const user = await this.service.authUser(data.email, data.password);

            delete user.password;
            res.json({status: 200, user: user})
        } catch (e) {
            console.log(e);
            res.json({...e, status: 400 || e.status});
        }
    }

    async getByToken(req, res) {
        try {
            if (!req.body) {
                throw new Error("Data expected with this request.");
            }

            const user = await this.service.getByToken(req.params.token);
            delete user.password;
            res.json({status: 200, user: user})
        } catch (e) {
            res.json({...e, status: 400 || e.status});
        }
    }

}

module.exports = new UserController();
