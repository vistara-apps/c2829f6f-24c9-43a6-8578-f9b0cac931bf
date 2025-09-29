'use client'

import { useState, useRef, useEffect } from 'react'
import { MiniKit } from '@coinbase/onchainkit'
import AppHeader from './components/AppHeader'
import CameraButton from './components/CameraButton'
import FactCard from './components/FactCard'
import CreditBalanceDisplay from './components/CreditBalanceDisplay'
import ShareButton from './components/ShareButton'

interface User {
  farcasterId: string
  factCredits: number
  freeTierUsage: number
  creationDate: string
}

interface VerifiedFact {
  factId: string
  objectId: string
  factText: string
  sourceUrl: string
  verificationDate: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [currentFact, setCurrentFact] = useState<VerifiedFact | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Initialize MiniKit
    if (typeof window !== 'undefined') {
      MiniKit.install()
    }

    // Load or create user
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      // In a real Base MiniApp, get farcasterId from MiniKit
      const farcasterId = 'user123' // Mock for now

      const response = await fetch(`/api/users?farcasterId=${farcasterId}`)
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        // Create new user
        const createResponse = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ farcasterId })
        })
        const newUser = await createResponse.json()
        setUser(newUser)
      }
    } catch (error) {
      console.error('Error loading user:', error)
    }
  }

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(track => track.stop())
      setCameraPermission(true)
    } catch (error) {
      console.error('Camera permission denied:', error)
      setCameraPermission(false)
    }
  }

  const handleCaptureImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check if user has credits
    if (!user || user.factCredits <= 0) {
      alert('You need credits to discover facts! Buy more credits to continue.')
      return
    }

    setIsLoading(true)
    setCapturedImage(URL.createObjectURL(file))

    try {
      // Mock object recognition - in real app, call vision API
      const mockObjectId = 'apple' // This would be detected from image

      // Call fact API
      const response = await fetch(`/api/facts?objectName=${mockObjectId}`)
      const fact = await response.json()

      setCurrentFact(fact)

      // Deduct credit
      if (user && user.factCredits > 0) {
        const updatedUser = { ...user, factCredits: user.factCredits - 1 }

        // Update user in database
        await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser)
        })

        setUser(updatedUser)
      }
    } catch (error) {
      console.error('Error processing image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleShareFact = async () => {
    if (!currentFact) return

    try {
      // Use MiniKit to share on Farcaster
      await MiniKit.actions.postToFeed({
        content: `Just discovered: ${currentFact.factText} #PicturaFacta`,
        image: capturedImage || undefined
      })
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  const handleBuyCredits = async () => {
    if (!user) return

    try {
      // Mock credit purchase - in real app, show payment UI
      const creditPackage = 'medium' // Could be selected by user

      const response = await fetch('/api/credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farcasterId: user.farcasterId,
          package: creditPackage
        })
      })

      const result = await response.json()

      if (result.success) {
        // Update user credits
        const updatedUser = { ...user, factCredits: user.factCredits + result.credits }

        await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser)
        })

        setUser(updatedUser)
        alert(`Successfully purchased ${result.credits} credits!`)
      }
    } catch (error) {
      console.error('Error purchasing credits:', error)
      alert('Failed to purchase credits. Please try again.')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Loading Pictura Facta...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-xl mx-auto px-4 pb-lg">
        <div className="text-center mb-xl">
          <h1 className="text-3xl font-bold mb-4">Point, Snap, Discover</h1>
          <p className="text-base leading-6 font-normal text-muted-foreground">
            Capture any object and instantly get a verified interesting fact about it.
          </p>
        </div>

        <CreditBalanceDisplay credits={user.factCredits} />

        {!cameraPermission && (
          <div className="text-center mb-lg">
            <p className="mb-md">We need camera access to capture objects</p>
            <button
              onClick={requestCameraPermission}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all duration-200"
            >
              Grant Camera Access
            </button>
          </div>
        )}

        <div className="text-center mb-lg">
          <CameraButton
            onClick={handleCaptureImage}
            disabled={!cameraPermission || !user || user.factCredits <= 0}
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="hidden"
        />

        {capturedImage && (
          <div className="mb-lg">
            <img
              src={capturedImage}
              alt="Captured object"
              className="w-full h-48 object-cover rounded-lg shadow-card"
            />
          </div>
        )}

        {isLoading && (
          <FactCard loading />
        )}

        {currentFact && !isLoading && (
          <FactCard fact={currentFact.factText} />
        )}

        {currentFact && (
          <div className="flex gap-md mt-lg">
            <ShareButton onClick={handleShareFact} />
            <button
              onClick={() => {
                setCurrentFact(null)
                setCapturedImage(null)
              }}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-lg transition-all duration-200"
            >
              Get Another Fact
            </button>
          </div>
        )}

        {user.factCredits === 0 && (
          <div className="text-center mt-lg">
            <button
              onClick={handleBuyCredits}
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-all duration-200"
            >
              Buy Credits
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
