import { OnboardingScreen } from '../components/OnboardingScreen';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { user, setOnboardingComplete } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
    navigate('/app');
  };

  return (
    <ThemeProvider>
      <OnboardingScreen onComplete={handleOnboardingComplete} />
    </ThemeProvider>
  );
}
