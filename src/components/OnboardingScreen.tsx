import { AlertCircle, Shield, CheckCircle, Activity, Heart, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface OnboardingScreenProps {
  onComplete: () => void;
}

function OnboardingContent({ onComplete }: OnboardingScreenProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo and animation */}
        <div className="relative mb-8">
          <div className={`w-24 h-24 rounded-3xl flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'} shadow-2xl shadow-blue-500/30`}>
            <Activity className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2rem] blur-2xl opacity-20 -z-10"></div>
        </div>
        
        <h1 className={`text-3xl font-bold text-center mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Welcome to <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">VitalSense</span>
        </h1>
        
        <p className={`text-center mb-8 max-w-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Your personal health monitoring companion for early screening and wellness tracking.
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-3 mb-8 max-w-sm w-full">
          {[
            { icon: Heart, text: 'Real-time vital signs monitoring (SpO₂, HR, RR)', color: 'red' },
            { icon: TrendingUp, text: 'Early screening insights for health awareness', color: 'blue' },
            { icon: Activity, text: 'Trend tracking and historical data analysis', color: 'purple' }
          ].map((item, i) => (
            <div 
              key={i}
              className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                item.color === 'red' 
                  ? isDark ? 'bg-red-500/20' : 'bg-red-100'
                  : item.color === 'blue'
                  ? isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                  : isDark ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
                <item.icon className={`w-5 h-5 ${
                  item.color === 'red' 
                    ? isDark ? 'text-red-400' : 'text-red-600'
                    : item.color === 'blue'
                    ? isDark ? 'text-blue-400' : 'text-blue-600'
                    : isDark ? 'text-purple-400' : 'text-purple-600'
                }`} />
              </div>
              <p className={`text-sm flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {item.text}
              </p>
              <CheckCircle className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
          ))}
        </div>

        {/* Warning notice */}
        <div className={`rounded-2xl p-5 mb-8 max-w-sm w-full border ${isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            <div>
              <h2 className={`font-semibold mb-2 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                Important Notice
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-amber-200/80' : 'text-amber-800'}`}>
                This app provides health screening insights and monitoring for wellness purposes only.
              </p>
            </div>
          </div>
          
          <div className={`text-sm space-y-2 pl-9 ${isDark ? 'text-amber-200/80' : 'text-amber-800'}`}>
            <p className="leading-relaxed">
              <strong>This is not a medical diagnostic tool.</strong> It does not diagnose, treat, or cure any medical condition.
            </p>
            <p className="leading-relaxed">
              Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]"
        >
          I Understand, Continue
        </button>
        <p className={`text-xs text-center mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          By continuing, you acknowledge this disclaimer
        </p>
      </div>
    </div>
  );
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  return <OnboardingContent onComplete={onComplete} />;
}
