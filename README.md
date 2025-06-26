# PocketFin - Personal Finance Simulation & Education Platform

A comprehensive, modern web application for financial literacy education through interactive simulations and tools.

## Features

-   **Financial Simulation Engine**: Model major life events and long-term financial projections
-   **Investment Sandbox**: Build and track investment portfolios with real-time simulations
-   **Educational Content**: Age-grouped learning modules with interactive lessons and quizzes
-   **Advanced Tools**: Goal planning, loan analysis, and risk assessment
-   **Premium Features**: Advanced analytics and AI-powered insights (coming soon)

## Tech Stack

-   **Frontend**: Next.js 15, React 18, TypeScript
-   **Styling**: Tailwind CSS with custom design system
-   **Authentication**: Firebase Auth (email/password + Google Sign-in)
-   **Database**: Firebase Firestore
-   **Charts**: Recharts
-   **Icons**: Lucide React
-   **Animations**: Framer Motion

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   Firebase project with Auth and Firestore enabled

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/pocketfin.git
cd pocketfin
```

2. Install dependencies

```bash
npm install
```

3. Set up Firebase

    - Create a Firebase project
    - Enable Authentication (Email/Password and Google)
    - Enable Firestore Database
    - Update firebase config in `src/lib/firebase.ts`

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js 13+ app directory
├── components/          # Reusable React components
├── contexts/           # React contexts (Auth, etc.)
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## Troubleshooting

### Common Issues

1. **JSX Syntax Errors**: Make sure all components have proper React imports:

    ```typescript
    'use client'
    import React from 'react'
    ```

2. **Firebase Configuration**: Ensure your Firebase config is properly set up in `src/lib/firebase.ts`

3. **Environment Variables**: Create a `.env.local` file if you need custom environment variables

4. **Build Errors**: Clear Next.js cache if you encounter build issues:
    ```bash
    rm -rf .next
    npm run dev
    ```

## Deployment

The application is configured for deployment on Vercel:

```bash
npm run build
npm start
```

For Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
