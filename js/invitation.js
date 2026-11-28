/**
 * निमंत्रण की सारी जानकारी यहीं है — बदलने के लिए सिर्फ़ इसी फ़ाइल को edit करें।
 * All editable details live here (index.html and admin.html both read this file).
 */
window.INVITATION = {
  /** Dono bachche — saath me janmdin. badge = hero photo par gol badge. */
  children: [
    { nameHindi: 'यज्ञ त्रिपाठी', nameEnglish: 'Yagya Tripathi', age: 'पाँचवाँ जन्मदिवस', badgeNum: '5', badgeLabel: 'यज्ञ' },
    { nameHindi: 'अर्तिका त्रिपाठी', nameEnglish: 'Artika Tripathi', age: 'प्रथम जन्मदिवस', badgeNum: '1', badgeLabel: 'अर्तिका' },
  ],
  /** Title / share message me use hota hai */
  eventTitleHindi: 'यज्ञ का पाँचवाँ एवं अर्तिका का प्रथम जन्मदिवस',
  namesShortHindi: 'यज्ञ एवं अर्तिका',

  /** Countdown target (India time). 12 Dec 2026, 8:00 PM */
  eventStartISO: '2026-12-12T20:00:00+05:30',
  dateHindi: 'शनिवार, 12 दिसम्बर 2026',
  timeHindi: 'रात्रि 8:00 से 10:00 बजे तक',

  venueName: 'निज निवास',
  venueAddress: 'पोंडी, महाराजपुर, मण्डला (म.प्र.)',
  mapsUrl: 'https://maps.app.goo.gl/hrseHJ1LMCEZGnLT8',

  programme: [
    { time: 'रात्रि 8:00 बजे', title: 'स्वागत एवं आशीर्वाद समारोह' },
    { time: 'रात्रि 8:45 बजे', title: 'केक काटने की रस्म' },
    { time: 'रात्रि 9:15 बजे', title: 'प्रीतिभोज' },
  ],

  /** दर्शनाभिलाषी */
  hosts: [
    { icon: 'flower-2', relation: 'दादा-दादी', names: 'श्री राम किशोर त्रिपाठी · श्रीमती सुदेश त्रिपाठी' },
    { icon: 'heart', relation: 'माता-पिता', names: 'श्री प्रवीण त्रिपाठी · श्रीमती शुभांजली त्रिपाठी' },
    { icon: 'sparkles', relation: 'चाचा-चाची', names: 'पं. प्रशांत त्रिपाठी · श्रीमती दीपशिखा त्रिपाठी' },
  ],

  /**
   * Photos (img/ folder, JPEG). `pos` = square thumbnail me kaunsa hissa dikhe (CSS object-position).
   * Asli photos badalne ke liye img/ me same naam ki file replace karein.
   */
  heroPhoto: { file: 'hero.jpg', alt: 'यज्ञ और अर्तिका केक के साथ' },
  photos: [
    { file: 'photo1.jpg', alt: 'यज्ञ और अर्तिका पानी में खेलते हुए', caption: 'भाई-बहन की मस्ती', pos: '50% 15%' },
    { file: 'photo2.jpg', alt: 'यज्ञ और अर्तिका कुर्सियों पर', caption: 'हम दोनों', pos: '50% 50%' },
    { file: 'photo3.jpg', alt: 'अर्तिका भैया की गोद में', caption: 'भैया की गोद में', pos: '50% 45%' },
    { file: 'photo4.jpg', alt: 'यज्ञ की मुस्कान', caption: 'मैं यज्ञ', pos: '50% 20%' },
    { file: 'photo5.jpg', alt: 'यज्ञ केक के साथ', caption: 'मेरा केक', pos: '50% 25%' },
  ],

  /** बाल मनुहार — बड़े भाई यज्ञ की ओर से */
  poemBy: '— आपका नन्हा यज्ञ त्रिपाठी',
  poem: [
    'मेरा और मेरी प्यारी बहना का जन्मदिन आया है,',
    'घर-आँगन में खुशियों का मेला सजाया है।',
    'गुब्बारे, केक और ढेरों मस्ती होगी,',
    'आपके आए बिना सूनी हर हस्ती होगी।',
    'इसलिए हाथ जोड़कर करता हूँ मनुहार,',
    'हम दोनों के जन्मदिन में आइए, देने आशीष और प्यार।',
  ],
}
