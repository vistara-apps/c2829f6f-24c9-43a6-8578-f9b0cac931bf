// Mock user database - in production, this would be a real database
const usersDatabase: Record<string, any> = {
  'user123': {
    farcasterId: 'user123',
    factCredits: 5,
    freeTierUsage: 2,
    creationDate: '2024-01-01T00:00:00Z'
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const farcasterId = searchParams.get('farcasterId')

  if (!farcasterId) {
    return Response.json({ error: 'farcasterId parameter required' }, { status: 400 })
  }

  const user = usersDatabase[farcasterId]

  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }

  return Response.json(user)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { farcasterId } = body

  if (!farcasterId) {
    return Response.json({ error: 'farcasterId required' }, { status: 400 })
  }

  // Create new user if doesn't exist
  if (!usersDatabase[farcasterId]) {
    usersDatabase[farcasterId] = {
      farcasterId,
      factCredits: 3, // Free tier
      freeTierUsage: 0,
      creationDate: new Date().toISOString()
    }
  }

  return Response.json(usersDatabase[farcasterId])
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { farcasterId, factCredits, freeTierUsage } = body

  if (!farcasterId) {
    return Response.json({ error: 'farcasterId required' }, { status: 400 })
  }

  if (!usersDatabase[farcasterId]) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }

  // Update user
  if (factCredits !== undefined) {
    usersDatabase[farcasterId].factCredits = factCredits
  }
  if (freeTierUsage !== undefined) {
    usersDatabase[farcasterId].freeTierUsage = freeTierUsage
  }

  return Response.json(usersDatabase[farcasterId])
}

