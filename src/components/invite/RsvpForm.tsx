import { useState, type FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type State = 'idle' | 'pending' | 'success' | 'error'

const field =
  'mt-1 bg-white/80 border-input text-base focus-visible:ring-ring/40'

/**
 * Netlify Forms RSVP. The matching static registration lives in
 * public/rsvp-form.html — keep field names in sync.
 */
export function RsvpForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, setState] = useState<State>('idle')
  const [attending, setAttending] = useState('हाँ, अवश्य आएँगे')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((v, k) => body.append(k, String(v)))
    setState('pending')
    try {
      const res = await fetch('/rsvp-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!res.ok) throw new Error('failed')
      if (/\bdata-netlify\s*=/i.test(await res.text())) throw new Error('unprocessed')
      setState('success')
      onSuccess?.()
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="py-8 text-center">
        <div className="text-5xl">🙏</div>
        <p className="mt-3 font-display text-2xl text-primary">
          आपका हार्दिक धन्यवाद!
        </p>
        <p className="mt-2 text-muted-foreground">
          आपका संदेश त्रिपाठी परिवार तक पहुँच गया है। आर्तिका को आपके आशीर्वाद की प्रतीक्षा
          रहेगी।
        </p>
      </div>
    )
  }

  return (
    <form
      name="rsvp"
      method="POST"
      action="/rsvp-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => state === 'error' && setState('idle')}
      className="space-y-4 text-left"
    >
      <input type="hidden" name="form-name" value="rsvp" />
      <p hidden>
        <label>
          इसे खाली छोड़ें <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">आपका शुभ नाम *</span>
          <Input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>

        <div>
          <span className="text-sm font-medium">क्या आप पधारेंगे? *</span>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {['हाँ, अवश्य आएँगे', 'क्षमा करें, नहीं आ पाएँगे'].map((opt) => (
              <label
                key={opt}
                className={`cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm transition ${
                  attending === opt
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-input bg-white/70 hover:border-gold'
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value={opt}
                  checked={attending === opt}
                  onChange={() => setAttending(opt)}
                  className="sr-only"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium">कुल सदस्य</span>
            <Input
              name="guests"
              type="number"
              min={1}
              max={20}
              defaultValue={2}
              className={field}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">मोबाइल नंबर</span>
            <Input name="phone" type="tel" maxLength={15} autoComplete="tel" className={field} />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium">आर्तिका के लिए आशीर्वाद / शुभकामना</span>
          <Textarea name="message" rows={3} maxLength={1000} className={field} />
        </label>

        <Button type="submit" size="lg" className="w-full text-base">
          {state === 'pending' ? 'भेजा जा रहा है…' : 'उत्तर भेजें'}
        </Button>
      </fieldset>
      {state === 'error' && (
        <p role="alert" className="text-center text-sm text-destructive">
          संदेश नहीं भेजा जा सका। कृपया थोड़ी देर बाद पुनः प्रयास करें — आपकी जानकारी सुरक्षित है।
        </p>
      )}
    </form>
  )
}
