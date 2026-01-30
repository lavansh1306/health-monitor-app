import { useState } from 'react';
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
    return <OnboardingScreen onComplete={() => setHasSeenOnboarding(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="mx-auto max-w-md">
        {activeScreen === 'home' && <HomeDashboard />}
        {activeScreen === 'insights' && <HealthInsights />}
        {activeScreen === 'trends' && <TrendsHistory />}
        {activeScreen === 'experimental' && <ExperimentalFeatures />}
        {activeScreen === 'device' && <DeviceStatus />}
        {activeScreen === 'profile' && <ProfileSettings />}
        
        <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
      </div>
    </div>
  );
}
