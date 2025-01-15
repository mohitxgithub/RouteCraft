import { ThemeProvider } from '@/components/ThemeProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RouteCraft - Customize Your Travel Itinerary',
  description: 'Craft your perfect journey with personalized travel itineraries',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/image/routecraftlogo.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/image/routecraftlogo.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/image/routecraftlogo.png',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

