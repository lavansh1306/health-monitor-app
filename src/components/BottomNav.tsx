import { Home, Activity, TrendingUp, Beaker, Bluetooth, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface BottomNavProps {
  activeScreen: 'home' | 'insights' | 'trends' | 'experimental' | 'device' | 'profile';
  onNavigate: (screen: 'home' | 'insights' | 'trends' | 'experimental' | 'device' | 'profile') => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'insights' as const, icon: Activity, label: 'Insights' },
    { id: 'trends' as const, icon: TrendingUp, label: 'Trends' },
    { id: 'device' as const, icon: Bluetooth, label: 'Device' },
    { id: 'profile' as const, icon: User, label: 'Profile' }
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t safe-area-bottom transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900/90 border-gray-800' 
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] ${
                  isActive
                    ? isDark
                      ? 'text-blue-400 bg-blue-500/20'
                      : 'text-blue-600 bg-blue-50'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  isActive 
                    ? isDark ? 'text-blue-400' : 'text-blue-600' 
                    : isDark ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
