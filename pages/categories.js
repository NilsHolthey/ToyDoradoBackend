import Layout from '@/components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Categories() {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    await axios.post('/api/categories', { name, parentCategory });
    setName('');
    fetchCategories();
  }

  return (
    <Layout>
      <h1>Kategorien </h1>
      <label>Bezeichnung der Neuen Kategorie</label>
      <form className="flex gap-1" onSubmit={saveCategory}>
        <input
          type="text"
          placeholder={'Bezeichnung'}
          className="mb-0 "
          onChange={(ev) => setName(ev.target.value)}
          value={name}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
          <option value="">Keine Oberkategorie</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          Speichern
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Bezeichnung</td>
            <td>Oberkategorie</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id} className="bg">
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td className="gap-2">
                  <button className="btn-primary float-right ml-2">
                    Löschen
                  </button>
                  <button className="btn-primary  float-right ">
                    Bearbeiten
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
