import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface FakeUser {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthContextType {
  user: FakeUser | null;
  loading: boolean;
  onboardingComplete: boolean;
  setOnboardingComplete: (complete: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  onboardingComplete: false,
  setOnboardingComplete: () => {},
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FakeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    const stored = localStorage.getItem('onboardingComplete');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    // Check if user was previously logged in
    const storedUser = localStorage.getItem('fakeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const fakeUser: FakeUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
    };
    
    setUser(fakeUser);
    localStorage.setItem('fakeUser', JSON.stringify(fakeUser));
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const fakeUser: FakeUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      fullName,
    };
    
    setUser(fakeUser);
    localStorage.setItem('fakeUser', JSON.stringify(fakeUser));
  };

  const handleSignOut = async () => {
    setUser(null);
    setOnboardingComplete(false);
    localStorage.removeItem('fakeUser');
    localStorage.removeItem('onboardingComplete');
  };

  const handleSetOnboardingComplete = (complete: boolean) => {
    setOnboardingComplete(complete);
    localStorage.setItem('onboardingComplete', JSON.stringify(complete));
  };

  const value = {
    user,
    loading,
    onboardingComplete,
    setOnboardingComplete: handleSetOnboardingComplete,
    signIn,
    signUp,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}