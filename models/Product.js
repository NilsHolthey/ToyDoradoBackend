import { model, models, Schema } from 'mongoose';

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: false }],
});

export const Product = models.Product || model('Product', ProductSchema);
