import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import AuthSession from './AuthSession'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth].js'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Imae',
  description: 'imae',
  manifest: "/manifest.json",
  themeColor: "#355ef6",
}

export default async function RootLayout({ children }) {

  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover, width=device-width"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
        <script src="https://cdn.ckeditor.com/ckeditor5/11.0.1/classic/ckeditor.js" async></script>
      </head>
        <body className={inter.className}>
          <AuthSession session={session}>{children}</AuthSession>
        </body>
    </html>
  )
}
