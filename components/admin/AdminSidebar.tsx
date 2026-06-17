'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const navItems = [
  {
    section: 'Overview',
    links: [
      { href: '/admin', label: 'Dashboard', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
    ],
  },
  {
    section: 'Manage',
    links: [
      { href: '/admin/leads', label: 'Leads / CRM', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
      { href: '/admin/faqs', label: 'FAQ Manager', icon: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" /></> },
    ],
  },
  {
    section: 'Site',
    links: [
      { href: '/', label: 'View Public Site', icon: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></> },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <Image src="/logo.svg" alt="" width={44} height={44} />
        <div className="brand">
          <span>Plumbing Stars</span>
          <small>Admin Portal</small>
        </div>
      </div>

      <nav className="admin-nav">
        {navItems.map(group => (
          <div key={group.section}>
            <div className="nav-section">{group.section}</div>
            {group.links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`${pathname === link.href ? 'active' : ''}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {link.icon}
                </svg>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="signout-btn"
        >
          <a>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-16">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Sign Out
          </a>
        </button>
      </div>
    </aside>
  )
}
