import { useState } from 'react';
import { Beaker, AlertTriangle, Info, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ExperimentalFeatures() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [anemiaScreeningEnabled, setAnemiaScreeningEnabled] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleToggle = () => {
    if (!anemiaScreeningEnabled) {
      setShowWarning(true);
    } else {
      setAnemiaScreeningEnabled(false);
      setShowWarning(false);
    }
  };

  const confirmEnable = () => {
    setAnemiaScreeningEnabled(true);
    setShowWarning(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-xl border-b ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                <Beaker className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Experimental Features</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Research & development mode</p>
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
        {/* Main Warning Banner */}
        <div className={`rounded-2xl p-4 border ${isDark ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
          <div className="flex items-start gap-3">
            <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <div>
              <h3 className={`font-medium mb-2 ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>Research Mode Notice</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-purple-200/80' : 'text-purple-800'}`}>
                Features in this section are experimental and under active research. 
                They have not been validated for clinical use and should be treated as 
                preliminary screening indicators only.
              </p>
            </div>
          </div>
        </div>

        {/* Anemia Risk Screening */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Anemia Risk Screening</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                  Experimental
                </span>
              </div>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Uses SpO₂ waveform analysis and vital patterns to screen for potential 
                anemia indicators. This is a research feature with limited validation.
              </p>
            </div>
          </div>

          <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Enable Anemia Screening</span>
            <button
              onClick={handleToggle}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                anemiaScreeningEnabled 
                  ? 'bg-purple-500' 
                  : isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${
                  anemiaScreeningEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {anemiaScreeningEnabled && (
            <div className={`mt-4 p-4 rounded-xl border ${isDark ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Anemia Risk Index</span>
                <span className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>28</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-purple-500/30' : 'bg-purple-200'}`}>
                  <div className="h-full w-[28%] bg-purple-500 rounded-full"></div>
                </div>
                <span className={`text-xs font-medium ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Low</span>
              </div>
              <p className={`text-xs mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Based on SpO₂ waveform characteristics and vital stability patterns.
              </p>
            </div>
          )}
        </div>

        {/* Information Card */}
        <div className={`rounded-2xl p-4 border ${isDark ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex items-start gap-3">
            <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`font-medium mb-2 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>About Experimental Features</h3>
              <ul className={`text-sm space-y-2 ${isDark ? 'text-blue-200/80' : 'text-blue-800'}`}>
                <li className="leading-relaxed">
                  • Features are research prototypes and may produce inconsistent results
                </li>
                <li className="leading-relaxed">
                  • Not validated for medical decision-making
                </li>
                <li className="leading-relaxed">
                  • Should only be used to inform further clinical testing
                </li>
                <li className="leading-relaxed">
                  • May be removed or significantly changed in future updates
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Future Features Placeholder */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Coming Soon</h3>
          <div className="space-y-3">
            {['Dehydration Screening', 'Autonomic Function Score'].map((feature) => (
              <div 
                key={feature}
                className={`p-4 rounded-xl flex items-center justify-between ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}
              >
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                <span className={`text-xs px-3 py-1 rounded-full ${isDark ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                  In Development
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className={`rounded-3xl max-w-md w-full p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
              <AlertTriangle className={`w-7 h-7 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            
            <h2 className={`text-xl font-bold text-center mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Enable Experimental Feature?
            </h2>
            
            <p className={`text-sm text-center leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              This feature is experimental and has not been clinically validated. 
              Results should not be used for medical decisions. Use for research 
              and awareness purposes only.
            </p>

            <div className="space-y-3">
              <button
                onClick={confirmEnable}
                className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium hover:bg-purple-600 transition-colors"
              >
                I Understand, Enable
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  isDark 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
