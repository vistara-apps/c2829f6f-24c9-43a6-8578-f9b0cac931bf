import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Pictura Facta',
  description: 'Point, Snap, Discover: Verified Facts Instantly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="default">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
