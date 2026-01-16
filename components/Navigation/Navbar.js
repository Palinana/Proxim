"use client";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger icons
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/images/logo.png';

const Navbar = () => {
    const { data: session } = useSession();
    const role = session?.user?.role || "public";
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
        { label: "Dashboard", href: "/" },
        ...(role === "public" || role === "user" ? [{ label: "Saved", href: "/saved" }] : []),
        ...(role === "admin" ? [{ label: "My Staffing", href: "/admin" }] : []),
        ...(role === "superadmin" ? [
            { label: "All Staffings", href: "/superadmin" },
            { label: "My Staffing", href: "/admin" },
        ] : []),
    ];

    return (
        <header className="bg-surface border-b border border-gray-200 text-text-primary px-6 md:px-8 py-3 flex items-center justify-between h-14 relative">
            {/* Left: Logo */}
            <div className="flex items-center">
                {/* Logo */}
                <Link className='flex flex-shrink-0 items-center' href='/'>
                    <Image className='h-10 w-auto' src={logo} alt='Proxim' />
                    <span className='hidden md:block text-2xl font-bold'>Proxim</span>
                </Link>

                {/* Desktop Links immediately after logo */}
                <nav className="hidden md:flex ml-8 space-x-8">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="text-primary text-primary-hover:hover">
                        {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Right: Auth Buttons & Mobile Hamburger */}
            <div className="flex items-center space-x-2">
                {!session && (
                    <button
                        className="hidden md:inline px-3 py-1 rounded btn-primary"
                        onClick={() => signIn("google")}
                    >
                        Sign In
                    </button>
                )}

                {session && (
                    <button
                        className="hidden md:inline px-3 py-1 rounded border hover:bg-gray-100"
                        onClick={() => signOut()}
                    >
                        Log Out
                    </button>
                )}

                {/* Mobile hamburger */}
                <button
                className="md:hidden p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="absolute top-14 left-0 w-full bg-white border-t md:hidden shadow-lg z-50">
                    <nav className="flex flex-col space-y-2 px-4 py-3">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href} className="hover:text-blue-600">
                                {link.label}
                            </Link>
                        ))}
                        {!session && (
                            <button
                                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => signIn("google")}
                            >
                                Sign In
                            </button>
                        )}
                        {session && (
                            <button
                                className="px-3 py-1 rounded border hover:bg-gray-100"
                                onClick={() => signOut()}
                            >
                                Log Out
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar;
