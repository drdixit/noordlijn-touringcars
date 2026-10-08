import type { Vehicle } from '@/lib/types';

const f = (nl: string, en: string) => ({ nl, en });

const common = {
  ac: f('Airconditioning', 'Air conditioning'),
  belts: f('Veiligheidsgordels', 'Seat belts'),
  wifi: f('Gratis wifi', 'Free Wi-Fi'),
  usb: f('USB-laadpunten', 'USB charging'),
  toilet: f('Toilet aan boord', 'On-board toilet'),
  kitchen: f('Keuken met koffiezet', 'Kitchenette with coffee'),
  fridge: f('Koelkast', 'Fridge'),
  luggage: f('Ruime bagageruimte', 'Large luggage hold'),
  reclining: f('Verstelbare stoelen', 'Reclining seats'),
  screens: f('Video en monitoren', 'Video and screens'),
  mic: f('Microfoon / PA-systeem', 'Microphone / PA system'),
  legroom: f('Extra beenruimte', 'Extra legroom'),
  tables: f('Tafels bij de stoelen', 'Tables at seats'),
  wheelchair: f('Rolstoellift beschikbaar', 'Wheelchair lift available'),
};

export const vehicles: Vehicle[] = [
  {
    id: 'v1', slug: 'business-van-8', name: 'Business Van 8', category: 'minibus', capacity: 8,
    description: f('Comfortabel personenbusje voor kleine groepen en luchthavenvervoer.', 'Comfortable people carrier for small groups and airport runs.'),
    longDescription: f(
      'De Business Van is ideaal voor directieleden, kleine teams en families. Met lederen stoelen, veel beenruimte en ruimte voor koffers rijdt u ontspannen naar Schiphol, een zakelijke afspraak of een familiefeest.',
      'The Business Van is ideal for executives, small teams and families. With leather seats, plenty of legroom and space for suitcases, you travel relaxed to Schiphol, a business meeting or a family celebration.'),
    features: [common.ac, common.wifi, common.usb, common.legroom],
    equipment: [common.belts, f('Lederen interieur', 'Leather interior'), f('Getinte ramen', 'Tinted windows')],
    images: ['/images/minibus.jpg', '/images/interior-4.jpg', '/images/airport.jpg'],
    serviceIds: ['s1', 's3', 's10'], pricing: { startingPrice: 195, pricePerHour: 55, pricePerKm: 1.1 }, featured: false, active: true,
  },
  {
    id: 'v2', slug: 'minibus-19', name: 'Minibus 19', category: 'minibus', capacity: 19,
    description: f('Wendbare minibus voor teams, clubs en schoolklassen.', 'Agile minibus for teams, clubs and school classes.'),
    longDescription: f(
      'Onze minibus met 19 zitplaatsen is wendbaar in de stad en comfortabel op de snelweg. Een populaire keuze voor sportteams, kleine schoolgroepen en bedrijfsuitjes.',
      'Our 19-seat minibus is agile in town and comfortable on the motorway. A popular choice for sports teams, small school groups and company outings.'),
    features: [common.ac, common.belts, common.usb, common.luggage],
    equipment: [common.mic, f('Bagageaanhanger op aanvraag', 'Luggage trailer on request')],
    images: ['/images/minibus.jpg', '/images/interior-3.jpg', '/images/group.jpg'],
    serviceIds: ['s2', 's3', 's5', 's6', 's10'], pricing: { startingPrice: 325, pricePerHour: 70, pricePerKm: 1.45 }, featured: true, active: true,
  },
  {
    id: 'v3', slug: 'midi-coach-30', name: 'Midi Coach 30', category: 'midi', capacity: 30,
    description: f('Compacte touringcar met het comfort van een grote bus.', 'Compact coach with the comfort of a full-size coach.'),
    longDescription: f(
      'De Midi Coach biedt plaats aan 30 passagiers en heeft alles wat u van een touringcar verwacht: verstelbare stoelen, airco, een microfoon en ruime bagageruimte. Perfect voor middelgrote groepen.',
      'The Midi Coach seats 30 passengers and has everything you expect from a coach: reclining seats, air conditioning, a microphone and a large luggage hold. Perfect for medium-sized groups.'),
    features: [common.ac, common.reclining, common.mic, common.luggage],
    equipment: [common.belts, common.usb, common.fridge],
    images: ['/images/coach-4.jpg', '/images/interior-1.jpg', '/images/interior-2.jpg'],
    serviceIds: ['s2', 's3', 's4', 's5', 's6'], pricing: { startingPrice: 450, pricePerHour: 85, pricePerKm: 1.75 }, featured: false, active: true,
  },
  {
    id: 'v4', slug: 'touringcar-50', name: 'Touringcar 50', category: 'touringcar', capacity: 50,
    description: f('Onze populairste touringcar voor dagtochten en schoolreizen.', 'Our most popular coach for day trips and school trips.'),
    longDescription: f(
      'De Touringcar 50 is het werkpaard van onze vloot. Ruime stoelen, een toilet en een keuken maken deze bus geschikt voor zowel korte dagtochten als lange reizen door Europa.',
      'The Touringcar 50 is the workhorse of our fleet. Spacious seats, a toilet and a kitchenette make it suitable for short day trips as well as long journeys across Europe.'),
    features: [common.ac, common.toilet, common.kitchen, common.reclining, common.wifi],
    equipment: [common.belts, common.mic, common.screens, common.usb, common.fridge],
    images: ['/images/coach-3.jpg', '/images/interior-2.jpg', '/images/interior-1.jpg', '/images/driver.jpg'],
    serviceIds: ['s2', 's4', 's5', 's6', 's7', 's9'], pricing: { startingPrice: 595, pricePerHour: 95, pricePerKm: 1.95 }, featured: true, active: true,
  },
  {
    id: 'v5', slug: 'royal-class-60', name: 'Royal Class 60', category: 'touringcar', capacity: 60,
    description: f('Luxe touringcar met extra beenruimte voor lange reizen.', 'Luxury coach with extra legroom for long journeys.'),
    longDescription: f(
      'Met de Royal Class reist uw groep in eerste klasse. Leren stoelen met extra beenruimte, tafeltjes, wifi en een volledige keuken maken lange afstanden naar Parijs, Berlijn of de Alpen aangenaam.',
      'With the Royal Class your group travels first class. Leather seats with extra legroom, tables, Wi-Fi and a full kitchenette make long distances to Paris, Berlin or the Alps a pleasure.'),
    features: [common.ac, common.toilet, common.kitchen, common.legroom, common.wifi, common.tables],
    equipment: [common.belts, common.mic, common.screens, common.usb, common.fridge, common.wheelchair],
    images: ['/images/coach-4.jpg', '/images/interior-4.jpg', '/images/interior-2.jpg', '/images/paris.jpg'],
    serviceIds: ['s3', 's7', 's8', 's9'], pricing: { startingPrice: 745, pricePerHour: 110, pricePerKm: 2.2 }, featured: true, active: true,
  },
  {
    id: 'v6', slug: 'double-decker-78', name: 'Double-decker 78', category: 'doubledecker', capacity: 78,
    description: f('Dubbeldekker voor grote groepen, evenementen en skireizen.', 'Double-decker for large groups, events and ski trips.'),
    longDescription: f(
      'Met 78 zitplaatsen verdeeld over twee verdiepingen vervoert u een complete jaarlaag of afdeling in één keer. Inclusief toilet, keuken en extra grote bagageruimte voor ski-uitrusting.',
      'With 78 seats across two decks you move a full school year or department in one go. Includes toilet, kitchenette and an extra-large luggage hold for ski equipment.'),
    features: [common.ac, common.toilet, common.kitchen, common.luggage, common.wifi],
    equipment: [common.belts, common.mic, common.screens, common.usb, common.fridge],
    images: ['/images/coach-1.jpg', '/images/interior-1.jpg', '/images/ski.jpg'],
    serviceIds: ['s2', 's4', 's6', 's8', 's9'], pricing: { startingPrice: 895, pricePerHour: 125, pricePerKm: 2.45 }, featured: true, active: true,
  },
  {
    id: 'v7', slug: 'double-decker-85', name: 'Double-decker 85 Comfort', category: 'doubledecker', capacity: 85,
    description: f('Onze grootste bus, voor maximale capaciteit met comfort.', 'Our largest coach, maximum capacity with comfort.'),
    longDescription: f(
      'De grootste bus in onze vloot. Ideaal voor festivals, grote schoolreizen en bedrijfsevenementen waarbij iedereen tegelijk moet aankomen.',
      'The largest coach in our fleet. Ideal for festivals, large school trips and corporate events where everyone needs to arrive at the same time.'),
    features: [common.ac, common.toilet, common.kitchen, common.luggage],
    equipment: [common.belts, common.mic, common.screens, common.usb],
    images: ['/images/coach-2.jpg', '/images/interior-2.jpg', '/images/events.jpg'],
    serviceIds: ['s4', 's6', 's10'], pricing: { startingPrice: 950, pricePerHour: 135, pricePerKm: 2.6 }, featured: false, active: true,
  },
];

export const vehicleCategories: { id: Vehicle['category']; name: { nl: string; en: string }; range: string }[] = [
  { id: 'minibus', name: f('Minibus', 'Minibus'), range: '8–19' },
  { id: 'midi', name: f('Midi touringcar', 'Midi coach'), range: '20–35' },
  { id: 'touringcar', name: f('Touringcar', 'Coach'), range: '50–60' },
  { id: 'doubledecker', name: f('Dubbeldekker', 'Double-decker'), range: '70–85' },
];
