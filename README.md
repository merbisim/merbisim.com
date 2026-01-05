# Merbisim Portfolio

Modern portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🌐 Multi-language (TR/EN) with next-intl
- 🌓 Dark/Light mode with next-themes
- ⚡ Next.js 15 with App Router
- 🎨 Tailwind CSS for styling
- ✨ Framer Motion animations
- 📱 Fully responsive design
- 🚀 Optimized for performance

## Environment Variables

Create a `.env.local` file in the root directory and add:

```env
RESEND_API_KEY=your_resend_api_key_here
```

### Getting Resend API Key

1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Navigate to API Keys section
3. Create a new API key
4. Copy the key and add it to `.env.local`
5. In Vercel, add the same key to your project's Environment Variables

**Note:** The contact form will send emails to `mehmet@hec-engineering.com` when submitted.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm run start
```

## Deploy

This project is ready to deploy on Vercel.

## License

© 2025 Mehmet Erbişim. All rights reserved.

