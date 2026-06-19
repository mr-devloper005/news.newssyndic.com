'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const publicLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="border-t border-[var(--slot4-line)] bg-white text-black">
      <div className="mx-auto max-w-[1665px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mb-24 grid min-h-[280px] place-items-center rounded-lg bg-[#141414] px-6 py-14 text-center text-white">
          <h2 className="max-w-3xl text-4xl font-normal leading-tight tracking-[-0.035em]">Give every story a distribution system it can build on</h2>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="rounded-full bg-[var(--slot4-accent)] px-7 py-3 text-sm font-bold text-white">Start for free</Link>
            <Link href="/contact" className="rounded-full border border-white px-7 py-3 text-sm font-bold text-white hover:bg-white hover:text-black">Contact sales</Link>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_.8fr_.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-[-0.04em]">
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-black">
                <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full scale-125 object-cover" />
              </span>
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-black/58">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          </div>
          <div>
            <h3 className="font-bold">Navigation</h3>
            <div className="mt-4 grid gap-3">
              {publicLinks.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm hover:text-[var(--slot4-accent)]">{item.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold">Account</h3>
            <div className="mt-4 grid gap-3">
              {session ? (
                <button onClick={logout} className="w-fit rounded-full border border-black px-5 py-2.5 text-left text-sm font-bold transition hover:bg-black hover:text-white">Logout</button>
              ) : (
                <>
                  <Link href="/login" className="text-sm hover:text-[var(--slot4-accent)]">Sign In</Link>
                  <Link href="/signup" className="text-sm hover:text-[var(--slot4-accent)]">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--slot4-line)] px-5 py-5 text-center text-xs text-black/45">Copyright {year} {SITE_CONFIG.name}. Media distribution and public information.</div>
    </footer>
  )
}
