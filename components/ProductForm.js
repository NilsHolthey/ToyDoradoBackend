import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [goBack, setGoBack] = useState(false);
  const router = useRouter();
  console.log({ _id });

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
    };
    if (_id) {
      await axios.put('/api/products/', { ...data, _id });
    } else {
      await axios.post('/api/products', data);
    }
    setGoBack(true);
  }

  if (goBack) {
    router.push('/products');
  }
  return (
    <form onSubmit={saveProduct}>
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
  );
}
