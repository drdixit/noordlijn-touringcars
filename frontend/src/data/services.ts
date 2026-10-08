import type { Service, Step } from '@/lib/types';

const f = (nl: string, en: string) => ({ nl, en });

const steps = (first: Step): Step[] => [
  first,
  { title: f('Persoonlijke offerte', 'Personal quote'), text: f('Binnen één werkdag ontvangt u een duidelijke offerte met een vaste prijs, zonder verrassingen.', 'Within one working day you receive a clear quote with a fixed price, no surprises.') },
  { title: f('Bevestiging en planning', 'Confirmation and planning'), text: f('Na akkoord plannen wij voertuig en chauffeur en ontvangt u alle ritgegevens.', 'Once you accept, we schedule the vehicle and driver and send you all trip details.') },
  { title: f('Op weg', 'On the road'), text: f('Uw chauffeur staat op tijd klaar. Tijdens de rit zijn wij 24/7 bereikbaar.', 'Your driver arrives on time. During the trip we are reachable 24/7.') },
];

const req = (nl: string, en: string): Step => ({ title: f('Aanvraag indienen', 'Send your request'), text: f(nl, en) });

export const services: Service[] = [
  {
    id: 's1', slug: 'airport-transfer', title: f('Luchthavenvervoer', 'Airport transfer'),
    short: f('Op tijd naar Schiphol, Eindhoven of Brussels Airport, ook vroeg in de ochtend.', 'On time to Schiphol, Eindhoven or Brussels Airport, even early in the morning.'),
    description: f('Wij brengen uw groep stressvrij naar en van de luchthaven. We volgen uw vlucht, houden rekening met vertragingen en helpen met de bagage. Geschikt voor bedrijfsgroepen, sportteams en vakantiegangers.', 'We take your group to and from the airport without stress. We track your flight, account for delays and help with luggage. Suitable for business groups, sports teams and holidaymakers.'),
    image: '/images/airport.jpg', images: ['/images/airport.jpg', '/images/terminal.jpg'], vehicleIds: ['v1', 'v2', 'v3'], extraIds: ['e2', 'e5'],
    startingPrice: 195, priceNote: f('Vaste prijs per rit, inclusief wachttijd bij vertraging tot 60 minuten.', 'Fixed price per trip, including waiting time for delays up to 60 minutes.'),
    steps: steps(req('Geef uw vluchtnummer, aantal reizigers en ophaaladres door.', 'Share your flight number, number of travellers and pick-up address.')), published: true,
  },
  {
    id: 's2', slug: 'school-trips', title: f('Schoolreizen', 'School trips'),
    short: f('Veilig vervoer voor schoolreisjes, excursies en werkweken.', 'Safe transport for school outings, excursions and residential trips.'),
    description: f('Veiligheid staat bij schoolvervoer voorop. Al onze bussen hebben veiligheidsgordels en onze chauffeurs zijn ervaren met kinderen en jongeren. Van een dagje Efteling tot een werkweek in de Ardennen.', 'Safety comes first in school transport. All our coaches have seat belts and our drivers are experienced with children and teenagers. From a day at Efteling to a residential week in the Ardennes.'),
    image: '/images/school.jpg', images: ['/images/school.jpg', '/images/themepark.jpg'], vehicleIds: ['v2', 'v3', 'v4', 'v6'], extraIds: ['e2', 'e4'],
    startingPrice: 325, priceNote: f('Speciale tarieven voor scholen en vaste schoolcontracten.', 'Special rates for schools and recurring school contracts.'),
    steps: steps(req('Vertel ons de bestemming, datum en het aantal leerlingen en begeleiders.', 'Tell us the destination, date and number of pupils and supervisors.')), published: true,
  },
  {
    id: 's3', slug: 'corporate-transport', title: f('Zakelijk vervoer', 'Corporate transport'),
    short: f('Representatief vervoer voor congressen, personeelsuitjes en roadshows.', 'Professional transport for conferences, staff outings and roadshows.'),
    description: f('Voor zakelijke klanten zorgen wij voor representatief en punctueel vervoer. Denk aan pendeldiensten bij congressen, transfers voor gasten of het jaarlijkse personeelsuitje. Facturatie op rekening is mogelijk.', 'For business clients we provide professional and punctual transport. Think of shuttles for conferences, guest transfers or the annual staff outing. Invoicing on account is available.'),
    image: '/images/corporate.jpg', images: ['/images/corporate.jpg', '/images/conference.jpg'], vehicleIds: ['v1', 'v3', 'v5'], extraIds: ['e3', 'e4', 'e5'],
    startingPrice: 295, priceNote: f('Raamcontracten en facturatie op rekening mogelijk.', 'Framework contracts and invoicing on account available.'),
    steps: steps(req('Deel het programma, de locaties en het verwachte aantal gasten.', 'Share the programme, locations and expected number of guests.')), published: true,
  },
  {
    id: 's4', slug: 'events', title: f('Evenementen', 'Events'),
    short: f('Groepsvervoer naar festivals, concerten, bruiloften en sportwedstrijden.', 'Group transport to festivals, concerts, weddings and sports matches.'),
    description: f('Samen aankomen en samen naar huis. Wij verzorgen vervoer naar festivals, concerten, bruiloften en wedstrijden, inclusief afspraken over de terugreis op het moment dat het u uitkomt.', 'Arrive together and go home together. We provide transport to festivals, concerts, weddings and matches, including a return trip at the time that suits you.'),
    image: '/images/events.jpg', images: ['/images/events.jpg', '/images/conference.jpg'], vehicleIds: ['v3', 'v4', 'v6', 'v7'], extraIds: ['e3', 'e4'],
    startingPrice: 450, priceNote: f('Inclusief wachttijd van de chauffeur tijdens het evenement.', 'Including driver waiting time during the event.'),
    steps: steps(req('Geef het evenement, de ophaalpunten en de gewenste terugreistijd door.', 'Share the event, pick-up points and preferred return time.')), published: true,
  },
  {
    id: 's5', slug: 'day-trips', title: f('Dagtochten', 'Day trips'),
    short: f('Een dagje uit met de vereniging, familie of vriendengroep.', 'A day out with your club, family or group of friends.'),
    description: f('Of het nu gaat om de Zaanse Schans, de Veluwe of een stedentrip naar Antwerpen: wij rijden u er comfortabel naartoe en weer terug. Desgewenst denken we mee over het programma.', 'Whether it is the Zaanse Schans, the Veluwe or a city trip to Antwerp: we drive you there and back in comfort. We are happy to help with the itinerary.'),
    image: '/images/windmills.jpg', images: ['/images/windmills.jpg', '/images/amsterdam.jpg'], vehicleIds: ['v2', 'v3', 'v4'], extraIds: ['e3', 'e4'],
    startingPrice: 425, priceNote: f('Prijs voor een dag tot 10 uur inclusief chauffeur.', 'Price for a day of up to 10 hours including driver.'),
    steps: steps(req('Laat ons weten waar u heen wilt en met hoeveel personen.', 'Let us know where you want to go and with how many people.')), published: true,
  },
  {
    id: 's6', slug: 'group-trips', title: f('Groepsreizen', 'Group trips'),
    short: f('Meerdaagse reizen voor verenigingen, koren en reisorganisaties.', 'Multi-day trips for clubs, choirs and tour operators.'),
    description: f('Voor meerdaagse groepsreizen stellen wij een vaste chauffeur beschikbaar die de hele reis bij uw groep blijft. Wij houden rekening met rij- en rusttijden en regelen een tweede chauffeur waar nodig.', 'For multi-day group trips we assign a dedicated driver who stays with your group throughout. We take driving and rest times into account and arrange a second driver where needed.'),
    image: '/images/group.jpg', images: ['/images/group.jpg', '/images/berlin.jpg'], vehicleIds: ['v2', 'v4', 'v6', 'v7'], extraIds: ['e1', 'e3'],
    startingPrice: 595, priceNote: f('Prijs per dag; overnachting chauffeur wordt apart berekend.', 'Price per day; driver accommodation is charged separately.'),
    steps: steps(req('Stuur ons uw reisplan of vraag ons mee te denken.', 'Send us your itinerary or ask us to help plan it.')), published: true,
  },
  {
    id: 's7', slug: 'holidays', title: f('Vakantiereizen', 'Holidays'),
    short: f('Comfortabel op vakantie met de hele groep, binnen en buiten Europa.', 'Travel comfortably on holiday with the whole group, across Europe.'),
    description: f('Met onze luxe touringcars reist uw groep ontspannen naar zonnige bestemmingen. Volop beenruimte, een keuken en wifi aan boord maken van de reis een deel van de vakantie.', 'With our luxury coaches your group travels relaxed to sunny destinations. Plenty of legroom, a kitchenette and Wi-Fi on board make the journey part of the holiday.'),
    image: '/images/beach.jpg', images: ['/images/beach.jpg', '/images/group.jpg'], vehicleIds: ['v4', 'v5'], extraIds: ['e1', 'e2', 'e3'],
    startingPrice: 745, priceNote: f('Prijs per dag inclusief chauffeur, exclusief tol en parkeren.', 'Price per day including driver, excluding tolls and parking.'),
    steps: steps(req('Geef bestemming, reisperiode en aantal reizigers door.', 'Share destination, travel period and number of travellers.')), published: true,
  },
  {
    id: 's8', slug: 'ski-trips', title: f('Skireizen', 'Ski trips'),
    short: f('Met ski-uitrusting en al naar Oostenrijk, Frankrijk of Zwitserland.', 'To Austria, France or Switzerland, ski equipment included.'),
    description: f('Onze bussen voor skireizen hebben extra bagageruimte voor ski\'s en snowboards, winterbanden en sneeuwkettingen. Ervaren chauffeurs rijden in duo zodat u ’s nachts kunt doorrijden.', 'Our ski coaches have extra luggage space for skis and snowboards, winter tyres and snow chains. Experienced drivers work in pairs so you can travel overnight.'),
    image: '/images/ski.jpg', images: ['/images/ski.jpg', '/images/ski-2.jpg'], vehicleIds: ['v5', 'v6'], extraIds: ['e1', 'e2', 'e3'],
    startingPrice: 2450, priceNote: f('Retourprijs naar de Alpen, inclusief tweede chauffeur.', 'Return price to the Alps, including second driver.'),
    steps: steps(req('Vertel ons het skigebied, de data en het aantal skiërs.', 'Tell us the ski resort, dates and number of skiers.')), published: true,
  },
  {
    id: 's9', slug: 'international-trips', title: f('Internationale reizen', 'International trips'),
    short: f('Naar Parijs, Berlijn, Londen of verder, met chauffeurs die de weg kennen.', 'To Paris, Berlin, London or beyond, with drivers who know the way.'),
    description: f('Wij rijden dagelijks door heel Europa. Onze chauffeurs kennen de regels rond rij- en rusttijden, milieuzones en tol, zodat u zich nergens zorgen over hoeft te maken.', 'We drive all over Europe every day. Our drivers know the rules on driving hours, low-emission zones and tolls, so you have nothing to worry about.'),
    image: '/images/brussels.jpg', images: ['/images/brussels.jpg', '/images/paris.jpg', '/images/berlin.jpg'], vehicleIds: ['v4', 'v5', 'v6'], extraIds: ['e1', 'e3'],
    startingPrice: 895, priceNote: f('Prijs per dag; tol, veerboot en milieuzones op aanvraag.', 'Price per day; tolls, ferries and emission zones on request.'),
    steps: steps(req('Stuur ons de route of bestemming en de reisdata.', 'Send us the route or destination and travel dates.')), published: true,
  },
  {
    id: 's10', slug: 'shuttle-transport', title: f('Pendeldiensten', 'Shuttle transport'),
    short: f('Doorlopend pendelvervoer tussen parkeerplaats, station en locatie.', 'Continuous shuttle service between car park, station and venue.'),
    description: f('Voor evenementen, beurzen en bedrijfslocaties verzorgen wij pendeldiensten met één of meerdere bussen in een vaste dienstregeling. Inclusief coördinator op locatie bij grotere inzet.', 'For events, trade fairs and business sites we run shuttle services with one or more vehicles on a fixed timetable. Including an on-site coordinator for larger operations.'),
    image: '/images/terminal.jpg', images: ['/images/terminal.jpg', '/images/coach-2.jpg'], vehicleIds: ['v1', 'v2', 'v7'], extraIds: ['e4'],
    startingPrice: 550, priceNote: f('Prijs per bus per dagdeel van 4 uur.', 'Price per vehicle per 4-hour block.'),
    steps: steps(req('Geef de locaties, tijden en het verwachte aantal passagiers door.', 'Share the locations, times and expected passenger numbers.')), published: true,
  },
];
