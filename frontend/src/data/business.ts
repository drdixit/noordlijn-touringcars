import type { Customer, PricingSettings, Quote, SiteSettings } from '@/lib/types';

const f = (nl: string, en: string) => ({ nl, en });

export const pricing: PricingSettings = {
  additionalDriverPerDay: 285,
  weekendSurchargePct: 10,
  holidaySurchargePct: 20,
  minimumCharge: 195,
  extras: [
    { id: 'e1', name: f('Tweede chauffeur', 'Second driver'), price: 285, unit: 'day' },
    { id: 'e2', name: f('Extra bagage / aanhanger', 'Extra luggage / trailer'), price: 85, unit: 'trip' },
    { id: 'e3', name: f('Catering aan boord', 'On-board catering'), price: 12.5, unit: 'person' },
    { id: 'e4', name: f('Gebrandmerkte waterflesjes', 'Branded water bottles'), price: 1.75, unit: 'person' },
    { id: 'e5', name: f('Rolstoeltoegankelijk voertuig', 'Wheelchair-accessible vehicle'), price: 0, unit: 'trip' },
  ],
  discounts: [
    { id: 'dc1', name: f('Schoolkorting', 'School discount'), type: 'percent', value: 5, active: true },
    { id: 'dc2', name: f('Vaste klant', 'Returning customer'), type: 'percent', value: 7.5, active: true },
    { id: 'dc3', name: f('Vroegboekkorting wintersport', 'Ski early-booking discount'), type: 'fixed', value: 150, active: false },
  ],
};

export const customers: Customer[] = [
  { id: 'c1', name: 'Marieke Hendriks', company: 'CSG Het Noordik', email: 'm.hendriks@noordik.example.nl', phone: '+31 6 1234 5678', status: 'active', createdAt: '2025-11-02', notes: [{ id: 'n1', text: 'Books 3–4 school trips every year. Prefers driver Henk.', author: 'Sanne', date: '2026-03-12' }] },
  { id: 'c2', name: 'Thomas Visser', company: 'Visser & Partners', email: 'thomas@visserpartners.example.nl', phone: '+31 6 2345 6789', status: 'active', createdAt: '2026-02-18', notes: [] },
  { id: 'c3', name: 'Anouk de Boer', company: 'SV Zuidwest', email: 'secretariaat@svzuidwest.example.nl', phone: '+31 6 3456 7890', status: 'active', createdAt: '2025-09-30', notes: [] },
  { id: 'c4', name: 'Robert Smit', company: 'Congresbureau Utrecht', email: 'r.smit@congresutrecht.example.nl', phone: '+31 30 123 4567', status: 'active', createdAt: '2026-01-11', notes: [{ id: 'n2', text: 'Framework contract under discussion for 2027.', author: 'Peter', date: '2026-09-20' }] },
  { id: 'c5', name: 'Julia Meijer', company: '', email: 'julia.meijer@example.com', phone: '+31 6 4567 8901', status: 'lead', createdAt: '2026-10-06', notes: [] },
  { id: 'c6', name: 'Daan Mulder', company: 'Basisschool De Regenboog', email: 'directie@regenboog.example.nl', phone: '+31 6 5678 9012', status: 'lead', createdAt: '2026-10-04', notes: [] },
  { id: 'c7', name: 'Emma Bos', company: 'Eventbureau Bos', email: 'emma@eventbos.example.nl', phone: '+31 6 6789 0123', status: 'active', createdAt: '2026-05-21', notes: [] },
  { id: 'c8', name: 'Kees van Leeuwen', company: 'Seniorenvereniging Zeist', email: 'kees.vl@example.nl', phone: '+31 6 7890 1234', status: 'inactive', createdAt: '2024-04-15', notes: [] },
];

