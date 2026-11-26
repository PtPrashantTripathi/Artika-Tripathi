/**
 * निमंत्रण की सारी जानकारी यहीं है — बदलने के लिए सिर्फ़ इसी फ़ाइल को edit करें।
 * All editable details live here (index.html and admin.html both read this file).
 */
window.INVITATION = {
  childNameHindi: 'आर्तिका त्रिपाठी',
  childNameEnglish: 'Artika Tripathi',
  occasion: 'प्रथम जन्मदिवस',

  /** Countdown target (India time). 12 Dec 2026, 8:00 PM */
  eventStartISO: '2026-12-12T20:00:00+05:30',
  dateHindi: 'शनिवार, 12 दिसम्बर 2026',
  timeHindi: 'रात्रि 8:00 से 10:00 बजे तक',

  venueName: 'निज निवास',
  venueAddress: 'पोंडी, महाराजपुर, मण्डला (म.प्र.)',
  mapsUrl: 'https://maps.app.goo.gl/hrseHJ1LMCEZGnLT8',

  /**
   * RSVP WhatsApp number: country code ke saath, bina + ya space ke. Jaise '919876543210'.
   * Khaali chhodne par RSVP form chhup jata hai.
   */
  whatsappNumber: '',

  programme: [
    { time: 'रात्रि 8:00 बजे', title: 'स्वागत एवं आशीर्वाद समारोह' },
    { time: 'रात्रि 8:45 बजे', title: 'केक काटने की रस्म' },
    { time: 'रात्रि 9:15 बजे', title: 'प्रीतिभोज' },
  ],

  /** दर्शनाभिलाषी */
  hosts: [
    { relation: 'दादा-दादी', names: 'श्री राम किशोर त्रिपाठी · श्रीमती सुदेश त्रिपाठी' },
    { relation: 'माता-पिता', names: 'श्री प्रवीण त्रिपाठी · श्रीमती शुभांजलि त्रिपाठी' },
    { relation: 'चाचा-चाची', names: 'पं. प्रशांत त्रिपाठी · श्रीमती दीपशिखा त्रिपाठी' },
  ],

  /** Asli photos ke liye img/ me same naam ki file badal dein (.jpg). */
  heroPhoto: { file: 'hero.jpg', alt: 'नन्ही आर्तिका' },
  photos: [
    { file: 'photo1.jpg', alt: 'मुस्कुराती आर्तिका', caption: 'मेरी प्यारी मुस्कान' },
    { file: 'photo2.jpg', alt: 'जन्मदिन का केक', caption: 'मेरा पहला केक' },
    { file: 'photo3.jpg', alt: 'नन्हे पाँव', caption: 'नन्हे-नन्हे कदम' },
    { file: 'photo4.jpg', alt: 'खेलती आर्तिका', caption: 'मेरी शरारतें' },
  ],

  poem: [
    'ना जाने कब बीत गया ये साल, पता ही न चला,',
    'कल ही तो आई थी मैं, गोद में आपकी, नन्ही सी परी बनकर।',
    'आज पहला जन्मदिन है मेरा, आइए,',
    'अपने आशीष और प्यार से मुझे भर दीजिए।',
  ],

  /**
   * Admin page ka password — SHA-256 hash. Abhi password: artika2026
   * Badalne ke liye admin.html kholkar neeche "नया पासवर्ड hash" wala box use karein.
   * (Static site me ye sirf halka sa lock hai, asli security nahi.)
   */
  adminPasswordSha256: 'a5ce51c3536aa02921e0417ea87ee47306cd668ca0ba5b9ff6062722469447ba',
}
