import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { CalendarDays, Clock, MapPin, Share2, Heart, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Countdown } from '@/components/invite/Countdown'
import { Gallery } from '@/components/invite/Gallery'
import { RsvpForm } from '@/components/invite/RsvpForm'
import { img, invitation as inv } from '@/lib/invitation'

export const Route = createFileRoute('/')({
  component: Invitation,
})

const PETAL_COLORS = ['#f29a1d', '#f8c33a', '#e2566b', '#f6b7c1', '#d9ad55']
const BALLOONS = [
  { left: '6%', color: '#f6b7c1', delay: '0s', dur: '16s' },
  { left: '18%', color: '#e9c979', delay: '4s', dur: '19s' },
  { left: '82%', color: '#f6d9d7', delay: '1s', dur: '17s' },
  { left: '92%', color: '#e2566b', delay: '7s', dur: '21s' },
  { left: '70%', color: '#f8c33a', delay: '10s', dur: '18s' },
  { left: '30%', color: '#f29a1d', delay: '12s', dur: '22s' },
]

type Petal = { id: number; left: number; color: string; delay: number; size: number }

function usePetals() {
  const [petals, setPetals] = useState<Petal[]>([])
  const shower = useCallback(() => {
    const base = Date.now()
    const batch = Array.from({ length: 40 }, (_, i) => ({
      id: base + i,
      left: Math.random() * 100,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      delay: Math.random() * 2.5,
      size: 10 + Math.random() * 8,
    }))
    setPetals((p) => [...p, ...batch])
    setTimeout(() => setPetals((p) => p.filter((x) => x.id < base)), 9000)
  }, [])
  return { petals, shower }
}

function Ornament({ children }: { children?: React.ReactNode }) {
  return (
    <div className="divider mx-auto my-6 max-w-md text-lg" aria-hidden>
      {children ?? '❁'}
    </div>
  )
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="font-display text-3xl text-primary sm:text-4xl">{children}</h2>
      {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
      <Ornament />
    </div>
  )
}

function Envelope({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#5e1220] p-6">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, #e9c979 1px, transparent 1.5px), radial-gradient(circle, #e9c979 1px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px',
        }}
      />
      <div className="reveal relative w-full max-w-sm rounded-2xl border border-[#e9c979]/60 bg-gradient-to-b from-[#8c1d2c] to-[#6b1522] px-8 py-12 text-center shadow-2xl">
        <p className="gold-text font-display text-xl">॥ श्री गणेशाय नमः ॥</p>
        <div className="mx-auto my-8 flex size-24 items-center justify-center rounded-full border-4 border-[#e9c979] bg-gradient-to-br from-[#f4dc9a] to-[#b8862f] shadow-lg">
          <span className="font-display text-5xl text-[#6b1522]">१</span>
        </div>
        <p className="text-sm tracking-wide text-[#f4dc9a]/90">त्रिपाठी परिवार की ओर से</p>
        <h1 className="mt-2 font-display text-3xl text-[#fff6e6]">सादर आमंत्रण</h1>
        <p className="mt-2 text-[#f6d9d7]">{inv.childNameHindi} का {inv.occasion}</p>
        <Button
          onClick={onOpen}
          size="lg"
          className="mt-8 bg-gradient-to-r from-[#d9ad55] to-[#f4dc9a] px-8 text-base text-[#5e1220] shadow-lg hover:opacity-90"
        >
          <Sparkles /> निमंत्रण खोलें
        </Button>
      </div>
    </div>
  )
}

