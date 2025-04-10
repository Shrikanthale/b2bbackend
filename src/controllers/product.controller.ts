import { Request, Response } from 'express';
import Product from '../models/mongo/Product.model';

export const addProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: 'Add product failed', details: err });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query: any = {};

    if (search) {
        query.name = { $regex: search as string, $options: 'i' };
    }

    if (category) {
        query.category = category;
    }

    try {
        const products = await Product.find(query)
            .skip((+page - 1) * +limit)
            .limit(+limit);

        const total = await Product.countDocuments(query);

        res.status(200).json({ data: products, total });
    } catch (err) {
        res.status(500).json({ error: 'Fetch failed', details: err });
    }
};
