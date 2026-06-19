import Link from 'next/link'
import { ArrowRight, CheckCircle2, Database, Globe2, ShieldCheck, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import heroMediaChat from '@/editable/assets/hero-media-chat.avif'
import heroMediaJournalism from '@/editable/assets/hero-media-journalism.avif'
import heroMediaLaptop from '@/editable/assets/hero-media-laptop.jpg'
import heroMediaRelease from '@/editable/assets/hero-media-release.jpg'
import {
  CompactIndexCard,
  EditorialListCard,
  FeaturedSignalCard,
  HorizontalSignalCard,
  ImageFirstCard,
  RailPostCard,
  getEditableExcerpt,
  postHref,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const partners = ['Palo Alto', 'WalkMe', 'Snowflake', 'Google', 'Sisense', 'FullStory', 'Amplitude', 'Spotify', 'Autodesk', 'Miro', 'Zendesk', 'Redis', 'Zoho']
const metrics = [
  ['300M+', 'distribution contacts', 'Reach journalists, publishers, and decision-makers across markets.'],
  ['30M+', 'media profiles', 'Organized company, outlet, and audience context for planning.'],
  ['98%', 'delivery accuracy', 'Cleaner targeting helps releases land with fewer dead ends.'],
  ['1.2B+', 'signals refreshed', 'Fresh context for launches, announcements, and reputation work.'],
]
const integrationRows = [
  ['Direct', 'Media room', 'API', 'Workspace', 'Press kit'],
  ['AI Tools', 'ChatGPT', 'Claude', 'Gemini', 'Perplexity'],
  ['Automations', 'Make', 'Zapier', 'N8N', 'Clay'],
  ['CRMs', 'Salesforce', 'HubSpot', 'Monday', 'Zoho'],
]
const trustItems = [
  { title: 'GDPR', Icon: ShieldCheck, text: 'Privacy-aware handling for public communication workflows.' },
  { title: 'CCPA', Icon: CheckCircle2, text: 'Clear consent and careful contact handling for outreach.' },
  { title: 'ISO', Icon: Globe2, text: 'Structured processes for dependable data operations.' },
  { title: 'SOC 2', Icon: Sparkles, text: 'Controls designed for teams that care about reputation.' },
]

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const heroTitle = 'Launch your story across the media map'
  const description = 'Coordinate press releases, media outreach, and visibility signals from one clean distribution workspace built for modern announcements.'
  const leadHref = lead ? postHref(primaryTask, lead, primaryRoute) : primaryRoute

  return (
    <section className="relative overflow-hidden border-b border-[var(--slot4-line)] bg-white">
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-[var(--slot4-accent-soft)] blur-3xl" />
      <div className="absolute right-10 top-24 h-80 w-80 rounded-full bg-[#d9ebff] blur-3xl" />
      <div className={`${dc.shell.section} relative grid min-h-[780px] items-center gap-10 py-14 lg:grid-cols-[0.72fr_1fr] lg:py-20`}>
        <div className="relative z-10">
          <div className="mb-8 grid max-w-[640px] gap-3 rounded-[2rem] border border-[var(--slot4-line)] bg-white/90 p-3 shadow-[0_24px_70px_rgba(34,20,78,0.09)] backdrop-blur sm:grid-cols-[1.05fr_0.95fr]">
            <Link href={leadHref} className="group relative min-h-[315px] overflow-hidden rounded-[1.45rem] bg-black">
              <img src={heroMediaJournalism.src} alt="Global media distribution dashboard" className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur">Media command</span>
                <h2 className="mt-4 text-2xl font-semibold leading-tight">Coverage, contacts, and channels in motion</h2>
              </div>
            </Link>
            <div className="grid gap-3">
              <div className="relative overflow-hidden rounded-[1.45rem] bg-[var(--slot4-blue)] p-5 text-white">
                <img src={heroMediaChat.src} alt="Social media conversations" className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-multiply" />
                <div className="relative">
                  <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--slot4-accent)]">Social reach</span>
                  <p className="mt-16 text-3xl font-semibold leading-none">42k</p>
                  <p className="mt-2 text-sm text-white/82">audience signals</p>
                </div>
              </div>
              <Link href={leadHref} className="rounded-[1.45rem] bg-[var(--slot4-accent-soft)] p-5 transition hover:-translate-y-1">
                <span className="w-fit rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">Featured brief</span>
                <h2 className="mt-6 line-clamp-2 text-2xl font-normal leading-tight tracking-[-0.035em]">{lead?.title || 'Publish-ready media distribution for your next announcement'}</h2>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/55">{lead ? getEditableExcerpt(lead, 105) : 'Use clean visuals, concise context, and reliable routing to help announcements travel further.'}</p>
              </Link>
            </div>
          </div>

          <p className="text-sm font-semibold text-black/70">{pagesContent.home.hero.badge}</p>
          <h1 className="mt-7 max-w-3xl text-5xl font-normal leading-[1.03] tracking-[-0.05em] sm:text-6xl lg:text-[5.6rem]">{heroTitle}</h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-black/72">{description}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/search" className={dc.button.accent}>Start distributing</Link>
            <Link href="/contact" className={dc.button.secondary}>Contact sales</Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[820px]">
          <div className="absolute -right-8 top-20 h-[420px] w-[180px] rounded-[2rem] bg-[var(--slot4-pink)]" />
          <div className="absolute -left-6 bottom-16 h-[300px] w-[300px] rounded-[2rem] bg-[var(--slot4-blue)]" />
          <div className="hero-orbit relative z-10 grid min-h-[650px] grid-cols-6 grid-rows-6 overflow-hidden rounded-[2rem] border border-[#a16bf4]/70 bg-[#e8d8ff] shadow-[0_26px_90px_rgba(40,18,82,0.14)]">
            <div className="relative col-span-2 row-span-2 overflow-hidden border-b border-r border-[#a16bf4] bg-[#bd7df5] p-5 text-white">
              <img src={heroMediaRelease.src} alt="Press release handoff" className="absolute inset-0 h-full w-full object-cover opacity-38" />
              <div className="absolute inset-0 bg-[#7d26bf]/55" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.18em]">Release source</p>
                <p className="mt-20 text-2xl font-semibold">Verified</p>
                <p className="mt-3 text-sm text-white/75">ready for pickup</p>
              </div>
            </div>
            <div className="col-span-4 row-span-1 border-b border-[#a16bf4] bg-[#eadcff]/70 p-5">
              <div className="ml-auto flex w-fit items-center gap-3 rounded-full bg-white/45 px-4 py-3 text-lg backdrop-blur">+1 (555) 123-4567 <span className="rounded-full bg-black px-4 py-2 text-sm text-white">Call</span></div>
            </div>
            <div className="relative col-span-2 row-span-2 overflow-hidden border-b border-r border-[#a16bf4] bg-[#dbc6ff]">
              <img src={heroMediaChat.src} alt="Digital audience conversations" className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-multiply" />
              <div className="absolute left-6 top-6 grid h-16 w-16 place-items-center bg-white text-lg font-bold text-[#3568f4]">AI</div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/70 p-4 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">Pitch fit</p>
                <p className="mt-2 text-2xl font-semibold">94%</p>
              </div>
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden border-b border-r border-[#a16bf4] bg-[#d9ebff]">
              <img src={heroMediaLaptop.src} alt="People reviewing media coverage on laptop" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[#d9ebff]/20" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/78 p-4 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/45">Coverage view</p>
                <p className="mt-2 text-xl font-semibold">Audience-ready</p>
              </div>
            </div>
            <div className="col-span-2 row-span-2 border-b border-[#a16bf4] bg-[#eadcff] p-6">
              <div className="grid h-full place-items-center rounded-3xl bg-white/58 text-center">
                <p className="text-5xl font-semibold text-[#4285f4]">G</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-black/50">Search lift</p>
              </div>
            </div>
            <div className="relative col-span-2 row-span-2 overflow-hidden border-r border-[#a16bf4] bg-[#91baf4] p-6">
              <img src={heroMediaJournalism.src} alt="Newsroom content distribution" className="absolute inset-0 h-full w-full object-cover opacity-52 mix-blend-luminosity" />
              <div className="relative grid h-16 w-16 grid-cols-2 gap-1 bg-white p-3 shadow-lg">
                <span className="bg-[#f25022]" /><span className="bg-[#7fba00]" /><span className="bg-[#00a4ef]" /><span className="bg-[#ffb900]" />
              </div>
              <div className="relative mt-20 rounded-2xl bg-white/75 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Publisher network synced</p>
                <p className="mt-2 text-xs text-black/55">wire, social, search, and media outlets</p>
              </div>
            </div>
            <div className="col-span-2 row-span-1 border-r border-[#a16bf4] bg-[#eadcff] p-5">
              <div className="inline-flex items-center rounded-full bg-white text-base"><span className="rounded-full bg-black px-3 py-2 text-white">Mail</span><span className="px-4">press@brand.co</span></div>
            </div>
            <div className="col-span-2 row-span-1 bg-[#b258f2] p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em]">Outlet match</p>
              <p className="mt-2 text-2xl font-semibold">Live</p>
            </div>
          </div>
          <div className="absolute -bottom-8 left-10 right-10 z-20 grid gap-3 rounded-3xl border border-[var(--slot4-line)] bg-white/88 p-4 shadow-[0_20px_60px_rgba(23,13,45,0.12)] backdrop-blur sm:grid-cols-3">
            {[
              ['Press release', 'drafted'],
              ['Media targets', 'matched'],
              ['Visibility', 'tracking'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-[var(--slot4-gray)] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/45">{label}</p>
                <p className="mt-2 text-lg font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {lead ? <div className="sr-only">{lead.title} {getEditableExcerpt(lead, 120)}</div> : null}
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 10)
  return (
    <section className="border-b border-[var(--slot4-line)] bg-white py-14">
      <div className={dc.shell.section}>
        <p className="text-xl font-normal">Trusted by media teams, founders, agencies, and visibility-focused brands</p>
        <div className="logo-marquee mt-12 overflow-hidden">
          <div className="logo-track flex w-max items-center gap-20">
            {[...partners, ...partners].map((partner, index) => (
              <span key={`${partner}-${index}`} className="text-2xl font-bold text-black/85">{partner}</span>
            ))}
          </div>
        </div>
        {railPosts.length ? (
          <div className="mt-16 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <FeaturedSignalCard post={railPosts[0]} href={postHref(primaryTask, railPosts[0], primaryRoute)} />
            <div className="grid gap-4 sm:grid-cols-2">
              {railPosts.slice(1, 5).map((post, index) => <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[5] || posts[0]
  const side = posts.slice(6, 10)

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1520px] border-x border-[var(--slot4-line)]">
        <div className="grid min-h-[300px] place-items-center border-b border-[var(--slot4-line)] px-5 text-center">
          <div>
            <h2 className="text-4xl font-normal tracking-[-0.035em] sm:text-5xl">Two media layers. Built to work together.</h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-black/75">Distribution planning and audience context come together so every release has a clearer path to attention.</p>
            <Link href={primaryRoute} className="mt-6 inline-flex items-center gap-2 font-bold text-[var(--slot4-accent)]">Explore media catalog <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>

        <div className="border-b border-[var(--slot4-line)] bg-[#f7f7f8] px-8 py-7">
          <h2 className="text-2xl font-bold">{taskLabel(primaryTask)}</h2>
        </div>
        <div className="grid border-b border-[var(--slot4-line)] lg:grid-cols-[1fr_1fr]">
          <div className="p-8 sm:p-12">
            <p className="text-sm uppercase">Fast, accurate, on-demand</p>
            <h3 className="mt-7 max-w-2xl text-3xl font-normal leading-tight tracking-[-0.035em]">Find the right media contacts, channels, and content angles when you need to distribute a story.</h3>
            <Link href={primaryRoute} className="mt-10 inline-flex items-center gap-2 font-bold text-[var(--slot4-accent)]">Start for free <ArrowRight className="h-4 w-4" /></Link>
            <div className="mt-24 grid gap-4 text-sm sm:grid-cols-2">
              {['Press release distribution', 'Brand visibility', 'Media outreach', 'Reputation updates', 'Coverage planning', 'Audience discovery'].map((item) => <p key={item} className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-black" />{item}</p>)}
            </div>
          </div>
          <div className="bg-[var(--slot4-blue)] p-8 sm:p-12">
            <div className="hero-panel-float min-h-[520px] rounded-lg bg-white p-7 shadow-[0_24px_60px_rgba(34,75,140,0.12)]">
              <div className="flex gap-3 border-b border-[var(--slot4-line)] pb-4 text-sm font-bold">
                <span className="rounded bg-[#efebff] px-4 py-2">Chat</span>
                <span className="rounded bg-[#efebff] px-4 py-2">Filter /4</span>
              </div>
              <div className="grid gap-8 pt-8 lg:grid-cols-[1fr_0.8fr]">
                <div>
                  <div className="ml-auto max-w-[260px] rounded bg-[#efebff] p-5 text-sm font-semibold">VP communications in Boston at companies launching new products</div>
                  <p className="mt-10 text-sm leading-7 text-black/70">I found matching outlets and contacts based on your release goals, audience, geography, and company stage.</p>
                </div>
                <div className="space-y-4">
                  {['Industry', 'HQ location', 'Audience size', 'Department', 'Revenue'].map((filter) => <div key={filter} className="border-b border-[var(--slot4-line)] py-3 text-sm font-bold">{filter}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid border-b border-[var(--slot4-line)] sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([value, label, text]) => (
            <div key={label} className="border-b border-r border-[var(--slot4-line)] p-8 last:border-r-0 lg:border-b-0">
              <Database className="h-7 w-7" />
              <p className="mt-7 text-lg font-bold">{value} {label}</p>
              <p className="mt-4 leading-7 text-black/56">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid border-b border-[var(--slot4-line)] lg:grid-cols-[1fr_1fr]">
          <div className="p-8 sm:p-12">
            <p className="text-sm uppercase">Context shaped by your campaign</p>
            <h3 className="mt-7 max-w-2xl text-3xl font-normal leading-tight tracking-[-0.035em]">Use verified data, media signals, and your own launch context to prioritize the right channels.</h3>
            <Link href={primaryRoute} className="mt-10 inline-flex items-center gap-2 font-bold text-[var(--slot4-accent)]">Start for free <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="bg-[#d7b8ff] p-8 sm:p-12">
            <div className="min-h-[460px] rounded bg-white p-7 shadow-lg">
              <p className="font-bold">Company recommendations</p>
              <div className="mt-8 space-y-4">
                {['Funding round', 'Product launch', 'Headcount growth', 'Company news', 'Audience fit'].map((signal, index) => (
                  <div key={signal} className="grid grid-cols-[1fr_64px] items-center border-b border-[var(--slot4-line)] pb-4">
                    <span>{signal}</span><span className="rounded-full bg-[#ccffe3] px-3 py-2 text-center font-bold text-[#009a55]">{(9.8 - index * 0.1).toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {feature ? (
          <div className="grid gap-5 p-8 sm:p-12 lg:grid-cols-[1fr_1fr]">
            <HorizontalSignalCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} index={0} />
            <div className="grid gap-5">
              {side.map((post, index) => <EditorialListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index + 1} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = collected.length ? collected : posts
  const cards = source.slice(0, 8)

  return (
    <section className="overflow-hidden bg-white py-20">
      <div className={`${dc.shell.section} grid gap-10 lg:grid-cols-[0.45fr_1fr]`}>
        <div>
          <p className="text-sm font-bold uppercase">{SITE_CONFIG.name} plays</p>
          <h2 className="mt-8 text-4xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">Pre-built media workflows powered by data, signals, and visibility context</h2>
        </div>
        <div className="card-marquee overflow-hidden">
          <div className="card-track grid w-max grid-flow-col auto-cols-[minmax(300px,520px)] gap-6">
            {[...cards, ...cards].map((post, index) => (
              <ImageFirstCard key={`${post.id || post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className={`${dc.shell.section} mt-20`}>
        <div className="grid gap-8 border-t border-[var(--slot4-line)] pt-20 lg:grid-cols-[0.52fr_1fr]">
          <div>
            <h2 className="text-4xl font-normal tracking-[-0.04em]">The data layer under every media workflow</h2>
            <p className="mt-7 max-w-xl leading-7 text-black/70">Connect verified distribution data, campaign context, automation platforms, CRMs, and content workflows without changing how posts are managed.</p>
            <Link href="/search" className="mt-6 inline-flex items-center gap-2 font-bold text-[var(--slot4-accent)]">Explore all integrations <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid border-l border-t border-[var(--slot4-line)] sm:grid-cols-2 xl:grid-cols-4">
            {integrationRows.map(([heading, ...items]) => (
              <div key={heading} className="border-b border-r border-[var(--slot4-line)]">
                <h3 className="p-5 font-bold">{heading}</h3>
                {items.map((item) => <p key={item} className="flex items-center gap-4 border-t border-[var(--slot4-line)] p-5"><span className="grid h-8 w-8 place-items-center bg-[var(--slot4-accent)] text-white">{item[0]}</span>{item}</p>)}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-4xl font-normal tracking-[-0.04em]">Built-in trust and compliance</h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map(({ title, Icon, text }) => {
              const TrustIcon = Icon
              return (
                <div key={title}>
                  <div className="grid h-20 w-20 place-items-center rounded-full border border-black bg-[#f3e4ff]"><TrustIcon className="h-9 w-9" /></div>
                  <h3 className="mt-12 font-bold">{title}</h3>
                  <p className="mt-6 leading-7 text-black/55">{text}</p>
                </div>
              )
            })}
          </div>
        </div>

        {source.length ? (
          <div className="mt-24 grid gap-10 border-t border-[var(--slot4-line)] pt-20 lg:grid-cols-[0.38fr_1fr]">
            <div>
              <p className="text-sm font-bold uppercase">Briefing list</p>
              <h2 className="mt-8 text-4xl font-normal tracking-[-0.04em]">Latest release notes</h2>
            </div>
            <div>
              {source.slice(0, 6).map((post, index) => <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white px-5 py-28">
      <div className="mx-auto grid min-h-[280px] max-w-[1665px] place-items-center rounded-lg bg-[#141414] px-6 py-16 text-center text-white">
        <h2 className="max-w-3xl text-4xl font-normal leading-tight tracking-[-0.035em] sm:text-5xl">Give every launch, announcement, and campaign media reach it can build on</h2>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/signup" className={dc.button.accent}>Start for free</Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white px-7 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black">Contact sales</Link>
        </div>
      </div>
    </section>
  )
}
