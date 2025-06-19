import { Request, Response } from 'express';
import Product from '../models/Product';
import type { CreateProduct, Product as ProductType } from '../types/product';

export async function listProducts(_req: Request, res: Response<ProductType[]>): Promise<void> {
    const products = await Product.find();

    res.status(200).json(products);
}

export async function createProduct(
    req: Request<{}, {}, CreateProduct>,
    res: Response<ProductType>
): Promise<void> {
    const { name, description = '', price, imageUrl = '' } = req.body;

    if (price < 0) {
        res.status(400).json({ error: 'Price cannot be negative' } as any);

        return;
    }

    const product = new Product({ name, description, price, imageUrl });

    const saved = await product.save();

    res.status(201).json({
        id: saved._id.toString(),
        name: saved.name,
        description: saved.description,
        price: saved.price,
        imageUrl: saved.imageUrl,
        createdAt: saved.createdAt,
        updatedAt: saved.updatedAt,
    });
}
