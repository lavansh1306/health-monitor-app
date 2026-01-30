import { User, Bell, Shield, HelpCircle, FileText, ChevronRight } from 'lucide-react';

export function ProfileSettings() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl text-gray-900">Profile & Settings</h1>
            <p className="text-sm text-gray-500">Manage your account</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-gray-900 mb-4">Personal Information</h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-600 block mb-2">Age (Optional)</label>
              <input
                type="number"
                placeholder="Enter age"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600 block mb-2">Gender (Optional)</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="pt-2">
              <p className="text-xs text-gray-500 leading-relaxed">
                This information helps improve screening accuracy but is completely optional.
              </p>
            </div>
          </div>
        </div>

        {/* Units & Preferences */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-gray-900 mb-4">Units & Display</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-700">Temperature Units</span>
              <select className="text-sm text-gray-900 bg-transparent focus:outline-none">
                <option>Celsius (°C)</option>
                <option>Fahrenheit (°F)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-700">Time Format</span>
              <select className="text-sm text-gray-900 bg-transparent focus:outline-none">
                <option>24-hour</option>
                <option>12-hour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-gray-400" />
            <h3 className="text-gray-900">Notifications & Alerts</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">Abnormal Vital Alerts</p>
                <p className="text-xs text-gray-500 mt-1">Notify when vitals fall outside normal range</p>
              </div>
              <button className="relative w-14 h-8 rounded-full bg-blue-600">
                <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full"></div>
              </button>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">Daily Summary</p>
                <p className="text-xs text-gray-500 mt-1">Receive daily health summary reports</p>
              </div>
              <button className="relative w-14 h-8 rounded-full bg-blue-600">
                <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full"></div>
              </button>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">Device Connection Alerts</p>
                <p className="text-xs text-gray-500 mt-1">Notify when sensor disconnects</p>
              </div>
              <button className="relative w-14 h-8 rounded-full bg-blue-600">
                <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Data */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-900">Data Privacy & Security</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <div className="h-px bg-gray-200"></div>

          <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-900">Terms & Conditions</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <div className="h-px bg-gray-200"></div>

          <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-900">Help & Support</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-blue-900 mb-2">Data Privacy Notice</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Your health data is stored locally on your device. We do not collect personally 
                identifiable information (PII). VitalSense is designed for screening and monitoring 
                purposes, not for storing sensitive medical records.
              </p>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center space-y-2 py-4">
          <p className="text-sm text-gray-600">VitalSense</p>
          <p className="text-xs text-gray-500">Version 2.1.4 • Build 2140</p>
          <button className="text-xs text-blue-600 hover:underline">
            Check for Updates
          </button>
        </div>
      </div>
    </div>
  );
}
