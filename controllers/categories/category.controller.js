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
            res.json({...e, status: 400 || e.status});
        }
    }

    async add(req, res) {
        try {
            const category = this.service.add(req.body);
            res.json({status: 200, category});
        } catch (e) {
            res.json({...e, status: 400 || e.status});
        }
    }
}

module.exports = new CategoryController();
