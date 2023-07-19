import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className='text-green-900 flex justify-between'>
        <h2>
          Hallo, <b>{session?.user?.name}</b>
        </h2>
        <div className='flex gap-1 bg-slate-200 p-2 rounded-xl '>
          <Image
            src={session?.user?.image}
            height={24}
            width={24}
            alt='avatar'
            className=' w-6 rounded-full'
          />
          <span className='px-2 text-black'>{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
