import { Home, Activity, TrendingUp, Beaker, Bluetooth, User } from 'lucide-react';

interface BottomNavProps {
  activeScreen: 'home' | 'insights' | 'trends' | 'experimental' | 'device' | 'profile';
  onNavigate: (screen: 'home' | 'insights' | 'trends' | 'experimental' | 'device' | 'profile') => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'insights' as const, icon: Activity, label: 'Insights' },
    { id: 'trends' as const, icon: TrendingUp, label: 'Trends' },
    { id: 'device' as const, icon: Bluetooth, label: 'Device' },
    { id: 'profile' as const, icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-[60px] ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
