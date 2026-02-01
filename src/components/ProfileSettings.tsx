import { Settings, Bell, Lock, LogOut, BarChart3, Sun, Moon, Eye } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

export function ProfileSettings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [toggles, setToggles] = useState({
    notifications: true,
    healthTracking: true,
    dataSharing: false,
    publicProfile: false
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
        enabled
          ? isDark ? 'bg-emerald-500' : 'bg-emerald-600'
          : isDark ? 'bg-gray-600' : 'bg-gray-300'
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 2 }}
        className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg`}
      />
    </button>
  );

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    toggleKey, 
    bgColor,
    onCustomToggle
  }: { 
    icon: React.ElementType; 
    title: string; 
    description: string; 
    toggleKey?: keyof typeof toggles;
    bgColor: string;
    onCustomToggle?: () => void;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between p-4 rounded-xl transition-all ${bgColor}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isDark ? 'bg-white/10' : 'bg-black/10'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
        </div>
      </div>
      {onCustomToggle ? (
        <ToggleSwitch enabled={isDark} onChange={onCustomToggle} />
      ) : toggleKey && (
        <ToggleSwitch enabled={toggles[toggleKey]} onChange={() => handleToggle(toggleKey)} />
      )}
    </motion.div>
  );

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`-mx-4 -mt-6 px-4 py-4 mb-6 sticky top-0 z-30 backdrop-blur-2xl ${
          isDark ? 'bg-gray-900/80 border-gray-800/50' : 'bg-white/80 border-gray-200/50'
        } border-b`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isDark ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <Settings className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          <div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r ${
              isDark ? 'from-purple-300 to-pink-300' : 'from-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              Settings
            </h1>
            <p className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Manage your preferences</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Display & Theme */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 px-1 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>Display & Theme</h2>
          <div className="space-y-2">
            <SettingItem
              icon={Moon}
              title="Dark Mode"
              description={isDark ? 'Currently enabled' : 'Currently disabled'}
              onCustomToggle={toggleTheme}
              bgColor={isDark ? 'bg-blue-500/15 border border-blue-500/30' : 'bg-blue-50 border border-blue-200/50'}
            />
          </div>
        </motion.div>

        {/* Health Data */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 px-1 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>Health Data</h2>
          <div className="space-y-2">
            <SettingItem
              icon={BarChart3}
              title="Health Tracking"
              description="Track your vital signs"
              toggleKey="healthTracking"
              bgColor={isDark ? 'bg-emerald-500/15 border border-emerald-500/30' : 'bg-emerald-50 border border-emerald-200/50'}
            />
            <SettingItem
              icon={Eye}
              title="Data Sharing"
              description="Share data with healthcare providers"
              toggleKey="dataSharing"
              bgColor={isDark ? 'bg-amber-500/15 border border-amber-500/30' : 'bg-amber-50 border border-amber-200/50'}
            />
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 px-1 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>Notifications</h2>
          <div className="space-y-2">
            <SettingItem
              icon={Bell}
              title="Alert Notifications"
              description="Get notified of health alerts"
              toggleKey="notifications"
              bgColor={isDark ? 'bg-cyan-500/15 border border-cyan-500/30' : 'bg-cyan-50 border border-cyan-200/50'}
            />
          </div>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 px-1 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>Privacy & Security</h2>
          <div className="space-y-2">
            <SettingItem
              icon={Lock}
              title="Public Profile"
              description="Make your health data publicly visible"
              toggleKey="publicProfile"
              bgColor={isDark ? 'bg-red-500/15 border border-red-500/30' : 'bg-red-50 border border-red-200/50'}
            />
          </div>
        </motion.div>

        {/* App Info */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className={`rounded-2xl p-4 text-center border ${
            isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}
        >
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>VitalSense</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>v1.0.0 • Health monitoring companion</p>
          <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>© 2026 VitalSense. All rights reserved.</p>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
            isDark
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
              : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
          }`}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}