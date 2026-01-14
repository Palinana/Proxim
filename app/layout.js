import '@/assets/styles/globals.css';

export const metadata = {
    title: "Proxim - Discover nearby EI staffing opportunities",
    keywords: "EI, EI staffing, find EI staffing"
}

export default function MainLayout({ children }) {
    return (
        <html lang="en">
                <body>
                    {children}
                </body>
        </html>
    )
}
