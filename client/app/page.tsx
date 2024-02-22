import Image from "next/image";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-screen w-screen bg-white-1 bg-center bg-cover flex items-center">

        <div className="h-1/2 w-1/2 flex items-center justify-center">
            <h1 className="text-4xl">The Restaurant Companion</h1>
        </div>
        <div className="h-1/2 w-1/2 px-6 flex items-center justify-center">
            <nav className="flex justify-evenly items-center w-full">
                <Link href='/'>Manage Portal</Link>
                <Link href='/restaurants'>User Portal</Link>
            </nav>
        </div>

      </div>
    </main>
  );
}
export default Home