'use client';
import { RecoilRoot } from 'recoil';
import './globals.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RecoilRoot>
        <head>
          <title>LeetClone</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <link
            rel="icon"
            href="/favicon.png"
          />
          <meta
            name="description"
            content="web application that contains leetcode problems and video solutions"
          />
        </head>

        <body className={inter.className}>
          <ToastContainer />
          {children}
        </body>
      </RecoilRoot>
    </html>
  );
}
