# VitalSense - Health Monitoring Application UI

A modern, responsive health monitoring dashboard built with React, TypeScript, and Tailwind CSS. VitalSense provides real-time vital signs monitoring, health insights, trend analysis, and early screening detection for proactive wellness tracking.

> **Disclaimer**: This application is for wellness monitoring and research purposes only. It does not diagnose, treat, or cure any medical condition. Always consult a qualified healthcare professional for medical advice.

---

## 🎯 Features

### Core Capabilities
- **Real-time Vital Signs Monitoring** - Track SpO₂, heart rate, respiratory rate, and other key metrics
- **Health Insights & Analysis** - AI-powered early screening and health awareness features
- **Trend Tracking** - Visualize health patterns with detailed historical data analysis
- **Multi-Device Support** - Connect and monitor multiple wearable devices
- **Dark/Light Theme** - Full theme support with smooth transitions
- **Experimental Features** - Beta tools for advanced health screening and analysis

### User Features
- **Landing Page** - Engaging introduction with feature showcase
- **Secure Authentication** - Mock authentication system with local storage
- **Onboarding Flow** - Guided setup with important health disclaimers
- **User Profiles** - Customizable settings and preferences
- **Responsive Design** - Optimized for mobile, tablet, and desktop

---

## 📁 Project Structure

```
Health Monitoring App UI/
├── src/
│   ├── components/
│   │   ├── ui/                          # Radix UI primitive components
│   │   ├── AnimatedMetricCard.tsx       # Animated metric display
│   │   ├── AuthScreen.tsx               # Legacy auth (use Login.tsx)
│   │   ├── BottomNav.tsx                # Bottom navigation bar
│   │   ├── DetailModal.tsx              # Detail view modal
│   │   ├── DeviceStatus.tsx             # Device connectivity status
│   │   ├── ExperimentalFeatures.tsx     # Beta health indicators
│   │   ├── HealthInsights.tsx           # Health analysis section
│   │   ├── HealthMetricCard.tsx         # Reusable metric card
│   │   ├── HealthRiskRing.tsx           # Circular risk visualization
│   │   ├── HomeDashboard.tsx            # Main dashboard view
│   │   ├── MetricCard.tsx               # Basic metric display
│   │   ├── MetricGridCard.tsx           # Grid-based metric layout
│   │   ├── OnboardingScreen.tsx         # Onboarding flow component
│   │   ├── PageLayout.tsx               # Page wrapper with header
│   │   ├── ParticleBackground.tsx       # Animated background
│   │   ├── ProfileSettings.tsx          # User settings page
│   │   ├── SimpleGraph.tsx              # Chart component
│   │   ├── SleepCapture.tsx             # Sleep tracking
│   │   ├── StatusMonitor.tsx            # Status overview
│   │   └── TrendsHistory.tsx            # Historical trend view
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx              # Mock authentication context
│   │   └── ThemeContext.tsx             # Dark/Light theme context
│   │
│   ├── pages/
│   │   ├── Landing.tsx                  # Landing page
│   │   ├── Login.tsx                    # Login/Signup page
│   │   ├── AppDashboard.tsx             # Onboarding page wrapper
│   │   └── Home.tsx                     # Home page (unused)
│   │
│   ├── lib/
│   │   └── supabaseClient.ts            # (Legacy - not used in mock auth)
│   │
│   ├── styles/
│   │   ├── globals.css                  # Global styles
│   │   └── animations.css               # Custom animations
│   │
│   ├── App.tsx                          # Main app with routing
│   ├── main.tsx                         # React DOM entry point
│   └── index.css                        # Tailwind + base styles
│
├── public/
│   └── vite.svg
│
├── Configuration Files
├── package.json                         # Dependencies & scripts
├── tsconfig.json                        # TypeScript configuration
├── tailwind.config.ts                   # Tailwind theming
├── vite.config.ts                       # Vite build configuration
├── postcss.config.js                    # PostCSS for Tailwind
│
├── Documentation
├── README.md                            # This file
├── DESIGN_SYSTEM.md                     # Design system documentation
├── REFACTORING_NOTES.md                 # Component refactoring history
├── WORKFLOW_SETUP.md                    # Routing & auth flow guide
│
└── index.html                           # HTML entry point
```

---

## 🏗️ Tech Stack

