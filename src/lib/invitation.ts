/**
 * निमंत्रण की सारी जानकारी यहीं है — नाम, तारीख, स्थान, कार्यक्रम और फ़ोटो।
 * All invitation details live in this one file. Edit here and the whole site updates.
 */

/** Netlify Image CDN URL — serves a resized WebP instead of the full original file. */
export function img(file: string, width: number) {
  return `/.netlify/images?url=/img/${file}&w=${width}&fm=webp&q=80`
}

export const invitation = {
  childNameHindi: 'आर्तिका त्रिपाठी',
  childNameEnglish: 'Artika Tripathi',
  occasion: 'प्रथम जन्मदिवस',
  familyName: 'त्रिपाठी परिवार',

  /** Event start in ISO format with India timezone — used by the countdown. */
  eventStartISO: '2026-12-20T19:00:00+05:30',
  dateHindi: 'रविवार, 20 दिसम्बर 2026',
  timeHindi: 'सायं 7:00 बजे से',

  venueName: 'श्री गणेश वाटिका',
  venueAddress: 'सिविल लाइन्स, प्रयागराज',
  mapsUrl: 'https://maps.google.com/?q=Civil+Lines+Prayagraj',

  /** Shown on the "contact" line. Leave empty to hide. */
  contactPhone: '',

  programme: [
    { time: 'सायं 7:00 बजे', title: 'स्वागत एवं आशीर्वाद समारोह' },
    { time: 'सायं 8:00 बजे', title: 'केक काटने की रस्म' },
    { time: 'रात्रि 8:30 बजे से', title: 'प्रीतिभोज' },
  ],

  /** दर्शनाभिलाषी — the family members inviting the guests. */
  hosts: ['दादा-दादी', 'नाना-नानी', 'माता-पिता', 'समस्त त्रिपाठी परिवार'],

  /**
   * Sample photos for now. Replace the files in public/img/ (same names) with
   * Artika's real photos, or change the file names here.
   */
  heroPhoto: { file: 'hero.png', alt: 'नन्ही आर्तिका' },
  photos: [
    { file: 'photo1.png', alt: 'मुस्कुराती आर्तिका', caption: 'मेरी प्यारी मुस्कान' },
    { file: 'photo2.png', alt: 'जन्मदिन का केक', caption: 'मेरा पहला केक' },
    { file: 'photo3.png', alt: 'नन्हे पाँव', caption: 'नन्हे-नन्हे कदम' },
    { file: 'photo4.png', alt: 'खेलती आर्तिका', caption: 'मेरी शरारतें' },
  ],
} as const
