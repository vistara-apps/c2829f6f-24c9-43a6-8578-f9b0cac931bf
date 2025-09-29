// Mock credit purchase - in production, this would integrate with payment processor
export async function POST(request: Request) {
  const body = await request.json()
  const { farcasterId, package: creditPackage } = body

  if (!farcasterId || !creditPackage) {
    return Response.json({ error: 'farcasterId and package required' }, { status: 400 })
  }

  // Mock credit packages
  const packages = {
    small: { credits: 10, price: 1 }, // $1 for 10 credits
    medium: { credits: 50, price: 4 }, // $4 for 50 credits
    large: { credits: 100, price: 7 } // $7 for 100 credits
  }

  const selectedPackage = packages[creditPackage as keyof typeof packages]
  if (!selectedPackage) {
    return Response.json({ error: 'Invalid package' }, { status: 400 })
  }

  // In real app, process payment here
  // For now, just return success with credit amount

  return Response.json({
    success: true,
    credits: selectedPackage.credits,
    price: selectedPackage.price
  })
}

