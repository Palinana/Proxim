'use client'; 

import React from 'react';
import '@/assets/styles/globals.css';
import { SessionProvider } from "next-auth/react";

import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Navigation/Footer';

export default function MainLayout({ children }) {
    return (
        <html lang="en">
            <body className="h-screen flex flex-col">
                <SessionProvider>
                    <Navbar />
                    <main className="flex-1 overflow-hidden">
                        {children}
                    </main>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    )
}
