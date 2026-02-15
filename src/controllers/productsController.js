import { Product } from '../models/product.js';
import createHttpError from 'http-errors';

export const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
};

export const getProductById = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
        throw createHttpError(404, 'Product not found');
}
    res.status(200).json(product);
};

export const createProduct = async (req, res) => {
    const { name, price, category, description } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({
            message: 'Name, price and category are required'
        });
    }

    const product = await Product.create({ name, price, category, description });
    res.status(201).json(product);
};


