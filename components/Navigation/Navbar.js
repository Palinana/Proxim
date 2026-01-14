"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/images/logo.png';

const Navbar = () => {
    const { data: session } = useSession();
    const role = session?.user?.role || "public";
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="border-b px-6 md:px-8 h-14 flex items-center bg-background">
            {/* Left: Logo */}
            <div className="flex items-center">

                {/* <!-- Logo --> */}
                <Link className='flex flex-shrink-0 items-center' href='/'>
                    <Image className='h-10 w-auto' src={logo} alt='Proxim' />

                    <span className='hidden md:block text-2xl font-bold ml-2'>
                        Proxim
                    </span>
                </Link>
            </div>

            {/* Center / Links */}
            <nav className="hidden md:flex space-x-4">
                <Link href="/" className="hover:text-blue-600">Dashboard</Link>

                {role === "public" && (
                    <Link href="/saved" className="hover:text-blue-600">Saved</Link>
                )}

                {role === "user" && (
                <>
                    <Link href="/saved" className="hover:text-blue-600">Saved</Link>
                </>
                )}

                {role === "admin" && (
                <>
                    <Link href="/admin" className="hover:text-blue-600">My Staffing</Link>
                </>
                )}

                {role === "superadmin" && (
                <>
                    <Link href="/superuser" className="hover:text-blue-600">All Staffings</Link>
                    <Link href="/admin" className="hover:text-blue-600">My Staffing</Link>
                </>
                )}
            </nav>

            {/* Right: Auth Buttons */}
            <div className="flex items-center space-x-2">
                {!session && (
                    <button
                        onClick={() => signIn("google")}
                        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Sign In
                    </button>
                )}

                {session && (
                    <button
                        onClick={() => signOut()}
                        className="px-3 py-1 rounded border hover:bg-gray-100"
                    >
                        Log Out
                    </button>
                )}
            </div>
        </header>
    )
}

export default Navbar;
