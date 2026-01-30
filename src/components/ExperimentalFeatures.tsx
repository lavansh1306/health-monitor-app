import { useState } from 'react';
import { Beaker, AlertTriangle, Info } from 'lucide-react';

export function ExperimentalFeatures() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Beaker className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl text-gray-900">Experimental Features</h1>
            <p className="text-sm text-gray-500">Research & development mode</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Main Warning Banner */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-purple-900 mb-2">Research Mode Notice</h3>
              <p className="text-sm text-purple-800 leading-relaxed">
                Features in this section are experimental and under active research. 
                They have not been validated for clinical use and should be treated as 
                preliminary screening indicators only.
              </p>
            </div>
          </div>
        </div>

        {/* Anemia Risk Screening */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-gray-900">Anemia Risk Screening</h3>
                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                  Experimental
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Uses SpO₂ waveform analysis and vital patterns to screen for potential 
                anemia indicators. This is a research feature with limited validation.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <span className="text-sm text-gray-700">Enable Anemia Screening</span>
            <button
              onClick={handleToggle}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                anemiaScreeningEnabled ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  anemiaScreeningEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {anemiaScreeningEnabled && (
            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-700">Anemia Risk Index</span>
                <span className="text-2xl text-purple-700">28</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-purple-200 rounded-full overflow-hidden">
                  <div className="h-full w-[28%] bg-purple-600 rounded-full"></div>
                </div>
                <span className="text-xs text-purple-700">Low</span>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Based on SpO₂ waveform characteristics and vital stability patterns.
              </p>
            </div>
          )}
        </div>

        {/* Information Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-blue-900 mb-2">About Experimental Features</h3>
              <ul className="text-sm text-blue-800 space-y-2">
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
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-gray-900 mb-4">Coming Soon</h3>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
              <span className="text-sm text-gray-600">Dehydration Screening</span>
              <span className="text-xs px-3 py-1 bg-gray-200 text-gray-600 rounded-full">
                In Development
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
              <span className="text-sm text-gray-600">Autonomic Function Score</span>
              <span className="text-xs px-3 py-1 bg-gray-200 text-gray-600 rounded-full">
                In Development
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl max-w-md w-full p-6">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>
            
            <h2 className="text-xl text-gray-900 text-center mb-3">
              Enable Experimental Feature?
            </h2>
            
            <p className="text-sm text-gray-600 text-center leading-relaxed mb-6">
              This feature is experimental and has not been clinically validated. 
              Results should not be used for medical decisions. Use for research 
              and awareness purposes only.
            </p>

            <div className="space-y-3">
              <button
                onClick={confirmEnable}
                className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition-colors"
              >
                I Understand, Enable
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-full hover:bg-gray-200 transition-colors"
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
