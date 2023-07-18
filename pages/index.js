import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className='text-green-900 flex justify-between'>
        <h2>Hallo, {session?.user?.name}</h2>
        <div className='flex gap-1'>
          <img
            src={session?.user?.image}
            alt='avatar'
            className=' w-6 rounded-full'
          />
          <span className='px-2'>{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
