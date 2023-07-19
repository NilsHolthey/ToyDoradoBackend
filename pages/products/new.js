import Layout from "@/components/Layout";

export default function NewProduct() {
  return (
    <Layout>
      <h1>Neues Produkt</h1>
      <label>Produkt Name</label>
      <input placeholder="Neues Produkt"></input>
      <label>Produkt Beschreibung</label>
      <textarea placeholder="Beschreibung"></textarea>
      <label>Preis (in EUR)</label>
      <input type="number" placeholder="Preis"></input>
    </Layout>
  );
}
