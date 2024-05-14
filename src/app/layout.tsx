import {ReduxProvider} from '@/redux/Provider';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

import './globals.scss';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Wysa Assignement',
  description: 'Wysa Assignement for Junior Frontend Developer',
  creator: 'Aishwary Vishwakarma',
  authors: [
    {
      name: 'Aishwary Vishwakarma',
      url: 'https://aishwary.vercel.app/',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
