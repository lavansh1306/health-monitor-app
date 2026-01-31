import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { HealthInsights } from './components/HealthInsights';
import { TrendsHistory } from './components/TrendsHistory';
import { ExperimentalFeatures } from './components/ExperimentalFeatures';
import { DeviceStatus } from './components/DeviceStatus';
import { ProfileSettings } from './components/ProfileSettings';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'home' | 'insights' | 'trends' | 'experimental' | 'device' | 'profile'>('home');

  if (!hasSeenOnboarding) {
    return (
      <ThemeProvider>
        <OnboardingScreen onComplete={() => setHasSeenOnboarding(true)} />
      </ThemeProvider>
    );
  }

  return (
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
    </ThemeProvider>
  );
}
