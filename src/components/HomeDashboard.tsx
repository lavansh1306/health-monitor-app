import { useState, useEffect } from 'react';
import { Activity, Heart, Wind, AlertCircle, TrendingUp, Thermometer, Droplets, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { MetricCard } from './MetricCard';
import { StatusMonitor } from './StatusMonitor';
import { SleepCapture } from './SleepCapture';
import { HealthRiskRing } from './HealthRiskRing';

// Update interval constant for vitals simulation (ms)
const VITALS_UPDATE_INTERVAL_MS = 3000;

// Generate mock time-series data for charts
const generateData = (baseValue: number, variance: number, count: number = 24) => {
  return Array.from({ length: count }, (_, i) => ({
    value: baseValue + Math.sin(i / 3) * variance + (Math.random() - 0.5) * variance
  }));
};

export function HomeDashboard() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  // Simulated real-time vital data with slight variations
  const [vitalData, setVitalData] = useState({
    spo2: 98,
    heartRate: 72,
    respiratoryRate: 16,
    temperature: 98.6,
    hydration: 85,
    stress: 22,
    overallRisk: 15,
    riskLevel: 'normal' as 'normal' | 'monitor' | 'attention'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitalData(prev => {
        const newSpo2 = Math.min(100, Math.max(94, prev.spo2 + (Math.random() - 0.5) * 2));
        const newHeartRate = Math.round(Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)));
        const newRespiratoryRate = Math.round(Math.max(12, Math.min(20, prev.respiratoryRate + (Math.random() - 0.5) * 2)));
        const newTemperature = Math.round((Math.max(97.5, Math.min(99.5, prev.temperature + (Math.random() - 0.5) * 0.3))) * 10) / 10;
        const newHydration = Math.round(Math.max(70, Math.min(100, prev.hydration + (Math.random() - 0.5) * 3)));
        const newStress = Math.round(Math.max(10, Math.min(50, prev.stress + (Math.random() - 0.5) * 5)));
        
        // Validate all values are valid numbers
        if ([newSpo2, newHeartRate, newRespiratoryRate, newTemperature, newHydration, newStress].some(v => isNaN(v))) {
          return prev;
        }
        
        return {
          ...prev,
          spo2: newSpo2,
          heartRate: newHeartRate,
          respiratoryRate: newRespiratoryRate,
          temperature: newTemperature,
          hydration: newHydration,
          stress: newStress
        };
      });
    }, VITALS_UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = () => {
    if (vitalData.riskLevel === 'normal') return isDark ? 'text-emerald-400' : 'text-emerald-600';
    if (vitalData.riskLevel === 'monitor') return isDark ? 'text-amber-400' : 'text-amber-600';
    return isDark ? 'text-red-400' : 'text-red-600';
  };

  const getRiskBgColor = () => {
    if (vitalData.riskLevel === 'normal') return isDark ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200';
    if (vitalData.riskLevel === 'monitor') return isDark ? 'bg-amber-500/20 border-amber-500/30' : 'bg-amber-50 border-amber-200';
    return isDark ? 'bg-red-500/20 border-red-500/30' : 'bg-red-50 border-red-200';
  };

  const getRiskText = () => {
    if (vitalData.riskLevel === 'normal') return 'All Systems Normal';
    if (vitalData.riskLevel === 'monitor') return 'Monitor Advised';
    return 'Attention Needed';
  };

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Modern Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'} border-b`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r ${isDark ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
                VitalSense
              </h1>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{currentDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-2">
                <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentTime}</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Live</span>
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
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Health Score Card */}
        <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-800/50' : 'bg-gradient-to-br from-white to-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-xl`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Health Score</h2>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Real-time risk assessment</p>
              </div>
              <div className={`${getRiskBgColor()} border rounded-full px-3 py-1`}>
                <p className={`text-xs font-medium ${getRiskColor()}`}>
                  {getRiskText()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center py-4">
              <HealthRiskRing score={vitalData.overallRisk} />
            </div>

            <div className={`mt-4 p-4 rounded-2xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <TrendingUp className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Today's Summary</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your vitals are stable. Keep up the good work!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vitals Grid */}
        <div>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Live Vitals</h2>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              icon={<Wind className="w-5 h-5" />}
              title="Blood Oxygen"
              subtitle="SpO₂"
              value={Math.round(vitalData.spo2)}
              unit="%"
              color="blue"
              trend="stable"
              trendValue="+0.5% from avg"
              status="normal"
              data={generateData(97, 2)}
            />
            <MetricCard
              icon={<Heart className="w-5 h-5" />}
              title="Heart Rate"
              subtitle="BPM"
              value={vitalData.heartRate}
              unit="bpm"
              color="red"
              trend="stable"
              trendValue="Within range"
              status="normal"
              data={generateData(72, 8)}
            />
            <MetricCard
              icon={<Activity className="w-5 h-5" />}
              title="Respiratory"
              subtitle="Breaths/min"
              value={vitalData.respiratoryRate}
              unit="/min"
              color="teal"
              trend="stable"
              trendValue="Steady"
              status="normal"
              data={generateData(16, 2)}
            />
            <MetricCard
              icon={<Thermometer className="w-5 h-5" />}
              title="Temperature"
              subtitle="Body temp"
              value={vitalData.temperature}
              unit="°F"
              color="orange"
              trend="stable"
              trendValue="Normal"
              status="normal"
              data={generateData(98.6, 0.5)}
            />
            <MetricCard
              icon={<Droplets className="w-5 h-5" />}
              title="Hydration"
              subtitle="Level"
              value={vitalData.hydration}
              unit="%"
              color="green"
              trend="up"
              trendValue="+5% today"
              status="normal"
              data={generateData(85, 10)}
            />
            <MetricCard
              icon={<Zap className="w-5 h-5" />}
              title="Stress Index"
              subtitle="HRV-based"
              value={vitalData.stress}
              unit="/100"
              color="purple"
              trend="down"
              trendValue="-3 from avg"
              status="normal"
              data={generateData(25, 8)}
            />
          </div>
        </div>

        {/* Sleep Capture */}
        <div>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Sleep Analysis</h2>
          <SleepCapture />
        </div>

        {/* System Status Monitor */}
        <div>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Connectivity</h2>
          <StatusMonitor />
        </div>

        {/* Notice */}
        <div className={`rounded-2xl p-4 flex items-start gap-3 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-100'}`}>
          <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            For screening purposes only. Not a medical diagnostic tool. Consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
