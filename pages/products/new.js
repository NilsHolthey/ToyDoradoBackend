import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useState } from 'react';

export default function NewProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [goBack, setGoBack] = useState(false);
  const router = useRouter();

  async function createProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
    };
    await axios.post('/api/products', data);
    setGoBack(true);
  }

  if (goBack) {
    router.push('/products');
  }
  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>Neues Produkt</h1>
        <label>Produkt Name</label>
        <input
          type="text"
          placeholder="Neues Produkt"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Produkt Beschreibung</label>
        <textarea
          placeholder="Beschreibung"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Preis (in EUR)</label>
        <input
          type="number"
          placeholder="Preis"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button className="btn-primary">Speichern</button>
      </form>
    </Layout>
  );
}
