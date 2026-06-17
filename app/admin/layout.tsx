import type { Metadata } from 'next'
import { DM_Serif_Display, Manrope } from 'next/font/google'
import '../globals.css'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { SessionProvider } from 'next-auth/react'

const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = { title: 'Admin — The Plumbing Stars' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`admin-body ${dmSerif.variable} ${manrope.variable}`}>
        <SessionProvider>
          <AdminSidebar />
          <main className="admin-main">{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}
