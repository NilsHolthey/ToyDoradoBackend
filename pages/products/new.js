import Layout from "@/components/Layout";
import { useState } from "react";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  function handleSubmit() {}
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
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
