import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id=' + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  function goBack() {
    router.push('/products');
  }
  async function deleteProduct() {
    await axios.delete('/api/products?id=' + id);
    goBack();
  }

  return (
    <Layout>
      <h2 className="text-center text-xl mb-2 mt-1">
        möchtest du<b>&nbsp;&quot;{productInfo?.title}&quot;&nbsp;</b>wirklich
        löschen?
      </h2>
      <div className="flex gap-2 justify-center">
        <button onClick={goBack} className="btn-default">
          Abrechen
        </button>
        <button onClick={deleteProduct} className="btn-red">
          Löschen
        </button>
      </div>
    </Layout>
  );
}
