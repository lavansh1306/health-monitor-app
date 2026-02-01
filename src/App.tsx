import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { PageLayout } from './components/PageLayout';
import { HomeDashboard } from './components/HomeDashboard';
import { HealthInsights } from './components/HealthInsights';
import { TrendsHistory } from './components/TrendsHistory';
import { ExperimentalFeatures } from './components/ExperimentalFeatures';
import { DeviceStatus } from './components/DeviceStatus';
import { ProfileSettings } from './components/ProfileSettings';
import { BottomNav } from './components/BottomNav';

type Screen = 'home' | 'insights' | 'trends' | 'experimental' | 'device' | 'profile';

const screenConfig: Record<Screen, { title?: string; subtitle?: string; showHeader?: boolean }> = {
  home: { showHeader: false },
  insights: { title: 'Health Insights', subtitle: 'Detailed analysis of your metrics' },
  trends: { title: 'Trends', subtitle: 'Track your progress over time' },
  experimental: { title: 'Experimental', subtitle: 'New features and beta tools' },
  device: { title: 'Device Status', subtitle: 'Connected devices and sensors' },
  profile: { title: 'Settings', subtitle: 'Manage your preferences' }
};

function AppContent() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  const handleNavigate = (screen: Screen) => {
    setActiveScreen(screen);
    // Scroll to top for better UX
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

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}