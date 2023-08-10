import { Product } from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find().populate('createdAt'));
    }
  }

  if (method === 'POST') {
    const { title, description, price, images, category, timestamps } =
      req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      timestamps,
    });
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const { title, description, price, images, category, timestamps, _id } =
      req.body;
    await Product.updateOne(
      { _id },
      { title, description, price, images, category, timestamps }
    );
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
