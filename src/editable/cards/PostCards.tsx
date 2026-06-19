import Link from 'next/link'
import { ArrowRight, Clock3, RadioTower } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((value): value is string => typeof value === 'string' && Boolean(value))
  const directImage = ['featuredImage', 'image', 'thumbnail', 'coverImage', 'logo']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || directImage || contentImage || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.body === 'string' && content.body) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Media'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function FeaturedSignalCard({ post, href, label = 'Featured release' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group grid min-h-[520px] overflow-hidden rounded-xl border border-[var(--slot4-line)] bg-[#141414] text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.16)] lg:grid-cols-[0.86fr_1fr]">
      <div className="relative min-h-[280px] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title || ''} className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="flex flex-col justify-between p-7 sm:p-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-4 py-2 text-xs font-bold"><RadioTower className="h-4 w-4" /> {label}</span>
          <h3 className="mt-8 max-w-xl text-4xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">{post.title}</h3>
          <p className="mt-6 max-w-lg text-base leading-8 text-white/70">{getEditableExcerpt(post, 210) || 'A fresh media update prepared for broader discovery and distribution.'}</p>
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white">View update <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const tone = index % 3 === 0 ? 'bg-[#eadcff]' : index % 3 === 1 ? 'bg-[#f3f3f4]' : 'bg-[#d9ebff]'
  return (
    <Link href={href} className={`group min-w-0 rounded-xl border border-[var(--slot4-line)] ${tone} p-5 ${dc.motion.lift}`}>
      <div className="relative aspect-[16/11] overflow-hidden rounded-lg bg-white">
        <img src={getEditablePostImage(post)} alt={post.title || ''} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.12em] text-black/55">
        <span>{getEditableCategory(post)}</span>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="mt-4 line-clamp-3 text-2xl font-normal leading-tight tracking-[-0.035em]">{post.title}</h3>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 grid-cols-[54px_1fr] gap-5 border-t border-[var(--slot4-line)] py-6 first:border-t-0">
      <span className="text-3xl font-normal leading-none text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-black/45"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-xl font-normal leading-tight tracking-[-0.03em] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/55">{getEditableExcerpt(post, 120)}</p>
      </div>
    </Link>
  )
}

export function HorizontalSignalCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded-xl border border-[var(--slot4-line)] bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,0,0,0.1)] sm:grid-cols-[0.82fr_1fr]">
      <div className="relative min-h-[270px] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title || ''} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-7">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">Workflow {String(index + 1).padStart(2, '0')}</p>
        <h3 className="mt-5 text-3xl font-normal leading-tight tracking-[-0.035em]">{post.title}</h3>
        <p className="mt-5 line-clamp-3 text-sm leading-7 text-black/58">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold">Open detail <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export function EditorialListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-5 border-t border-[var(--slot4-line)] bg-white py-5 first:border-t-0 sm:grid-cols-[120px_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--slot4-gray)]">
        <img src={getEditablePostImage(post)} alt={post.title || ''} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/42">{String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}</p>
        <h3 className="mt-3 line-clamp-2 text-2xl font-normal leading-tight tracking-[-0.035em] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/55">{getEditableExcerpt(post, 130)}</p>
      </div>
    </Link>
  )
}

export function ImageFirstCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const accents = ['#141414', '#8f22f4', '#4d8df7', '#f45bd1']
  return (
    <Link href={href} className="group block rounded-lg border border-[var(--slot4-line)] bg-white p-5">
      <div className="relative aspect-[16/8] overflow-hidden rounded-md" style={{ background: accents[index % accents.length] }}>
        <img src={getEditablePostImage(post)} alt={post.title || ''} className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity transition duration-700 group-hover:scale-105 group-hover:opacity-85" />
        <div className="absolute left-5 top-5 flex gap-2">
          <span className="h-8 w-8 rounded bg-white/16" />
          <span className="h-8 w-8 rounded bg-white/16" />
          <span className="h-8 w-8 rounded bg-white/16" />
        </div>
        <h3 className="absolute bottom-5 left-5 right-5 text-3xl font-normal leading-tight tracking-[-0.035em] text-white">{post.title}</h3>
      </div>
      <div className="mt-6">
        <span className="rounded bg-[var(--slot4-lime)] px-4 py-3 text-xs font-bold uppercase text-black/55">{getEditableCategory(post)}</span>
        <p className="mt-7 line-clamp-2 text-sm leading-7 text-black/65">{getEditableExcerpt(post, 140)}</p>
        <p className="mt-7 text-sm font-bold text-[var(--slot4-accent)]">View play <ArrowRight className="ml-1 inline h-4 w-4" /></p>
      </div>
    </Link>
  )
}

export function EditorialFeatureCard({ post, href, label = 'Cover story' }: { post: SitePost; href: string; label?: string }) {
  return <FeaturedSignalCard post={post} href={href} label={label} />
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return <HorizontalSignalCard post={post} href={href} index={index} />
}
