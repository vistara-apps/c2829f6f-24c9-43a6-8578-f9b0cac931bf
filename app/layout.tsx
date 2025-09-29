import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Pictura Facta - Verified Facts Instantly',
  description: 'Point, snap, and discover verified facts about any object instantly with Pictura Facta.',
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
