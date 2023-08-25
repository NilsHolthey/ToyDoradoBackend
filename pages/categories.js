import Layout from '@/components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { withSwal } from 'react-sweetalert2';

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  // const [properties, setProperties] = useState([]);
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
    const data = {
      name,
      parentCategory,
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    fetchCategories();
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }
  // function addProperty() {
  //   setProperties((prev) => {
  //     return [...prev, { name: '', values: '' }];
  //   });
  // }

  // function handlePropertyNameChange(index, property, newName) {
  //   setProperties((prev) => {
  //     const properties = [...prev];
  //     properties[index].name = newName;
  //     return properties;
  //   });
  // }

  // function handlePropertyValuesChange(index, property, newValues) {
  //   setProperties((prev) => {
  //     const properties = [...prev];
  //     properties[index].values = newValues;
  //     return properties;
  //   });
  // }

  // function removeProperty(indexToRemove) {
  //   setProperties((prev) => {
  //     return [...prev].filter((p, pIndex) => {
  //       return pIndex !== indexToRemove;
  //     });
  //   });
  // }

  function deleteCategory(category) {
    swal
      .fire({
        title: 'Bist Du sicher?',
        text: `Kategorie ${category.name} wirklich löschen?`,
        showCancelButton: true,
        cancelButtonText: 'Abbrechen',
        confirmButtonText: 'Löschen',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete('/api/categories?_id=' + _id);
          fetchCategories();
        }
      });
  }

  return (
    <Layout>
      <h1>Kategorien </h1>
      <label>
        {editedCategory
          ? `Kategorie bearbeiten: "${editedCategory.name}"`
          : 'Bezeichnung der Neuen Kategorie'}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={'Bezeichnung'}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          {/* <select
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
          </select> */}
        </div>
        {/* <div className="mb-3">
          <label className="block">Eigenschaften</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Hinzufügen
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={property.index} className="flex gap-1 mb-2">
                <input
                  className="mb-0"
                  type="text"
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="Bezeichnung (z.b.: Hersteller, Illustrator, Verlag...)"
                />
                <input
                  className="mb-0"
                  type="text"
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  value={property.values}
                  placeholder="Wert/Nr/Name"
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red"
                >
                  löschen
                </button>
              </div>
            ))}
        </div> */}

        <button type="submit" className="btn-primary py-1">
          Speichern
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Bezeichnung</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id} className="bg">
                <td>{category.name}</td>
                <td className="gap-2">
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-default float-right ml-2"
                  >
                    Löschen
                  </button>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary  float-right "
                  >
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

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
