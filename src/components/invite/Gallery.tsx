import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { img, invitation } from '@/lib/invitation'

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const photos = invitation.photos
  const active = open === null ? null : photos[open]

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
        {photos.map((p, i) => (
          <button
            key={p.file}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring ${
              i % 2 ? 'md:mt-8 rotate-1' : '-rotate-1'
            }`}
          >
            <img
              src={img(p.file, 500)}
              alt={p.alt}
              loading="lazy"
              width={500}
              height={600}
              className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#4a1820]/80 to-transparent px-3 pt-8 pb-2 text-sm text-white">
              {p.caption}
            </span>
          </button>
        ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-[min(92vw,36rem)] border-gold bg-card p-3 sm:max-w-xl">
          <DialogTitle className="sr-only">{active?.caption}</DialogTitle>
          {active && (
            <figure>
              <img
                src={img(active.file, 1000)}
                alt={active.alt}
                className="max-h-[75vh] w-full rounded-lg object-contain"
              />
              <figcaption className="pt-3 text-center font-display text-xl text-primary">
                {active.caption}
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
