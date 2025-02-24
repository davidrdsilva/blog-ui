import { createTheme, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

// Global styles
import './globals.css';

// Mantine core styles
import '@mantine/core/styles.css';
import { Header } from '@/shared/components/header';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'BlogUI',
    description: 'A blog UI built with Next.js and Mantine',
};

const theme = createTheme({});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="/file.svg" sizes="any" />
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <MantineProvider theme={theme} defaultColorScheme="dark">
                    <Header />
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
