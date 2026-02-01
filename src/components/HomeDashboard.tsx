import { useState, useEffect } from 'react';
import { Activity, Heart, Wind, AlertCircle, TrendingUp, Thermometer, Droplets, Zap, Wifi, Battery, CheckCircle, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const VITALS_UPDATE_INTERVAL_MS = 3000;

export function HomeDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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

  useEffect(() => {
    const interval = setInterval(() => {
      setVitalData(prev => {
        const newSpo2 = Math.min(100, Math.max(94, prev.spo2 + (Math.random() - 0.5) * 2));
        const newHeartRate = Math.round(Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)));
        const newRespiratoryRate = Math.round(Math.max(12, Math.min(20, prev.respiratoryRate + (Math.random() - 0.5) * 2)));
        const newTemperature = Math.round((Math.max(97.5, Math.min(99.5, prev.temperature + (Math.random() - 0.5) * 0.3))) * 10) / 10;
        const newHydration = Math.round(Math.max(70, Math.min(100, prev.hydration + (Math.random() - 0.5) * 3)));
        const newStress = Math.round(Math.max(10, Math.min(50, prev.stress + (Math.random() - 0.5) * 5)));
        
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

  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const vitals = [
    { icon: Wind, title: 'Blood Oxygen', value: Math.round(vitalData.spo2), unit: '%', color: '#3b82f6', bgColor: isDark ? 'bg-blue-500/20' : 'bg-blue-50', trend: '+0.5%' },
    { icon: Heart, title: 'Heart Rate', value: vitalData.heartRate, unit: 'bpm', color: '#ef4444', bgColor: isDark ? 'bg-red-500/20' : 'bg-red-50', trend: 'steady' },
    { icon: Activity, title: 'Respiratory', value: vitalData.respiratoryRate, unit: '/min', color: '#14b8a6', bgColor: isDark ? 'bg-teal-500/20' : 'bg-teal-50', trend: 'steady' },
    { icon: Thermometer, title: 'Temperature', value: vitalData.temperature, unit: '°F', color: '#f97316', bgColor: isDark ? 'bg-orange-500/20' : 'bg-orange-50', trend: 'normal' },
    { icon: Droplets, title: 'Hydration', value: vitalData.hydration, unit: '%', color: '#22c55e', bgColor: isDark ? 'bg-green-500/20' : 'bg-green-50', trend: '+5%' },
    { icon: Zap, title: 'Stress Index', value: vitalData.stress, unit: '/100', color: '#a855f7', bgColor: isDark ? 'bg-purple-500/20' : 'bg-purple-50', trend: '-3' }
  ];

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r ${
              isDark ? 'from-blue-300 via-purple-300 to-pink-300' : 'from-blue-600 via-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              VitalSense
            </h1>
            <p className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{currentDate}</p>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentTime}</p>
            <div className="flex items-center gap-1 justify-end mt-1">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
              <span className={`text-xs font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Live</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Health Score Card - Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-3xl overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-800/50' : 'bg-gradient-to-br from-white to-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-2xl`}
        >
          <div className="p-8">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Health Score</h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Real-time assessment</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`${getRiskBgColor()} border rounded-full px-4 py-2`}
              >
                <p className={`text-sm font-semibold ${getRiskColor()}`}>All Normal</p>
              </motion.div>
            </div>

            {/* Radial Gradient Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="relative w-56 h-56 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-56 h-56 rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, rgb(16, 185, 129) 0deg, rgb(16, 185, 129) ${vitalData.overallRisk * 2.4}deg, ${isDark ? 'rgb(30, 41, 59)' : 'rgb(243, 244, 246)'} ${vitalData.overallRisk * 2.4}deg)`,
                  }}
                />
                <div className={`absolute w-48 h-48 rounded-full ${isDark ? 'bg-gray-900 border-4 border-gray-800' : 'bg-white border-4 border-gray-50'} flex items-center justify-center shadow-xl`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{vitalData.overallRisk}</div>
                    <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Risk Score</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-4 rounded-2xl ${isDark ? 'bg-blue-500/15 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-500/30' : 'bg-blue-100'}`}>
                  <TrendingUp className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>Today's Status</p>
                  <p className={`text-xs ${isDark ? 'text-blue-400/80' : 'text-blue-700'}`}>All vitals stable. Excellent consistency.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Live Vitals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Live Vitals</h3>
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {vitals.map((vital, idx) => {
              const Icon = vital.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-2xl p-4 border transition-all ${
                    isDark ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                  } shadow-lg`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${vital.bgColor}`}>
                    <Icon className="w-5 h-5" style={{ color: vital.color }} />
                  </div>
                  <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{vital.title}</p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{vital.value}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{vital.unit}</p>
                  </div>
                  <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Trend: {vital.trend}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Sleep Analysis Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-6 border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                <Moon className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Sleep Analysis</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Last night</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Duration</p>
              <p className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>7h 42m</p>
            </div>
            <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Quality</p>
              <p className={`text-xl font-bold mt-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>86%</p>
            </div>
            <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Cycles</p>
              <p className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>5</p>
            </div>
          </div>
        </motion.div>

        {/* Connectivity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-2xl p-6 border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
        >
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Connectivity Status</h3>
          <div className="space-y-3">
            {[
              { name: 'WiFi Connection', icon: Wifi, status: 'connected' },
              { name: 'Sensor Battery', icon: Battery, status: 'connected' }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  item.status === 'connected'
                    ? isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
                    : isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${
                    item.status === 'connected'
                      ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                      : isDark ? 'text-red-400' : 'text-red-600'
                  }`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-2 h-2 rounded-full ${
                    item.status === 'connected' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Medical Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`rounded-xl p-4 border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              This app provides health screening only. Not a medical diagnostic tool. Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
