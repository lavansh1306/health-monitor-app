import { User, Bell, Shield, HelpCircle, FileText, ChevronRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ProfileSettings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-xl border-b ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <User className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile & Settings</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manage your account</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isDark 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Theme Toggle Card */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Appearance</h3>
          
          <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              {isDark ? (
                <Moon className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              ) : (
                <Sun className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              )}
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Night Mode</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isDark ? 'Dark theme enabled' : 'Light theme enabled'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                isDark ? 'bg-indigo-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${
                  isDark ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Personal Information</h3>

          <div className="space-y-4">
            <div>
              <label className={`text-xs block mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Age (Optional)</label>
              <input
                type="number"
                placeholder="Enter age"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isDark 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`text-xs block mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Gender (Optional)</label>
              <select className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDark 
                  ? 'bg-gray-700/50 border-gray-600 text-white' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}>
                <option>Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="pt-2">
              <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                This information helps improve screening accuracy but is completely optional.
              </p>
            </div>
          </div>
        </div>

        {/* Units & Preferences */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Units & Display</h3>

          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Temperature Units</span>
              <select className={`text-sm bg-transparent focus:outline-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <option>Celsius (°C)</option>
                <option>Fahrenheit (°F)</option>
              </select>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Time Format</span>
              <select className={`text-sm bg-transparent focus:outline-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <option>24-hour</option>
                <option>12-hour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
          <div className="flex items-center gap-3 mb-4">
            <Bell className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications & Alerts</h3>
          </div>

          <div className="space-y-4">
            {[
              { title: 'Abnormal Vital Alerts', desc: 'Notify when vitals fall outside normal range' },
              { title: 'Daily Summary', desc: 'Receive daily health summary reports' },
              { title: 'Device Connection Alerts', desc: 'Notify when sensor disconnects' }
            ].map((item, i) => (
              <div key={item.title}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                  </div>
                  <button className={`relative w-14 h-8 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}>
                    <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full shadow-md"></div>
                  </button>
                </div>
                {i < 2 && <div className={`h-px mt-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Data */}
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
          {[
            { icon: Shield, label: 'Data Privacy & Security' },
            { icon: FileText, label: 'Terms & Conditions' },
            { icon: HelpCircle, label: 'Help & Support' }
          ].map((item, i) => (
            <button 
              key={item.label}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
              } ${i < 2 ? `border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}` : ''}`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.label}</span>
              </div>
              <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            </button>
          ))}
        </div>

        {/* Privacy Notice */}
        <div className={`rounded-2xl p-4 border ${isDark ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex items-start gap-3">
            <Shield className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`font-medium mb-2 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>Data Privacy Notice</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-blue-200/80' : 'text-blue-800'}`}>
                Your health data is stored locally on your device. We do not collect personally 
                identifiable information (PII). VitalSense is designed for screening and monitoring 
                purposes, not for storing sensitive medical records.
              </p>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className={`text-center space-y-2 py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <p className="text-sm font-medium">VitalSense</p>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Version 2.1.4 • Build 2140</p>
          <button className={`text-xs ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:underline'}`}>
            Check for Updates
          </button>
        </div>
      </div>
    </div>
  );
}
