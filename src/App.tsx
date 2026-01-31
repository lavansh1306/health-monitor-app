import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { HealthInsights } from './components/HealthInsights';
import { TrendsHistory } from './components/TrendsHistory';
import { ExperimentalFeatures } from './components/ExperimentalFeatures';
import { DeviceStatus } from './components/DeviceStatus';
import { ProfileSettings } from './components/ProfileSettings';
import { BottomNav } from './components/BottomNav';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950">
      <div className="text-center">
        <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6" />
        <p className="text-white text-lg font-medium">Loading VitalSense...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'home' | 'insights' | 'trends' | 'experimental' | 'device' | 'profile'>('home');

  useEffect(() => {
    // Check if user has seen onboarding
    const seen = localStorage.getItem('vitalsense_onboarding_completed');
    setHasSeenOnboarding(!!seen);
  }, []);

  // Show loading screen while checking auth status
  if (loading) {
    return <LoadingScreen />;
  }

  // Show onboarding if user hasn't seen it yet
  if (!hasSeenOnboarding) {
    return (
      <OnboardingScreen
        onComplete={() => {
          localStorage.setItem('vitalsense_onboarding_completed', 'true');
          setHasSeenOnboarding(true);
        }}
      />
    );
  }

  // Show auth screen if user is not logged in
  if (!user) {
    return <AuthScreen onAuthSuccess={() => {}} />;
  }

  // User is authenticated - show main app
  return (
    <div className="min-h-screen pb-20 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      <div className="mx-auto max-w-lg">
        {activeScreen === 'home' && <HomeDashboard />}
        {activeScreen === 'insights' && <HealthInsights />}
        {activeScreen === 'trends' && <TrendsHistory />}
        {activeScreen === 'experimental' && <ExperimentalFeatures />}
        {activeScreen === 'device' && <DeviceStatus />}
        {activeScreen === 'profile' && <ProfileSettings />}
        
        <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
    <ThemeProvider>
      <div className="min-h-screen pb-20 bg-black text-white transition-colors duration-300 dark">
        <div className="mx-auto max-w-lg">
          {activeScreen === 'home' && <HomeDashboard />}
          {activeScreen === 'insights' && <HealthInsights />}
          {activeScreen === 'trends' && <TrendsHistory />}
          {activeScreen === 'experimental' && <ExperimentalFeatures />}
          {activeScreen === 'device' && <DeviceStatus />}
          {activeScreen === 'profile' && <ProfileSettings />}
          
          <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}