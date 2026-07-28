export const HOSPITAL = {
  nameKey: 'meta.siteName',
  nameFullKey: 'meta.siteNameFull',
  taglineKey: 'meta.tagline',
  addressKey: 'hospital.address',
  phone: '+91 4563 263000',
  phoneRaw: '+91456263000',
  emergency: '108',
  whatsapp: '919000000000',
  email: 'info@josephspecialityhospital.in',
  hoursKey: 'hospital.opdHours',
  emergencyHoursKey: 'hospital.emergencyHours',
  mapEmbed:
    'https://www.google.com/maps?q=Srivilliputhur,Tamil+Nadu&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Srivilliputhur+Tamil+Nadu',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
  },
};

export const NAV_LINKS = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.about', to: '/about' },
  { labelKey: 'nav.departments', to: '/departments' },
  { labelKey: 'nav.doctors', to: '/doctors' },
  { labelKey: 'nav.services', to: '/services' },
  { labelKey: 'nav.gallery', to: '/gallery' },
  { labelKey: 'nav.blog', to: '/blog' },
  { labelKey: 'nav.contact', to: '/contact' },
];

export const DEPARTMENTS = [
  'generalMedicine',
  'generalSurgery',
  'orthopedics',
  'gynecology',
  'obstetrics',
  'pediatrics',
  'diabetology',
  'cardiology',
  'dermatology',
  'ent',
  'neurology',
  'urology',
  'physiotherapy',
  'emergencyCare',
] as const;

export const GENDERS = ['male', 'female', 'other'] as const;

export const TIME_SLOTS = [
  'slot1',
  'slot2',
  'slot3',
  'slot4',
  'slot5',
  'slot6',
  'slot7',
] as const;
