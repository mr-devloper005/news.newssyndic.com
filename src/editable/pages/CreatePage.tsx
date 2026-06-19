'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import heroMediaJournalism from '@/editable/assets/hero-media-journalism.avif'
import heroMediaLaptop from '@/editable/assets/hero-media-laptop.jpg'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'rounded-2xl border border-[var(--slot4-line)] bg-white px-4 py-3 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:border-[var(--slot4-accent)] focus:ring-4 focus:ring-[var(--slot4-accent-soft)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-white px-4 py-16 text-black sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-[var(--slot4-line)] bg-white shadow-[0_30px_90px_rgba(34,20,78,0.09)] md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-80 overflow-hidden bg-[var(--slot4-accent-soft)] p-8 text-white md:p-10">
              <img src={heroMediaJournalism.src} alt="Media distribution workspace preview" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/25 to-transparent" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                  <Lock className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Creator access</p>
                  <h2 className="mt-4 max-w-sm text-4xl font-normal leading-tight tracking-[-0.04em]">Sign in to open the media workspace.</h2>
                </div>
              </div>
            </div>
            <div className="self-center p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-5xl font-normal leading-[1.02] tracking-[-0.055em] sm:text-6xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-black/65">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white">Sign In <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-black bg-white px-6 py-3 text-sm font-bold">Sign Up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen overflow-hidden bg-white text-black">
        <section className="relative border-b border-[var(--slot4-line)]">
          <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-[var(--slot4-accent-soft)] blur-3xl" />
          <div className="absolute right-16 top-20 h-80 w-80 rounded-full bg-[#d9ebff] blur-3xl" />
          <div className="relative mx-auto grid max-w-[1680px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.72fr_1fr] lg:px-12 lg:py-16">
            <aside className="rounded-[2rem] border border-[var(--slot4-line)] bg-white/88 p-6 shadow-[0_24px_70px_rgba(34,20,78,0.08)] backdrop-blur lg:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
              <h1 className="mt-5 text-5xl font-normal leading-[1.02] tracking-[-0.055em] sm:text-6xl">Create a media-ready release.</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-black/65">Choose a content lane, add distribution details, and shape a clean post for announcements, coverage, and public updates.</p>
              <div className="mt-8 rounded-[1.5rem] bg-[var(--slot4-accent-soft)] p-4">
                <div className="relative min-h-44 overflow-hidden rounded-[1.1rem] bg-black">
                  <img src={heroMediaLaptop.src} alt="People reviewing media content" className="absolute inset-0 h-full w-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 text-lg font-semibold leading-tight text-white">Draft, package, and route your next story.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${active ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent)] text-white shadow-[0_16px_40px_rgba(143,34,244,0.18)]' : 'border-[var(--slot4-line)] bg-white hover:border-[var(--slot4-accent)]'}`}>
                      <Icon className="h-5 w-5" />
                      <span className="mt-3 block text-sm font-bold">{item.label}</span>
                      <span className="mt-1 block text-xs font-semibold opacity-65">{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-[2rem] border border-[var(--slot4-line)] bg-white p-5 shadow-[0_24px_70px_rgba(34,20,78,0.08)] sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-2 text-4xl font-normal tracking-[-0.04em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full bg-[var(--slot4-accent-soft)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-bold"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-black">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
