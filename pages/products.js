import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
  return (
    <Layout>
      <Link className="bg-gray-200 px-2 py-1 rounded-md" href={"/products/new"}>
        Hinzufügen
      </Link>
    </Layout>
  );
}
