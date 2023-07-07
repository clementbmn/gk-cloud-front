import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next';

import Providers from './providers';
import { ReactNode } from 'react';

const inter = Inter({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
  title: 'GKConcept - Cloud Front',
  description: 'GKConcept Cloud web application to manage the devices and the data associated to it',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
