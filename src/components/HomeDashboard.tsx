import { Activity, Heart, Wind, AlertCircle, TrendingUp } from 'lucide-react';
import { HealthRiskRing } from './HealthRiskRing';

export function HomeDashboard() {
  // Mock vital data
  const vitalData = {
    spo2: 98,
    heartRate: 72,
    respiratoryRate: 16,
    overallRisk: 15, // 0-100 scale (lower is better)
    riskLevel: 'normal' as 'normal' | 'monitor' | 'attention'
  };

  const getRiskColor = () => {
    if (vitalData.riskLevel === 'normal') return 'text-green-600';
    if (vitalData.riskLevel === 'monitor') return 'text-amber-600';
    return 'text-red-600';
  };

  const getRiskBgColor = () => {
    if (vitalData.riskLevel === 'normal') return 'bg-green-50 border-green-200';
    if (vitalData.riskLevel === 'monitor') return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  const getRiskText = () => {
    if (vitalData.riskLevel === 'normal') return 'Normal';
    if (vitalData.riskLevel === 'monitor') return 'Monitor';
    return 'Attention Needed';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl text-gray-900">VitalSense</h1>
            <p className="text-sm text-gray-500">Health Monitoring</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Overall Health Risk Score */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-sm text-gray-600 text-center mb-6">Overall Health Risk Score</h2>
          
          <div className="flex justify-center mb-6">
            <HealthRiskRing score={vitalData.overallRisk} />
          </div>

          <div className={`${getRiskBgColor()} border rounded-full px-4 py-2 text-center`}>
            <p className={`text-sm font-medium ${getRiskColor()}`}>
              Status: {getRiskText()}
            </p>
          </div>
        </div>

        {/* Live Vitals */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Live Vitals</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Active</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* SpO2 */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Wind className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blood Oxygen</p>
                  <p className="text-xs text-gray-500">SpO₂</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl text-gray-900">{vitalData.spo2}%</p>
                <p className="text-xs text-green-600">Normal</p>
              </div>
            </div>

            {/* Heart Rate */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Heart Rate</p>
                  <p className="text-xs text-gray-500">BPM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl text-gray-900">{vitalData.heartRate}</p>
                <p className="text-xs text-green-600">Normal</p>
              </div>
            </div>

            {/* Respiratory Rate */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Respiratory Rate</p>
                  <p className="text-xs text-gray-500">Breaths/min</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl text-gray-900">{vitalData.respiratoryRate}</p>
                <p className="text-xs text-green-600">Normal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl border border-blue-100 p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Today's Summary</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Your vitals are stable and within normal ranges. Continue maintaining good health habits.
              </p>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="bg-gray-100 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            For screening purposes only. Not a medical diagnostic tool. Consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
