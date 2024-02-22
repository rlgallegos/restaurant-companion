import Link from "next/link"



const LowerNavBar: React.FC = () => {
    return (
        <nav className="flex h-full w-full">
            <div className="h-full w-1/3 flex items-center justify-center">
                <h1 className="text-4xl">The Restaurant Companion</h1>
            </div>
            <div className="h-full w-1/3 flex flex-col justify-center gap-4 p-24">
                <Link href="/" className="hover:underline hover:underline-offset-4">- Home -</Link>
                <Link href="/manage" className="hover:underline hover:underline-offset-4">- Manager Portal -</Link>
            </div>
            <div className="h-full w-1/3 bg-blue-600"></div>
        </nav>
    )
}
export default LowerNavBar