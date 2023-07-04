import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next';

import Providers from './providers';

const inter = Inter({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
  title: 'GK-Concept - Cloud Front',
  description: 'GK_Concept Cloud web application to manage the devices and the data associated to it',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
