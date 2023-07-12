import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className='bg-blue-800 w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
          <button
            onClick={() => signIn("google")}
            className='bg-white font-bold p-2 rounded-lg'
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className='bg-blue-800 w-screen h-screen flex items-center'>
      <div className='text-center w-full'>
        <div className='mb-2'>logged in {session.user.email}</div>
        <button
          onClick={() => signOut()}
          className='bg-white font-bold p-2 rounded-lg'
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
