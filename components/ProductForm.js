import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  condition: assignedCondition,
  properties: existingProperties,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [category, setCategory] = useState(assignedCategory || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [categories, setCategories] = useState([]);
  const [condition, setCondition] = useState(assignedCondition || '');
  const [properties, setProperties] = useState(existingProperties || []);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
    });
  }, []);

  const handleDelete = (deletingLink) => {
    const newImages = images.filter((link) => link !== deletingLink);
    setImages(newImages);
  };

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      condition,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values,
      })),
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

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={saveProduct} className="max-w-screen-lg">
      <label>Produkt Name</label>
      <input
        type="text"
        placeholder="Neues Produkt"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Kategorie</label>

      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">ohne Kategorie</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option value={c._id} key={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      <label>Zustand</label>
      <select
        value={condition}
        onChange={(ev) => setCondition(ev.target.value)}
      >
        <option value="keine Angaben">keine Angaben</option>
        <option value="wie neu">wie neu</option>
        <option value="gut">gut</option>
        <option value="akzeptabel">akzeptabel</option>
        <option value="gebraucht">gebraucht</option>
      </select>
      <div className="mb-3">
        <label className="block">Eigenschaften</label>
        <button
          onClick={addProperty}
          type="button"
          className="btn-default text-sm mb-2 flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
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
                className="btn-red flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                Löschen
              </button>
            </div>
          ))}
      </div>
      <label>Bilder</label>
      <div className="mb-4 flex flex-wrap gap-2 mt-2">
        {!!images?.length &&
          images.map((links, index) => (
            <div
              key={index}
              className="h-32 relative  bg-white overflow-hidden show p-4 rounded-md shadow-md border border-gray-200"
            >
              <button
                type="button"
                onClick={() => handleDelete(links)}
                className=" bg-slate-600 transition-all duration-300 ease-in-out absolute right-0 text-white bg-opacity-75 rounded-tr-lg top"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.75}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img src={links} alt="productImage" className="rounded-sm" />
            </div>
          ))}
        {isUploading && (
          <div className="h-32 w-24 p-1 bg-gray-200 flex items-center justify-center rounded-lg">
            <Spinner />
          </div>
        )}

        <label className="w-32 h-32 bg-gray-200 border-dashed border-2 border-gray-400 text-center flex text-sm justify-center items-center gap-1 cursor-pointer text-gray-600 rounded-md mt-0 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Hochladen</div>
          <input type="file" className="hidden" onChange={uploadImages}></input>
        </label>
      </div>
      <label>Produkt Beschreibung</label>
      <textarea
        placeholder="Beschreibung"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
        className=""
      />
      <label>Preis (in EUR)</label>
      <input
        type="number"
        placeholder="Preis"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button className="btn-primary flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          strokeWidth={1.5}
          stroke="white"
          fill="white"
          className="w-4 h-4"
        >
          <path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z" />
        </svg>
        Speichern
      </button>
    </form>
  );
}
