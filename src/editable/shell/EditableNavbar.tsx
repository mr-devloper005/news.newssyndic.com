'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const publicLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Search', href: '/search' },
  ]
  const authLinks = session
    ? [{ label: 'Create', href: '/create' }]
    : [
        { label: 'Sign In', href: '/login' },
        { label: 'Sign Up', href: '/signup' },
      ]

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--slot4-line)] bg-white/95 text-black backdrop-blur">
      <div className="mx-auto flex min-h-[68px] max-w-[1920px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-8">
        <div className="flex items-center gap-8">
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center border border-black/25 lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-[-0.04em]">
            <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-black">
              <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full scale-125 object-cover" />
            </span>
            {SITE_CONFIG.name}
          </Link>
          <nav className="hidden items-center gap-10 text-sm lg:flex">
            {publicLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[var(--slot4-accent)]">{item.label}</Link>
            ))}
            {!session ? authLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[var(--slot4-accent)]">{item.label}</Link>
            )) : null}
          </nav>
        </div>

        <div className="flex items-center justify-end gap-4">
          {session ? (
            <>
              <span className="hidden max-w-[180px] truncate text-sm font-bold text-black/70 sm:block">{session.name || session.email}</span>
              <Link href="/create" className="hidden text-sm hover:text-[var(--slot4-accent)] sm:block">Create</Link>
              <button type="button" onClick={handleLogout} className="rounded-full border border-black px-5 py-2.5 text-sm font-bold transition hover:bg-black hover:text-white">Logout</button>
            </>
          ) : (
            <Link href="/signup" className="rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(143,34,244,.28)] lg:hidden">
              Sign Up
            </Link>
          )}
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--slot4-line)] bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {[...publicLinks, ...authLinks].map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="rounded-lg bg-[var(--slot4-gray)] px-4 py-3 text-sm font-bold">{item.label}</Link>
            ))}
            {session ? (
              <>
                <div className="rounded-lg bg-[var(--slot4-accent-soft)] px-4 py-3 text-sm font-bold text-[var(--slot4-accent)]">{session.name || session.email}</div>
                <button type="button" onClick={handleLogout} className="rounded-lg bg-black px-4 py-3 text-left text-sm font-bold text-white">Logout</button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
