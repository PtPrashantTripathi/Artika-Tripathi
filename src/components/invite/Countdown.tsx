import { useEffect, useState } from 'react'

const units = [
  { key: 'days', label: 'दिन', ms: 86_400_000 },
  { key: 'hours', label: 'घंटे', ms: 3_600_000 },
  { key: 'minutes', label: 'मिनट', ms: 60_000 },
  { key: 'seconds', label: 'सेकंड', ms: 1000 },
] as const

function split(diff: number) {
  let rest = Math.max(0, diff)
  return units.map((u) => {
    const value = Math.floor(rest / u.ms)
    rest -= value * u.ms
    return { ...u, value }
  })
}

/** Rendered only after mount so server and browser HTML always match. */
export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = now === null ? null : new Date(target).getTime() - now

  if (diff !== null && diff <= 0) {
    return (
      <p className="font-display text-2xl text-primary">
        आज आर्तिका का जन्मदिन है! 🎉
      </p>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4" aria-live="off">
      {split(diff ?? 0).map((u) => (
        <div
          key={u.key}
          className="rounded-xl border border-gold/50 bg-card/80 px-2 py-3 shadow-sm sm:px-4"
        >
          <div className="font-display text-3xl tabular-nums text-primary sm:text-4xl">
            {diff === null ? '–' : String(u.value).padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground sm:text-sm">{u.label}</div>
        </div>
      ))}
    </div>
  )
}
