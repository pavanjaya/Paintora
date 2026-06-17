export type SpaceStory = {
  slug: string
  tag: string
  label: string
  title: string
  headline: string
  intro: string
  heroImg: string
  sections: {
    heading?: string
    body: string
  }[]
  highlights: string[]
  whyItWorks: string
  curatedNote: string
  paintings: {
    src: string
    name: string
    style: string
    href: string
  }[]
  relatedSlugs: string[]
}

export const SPACE_STORIES: SpaceStory[] = [
  {
    slug: 'authority-and-gravitas',
    tag: 'Commercial',
    label: 'Executive Office',
    title: 'Authority & Gravitas',
    headline: 'A contemporary law office where thoughtfully curated art creates an atmosphere of confidence, clarity, and lasting first impressions.',
    intro: 'Every detail within a professional space influences how people feel. From the moment clients step inside, the environment communicates values before a single conversation begins. In this project, carefully selected contemporary paintings complement clean architecture, natural materials, and restrained color palettes to create a reception that feels refined, welcoming, and trustworthy.\n\nRather than competing for attention, each artwork works in harmony with the space—adding depth, texture, and visual balance while reinforcing the firm's modern identity.',
    heroImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=90',
    sections: [
      {
        heading: 'The Story',
        body: 'A law office is more than a workplace; it\'s a place where important decisions are made and relationships are built on trust. The design philosophy behind this space was to create an environment that feels approachable without compromising professionalism.\n\nLarge abstract compositions introduce quiet sophistication, while neutral tones and organic forms soften the structured architecture. Warm wood finishes, natural light, and curated artwork together create an experience that is calm, confident, and timeless.\n\nThe result is a reception and meeting environment where visitors feel at ease and every wall contributes to the overall narrative of credibility and excellence.',
      },
      {
        heading: 'Why It Works',
        body: 'Artwork has the ability to shape perception. In professional interiors, carefully chosen paintings create moments of pause, introduce personality, and make large spaces feel more inviting without overwhelming the architecture.\n\nThis project demonstrates how thoughtful curation can transform ordinary walls into meaningful visual experiences that support the identity of the space and the people who use it.',
      },
      {
        heading: 'Curated by Paintora',
        body: 'Every painting featured in this project has been selected to complement the interior\'s scale, lighting, materials, and purpose. Together they create a cohesive visual language that elevates the everyday experience of the workplace.\n\nBecause great spaces aren\'t just designed—they\'re thoughtfully curated.',
      },
    ],
    highlights: [
      'Curated contemporary abstract paintings',
      'Neutral and monochromatic color palette',
      'Natural wood and stone textures',
      'Minimal visual distractions',
      'Art positioned as architectural focal points',
      'Designed to enhance professionalism and warmth simultaneously',
    ],
    whyItWorks: 'Artwork has the ability to shape perception. In professional interiors, carefully chosen paintings create moments of pause, introduce personality, and make large spaces feel more inviting without overwhelming the architecture.',
    curatedNote: 'Every painting featured in this project has been selected to complement the interior\'s scale, lighting, materials, and purpose. Together they create a cohesive visual language that elevates the everyday experience of the workplace.',
    paintings: [
      { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80', name: 'Abstract Calm', style: 'Abstract · Acrylic', href: '/styles/abstract' },
      { src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80', name: 'Monochrome Study', style: 'Minimalist · Oil', href: '/styles/minimalist' },
      { src: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=80', name: 'Geometric Resolve', style: 'Geometric · Mixed Media', href: '/styles/geometric' },
    ],
    relatedSlugs: ['warm-atmosphere', 'grand-welcome'],
  },
  {
    slug: 'contemporary-arrangement',
    tag: 'Residential',
    label: 'Modern Living Room',
    title: 'Contemporary Arrangement',
    headline: 'A curated living room where art becomes the quiet anchor of a thoughtfully designed modern home.',
    intro: 'The living room is where daily life unfolds — mornings with coffee, evenings with conversation, quiet moments in between. In this residential project, a carefully considered selection of contemporary paintings brings warmth, personality, and visual rhythm to a space that is both functional and deeply personal.',
    heroImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=90',
    sections: [
      {
        heading: 'The Story',
        body: 'Designing a living room around art requires understanding how light moves through the space and how the eye travels across a wall. Here, a large abstract canvas anchors the main wall, drawing the eye without overpowering the furniture beneath it.\n\nSmaller complementary works create a sense of depth and dialogue across the room. The palette — warm neutrals, dusty blues, and soft ochres — connects seamlessly with the linen sofas, natural wood floors, and the filtered afternoon light that fills the space.',
      },
      {
        heading: 'Curated by Paintora',
        body: 'Each piece was selected to work individually and as part of a cohesive whole. The result is a living room that feels lived-in and considered — where the art is not decoration, but story.',
      },
    ],
    highlights: [
      'Large-format anchor painting on the main wall',
      'Warm neutral and earthy palette',
      'Natural light considered in artwork placement',
      'Mix of scale for visual rhythm',
      'Art chosen to complement, not compete',
    ],
    whyItWorks: 'In residential spaces, art should feel personal and intentional. The right painting on the right wall transforms a room from a collection of furniture into a place that reflects who lives there.',
    curatedNote: 'Paintora paintings are selected for how they interact with natural light, room scale, and the overall material palette — not just how they look in isolation.',
    paintings: [
      { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80', name: 'Warm Abstract', style: 'Abstract · Oil', href: '/styles/abstract' },
      { src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80', name: 'Soft Landscape', style: 'Landscape · Watercolor', href: '/subjects/landscape' },
    ],
    relatedSlugs: ['authority-and-gravitas', 'quiet-luxury'],
  },
  {
    slug: 'warm-atmosphere',
    tag: 'Hospitality',
    label: 'Boutique Café',
    title: 'Warm Atmosphere',
    headline: 'A boutique café where art creates the mood before the first sip — layered, inviting, and impossible to forget.',
    intro: 'Cafés live and die by atmosphere. The right space makes people want to linger — to order another coffee, to open a notebook, to return tomorrow. In this project, a carefully curated selection of paintings transforms a small café into a destination with a distinct personality and warmth.',
    heroImg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=90',
    sections: [
      {
        heading: 'The Story',
        body: 'The brief was simple: make it feel like someone\'s favourite place. Not a chain. Not a concept. A real, warm, considered space where the art felt chosen rather than purchased by the metre.\n\nEarthy tones, botanical prints, and expressive brushwork create a visual landscape that shifts with the light — lively in the morning, intimate by evening. Every wall has a reason, and every painting earns its place.',
      },
      {
        heading: 'Curated by Paintora',
        body: 'Hospitality spaces demand art that works across moods, times of day, and diverse audiences. Paintora\'s curation process considers all of this — selecting works that add character without overwhelming, and that age gracefully as the space evolves.',
      },
    ],
    highlights: [
      'Earthy, warm tonal palette',
      'Botanical and nature-inspired works',
      'Art scaled to intimate seating areas',
      'Mix of styles for eclectic warmth',
      'Considered placement to guide the eye through the space',
    ],
    whyItWorks: 'In hospitality, art is never just decoration — it is part of the experience guests remember and return for. The right curation creates emotional memory.',
    curatedNote: 'Every artwork in this café was chosen to feel personal, warm, and slightly unexpected — the kind of art that makes guests look twice and stay a little longer.',
    paintings: [
      { src: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=80', name: 'Botanical Study', style: 'Nature · Watercolor', href: '/subjects/nature' },
      { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80', name: 'Earth & Form', style: 'Abstract · Acrylic', href: '/styles/abstract' },
    ],
    relatedSlugs: ['grand-welcome', 'authority-and-gravitas'],
  },
  {
    slug: 'grand-welcome',
    tag: 'Hospitality',
    label: 'Hotel Lobby',
    title: 'Grand Welcome',
    headline: 'A hotel lobby where monumental art sets the tone for every guest\'s experience from the first step inside.',
    intro: 'The lobby is the first impression and the last memory. In this luxury hotel project, large-scale paintings create an immediate sense of arrival — communicating the hotel\'s identity before a word is spoken or a key is handed over.',
    heroImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=90',
    sections: [
      {
        heading: 'The Story',
        body: 'Scale matters in hospitality. A painting that feels generous in a home may disappear entirely in a double-height hotel lobby. This project required rethinking artwork at architectural scale — selecting pieces whose presence commands attention without creating visual noise.\n\nThe chosen works are bold but not aggressive. Contemporary but not cold. They invite guests to pause, to look more carefully, and to feel that they have arrived somewhere genuinely distinctive.',
      },
      {
        heading: 'Curated by Paintora',
        body: 'Hotel curation is a long-term relationship between art and architecture. Paintora works to understand the spatial experience holistically — how guests move, where they pause, and what they will see first, last, and most often.',
      },
    ],
    highlights: [
      'Monumental scale artwork for double-height spaces',
      'Works chosen for architectural presence',
      'Contemporary palette aligned to brand identity',
      'Art as a navigation and orientation tool',
      'Designed to photograph beautifully for guest sharing',
    ],
    whyItWorks: 'Hotels that invest in serious art curation create spaces guests remember and return to. Art at this scale communicates confidence, investment, and a genuine point of view.',
    curatedNote: 'Every piece in this lobby was considered against the building\'s architecture, the brand\'s visual identity, and the emotional journey of arriving guests.',
    paintings: [
      { src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80', name: 'Grand Form', style: 'Contemporary · Oil', href: '/styles/contemporary' },
      { src: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=80', name: 'Arrival', style: 'Abstract · Mixed Media', href: '/styles/abstract' },
    ],
    relatedSlugs: ['warm-atmosphere', 'authority-and-gravitas'],
  },
  {
    slug: 'quiet-luxury',
    tag: 'Residential',
    label: 'Luxury Bedroom',
    title: 'Quiet Luxury',
    headline: 'A bedroom where art disappears into the atmosphere — felt more than seen, calm more than decorative.',
    intro: 'In a bedroom, art should never demand attention. It should deepen the sense of rest, add a layer of considered beauty, and feel entirely at home in the most personal room of the house. This project explores that quiet relationship between art and the spaces we sleep in.',
    heroImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=90',
    sections: [
      {
        heading: 'The Story',
        body: 'The palette here is deliberately restrained. Soft whites, warm greys, and muted sage create a room that feels like a breath of fresh air. The paintings chosen are neither too bright nor too dark — they exist in a tonal middle ground that supports sleep and calm.\n\nPlacement was carefully considered. A horizontal work above the bed creates a natural horizon line that draws the eye and settles the mind. Smaller works on adjacent walls add depth without distraction.',
      },
      {
        heading: 'Curated by Paintora',
        body: 'Bedrooms require the most personal curation of any space. The art chosen here will be seen every morning and every evening — it must earn that daily intimacy. Paintora\'s process for residential bedrooms starts with how the room feels at its quietest.',
      },
    ],
    highlights: [
      'Restrained, tonal palette',
      'Horizontal format above the bed',
      'Works chosen for their calming quality',
      'Scale considered against ceiling height',
      'Art that supports rest rather than stimulating it',
    ],
    whyItWorks: 'Bedrooms reveal the true purpose of curation — not to fill walls, but to support the life lived in the room. Art here is intimate, personal, and quietly essential.',
    curatedNote: 'Each painting was selected for how it feels at rest — soft, grounded, and completely at home in a space designed for recovery and reflection.',
    paintings: [
      { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80', name: 'Soft Horizon', style: 'Minimalist · Watercolor', href: '/styles/minimalist' },
      { src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80', name: 'Still Morning', style: 'Impressionism · Oil', href: '/styles/impressionism' },
    ],
    relatedSlugs: ['contemporary-arrangement', 'curated-calm'],
  },
  {
    slug: 'curated-calm',
    tag: 'Residential',
    label: 'Home Library',
    title: 'Curated Calm',
    headline: 'A home library where art and books share the wall — each adding meaning to the other.',
    intro: 'A library is already a room full of stories. Adding art to that context requires sensitivity — pieces that complement without competing, that add visual depth to a room already rich with texture and meaning.',
    heroImg: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1600&q=90',
    sections: [
      {
        heading: 'The Story',
        body: 'The challenge in a home library is finding the walls. Books claim most of the space, and rightly so. The art here was chosen to inhabit the moments between shelves — narrow vertical works that punctuate the horizontal rhythm of spines and pages.\n\nThe result is a room where everything has been considered. Where sitting to read feels like being inside a perfectly composed image.',
      },
      {
        heading: 'Curated by Paintora',
        body: 'Libraries reward patience in curation. The works chosen here were selected over time — each one earning its place through repeated consideration rather than instant appeal.',
      },
    ],
    highlights: [
      'Vertical format works between shelving',
      'Tone and palette matched to book spines',
      'Art chosen for quiet, sustained appeal',
      'Works that reward close looking',
      'Considered scale against ceiling height',
    ],
    whyItWorks: 'In a library, art must earn the competition. Books are already a form of curated visual and intellectual richness. Art that belongs here must add to that depth, not distract from it.',
    curatedNote: 'Paintora\'s curation for this library prioritised works with sustained visual interest — paintings that reveal more over time, matching the experience of reading itself.',
    paintings: [
      { src: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=80', name: 'Still Study', style: 'Still Life · Oil', href: '/subjects/still-life' },
      { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80', name: 'Quiet Form', style: 'Minimalist · Acrylic', href: '/styles/minimalist' },
    ],
    relatedSlugs: ['quiet-luxury', 'contemporary-arrangement'],
  },
]

export function getSpaceStory(slug: string): SpaceStory | null {
  return SPACE_STORIES.find(s => s.slug === slug) ?? null
}
