import type { BlogCategory, BlogPost } from '@/lib/types';

const f = (nl: string, en: string) => ({ nl, en });

export const blogCategories: BlogCategory[] = [
  { id: 'tips', name: f('Reistips', 'Travel tips') },
  { id: 'destinations', name: f('Bestemmingen', 'Destinations') },
  { id: 'schools', name: f('Scholen', 'Schools') },
  { id: 'business', name: f('Zakelijk', 'Business') },
  { id: 'news', name: f('Nieuws', 'News') },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1', slug: 'planning-a-group-trip-abroad', categoryId: 'tips', image: '/images/brussels.jpg', author: 'Sanne de Vries', date: '2026-09-28', status: 'published', featured: true,
    title: f('Zo plant u een groepsreis naar het buitenland', 'How to plan a group trip abroad'),
    excerpt: f('Van rij- en rusttijden tot milieuzones: vijf dingen om te regelen voordat u met de bus de grens over gaat.', 'From driving hours to low-emission zones: five things to arrange before you cross the border by coach.'),
    content: f(
      'Een groepsreis naar het buitenland vraagt om iets meer voorbereiding dan een dagtocht in Nederland. Met deze tips voorkomt u verrassingen onderweg.\n\n## Houd rekening met rij- en rusttijden\nEen chauffeur mag maximaal 9 uur per dag rijden en moet na 4,5 uur een pauze nemen. Voor lange afstanden plannen wij daarom vaak een tweede chauffeur in.\n\n## Controleer milieuzones\nSteden als Parijs, Brussel en Berlijn hebben milieuzones. Onze bussen voldoen aan de Euro 6-norm, maar soms is registratie vooraf nodig. Dat regelen wij voor u.\n\n## Vraag tijdig een offerte aan\nIn het hoogseizoen zijn bussen snel volgeboekt. Vraag minimaal drie maanden van tevoren een offerte aan.',
      'A group trip abroad needs a little more preparation than a day trip in the Netherlands. These tips help you avoid surprises on the way.\n\n## Allow for driving and rest times\nA driver may drive a maximum of 9 hours a day and must take a break after 4.5 hours. For long distances we therefore often schedule a second driver.\n\n## Check low-emission zones\nCities like Paris, Brussels and Berlin have low-emission zones. Our coaches meet the Euro 6 standard, but advance registration is sometimes required. We arrange this for you.\n\n## Request a quote in good time\nIn peak season coaches are booked up quickly. Request a quote at least three months in advance.'),
    seoTitle: f('Groepsreis buitenland plannen', 'Planning a group trip abroad'), seoDescription: f('Tips voor een groepsreis per bus.', 'Tips for a group trip by coach.'),
  },
  {
    id: 'b2', slug: 'best-day-trips-north-holland', categoryId: 'destinations', image: '/images/windmill-2.jpg', author: 'Mark Jansen', date: '2026-09-14', status: 'published', featured: false,
    title: f('De mooiste dagtochten in Noord-Holland', 'The best day trips in North Holland'),
    excerpt: f('Molens, vissersdorpen en de hoofdstad: onze favoriete bestemmingen voor een groepsuitje.', 'Windmills, fishing villages and the capital: our favourite destinations for a group outing.'),
    content: f(
      'Noord-Holland heeft veel te bieden voor groepen. Dit zijn de bestemmingen die onze klanten het vaakst kiezen.\n\n## Zaanse Schans\nHistorische molens en ambachten op een half uur van Amsterdam.\n\n## Volendam en Marken\nTraditionele vissersdorpen aan het IJsselmeer, perfect te combineren met de Zaanse Schans.\n\n## Amsterdam\nMusea, grachten en de Jordaan. Wij zetten u af bij een officiële touringcarhalte.',
      'North Holland has a lot to offer for groups. These are the destinations our clients choose most often.\n\n## Zaanse Schans\nHistoric windmills and crafts half an hour from Amsterdam.\n\n## Volendam and Marken\nTraditional fishing villages on the IJsselmeer, easy to combine with the Zaanse Schans.\n\n## Amsterdam\nMuseums, canals and the Jordaan. We drop you at an official coach stop.'),
    seoTitle: f('Dagtochten Noord-Holland', 'Day trips North Holland'), seoDescription: f('Groepsuitjes in Noord-Holland.', 'Group outings in North Holland.'),
  },
  {
    id: 'b3', slug: 'safe-school-transport-checklist', categoryId: 'schools', image: '/images/school.jpg', author: 'Sanne de Vries', date: '2026-08-30', status: 'published', featured: false,
    title: f('Checklist voor veilig schoolvervoer', 'Checklist for safe school transport'),
    excerpt: f('Waar let u op bij het boeken van een bus voor een schoolreis? Een praktische checklist voor docenten.', 'What should you look for when booking a coach for a school trip? A practical checklist for teachers.'),
    content: f(
      'Bij schoolvervoer staat veiligheid voorop. Gebruik deze checklist bij het boeken.\n\n## Veiligheidsgordels\nZorg dat elke stoel een gordel heeft en dat leerlingen deze ook dragen.\n\n## Begeleiding\nReken op minimaal één begeleider per tien leerlingen.\n\n## Contactgegevens\nDeel vooraf het telefoonnummer van de chauffeur en onze 24/7-lijn met de begeleiders.',
      'In school transport, safety comes first. Use this checklist when booking.\n\n## Seat belts\nMake sure every seat has a belt and that pupils actually wear them.\n\n## Supervision\nPlan for at least one supervisor per ten pupils.\n\n## Contact details\nShare the driver’s phone number and our 24/7 line with supervisors in advance.'),
    seoTitle: f('Veilig schoolvervoer', 'Safe school transport'), seoDescription: f('Checklist voor schoolreizen.', 'Checklist for school trips.'),
  },
  {
    id: 'b4', slug: 'ski-trip-by-coach', categoryId: 'tips', image: '/images/ski-2.jpg', author: 'Mark Jansen', date: '2026-08-12', status: 'published', featured: false,
    title: f('Waarom met de bus op wintersport?', 'Why travel to the slopes by coach?'),
    excerpt: f('Geen files in de bergen, geen gedoe met sneeuwkettingen en samen beginnen aan de vakantie.', 'No mountain traffic stress, no snow chains to fit and you start your holiday together.'),
    content: f(
      'Steeds meer groepen kiezen voor de touringcar als vervoer naar de wintersport.\n\n## Ontspannen reizen\nU slaapt onderweg terwijl twee ervaren chauffeurs rijden.\n\n## Ruimte voor uitrusting\nSki\'s, snowboards en koffers passen in de extra grote bagageruimte.\n\n## Duurzamer\nEén volle bus vervangt al snel twintig auto\'s.',
      'More and more groups choose the coach to get to their ski holiday.\n\n## Relaxed travel\nYou sleep on the way while two experienced drivers take the wheel.\n\n## Space for equipment\nSkis, snowboards and suitcases fit in the extra-large luggage hold.\n\n## More sustainable\nOne full coach quickly replaces twenty cars.'),
    seoTitle: f('Wintersport per touringcar', 'Ski holiday by coach'), seoDescription: f('Voordelen van de skibus.', 'Benefits of the ski coach.'),
  },
  {
    id: 'b5', slug: 'graduation-trip-ideas', categoryId: 'schools', image: '/images/berlin.jpg', author: 'Lisa Bakker', date: '2026-07-21', status: 'published', featured: false,
    title: f('Vijf populaire bestemmingen voor een eindreis', 'Five popular destinations for a graduation trip'),
    excerpt: f('Berlijn, Parijs, Londen, Praag of Barcelona? Een overzicht met reistijden en tips.', 'Berlin, Paris, London, Prague or Barcelona? An overview with travel times and tips.'),
    content: f(
      'Een eindreis is voor veel leerlingen een onvergetelijke ervaring. Dit zijn de vijf meest gekozen bestemmingen.\n\n## Berlijn\nOngeveer 7 uur rijden. Veel geschiedenis en cultuur.\n\n## Parijs\nOngeveer 5 uur rijden. Ideaal voor een driedaagse reis.\n\n## Praag\nOngeveer 10 uur rijden, vaak met een nachtrit.',
      'A graduation trip is an unforgettable experience for many pupils. These are the five most popular destinations.\n\n## Berlin\nAbout 7 hours by coach. Lots of history and culture.\n\n## Paris\nAbout 5 hours by coach. Ideal for a three-day trip.\n\n## Prague\nAbout 10 hours by coach, often with an overnight journey.'),
    seoTitle: f('Eindreis bestemmingen', 'Graduation trip destinations'), seoDescription: f('Ideeën voor een eindreis.', 'Ideas for a graduation trip.'),
  },
  {
    id: 'b6', slug: 'new-royal-class-coaches', categoryId: 'news', image: '/images/coach-4.jpg', author: 'Peter van Dijk', date: '2026-06-30', status: 'published', featured: false,
    title: f('Nieuw in onze vloot: drie Royal Class touringcars', 'New in our fleet: three Royal Class coaches'),
    excerpt: f('Met extra beenruimte, tafeltjes en wifi zijn onze nieuwe touringcars klaar voor lange reizen.', 'With extra legroom, tables and Wi-Fi, our new coaches are ready for long journeys.'),
    content: f(
      'Deze zomer hebben wij drie nieuwe Royal Class touringcars in gebruik genomen.\n\n## Meer comfort\nDe stoelen hebben 15 centimeter extra beenruimte en zijn verstelbaar.\n\n## Euro 6\nDe bussen voldoen aan de strengste milieunorm en mogen alle milieuzones in Europa in.',
      'This summer we put three new Royal Class coaches into service.\n\n## More comfort\nThe seats have 15 centimetres of extra legroom and recline.\n\n## Euro 6\nThe coaches meet the strictest emission standard and may enter all low-emission zones in Europe.'),
    seoTitle: f('Nieuwe Royal Class touringcars', 'New Royal Class coaches'), seoDescription: f('Nieuws uit onze vloot.', 'News from our fleet.'),
  },
  {
    id: 'b7', slug: 'staff-outing-ideas', categoryId: 'business', image: '/images/corporate.jpg', author: 'Lisa Bakker', date: '2026-06-10', status: 'published', featured: false,
    title: f('Tien ideeën voor een personeelsuitje met de bus', 'Ten ideas for a staff outing by coach'),
    excerpt: f('Van een proeverij in Limburg tot een dag op de Veluwe: inspiratie voor uw volgende teamuitje.', 'From a tasting in Limburg to a day on the Veluwe: inspiration for your next team outing.'),
    content: f(
      'Een personeelsuitje begint al in de bus. Hier zijn enkele ideeën.\n\n## Wijnproeverij in Limburg\nBezoek een wijngaard in Zuid-Limburg.\n\n## Actief op de Veluwe\nMountainbiken, wandelen en lunchen in de natuur.',
      'A staff outing starts on the coach. Here are some ideas.\n\n## Wine tasting in Limburg\nVisit a vineyard in South Limburg.\n\n## Active on the Veluwe\nMountain biking, walking and lunch in nature.'),
    seoTitle: f('Personeelsuitje ideeën', 'Staff outing ideas'), seoDescription: f('Inspiratie voor bedrijfsuitjes.', 'Company outing inspiration.'),
  },
  {
    id: 'b8', slug: 'winter-timetable-2027', categoryId: 'news', image: '/images/coach-1.jpg', author: 'Peter van Dijk', date: '2026-11-01', status: 'scheduled', featured: false,
    title: f('Wintersportseizoen 2027: nu boeken', 'Ski season 2027: book now'),
    excerpt: f('De eerste skibussen voor 2027 zijn al gereserveerd.', 'The first ski coaches for 2027 are already reserved.'),
    content: f('Concept voor de winterupdate.', 'Draft for the winter update.'),
    seoTitle: f('Wintersport 2027', 'Ski season 2027'), seoDescription: f('Boek uw skibus.', 'Book your ski coach.'),
  },
  {
    id: 'b9', slug: 'draft-sustainability', categoryId: 'news', image: '/images/coach-3.jpg', author: 'Sanne de Vries', date: '2026-10-05', status: 'draft', featured: false,
    title: f('Onze stappen richting emissievrij vervoer', 'Our steps towards zero-emission transport'),
    excerpt: f('Concept: plannen voor elektrische minibussen.', 'Draft: plans for electric minibuses.'),
    content: f('Concepttekst.', 'Draft text.'),
    seoTitle: f('Duurzaamheid', 'Sustainability'), seoDescription: f('', ''),
  },
];
