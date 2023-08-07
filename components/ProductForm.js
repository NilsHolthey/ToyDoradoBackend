import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Spinner from './Spinner';

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const router = useRouter();

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
    <form onSubmit={saveProduct}>
      <label>Produkt Name</label>
      <input
        type="text"
        placeholder="Neues Produkt"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Bilder</label>
      <div className="mb-4 flex flex-wrap gap-2">
        {!!images?.length &&
          images.map((links, index) => (
            <div key={index} className="h-32 relative  overflow-hidden show">
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
              <img src={links} alt="productImage" className="rounded-lg" />
            </div>
          ))}
        {isUploading && (
          <div className="h-32 w-24 p-1 bg-gray-200 flex items-center justify-center rounded-lg">
            <Spinner />
          </div>
        )}

        <label className="w-32 h-32 bg-gray-200 border-dashed border-2 border-gray-400 text-center flex text-sm justify-center items-center gap-1 cursor-pointer text-gray-600 rounded-lg">
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
