import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { LocalizedStringProvider } from 'react-aria-components/i18n'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LocalizedStringProvider locale="en" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
