import type { Destination } from '@/lib/types';

const f = (nl: string, en: string) => ({ nl, en });
const nlc = f('Nederland', 'Netherlands');

export const destinations: Destination[] = [
  {
    id: 'd1', slug: 'amsterdam', name: f('Amsterdam', 'Amsterdam'), country: nlc, distanceKm: 45, image: '/images/amsterdam.jpg', images: ['/images/amsterdam.jpg', '/images/amsterdam-2.jpg'],
    short: f('Grachten, musea en de Jordaan. Een klassieker voor elke groep.', 'Canals, museums and the Jordaan. A classic for every group.'),
    description: f('Amsterdam is een van de populairste bestemmingen voor schoolreizen en bedrijfsuitjes. Onze chauffeurs kennen de touringcarhaltes en de regels rond de milieuzone, zodat u dicht bij het centrum uitstapt.', 'Amsterdam is one of the most popular destinations for school trips and company outings. Our drivers know the coach stops and low-emission zone rules, so you get off close to the centre.'),
    suggestedTrips: [
      { title: f('Rijksmuseum en rondvaart', 'Rijksmuseum and canal cruise'), text: f('Ochtend in het museum, middag op het water.', 'Morning in the museum, afternoon on the water.') },
      { title: f('NEMO Science Museum', 'NEMO Science Museum'), text: f('Ideaal voor basis- en middelbare scholen.', 'Ideal for primary and secondary schools.') },
    ],
    serviceIds: ['s2', 's3', 's5'], vehicleIds: ['v2', 'v3', 'v4'], blogIds: ['b2'],
    seoTitle: f('Touringcar huren naar Amsterdam', 'Coach hire to Amsterdam'), seoDescription: f('Met de groep naar Amsterdam? Vraag een offerte aan.', 'Taking a group to Amsterdam? Request a quote.'),
  },
  {
    id: 'd2', slug: 'efteling', name: f('Efteling', 'Efteling'), country: nlc, distanceKm: 75, image: '/images/themepark.jpg', images: ['/images/themepark.jpg', '/images/school.jpg'],
    short: f('Het sprookjespark in Kaatsheuvel. Favoriet bij scholen en families.', 'The fairy-tale park in Kaatsheuvel. A favourite for schools and families.'),
    description: f('Een dag Efteling is voor veel scholen het hoogtepunt van het jaar. Wij zetten u af bij de groepsingang en staan aan het einde van de dag weer klaar.', 'A day at Efteling is the highlight of the year for many schools. We drop you at the group entrance and are ready again at the end of the day.'),
    suggestedTrips: [
      { title: f('Schoolreis groep 5 t/m 8', 'School trip for ages 8–12'), text: f('Vertrek om 8:30, terug rond 17:30.', 'Depart at 8:30, back around 17:30.') },
      { title: f('Familiedag', 'Family day'), text: f('Met de hele familie of vereniging naar het park.', 'Visit the park with your whole family or club.') },
    ],
    serviceIds: ['s2', 's5'], vehicleIds: ['v4', 'v6'], blogIds: ['b3'],
    seoTitle: f('Bus naar de Efteling', 'Coach to Efteling'), seoDescription: f('Groepsvervoer naar de Efteling.', 'Group transport to Efteling.'),
  },
  {
    id: 'd3', slug: 'zaanse-schans', name: f('Zaanse Schans', 'Zaanse Schans'), country: nlc, distanceKm: 60, image: '/images/windmills.jpg', images: ['/images/windmills.jpg', '/images/windmill-2.jpg'],
    short: f('Molens, klompen en kaas: Holland op zijn mooist.', 'Windmills, clogs and cheese: Holland at its best.'),
    description: f('De Zaanse Schans is perfect voor internationale gasten en dagtochten. Combineer het met Volendam en Marken voor een complete Hollandse dag.', 'The Zaanse Schans is perfect for international guests and day trips. Combine it with Volendam and Marken for a complete Dutch day.'),
    suggestedTrips: [
      { title: f('Zaanse Schans en Volendam', 'Zaanse Schans and Volendam'), text: f('Een klassieke dagtocht door Noord-Holland.', 'A classic day trip through North Holland.') },
    ],
    serviceIds: ['s3', 's5'], vehicleIds: ['v3', 'v4'], blogIds: ['b2'],
    seoTitle: f('Dagtocht Zaanse Schans per bus', 'Zaanse Schans day trip by coach'), seoDescription: f('Bus huren naar de Zaanse Schans.', 'Coach hire to the Zaanse Schans.'),
  },
  {
    id: 'd4', slug: 'brussels', name: f('Brussel', 'Brussels'), country: f('België', 'Belgium'), distanceKm: 210, image: '/images/brussels.jpg', images: ['/images/brussels.jpg'],
    short: f('Europese hoofdstad met de Grote Markt en het Atomium.', 'European capital with the Grand Place and the Atomium.'),
    description: f('Brussel is goed bereikbaar binnen drie uur. Populair bij scholen voor een bezoek aan het Europees Parlement en bij bedrijven voor congressen.', 'Brussels is easily reached within three hours. Popular with schools visiting the European Parliament and with companies for conferences.'),
    suggestedTrips: [
      { title: f('Europees Parlement', 'European Parliament'), text: f('Educatieve dagtocht voor bovenbouwleerlingen.', 'Educational day trip for upper-school pupils.') },
    ],
    serviceIds: ['s2', 's3', 's9'], vehicleIds: ['v4', 'v5'], blogIds: ['b1'],
    seoTitle: f('Touringcar naar Brussel', 'Coach to Brussels'), seoDescription: f('Met de groep naar Brussel.', 'Group travel to Brussels.'),
  },
  {
    id: 'd5', slug: 'paris', name: f('Parijs', 'Paris'), country: f('Frankrijk', 'France'), distanceKm: 500, image: '/images/paris.jpg', images: ['/images/paris.jpg'],
    short: f('Stad van het licht. Ideaal voor een meerdaagse groepsreis.', 'City of light. Ideal for a multi-day group trip.'),
    description: f('Een reis naar Parijs plannen wij met voldoende rusttijden en kennis van de lokale regels voor touringcars. Wij adviseren u graag over parkeren en ophaalpunten.', 'We plan trips to Paris with sufficient rest times and knowledge of local coach regulations. We are happy to advise on parking and pick-up points.'),
    suggestedTrips: [
      { title: f('Driedaagse stedentrip', 'Three-day city break'), text: f('Inclusief vervoer ter plaatse.', 'Including local transport on site.') },
      { title: f('Disneyland Paris', 'Disneyland Paris'), text: f('Populair bij scholen en families.', 'Popular with schools and families.') },
    ],
    serviceIds: ['s6', 's7', 's9'], vehicleIds: ['v4', 'v5'], blogIds: ['b1', 'b5'],
    seoTitle: f('Busreis naar Parijs', 'Coach trip to Paris'), seoDescription: f('Touringcar huren naar Parijs.', 'Coach hire to Paris.'),
  },
  {
    id: 'd6', slug: 'berlin', name: f('Berlijn', 'Berlin'), country: f('Duitsland', 'Germany'), distanceKm: 650, image: '/images/berlin.jpg', images: ['/images/berlin.jpg'],
    short: f('Geschiedenis, cultuur en een populaire eindreis.', 'History, culture and a popular graduation trip.'),
    description: f('Berlijn is een van de populairste bestemmingen voor examenreizen. Wij rijden met twee chauffeurs zodat de reis in één dag kan.', 'Berlin is one of the most popular destinations for graduation trips. We drive with two drivers so the journey can be done in one day.'),
    suggestedTrips: [
      { title: f('Examenreis 4 dagen', '4-day graduation trip'), text: f('Inclusief stadsrondrit met de bus.', 'Including a coach city tour.') },
    ],
    serviceIds: ['s2', 's6', 's9'], vehicleIds: ['v5', 'v6'], blogIds: ['b5'],
    seoTitle: f('Touringcar naar Berlijn', 'Coach to Berlin'), seoDescription: f('Groepsreis naar Berlijn.', 'Group trip to Berlin.'),
  },
  {
    id: 'd7', slug: 'tirol', name: f('Tirol', 'Tyrol'), country: f('Oostenrijk', 'Austria'), distanceKm: 900, image: '/images/ski.jpg', images: ['/images/ski.jpg', '/images/ski-2.jpg'],
    short: f('Skigebieden zoals Kitzbühel, Mayrhofen en Sölden.', 'Ski areas such as Kitzbühel, Mayrhofen and Sölden.'),
    description: f('Voor skireizen naar Tirol rijden wij ’s nachts met twee chauffeurs, zodat u ’s ochtends uitgerust op de piste staat.', 'For ski trips to Tyrol we drive overnight with two drivers, so you arrive rested on the slopes in the morning.'),
    suggestedTrips: [
      { title: f('Skiweek Mayrhofen', 'Ski week Mayrhofen'), text: f('Vertrek vrijdagavond, terug zondag een week later.', 'Leave Friday evening, back the following Sunday.') },
    ],
    serviceIds: ['s8', 's9'], vehicleIds: ['v5', 'v6'], blogIds: ['b4'],
    seoTitle: f('Skibus naar Oostenrijk', 'Ski coach to Austria'), seoDescription: f('Skireis per touringcar.', 'Ski trip by coach.'),
  },
  {
    id: 'd8', slug: 'costa-brava', name: f('Costa Brava', 'Costa Brava'), country: f('Spanje', 'Spain'), distanceKm: 1400, image: '/images/beach.jpg', images: ['/images/beach.jpg'],
    short: f('Zon, zee en strand voor jongerenreizen en vakanties.', 'Sun, sea and beaches for youth trips and holidays.'),
    description: f('De Costa Brava is een geliefde bestemming voor jongerenreizen. Wij verzorgen het vervoer heen en terug, eventueel met een tussenstop.', 'The Costa Brava is a much-loved destination for youth trips. We handle the transport there and back, with an optional stopover.'),
    suggestedTrips: [
      { title: f('Jongerenreis 10 dagen', '10-day youth trip'), text: f('Met overnachting in Zuid-Frankrijk.', 'With an overnight stop in southern France.') },
    ],
    serviceIds: ['s7', 's9'], vehicleIds: ['v5'], blogIds: [],
    seoTitle: f('Busreis Costa Brava', 'Coach trip Costa Brava'), seoDescription: f('Met de bus naar Spanje.', 'By coach to Spain.'),
  },
];
