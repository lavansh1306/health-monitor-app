import { AlertCircle, Shield, CheckCircle } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-8">
          <Shield className="w-10 h-10 text-blue-600" />
        </div>
        
        <h1 className="text-2xl text-gray-900 text-center mb-4">
          Welcome to VitalSense
        </h1>
        
        <p className="text-gray-600 text-center mb-8 max-w-sm">
          Your personal health monitoring companion for early screening and wellness tracking.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 max-w-sm">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-amber-900 font-medium mb-2">
                Important Notice
              </h2>
              <p className="text-sm text-amber-800 leading-relaxed">
                This app provides health screening insights and monitoring for wellness purposes only.
              </p>
            </div>
          </div>
          
          <div className="text-sm text-amber-800 space-y-2 pl-9">
            <p className="leading-relaxed">
              <strong>This is not a medical diagnostic tool.</strong> It does not diagnose, treat, or cure any medical condition.
            </p>
            <p className="leading-relaxed">
              Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8 max-w-sm w-full">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              Real-time vital signs monitoring (SpO₂, HR, RR)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              Early screening insights for health awareness
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              Trend tracking and historical data analysis
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={onComplete}
          className="w-full bg-blue-600 text-white py-4 rounded-full hover:bg-blue-700 transition-colors"
        >
          I Understand, Continue
        </button>
        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you acknowledge this disclaimer
        </p>
      </div>
    </div>
  );
}
