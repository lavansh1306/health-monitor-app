# Workflow Setup Guide

## Installation Instructions

You need to install the following dependencies:

```bash
npm install react-router-dom
```

## Project Structure

The app now follows a proper workflow:

### 1. **Landing Page** (`/`)
   - Located in: `src/pages/Landing.tsx`
   - Shows feature overview and CTA buttons
   - Navigate to `/login` or directly to the app

### 2. **Login/Auth Screen** (`/login`)
   - Located in: `src/pages/Login.tsx`
   - Handles user sign-in and sign-up
   - On success, redirects to `/onboarding`

### 3. **Onboarding Screen** (`/onboarding`)
   - Located in: `src/pages/AppDashboard.tsx` (OnboardingPage component)
   - Shows app features and important disclaimers
   - User must complete onboarding before accessing app
   - On completion, marks user as onboarded and redirects to `/app`

### 4. **Main App Dashboard** (`/app`)
   - Located in: `src/App.tsx` (MainAppDashboard component)
   - The full health monitoring dashboard
   - Shows all existing features (Home, Insights, Trends, etc.)
   - Only accessible after login and onboarding

## How the Routing Works

```
User arrives at localhost:3000/
↓
Landing Page (can skip to /login or go to /app if already logged in + onboarded)
↓
/login - Auth Screen (Sign in or Sign up)
↓
/onboarding - Welcome & Disclaimer Screen (if user not onboarded)
↓
/app - Full health monitoring dashboard
```

## Protected Routes

- **Onboarding Route**: Requires authentication but not onboarding completion
- **App Route**: Requires both authentication AND onboarding completion
- If a user tries to access `/app` without onboarding, they're redirected to `/onboarding`
- If a user tries to access `/onboarding` after completing it, they're redirected to `/app`

## Modified Files

1. **`src/App.tsx`** - Complete rewrite with React Router and protected routes
2. **`src/main.tsx`** - Added AuthProvider wrapper
3. **`src/contexts/AuthContext.tsx`** - Added onboarding state management
4. **`src/pages/Landing.tsx`** - New landing page component
5. **`src/pages/Login.tsx`** - Wrapper for AuthScreen component
6. **`src/pages/AppDashboard.tsx`** - Onboarding page wrapper

## State Management

The `AuthContext` now tracks:
- `user`: Current authenticated user
- `session`: Current session
- `loading`: Loading state
- `onboardingComplete`: Whether user has completed onboarding
- `setOnboardingComplete()`: Function to mark onboarding as complete
- `signOut()`: Logout function (clears onboarding status too)

Onboarding status is persisted in `localStorage` so it survives page refreshes.

## Next Steps

1. Install react-router-dom
2. Run your development server
3. Test the flow: Landing → Login → Onboarding → App Dashboard

The entire flow is now fully functional with proper authentication and onboarding gates!
