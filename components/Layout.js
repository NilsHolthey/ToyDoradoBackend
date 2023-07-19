import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-green-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn('google')}
            className="bg-white font-bold p-2 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-green-900 w-screen min-h-screen flex">
      <Nav />
      <div className="bg-gray-50 flex-grow mt-2 mr-2 mb-2 rounded-lg p-6 ">
        {children}
      </div>
      {/* <button
        onClick={() => signOut()}
        className='bg-white font-bold p-3 rounded-lg'
      >
        Abmelden
      </button> */}
    </div>
  );
}
