import { Home, Activity, TrendingUp, Beaker, Bluetooth, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

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
    <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t safe-area-bottom z-50 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900/95 border-gray-800/50' 
        : 'bg-white/95 border-gray-200/50'
    }`}>
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => {
                  console.log('Clicked:', item.id);
                  onNavigate(item.id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[64px] relative group cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'text-blue-400'
                      : 'text-blue-600'
                    : isDark
                      ? 'text-gray-500 hover:text-gray-400'
                      : 'text-gray-500 hover:text-gray-600'
                }`}
              >
                {/* Background pill for active state */}
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 rounded-xl -z-10 ${
                      isDark ? 'bg-blue-500/20' : 'bg-blue-50'
                    }`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Icon with pulse for active state */}
                <motion.div
                  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="pointer-events-none"
                >
                  <Icon className={`w-5 h-5 ${
                    isActive 
                      ? isDark ? 'text-blue-400' : 'text-blue-600' 
                      : isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                </motion.div>

                {/* Label */}
                <span className={`text-[10px] font-medium transition-colors pointer-events-none ${
                  isActive
                    ? isDark ? 'text-blue-400' : 'text-blue-600'
                    : isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    className={`absolute bottom-0 w-1 h-1 rounded-full ${
                      isDark ? 'bg-blue-400' : 'bg-blue-600'
                    }`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
