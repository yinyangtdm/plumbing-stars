import type { Metadata } from 'next'
import { Anton, Barlow, Barlow_Condensed } from 'next/font/google'
import '../globals.css'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { SessionProvider } from 'next-auth/react'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' })
const barlow = Barlow({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-barlow', display: 'swap' })
const barlowCondensed = Barlow_Condensed({ weight: ['500', '600', '700', '800'], subsets: ['latin'], variable: '--font-barlow-condensed', display: 'swap' })

export const metadata: Metadata = { title: 'Admin — The Plumbing Stars' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`admin-body ${anton.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
        <SessionProvider>
          <AdminSidebar />
          <main className="admin-main">{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}