### Frontend Framework
- **React 18.3** - UI component library
- **TypeScript** - Type-safe JavaScript
- **React Router v7** - Client-side routing
- **Vite 6.4** - Fast build tool & dev server

### UI & Styling
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Accordion, Dialog, Dropdown, Select, Tabs, Tooltip, etc.
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library

### Data & Visualization
- **Recharts** - React charting library
- **Embla Carousel** - Carousel component
- **React Day Picker** - Calendar component

### Forms & Utilities
- **React Hook Form** - Efficient form handling
- **next-themes** - Theme management
- **sonner** - Toast notifications
- **clsx / tailwind-merge** - Classname utilities

### Development
- **Vite React SWC** - Fast JSX transformation
- **TypeScript** - Static type checking

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   cd "Health Monitoring App UI"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   **Note**: The app uses a mock authentication system. No Supabase setup is required.

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000/
   ```

### Build for Production
```bash
npm run build
```

---

## 🔐 Authentication & User Flow

### How It Works

**Mock Authentication** - Uses localStorage for demo purposes. Any email/password combination works.

### User Journey

```
1. Landing Page (/)
   └─→ Feature overview & CTAs
       └─→ "Get Started" button

2. Login Page (/login)
   ├─→ Sign In with any email/password
   └─→ Sign Up with full name, email, password
       └─→ Credentials stored in localStorage
           └─→ Redirects to Onboarding

3. Onboarding Page (/onboarding)
   └─→ Welcome screen with feature showcase
       └─→ Important health disclaimers
           └─→ "I Understand, Continue" button
               └─→ Sets onboardingComplete flag
                   └─→ Redirects to Dashboard

4. App Dashboard (/app)
   └─→ Full health monitoring interface
       ├─→ Home (Vital signs overview)
       ├─→ Health Insights (Analysis & early screening)
       ├─→ Trends (Historical data & patterns)
       ├─→ Experimental (Beta health indicators)
       ├─→ Device Status (Connected devices)
       └─→ Settings (User preferences)
```

### Authentication State

```typescript
// AuthContext provides:
{
  user: { id, email, fullName } | null
  loading: boolean
  onboardingComplete: boolean
  signIn(email, password): Promise<void>
  signUp(email, password, fullName): Promise<void>
  signOut(): Promise<void>
  setOnboardingComplete(boolean): void
}
```

### Protected Routes
- **Onboarding** - Requires authentication, redirects if already onboarded
- **App Dashboard** - Requires authentication + onboarding completion
- **Landing & Login** - Public routes

---

## 📍 Routes & Pages

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Landing | Public | Feature showcase landing page |
| `/login` | LoginPage | Public | Sign in / Sign up form |
| `/onboarding` | OnboardingPage | Auth Only | Welcome & disclaimer screen |
| `/app` | MainAppDashboard | Auth + Onboarded | Main health dashboard |
| `*` | Redirect | - | Redirects to landing page |

### Dashboard Navigation

Inside `/app`, users can navigate between:
- **home** - Real-time vital signs overview
- **insights** - Health analysis & insights
- **trends** - Historical data & trend analysis
- **experimental** - Beta health indicators
- **device** - Connected device management
- **profile** - Settings & preferences

---

## 🎨 Design System

### Color Palette

#### Risk-Based Colors (Medical Context)
- **Emerald** - Low Risk / Healthy
- **Amber** - Medium Risk / Warning
- **Rose** - High Risk / Critical

#### Theme Support
- **Light Mode** - Clean, medical aesthetic (bg-white)
- **Dark Mode** - Modern dark interface (bg-gray-900)

### Component System

The app follows a component-based architecture with reusable, composable UI elements:

- **HealthMetricCard** - Display health metrics with risk indicators
- **HealthRiskRing** - Circular risk visualization
- **MetricCard** - Simple metric display
- **AnimatedMetricCard** - Animated metric transitions
- **PageLayout** - Page wrapper with header
- **BottomNav** - Mobile navigation bar

### Typography
- **Headings** - Bold sans-serif
- **Body** - Regular weight for readability
- **Captions** - Small, gray text for supplementary info

---

## 📊 Key Components Overview

### HomeDashboard
Central dashboard showing:
- Real-time vital signs (SpO₂, Heart Rate, Respiratory Rate)
- Health status overview
- Device connectivity status
- Quick action cards

### HealthInsights
Advanced health analysis with:
- Trend indicators
- Risk assessments
- Personalized recommendations
- Early screening warnings

### TrendsHistory
Historical data visualization:
- 30/90/12-month trends
- Interactive charts (Recharts)
- Pattern analysis
- Comparative metrics

### ExperimentalFeatures
Beta health indicators:
- Breathing irregularity detection
- Oxygen saturation risk analysis
- Cardiac recovery index
- Stress response assessment
- Physical activity scoring
- Circadian rhythm alignment

### DeviceStatus
Device management:
- Connected devices list
- Battery status
- Signal strength
- Sync information
- Device pairing options

### ProfileSettings
User preferences:
- Profile information
- Notification settings
- Privacy preferences
- Data export/import
- Account management

---

## 🎯 Features Details

### Real-time Monitoring
- Live vital sign updates from connected devices
- Historical data storage
- Alert thresholds
- Notification system

### Health Insights
- AI-powered early screening detection
- Risk level assessment (Low/Medium/High)
- Trend analysis and predictions
- Personalized health recommendations

### Trend Analysis
- Multi-timeframe views (1m, 3m, 12m)
- Pattern recognition
- Comparative analysis
- Export capabilities

### Device Integration
- Multi-device support
- Automatic sync
- Battery monitoring
- Signal strength indicator

---

## 🛠️ Development

### File Structure Best Practices

- **Components** - Reusable UI elements in `/components`
- **Pages** - Full page layouts in `/pages`
- **Contexts** - Global state management in `/contexts`
- **Styles** - CSS files in `/styles`
- **Lib** - Utility functions and helpers in `/lib`

### Adding New Features

1. Create component in `/components` if reusable
2. Create page in `/pages` if it's a full page
3. Add route in `App.tsx` if needed
4. Update navigation if needed
5. Follow existing design patterns

### Theming

The app uses `next-themes` for theme management:

```typescript
// Use theme context
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>
      {/* Content */}
    </div>
  );
}
```

### Authentication

Mock auth uses localStorage:

```typescript
// Use auth context
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, signIn, signOut, onboardingComplete } = useAuth();
  
  return (
    <div>
      {user ? `Welcome ${user.email}` : 'Please sign in'}
    </div>
  );
}
```

---

## 📝 Scripts

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production

# Other
npm audit               # Check for vulnerabilities
npm audit fix           # Fix security issues
```

