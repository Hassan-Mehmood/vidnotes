# VidNotes - YouTube Video Transcript & AI Summary App

A Next.js application that fetches YouTube video transcripts and generates AI-powered summaries using OpenAI.

## Features

- 🎥 YouTube video discovery and browsing
- 📝 Automatic transcript extraction from YouTube videos
- 🤖 AI-powered video summaries using OpenAI GPT
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔐 User authentication with Clerk
- 💾 Database integration with Drizzle ORM

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# YouTube Data API
GCP_API_KEY=your_youtube_api_key_here

# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# Supadata API (for transcript fetching)
SUPADATA_API_KEY=your_supadata_api_key_here

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_database_url_here
```

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
