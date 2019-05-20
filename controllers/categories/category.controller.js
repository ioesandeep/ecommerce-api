const CategoryService = require('./category.service');

class CategoryController {
    constructor() {
        this.service = new CategoryService();
    }

    async getAll(req, res) {
        try {
            const categories = await this.service.getCategories();
            res.json({status: 200, categories: categories || []});
        } catch (e) {
            res.json({status: 400 || e.status, message: e.message});
        }
    }

    async add(req, res) {
        try {
            const category = await this.service.add(req.body);
            res.json({status: 200, category});
        } catch (e) {
            res.json({status: 400 || e.status, message: e.message});
        }
    }

    async update(req, res) {
        try {
            const category = await this.service.update(req.body);
            res.json({status: 200, category});
        } catch (e) {
            res.json({status: 400 || e.status, message: e.message});
        }
    }

    async delete(req, res) {
        try {
            const category = await this.service.delete(req.param.id);
            res.json({status: 200, category});
        } catch (e) {
            res.json({status: 400 || e.status, message: e.message});
        }
    }
}

module.exports = new CategoryController();
