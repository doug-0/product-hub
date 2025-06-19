import { Schema, model, Document } from 'mongoose';
import type { Product } from '../types/product';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductSchema = new Schema<Product>(
    {
        name: { type: String, required: true },
        description: { type: String, default: '' },
        price: { type: Number, required: true, min: 0 },
        imageUrl: { type: String, default: '' },
    },
    { timestamps: true }
);

export default model<Product>('Product', ProductSchema);
