/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import axios from 'axios';
import { format, formatISO9075, formatRFC7231 } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Products() {
  // const [postInfo, setPostInfo] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  // const map = products.map((product) => product.createdAt);

  return (
    <Layout>
      <Link
        className="bg-gray-200 px-3 py-2 rounded-md float-right mb-2 flex gap-1 items-center font-semibold"
        href={'/products/new'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Hinzufügen
      </Link>
      <table className="basic mt-3">
        <thead>
          <tr>
            <td></td>
            <td>Produktname</td>

            <td>Hinzugefügt am</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="bg">
              <td className="flex justify-center ">
                {product.images.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <div className="rounded-full ml-3 w-10 h-10  flex justify-center items-center overflow-hidden ">
                    <img
                      src={product.images[0]}
                      alt="prev img"
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-300 flex justify-center items-center ml-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                )}
              </td>
              <td className="">
                <div className="ellipses h-6">{product.title}</div>
              </td>

              <td>{formatISO9075(new Date(product.createdAt))}</td>

              <td>
                <Link href={'/products/edit/' + product._id}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Bearbeiten
                </Link>
                <Link href={'/products/delete/' + product._id}>
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Löschen
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className=" flex flex-col">
        {products.map((product) => (
          <p
            key={product._id}
            className="w-64 p-2 text-sm border whitespace-pre-wrap"
          >
            {product.description}
          </p>
        ))}
      </div> */}
    </Layout>
  );
}