---

## 🔄 State Management

### AuthContext
- User authentication state
- Login/Logout functionality
- Onboarding completion status
- localStorage persistence

### ThemeContext
- Dark/Light theme toggle
- Theme persistence
- Global theme state

### Component State
- Local component state with `useState`
- Form state with `react-hook-form` where applicable

---

## 📱 Responsive Design

- **Mobile** - Single column, full-width cards
- **Tablet** - 2-column grid layouts
- **Desktop** - 3-4 column layouts with sidebar
- **Breakpoints** - Tailwind defaults (sm, md, lg, xl, 2xl)

---

## ♿ Accessibility

- **Semantic HTML** - Proper heading hierarchy
- **ARIA Labels** - Form inputs and interactive elements
- **Keyboard Navigation** - Full keyboard support
- **Color Contrast** - WCAG AA compliant colors
- **Focus States** - Clear focus indicators

---

## 📚 Additional Documentation

- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Detailed design system specifications
- **[REFACTORING_NOTES.md](./REFACTORING_NOTES.md)** - Component refactoring history
- **[WORKFLOW_SETUP.md](./WORKFLOW_SETUP.md)** - Authentication & routing guide

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Radix UI](https://radix-ui.com)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📄 License

This project is part of a hackathon submission. Please refer to the original repository for license information.

---

## 🙏 Acknowledgments

- **Design**: Based on [Figma design](https://www.figma.com/design/seCPrXx8dugu5qfYrzWiAK/Health-Monitoring-App-UI)
- **UI Components**: Radix UI & shadcn/ui ecosystem
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review component props and interfaces
3. Check TypeScript type definitions
4. Review existing component implementations

---

## 🚦 Current Status

✅ **Core Features Implemented:**
- Landing page
- Authentication (mock)
- Onboarding flow
- Dashboard with navigation
- Health monitoring interface
- Theme switching
- Responsive design

🚧 **Future Enhancements:**
- Real device integration
- Backend API connection
- Advanced analytics
- Push notifications
- Data export features
- Social sharing

---

**Last Updated**: March 2024  
**Version**: 0.1.0
