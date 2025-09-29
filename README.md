# Pictura Facta

**Point, Snap, Discover: Verified Facts Instantly**

A Base MiniApp that allows users to instantly discover verified, interesting facts about any object they photograph.

## Features

- **Object Recognition & Fact Retrieval**: Capture an image of an object and get a verified fact about it
- **Fact Curation & Verification**: All facts are verified and sourced from reliable sources
- **In-Frame Sharing**: Share discovered facts directly on Farcaster
- **Credit System**: Micro-transaction based with free tier (3 facts/day) and credit packs

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Next.js API Routes
- **Blockchain**: Base MiniApp SDK (@coinbase/onchainkit)
- **Database**: In-memory (for demo) - production would use a real database

## API Documentation

### Facts API

**POST** `/api/facts`

Retrieves a verified fact about an object from an uploaded image.

**Request Body:**
```json
{
  "image": "base64-encoded-image-data"
}
```

**Response:**
```json
{
  "objectId": "eiffel-tower",
  "objectName": "Eiffel Tower",
  "fact": {
    "factId": "eiffel-1",
    "factText": "Did you know that the Eiffel Tower was originally intended to be a temporary structure...",
    "sourceUrl": "https://en.wikipedia.org/wiki/Eiffel_Tower",
    "verificationDate": "2024-01-15T00:00:00Z"
  }
}
```

### User API

**GET** `/api/user?farcasterId={id}`

Retrieves user information including credit balance.

**POST** `/api/user`

Creates or updates a user account.

**Request Body:**
```json
{
  "farcasterId": "user123",
  "action": "deduct|add",
  "amount": 1
}
```

## Design System

### Colors
- **Background**: `hsl(220, 20%, 98%)`
- **Accent**: `hsl(36, 95%, 55%)`
- **Primary**: `hsl(210, 95%, 45%)`
- **Surface**: `hsl(220, 20%, 100%)`
- **Text Primary**: `hsla(220, 15%, 15%, 0.95)`
- **Text Secondary**: `hsla(220, 15%, 15%, 0.7)`

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 20px
- **xl**: 32px

### Border Radius
- **sm**: 6px
- **md**: 10px
- **lg**: 16px
- **xl**: 20px

## Business Model

- **Free Tier**: 3 facts per day
- **Micro-transactions**: $0.10 per fact
- **Credit Packs**: 100 facts for $5
- **Subscription**: Unlimited facts (future feature)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment

The app is designed to run as a Base MiniApp within Farcaster frames. For production deployment:

1. Deploy to Vercel or similar platform
2. Configure Base MiniApp settings
3. Set up proper database (PostgreSQL, MongoDB, etc.)
4. Integrate real object recognition API (Google Cloud Vision, AWS Rekognition)
5. Implement proper user authentication via Farcaster
6. Set up payment processing for credit purchases

## Architecture

```
app/
├── api/
│   ├── facts/route.ts    # Fact retrieval API
│   └── user/route.ts     # User management API
├── components/
│   ├── AppHeader.tsx     # App header component
│   ├── CameraButton.tsx  # Camera capture button
│   ├── FactCard.tsx      # Fact display component
│   ├── CreditBalanceDisplay.tsx  # Credit balance display
│   ├── ShareButton.tsx   # Social sharing button
│   └── ThemeProvider.tsx # Theme provider
├── lib/
│   └── utils.ts          # Utility functions
├── globals.css           # Global styles
├── layout.tsx            # Root layout
└── page.tsx              # Main page
```

## Future Enhancements

- Real image capture using MiniKit camera API
- Integration with actual object recognition services
- User authentication via Farcaster
- Payment processing for credit purchases
- Social features and leaderboards
- Advanced fact categories and filtering
- Mobile app version

