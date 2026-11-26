# आर्तिका त्रिपाठी — प्रथम जन्मदिवस निमंत्रण

A Hindi invitation-card website for Artika Tripathi's first birthday, from the Tripathi family (॥ श्री गणेशाय नमः ॥ … त्रिपाठी परिवार की ओर से सादर आमंत्रण).

Guests open a digital envelope and see the invitation with a Ganesha illustration, event date/time/venue with a live countdown, the programme, a photo gallery, a "बाल मनुहार" poem, an RSVP form, and a button to share the invitation on WhatsApp.

## Technologies

- TanStack Start (React 19) + Vite, Tailwind CSS 4, shadcn/ui
- Netlify Forms for RSVPs (submissions appear in the Netlify dashboard under Forms)
- Netlify Image CDN for resized WebP photos

## Editing the invitation

Everything editable is in **`src/lib/invitation.ts`**: names, date and time (also drives the countdown), venue and Google Maps link, programme, hosts, contact number, and photo list.

**Photos:** the current photos are sample images. Put the real photos in `public/img/` with the same names (`hero.png` for the main photo, `photo1.png` … `photo4.png` for the gallery) or change the file names in `invitation.ts`. More gallery photos can be added to the `photos` list.

## Run locally

```bash
pnpm install
netlify dev --port 8889
```

`netlify dev` is needed for the Image CDN and form handling to work locally.

## Still to do

- Swap the sample photos for Artika's real photos.
- Confirm the date, time, venue, maps link and host names in `src/lib/invitation.ts` (current values are placeholders).
