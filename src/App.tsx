import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PageLayout } from './components/PageLayout';
import { HomeDashboard } from './components/HomeDashboard';
import { HealthInsights } from './components/HealthInsights';
import { TrendsHistory } from './components/TrendsHistory';
import { ExperimentalFeatures } from './components/ExperimentalFeatures';
import { DeviceStatus } from './components/DeviceStatus';
import { ProfileSettings } from './components/ProfileSettings';
import { BottomNav } from './components/BottomNav';
import { Landing } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { OnboardingPage } from './pages/AppDashboard';

type Screen = 'home' | 'insights' | 'trends' | 'experimental' | 'device' | 'profile';

const screenConfig: Record<Screen, { title?: string; subtitle?: string; showHeader?: boolean }> = {
  home: { showHeader: false },
  insights: { title: 'Health Insights', subtitle: 'Detailed analysis of your metrics' },
  trends: { title: 'Trends', subtitle: 'Track your progress over time' },
  experimental: { title: 'Experimental', subtitle: 'New features and beta tools' },
  device: { title: 'Device Status', subtitle: 'Connected devices and sensors' },
  profile: { title: 'Settings', subtitle: 'Manage your preferences' }
};

// Main App Dashboard Component
function MainAppDashboard() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  const handleNavigate = (screen: Screen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {activeScreen === 'home' && (
          <PageLayout key="home" {...screenConfig.home}>
            <HomeDashboard />
          </PageLayout>
        )}
        {activeScreen === 'insights' && (
          <PageLayout key="insights" {...screenConfig.insights}>
            <HealthInsights />
          </PageLayout>
        )}
        {activeScreen === 'trends' && (
          <PageLayout key="trends" {...screenConfig.trends}>
            <TrendsHistory />
          </PageLayout>
        )}
        {activeScreen === 'experimental' && (
          <PageLayout key="experimental" {...screenConfig.experimental}>
            <ExperimentalFeatures />
          </PageLayout>
        )}
        {activeScreen === 'device' && (
          <PageLayout key="device" {...screenConfig.device}>
            <DeviceStatus />
          </PageLayout>
        )}
        {activeScreen === 'profile' && (
          <PageLayout key="profile" {...screenConfig.profile}>
            <ProfileSettings />
          </PageLayout>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onNavigate={handleNavigate} />
    </div>
  );
}

// Onboarding Protected Route
function OnboardingRoute({ children }: { children: React.ReactNode }) {
  const { user, onboardingComplete, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (onboardingComplete) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}

// App Route - Checks user and onboarding status
function AppRoute() {
  const { user, onboardingComplete, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return <MainAppDashboard />;
}

// Main App with routing
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/onboarding"
        element={
          <OnboardingRoute>
            <OnboardingPage />
          </OnboardingRoute>
        }
      />
      <Route path="/app" element={<AppRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </Router>
  );
}
