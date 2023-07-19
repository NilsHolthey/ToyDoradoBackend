import clientPromise from '@/lib/mongodb';
import { Product } from '@/models/Product';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { method } = req;
  mongoose.Promise = clientPromise;
  if (method === 'Post') {
    const { title, description, price } = req.body;
    const productDoc = await Product.create({ title, description, price });

    res, json(productDoc);
  }
}
