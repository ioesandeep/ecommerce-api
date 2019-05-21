const CategoryService = require('./products.service');

class ProductsController {
    constructor() {
        this.service = new CategoryService();
    }

    async getAll(req, res) {
        try {
            const products = await this.service.getProducts();
            res.json({status: 200, products: products || []});
        } catch (e) {
            res.json({status: 400 || e.status, message: e.message});
        }
    }

    async getProduct(req, res) {
        try {
            const product = await this.service.getProductBySlug(req.params.slug);
            res.json({status: 200, product: product});
        } catch (e) {
            res.json({status: 400 || e.status, message: e.message});
        }
    }

    async add(req, res) {
        try {
            const product = await this.service.add(req.body);
            res.json({status: 200, product});
        } catch (e) {
            res.json({status: 400 || e.status, message: e.message});
        }
    }

    async update(req, res) {
        try {
            const product = await this.service.update(req.body);
            res.json({status: 200, product});
        } catch (e) {
            res.json({status: 400 || e.status, message: e.message});
        }
    }

    async delete(req, res) {
        try {
            const product = await this.service.delete(req.param.id);
            res.json({status: 200, product});
        } catch (e) {
            res.json({status: 400 || e.status, message: e.message});
        }
    }
}

module.exports = new ProductsController();
