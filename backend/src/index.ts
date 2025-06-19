import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import { connectDB } from './config/database';
import iaRouter from './routes/ia';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/products', productsRouter);

app.use('/ia', iaRouter);

connectDB();

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));