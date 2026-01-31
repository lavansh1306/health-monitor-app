import { useState, useEffect } from 'react';
import { Activity, Heart, Wind, AlertCircle, TrendingUp, Thermometer, Droplets, Zap, Sun, Moon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`}>
      {/* Animated gradient background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-200/30'}`}
        />
        <motion.div
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-200/30'}`}
        />
      </div>

      {/* Modern Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-20 backdrop-blur-2xl ${isDark ? 'bg-gray-900/80 border-gray-800/50' : 'bg-white/80 border-gray-200/50'} border-b`}
      >
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-gradient-to-br from-blue-600 to-purple-600'}`}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
                <div>
                  <h1 className={`text-2xl font-bold bg-gradient-to-r ${isDark ? 'from-blue-300 via-purple-300 to-pink-300' : 'from-blue-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
                    VitalSense
                  </h1>
                  <p className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{currentDate}</p>
                </div>
              </div>
            </motion.div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-2">
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentTime}</p>
                <div className="flex items-center gap-1 justify-end">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                  />
                  <span className={`text-xs font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Live</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all backdrop-blur-sm ${
                  isDark 
                    ? 'bg-gray-800/50 text-yellow-300 hover:bg-gray-700/50 border border-gray-700/50' 
                    : 'bg-white/50 text-gray-600 hover:bg-white/70 border border-gray-200/50'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-4 py-6 space-y-6 relative z-10">
        {/* Health Score Card - Premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`rounded-3xl overflow-hidden backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-gray-800/80 via-gray-800/40 to-gray-900/80 border border-gray-700/50 shadow-2xl' : 'bg-gradient-to-br from-white/80 via-white/50 to-gray-50/80 border border-white/50 shadow-2xl'}`}
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
              >
                <h2 className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Health Score</h2>
                <p className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Real-time risk assessment</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`${getRiskBgColor()} border rounded-full px-4 py-1.5 backdrop-blur-sm`}
              >
                <p className={`text-xs font-bold tracking-wide ${getRiskColor()}`}>
                  {getRiskText()}
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center py-6"
            >
              <HealthRiskRing score={vitalData.overallRisk} />
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-4 backdrop-blur-md border ${isDark ? 'bg-gray-700/30 border-gray-600/50' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100/50'}`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, 0], y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-500/50' : 'bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200'}`}
                >
                  <TrendingUp className={`w-6 h-6 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                </motion.div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Today's Summary</p>
                  <p className={`text-xs leading-relaxed mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your vitals are stable and excellent. Keep up the amazing work! 🎯
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Vitals Grid - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Live Vitals</h2>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`text-xs font-medium px-3 py-1 rounded-full ${isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700'}`}
            >
              ● Live
            </motion.span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -4 }}
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={{ y: -4 }}
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -4 }}
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              whileHover={{ y: -4 }}
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -4 }}
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ y: -4 }}
            >
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
            </motion.div>
          </div>
        </motion.div>

        {/* Sleep Capture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Sleep Analysis</h2>
          <SleepCapture />
        </motion.div>

        {/* System Status Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Connectivity</h2>
          <StatusMonitor />
        </motion.div>

        {/* Premium Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-2xl p-4 flex items-start gap-3 backdrop-blur-md border ${isDark ? 'bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-700/50' : 'bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-blue-200/50'}`}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          </motion.div>
          <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            For screening purposes only. Not a medical diagnostic tool. Consult healthcare professionals for medical advice.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
