'use client'

import { useState, useEffect } from 'react'
// import { MiniKit } from '@coinbase/onchainkit' // TODO: Implement when MiniKit API is available
import { Camera, Share2, CreditCard, Zap } from 'lucide-react'
import { CameraButton } from './components/CameraButton'
import { FactCard } from './components/FactCard'
import { CreditBalanceDisplay } from './components/CreditBalanceDisplay'
import { ShareButton } from './components/ShareButton'
import { AppHeader } from './components/AppHeader'

type User = {
  farcasterId: string
  factCredits: number
  freeTierUsage: number
  creationDate: string
}

type Object = {
  objectId: string
  name: string
  description: string
  imageUrl?: string
}

type VerifiedFact = {
  factId: string
  objectId: string
  factText: string
  sourceUrl: string
  verificationDate: string
}

type Lookup = {
  lookupId: string
  userId: string
  timestamp: string
  objectId: string
  factId: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [currentFact, setCurrentFact] = useState<VerifiedFact | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cameraPermission, setCameraPermission] = useState(false)

  useEffect(() => {
    // Initialize MiniKit
    // MiniKit.install() // TODO: Implement when MiniKit API is available

    // Fetch user data from API
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user?farcasterId=user123')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          // Create new user if not found
          const createResponse = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ farcasterId: 'user123' }),
          })
          if (createResponse.ok) {
            const userData = await createResponse.json()
            setUser(userData)
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        // Fallback to mock data
        setUser({
          farcasterId: 'user123',
          factCredits: 50,
          freeTierUsage: 2,
          creationDate: new Date().toISOString()
        })
      }
    }

    fetchUser()
  }, [])

  const handleCameraCapture = async () => {
    if (!cameraPermission) {
      // Request camera permission
      try {
        await navigator.mediaDevices.getUserMedia({ video: true })
        setCameraPermission(true)
      } catch (error) {
        console.error('Camera permission denied:', error)
        return
      }
    }

    setIsLoading(true)

    try {
      // In a real implementation, this would capture an actual image
      // For demo purposes, we'll simulate capturing an image
      const mockImageData = 'mock-image-data'

      // Call our facts API
      const response = await fetch('/api/facts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: mockImageData }),
      })

      if (!response.ok) {
        throw new Error('Failed to get fact')
      }

      const data = await response.json()

      const fact: VerifiedFact = {
        factId: data.fact.factId,
        objectId: data.objectId,
        factText: data.fact.factText,
        sourceUrl: data.fact.sourceUrl,
        verificationDate: data.fact.verificationDate
      }

      setCurrentFact(fact)

      // Deduct credits via API
      try {
        const creditResponse = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            farcasterId: 'user123',
            action: 'deduct',
            amount: 1
          }),
        })

        if (creditResponse.ok) {
          const updatedUser = await creditResponse.json()
          setUser(updatedUser)
        }
      } catch (error) {
        console.error('Error deducting credits:', error)
        // Fallback to local state update
        if (user) {
          setUser(prev => prev ? {
            ...prev,
            factCredits: Math.max(0, prev.factCredits - 1)
          } : null)
        }
      }
    } catch (error) {
      console.error('Error capturing image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = async () => {
    if (!currentFact) return

    try {
      // Use MiniKit to share on Farcaster
      // await MiniKit.actions.postToFeed({
      //   content: `Just discovered this amazing fact: ${currentFact.factText} #PicturaFacta`,
      //   embeds: []
      // }) // TODO: Implement when MiniKit API is available

      // For now, just log the share action
      console.log('Sharing fact:', currentFact.factText)
      alert('Fact shared! (This would post to Farcaster in production)')
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  const handleBuyCredits = () => {
    // In real app, this would open a payment flow
    console.log('Buy credits clicked')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-text-primary">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      <AppHeader />

      <main className="max-w-xl mx-auto px-4 pb-lg">
        <div className="space-y-md">
          {/* Camera Section */}
          <div className="text-center space-y-md">
            <h1 className="text-display font-bold text-text-primary">
              Point, Snap, Discover
            </h1>
            <p className="text-body text-text-secondary">
              Take a photo of any object and instantly get a verified fact about it!
            </p>

            <div className="relative">
              <div className="aspect-square bg-surface rounded-xl border-2 border-dashed border-primary/20 flex items-center justify-center">
                <Camera className="w-12 h-12 text-primary" />
              </div>
            </div>

            <CameraButton
              onClick={handleCameraCapture}
              disabled={isLoading || user.factCredits <= 0}
              className="w-full"
            >
              {isLoading ? 'Analyzing...' : 'Capture Object'}
            </CameraButton>
          </div>

          {/* Credit Balance */}
          <CreditBalanceDisplay credits={user.factCredits} />

          {/* Fact Display */}
          {currentFact && (
            <FactCard
              fact={currentFact}
              isLoading={isLoading}
            />
          )}

          {/* Action Buttons */}
          {currentFact && (
            <div className="space-y-sm">
              <ShareButton
                onClick={handleShare}
                className="w-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Fact
              </ShareButton>

              <button
                onClick={handleBuyCredits}
                className="w-full flex items-center justify-center px-md py-sm bg-accent text-text-primary rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Buy Credits
              </button>
            </div>
          )}

          {/* Free Tier Notice */}
          {user.freeTierUsage < 3 && (
            <div className="bg-surface rounded-lg p-md border border-primary/10">
              <div className="flex items-center space-x-sm">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-caption font-medium text-text-primary">
                  Free facts remaining: {3 - user.freeTierUsage}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