const q = (o: Partial<Quote> & Pick<Quote, 'id' | 'customerId' | 'pickup' | 'destination' | 'departureDate' | 'passengers' | 'serviceId' | 'status' | 'createdAt' | 'basePrice'>): Quote => ({
  departureTime: '08:30', returnDate: '', returnTime: '', vehicleId: null, extraIds: [], adjustments: [], message: '', notes: [], ...o,
});

export const quotes: Quote[] = [
  q({ id: 'Q-2026-0148', customerId: 'c5', pickup: 'Utrecht Centraal', destination: 'Schiphol Airport', departureDate: '2026-10-24', departureTime: '05:15', passengers: 7, serviceId: 's1', status: 'new', createdAt: '2026-10-06', basePrice: 195, message: 'Family trip, 7 people with large suitcases.' }),
  q({ id: 'Q-2026-0147', customerId: 'c6', pickup: 'Amersfoort', destination: 'Efteling', departureDate: '2027-06-11', returnDate: '2027-06-11', returnTime: '17:30', passengers: 74, serviceId: 's2', status: 'new', createdAt: '2026-10-04', basePrice: 895, extraIds: ['e4'], message: 'School trip for groups 6–8 with 8 supervisors.' }),
  q({ id: 'Q-2026-0146', customerId: 'c7', pickup: 'Rotterdam Ahoy', destination: 'Lowlands, Biddinghuizen', departureDate: '2027-08-20', departureTime: '10:00', returnDate: '2027-08-22', returnTime: '23:30', passengers: 48, serviceId: 's4', vehicleId: 'v4', status: 'contacted', createdAt: '2026-10-02', basePrice: 1450 }),
  q({ id: 'Q-2026-0145', customerId: 'c4', pickup: 'Jaarbeurs Utrecht', destination: 'Utrecht Centraal (shuttle)', departureDate: '2026-11-17', departureTime: '07:00', returnDate: '2026-11-19', returnTime: '19:00', passengers: 300, serviceId: 's10', vehicleId: 'v7', status: 'quoted', createdAt: '2026-09-29', basePrice: 4950, adjustments: [{ id: 'a1', type: 'charge', label: 'On-site coordinator', amount: 450 }] }),
  q({ id: 'Q-2026-0144', customerId: 'c3', pickup: 'Den Haag', destination: 'Mayrhofen, Austria', departureDate: '2027-01-29', departureTime: '19:00', returnDate: '2027-02-07', returnTime: '08:00', passengers: 62, serviceId: 's8', vehicleId: 'v6', status: 'accepted', createdAt: '2026-09-25', basePrice: 4200, extraIds: ['e1', 'e2'] }),
  q({ id: 'Q-2026-0143', customerId: 'c1', pickup: 'Almelo', destination: 'Berlin, Germany', departureDate: '2027-03-15', departureTime: '06:00', returnDate: '2027-03-18', returnTime: '20:00', passengers: 55, serviceId: 's2', vehicleId: 'v5', status: 'confirmed', createdAt: '2026-09-18', basePrice: 3850, extraIds: ['e1'], adjustments: [{ id: 'a2', type: 'discount', label: 'School discount 5%', amount: 192.5 }] }),
  q({ id: 'Q-2026-0142', customerId: 'c2', pickup: 'Utrecht', destination: 'Maastricht', departureDate: '2026-10-16', departureTime: '09:00', returnDate: '2026-10-16', returnTime: '21:00', passengers: 28, serviceId: 's3', vehicleId: 'v3', status: 'confirmed', createdAt: '2026-09-10', basePrice: 1100, extraIds: ['e3'] }),
  q({ id: 'Q-2026-0141', customerId: 'c1', pickup: 'Almelo', destination: 'Rijksmuseum Amsterdam', departureDate: '2026-09-22', passengers: 50, serviceId: 's2', vehicleId: 'v4', status: 'completed', createdAt: '2026-08-28', basePrice: 750 }),
  q({ id: 'Q-2026-0140', customerId: 'c8', pickup: 'Zeist', destination: 'Keukenhof', departureDate: '2026-04-14', passengers: 40, serviceId: 's5', status: 'cancelled', createdAt: '2026-02-03', basePrice: 690 }),
  q({ id: 'Q-2026-0139', customerId: 'c7', pickup: 'Amsterdam RAI', destination: 'Ziggo Dome', departureDate: '2026-12-05', departureTime: '18:00', passengers: 16, serviceId: 's4', vehicleId: 'v2', status: 'quoted', createdAt: '2026-09-05', basePrice: 420 }),
  q({ id: 'Q-2026-0138', customerId: 'c3', pickup: 'Den Haag', destination: 'Brussels, Belgium', departureDate: '2026-11-08', passengers: 35, serviceId: 's9', status: 'new', createdAt: '2026-10-05', basePrice: 1150 }),
];

