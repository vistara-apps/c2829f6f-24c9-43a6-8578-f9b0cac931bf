// Mock facts database - in production, this would be a real database
const factsDatabase: Record<string, any[]> = {
  apple: [
    {
      factId: 'apple-1',
      objectId: 'apple',
      factText: 'The average person eats about 65 apples per year, which is about 10.5 pounds of apples annually.',
      sourceUrl: 'https://www.usapple.org/average-apple-consumption/',
      verificationDate: '2024-01-15T00:00:00Z'
    },
    {
      factId: 'apple-2',
      objectId: 'apple',
      factText: 'There are over 7,500 known cultivars of apples grown around the world.',
      sourceUrl: 'https://en.wikipedia.org/wiki/List_of_apple_cultivars',
      verificationDate: '2024-01-15T00:00:00Z'
    }
  ],
  book: [
    {
      factId: 'book-1',
      objectId: 'book',
      factText: 'The world\'s largest library is the Library of Congress in Washington, D.C., with over 170 million items.',
      sourceUrl: 'https://www.loc.gov/about/facts-and-figures/',
      verificationDate: '2024-01-15T00:00:00Z'
    },
    {
      factId: 'book-2',
      objectId: 'book',
      factText: 'The first printed book in Europe was the Gutenberg Bible, completed around 1455.',
      sourceUrl: 'https://en.wikipedia.org/wiki/Gutenberg_Bible',
      verificationDate: '2024-01-15T00:00:00Z'
    }
  ],
  chair: [
    {
      factId: 'chair-1',
      objectId: 'chair',
      factText: 'The oldest known chair dates back to ancient Egypt around 2600 BCE.',
      sourceUrl: 'https://en.wikipedia.org/wiki/Chair',
      verificationDate: '2024-01-15T00:00:00Z'
    }
  ],
  phone: [
    {
      factId: 'phone-1',
      objectId: 'phone',
      factText: 'The first mobile phone call was made by Martin Cooper in 1973 using a Motorola DynaTAC.',
      sourceUrl: 'https://en.wikipedia.org/wiki/Mobile_phone',
      verificationDate: '2024-01-15T00:00:00Z'
    }
  ],
  coffee: [
    {
      factId: 'coffee-1',
      objectId: 'coffee',
      factText: 'Coffee is the second most traded commodity in the world after oil.',
      sourceUrl: 'https://www.ico.org/',
      verificationDate: '2024-01-15T00:00:00Z'
    }
  ],
  // Default facts for unrecognized objects
  default: [
    {
      factId: 'default-1',
      objectId: 'unknown',
      factText: 'Did you know? The human brain uses about 20% of the body\'s total energy, despite making up only 2% of body weight.',
      sourceUrl: 'https://www.scientificamerican.com/article/why-does-the-brain-use-so/',
      verificationDate: '2024-01-15T00:00:00Z'
    },
    {
      factId: 'default-2',
      objectId: 'unknown',
      factText: 'Octopuses have three hearts and blue blood!',
      sourceUrl: 'https://ocean.si.edu/ocean-life/invertebrates/octopuses-and-squid',
      verificationDate: '2024-01-15T00:00:00Z'
    }
  ]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const objectName = searchParams.get('objectName')?.toLowerCase()

  if (!objectName) {
    return Response.json({ error: 'objectName parameter required' }, { status: 400 })
  }

  // Get facts for the object, or use default facts
  const facts = factsDatabase[objectName] || factsDatabase.default

  // Return a random fact
  const randomFact = facts[Math.floor(Math.random() * facts.length)]

  return Response.json(randomFact)
}