function Invitation() {
  const [opened, setOpened] = useState(false)
  const { petals, shower } = usePetals()

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  const openCard = () => {
    setOpened(true)
    shower()
  }

  const share = async () => {
    const text = `॥ श्री गणेशाय नमः ॥\n${inv.familyName} की ओर से ${inv.childNameHindi} के ${inv.occasion} पर आपको सादर आमंत्रण।\n${inv.dateHindi}, ${inv.timeHindi}\n${inv.venueName}, ${inv.venueAddress}\n`
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: 'सादर आमंत्रण', text, url })
        return
      } catch {
        /* user cancelled — fall through to WhatsApp */
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text + url)}`, '_blank')
  }

  return (
    <div className="paper min-h-screen overflow-x-hidden">
      {!opened && <Envelope onOpen={openCard} />}

      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: p.size,
            height: p.size * 1.2,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* ---------- Card header ---------- */}
      <header className="relative overflow-hidden">
        <div className="toran" aria-hidden />
        {BALLOONS.map((b, i) => (
          <span
            key={i}
            className="balloon hidden sm:block"
            style={{ left: b.left, background: b.color, animationDelay: b.delay, animationDuration: b.dur }}
            aria-hidden
          />
        ))}

        <div className="relative mx-auto max-w-3xl px-5 pt-6 pb-16 text-center">
          <p className="gold-text font-display text-2xl sm:text-3xl">॥ श्री गणेशाय नमः ॥</p>
          <img
            src={img('ganesha.png', 400)}
            alt="श्री गणेश"
            width={400}
            height={400}
            className="mx-auto mt-2 w-44 mix-blend-multiply sm:w-56"
          />
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground italic sm:text-base">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
            <br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>

          <Ornament />

          <p className="text-lg text-muted-foreground">{inv.familyName} की ओर से</p>
          <h1 className="mt-1 font-display text-5xl text-primary sm:text-6xl">सादर आमंत्रण</h1>

          {/* Hero photo in an arch frame */}
          <div className="relative mx-auto mt-10 w-64 sm:w-80">
            <div className="absolute -inset-3 rounded-t-full border-2 border-gold/70" aria-hidden />
            <div className="absolute -inset-6 rounded-t-full border border-gold/40" aria-hidden />
            <img
              src={img(inv.heroPhoto.file, 700)}
              alt={inv.heroPhoto.alt}
              width={640}
              height={800}
              className="relative aspect-[4/5] w-full rounded-t-full object-cover shadow-xl"
            />
            <div className="absolute -right-6 -bottom-6 flex size-24 flex-col items-center justify-center rounded-full border-4 border-white bg-primary text-primary-foreground shadow-lg sm:size-28">
              <span className="font-display text-4xl leading-none sm:text-5xl">1</span>
              <span className="text-xs">पहला जन्मदिन</span>
            </div>
          </div>

          <p className="mt-12 text-xl text-muted-foreground">हमारी लाडली बिटिया</p>
          <h2 className="gold-text mt-2 font-display text-5xl leading-tight sm:text-7xl">
            {inv.childNameHindi}
          </h2>
          <p className="font-script text-4xl text-primary/80 sm:text-5xl">{inv.childNameEnglish}</p>
          <p className="mt-3 font-display text-2xl text-primary sm:text-3xl">का {inv.occasion}</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 pb-20">
        {/* ---------- Invitation message ---------- */}
        <section className="card-frame mx-auto max-w-2xl rounded-3xl bg-card/90 px-6 py-10 text-center shadow-sm sm:px-12">
          <p className="text-lg leading-loose sm:text-xl">
            ईश्वर की असीम कृपा एवं बड़ों के आशीर्वाद से हमारे घर-आँगन में खिली नन्ही कली{' '}
            <strong className="text-primary">{inv.childNameHindi}</strong> अपना पहला जन्मदिन मनाने
            जा रही है।
          </p>
          <p className="mt-4 text-lg leading-loose sm:text-xl">
            इस मंगल अवसर पर आप <strong className="text-primary">सपरिवार</strong> सादर आमंत्रित हैं।
            आपकी गरिमामयी उपस्थिति एवं स्नेहिल आशीर्वाद ही हमारे लिए सबसे बड़ा उपहार होगा।
          </p>
        </section>

        {/* ---------- Date / time / venue ---------- */}
        <section className="mt-20">
          <SectionTitle sub="शुभ दिन एवं स्थान">कब और कहाँ</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: CalendarDays, label: 'दिनांक', value: inv.dateHindi },
              { icon: Clock, label: 'समय', value: inv.timeHindi },
              { icon: MapPin, label: 'स्थान', value: `${inv.venueName}, ${inv.venueAddress}` },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-gold/40 bg-card/90 p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-blush text-primary">
                  <Icon className="size-6" />
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="mt-1 font-display text-xl text-primary">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="border-gold bg-card/80">
              <a href={inv.mapsUrl} target="_blank" rel="noreferrer">
                <MapPin /> नक्शे में देखें
              </a>
            </Button>
          </div>

          <div className="mx-auto mt-12 max-w-lg text-center">
            <p className="mb-4 font-display text-xl text-primary">शुभ घड़ी में शेष समय</p>
            <Countdown target={inv.eventStartISO} />
          </div>
        </section>

        {/* ---------- Programme ---------- */}
        <section className="mt-20">
          <SectionTitle>कार्यक्रम</SectionTitle>
          <ol className="relative mx-auto max-w-md border-l-2 border-dashed border-gold/60 pl-8">
            {inv.programme.map((p) => (
              <li key={p.title} className="relative mb-8 last:mb-0">
                <span className="absolute top-1 -left-[2.6rem] flex size-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground ring-4 ring-background">
                  ✿
                </span>
                <div className="text-sm text-muted-foreground">{p.time}</div>
                <div className="font-display text-xl text-primary">{p.title}</div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Gallery ---------- */}
        <section className="mt-20">
          <SectionTitle sub="मेरे पहले साल की कुछ प्यारी झलकियाँ">मेरी यादें</SectionTitle>
          <Gallery />
        </section>

        {/* ---------- Baal manuhar ---------- */}
        <section className="mt-20">
          <div className="mx-auto max-w-xl rounded-3xl bg-gradient-to-br from-blush to-[#fbe6c4] px-6 py-10 text-center shadow-sm">
            <h2 className="font-display text-2xl text-primary">बाल मनुहार</h2>
            <p className="mt-4 text-lg leading-loose">
              मेरे पहले जन्मदिन पर, आप ज़रूर आना,
              <br />
              अपना प्यार और आशीर्वाद, मुझे दे जाना।
              <br />
              नन्ही-सी मैं राह तकूँगी, भूल न जाना,
              <br />
              मामा-मौसी, चाचा-बुआ, सब संग में आना॥
            </p>
            <p className="mt-4 font-script text-3xl text-primary">— Artika</p>
          </div>
        </section>

        {/* ---------- RSVP ---------- */}
        <section id="rsvp" className="mt-20">
          <SectionTitle sub="कृपया अपनी उपस्थिति की सूचना दें">आपका उत्तर</SectionTitle>
          <div className="card-frame mx-auto max-w-lg rounded-3xl bg-card/90 p-6 shadow-sm sm:p-8">
            <RsvpForm onSuccess={shower} />
          </div>
        </section>

        {/* ---------- Hosts ---------- */}
        <section className="mt-20 text-center">
          <p className="text-muted-foreground">दर्शनाभिलाषी</p>
          <Ornament />
          <ul className="space-y-1">
            {inv.hosts.map((h) => (
              <li key={h} className="font-display text-xl text-primary">
                {h}
              </li>
            ))}
          </ul>
          {inv.contactPhone && (
            <p className="mt-4 text-muted-foreground">
              सम्पर्क:{' '}
              <a href={`tel:${inv.contactPhone}`} className="text-primary underline">
                {inv.contactPhone}
              </a>
            </p>
          )}

          <Button onClick={share} size="lg" className="mt-10 bg-[#25a35a] text-base hover:bg-[#1e8c4c]">
            <Share2 /> WhatsApp पर निमंत्रण भेजें
          </Button>
        </section>
      </main>

      <footer className="border-t border-gold/40 py-8 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          स्नेह सहित <Heart className="size-4 fill-primary text-primary" /> {inv.familyName}
        </p>
        <p className="mt-1">॥ शुभम् भवतु ॥</p>
      </footer>
    </div>
  )
}
