# TradeGuard AI

![App Preview](https://imgix.cosmicjs.com/ce6163d0-3e79-11f1-9e0c-cb047c45156b-autopilot-photo-1604594849809-dfedbc827105-1776882829958.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern AI-powered trading dashboard that helps traders manage positions and receive intelligent exit advisories before small losses become big ones.

## Features

- 📈 Real-time trades dashboard with P&L tracking
- 🤖 AI advisory feed with cancel/hold recommendations
- 📊 Post-trade debriefs with lessons learned
- 🎯 Detailed views for trades, advisories, and debriefs
- 🏷️ Color-coded severity and outcome badges
- 📱 Fully responsive dark-mode design
- ⚡ Built with Next.js 16 and Cosmic CMS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69e9141d6323a358bfc52eb1&clone_repository=69e915546323a358bfc52eed)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: TradeGuard AI — The Core Problem It Solves: Most traders lose money not because they can't pick entries, but because they hold losing trades too long hoping for a reversal. Your app solves the emotional exit problem by having an AI that actively advises the trader to cancel (exit) when the market moves against them. Key Idea Summary: 'A real-time trading app with TradingView charts, where the AI watches your open trades and tells you cancel now before a small loss becomes a big one.'"

### Code Generation Prompt

> Build a Next.js application for a website called "TradeGuard". The content is managed in Cosmic CMS with the following object types: trades, ai-advisories, trade-debriefs. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS SDK

## Getting Started

### Prerequisites
- Bun or Node.js 18+
- A Cosmic account with the required content types

### Installation

```bash
bun install
bun run dev
```

### Environment Variables

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
// Fetch all trades
const response = await cosmic.objects
  .find({ type: 'trades' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app reads from three content types:
- **Trades** — Symbol, direction, entry/exit prices, P&L
- **AI Advisories** — AI exit recommendations linked to trades
- **Trade Debriefs** — Post-trade analysis linked to trades

## Deployment

Deploy to Vercel or Netlify. Set environment variables in your hosting dashboard.

<!-- README_END -->