export const settings: SiteSettings = {
  company: {
    name: 'Noordlijn Touringcars', founded: 1987, kvk: '30123456', vat: 'NL001234567B01',
    tagline: f('Groepsvervoer met zorg, sinds 1987', 'Group transport with care, since 1987'),
    about: f('Familiebedrijf uit Utrecht met een moderne vloot van minibussen tot dubbeldekkers.', 'Family business from Utrecht with a modern fleet from minibuses to double-deckers.'),
  },
  contact: {
    phone: '+31 30 200 4000', urgentPhone: '+31 6 1000 2000', email: 'info@noordlijn.example.nl',
    street: 'Transportweg 12', postcode: '3542 AB', city: 'Utrecht', country: f('Nederland', 'Netherlands'),
    hours: [
      { days: f('Maandag – vrijdag', 'Monday – Friday'), time: '08:00 – 18:00' },
      { days: f('Zaterdag', 'Saturday'), time: '09:00 – 14:00' },
      { days: f('Zondag', 'Sunday'), time: '—' },
    ],
  },
  social: { facebook: 'https://facebook.com', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com', youtube: 'https://youtube.com' },
  homepage: {
    heroTitle: f('Touringcar of bus huren voor uw groep', 'Coach and minibus hire for your group'),
    heroSubtitle: f('Van 8 tot 85 personen. Voor scholen, bedrijven, verenigingen en evenementen, in Nederland en heel Europa. Binnen één werkdag een vaste prijs.', 'From 8 to 85 passengers. For schools, businesses, clubs and events, in the Netherlands and across Europe. A fixed price within one working day.'),
    ctaTitle: f('Klaar om te reizen?', 'Ready to travel?'),
    ctaText: f('Vertel ons waar u heen wilt. U ontvangt binnen één werkdag een vrijblijvende offerte.', 'Tell us where you want to go. You will receive a no-obligation quote within one working day.'),
  },
  footer: {
    text: f('Betrouwbaar groepsvervoer vanuit Utrecht, door heel Nederland en Europa.', 'Reliable group transport from Utrecht, throughout the Netherlands and Europe.'),
    copyright: 'Noordlijn Touringcars B.V.',
  },
  seo: [
    { key: 'home', title: f('Touringcar huren | Noordlijn Touringcars', 'Coach hire | Noordlijn Touringcars'), description: f('Touringcar of minibus huren voor groepen van 8 tot 85 personen.', 'Coach or minibus hire for groups of 8 to 85.') },
    { key: 'services', title: f('Diensten | Noordlijn', 'Services | Noordlijn'), description: f('Alle vervoersdiensten.', 'All transport services.') },
    { key: 'vehicles', title: f('Onze vloot | Noordlijn', 'Our fleet | Noordlijn'), description: f('Minibussen, touringcars en dubbeldekkers.', 'Minibuses, coaches and double-deckers.') },
    { key: 'quote', title: f('Offerte aanvragen | Noordlijn', 'Request a quote | Noordlijn'), description: f('Vraag vrijblijvend een offerte aan.', 'Request a no-obligation quote.') },
  ],
};
