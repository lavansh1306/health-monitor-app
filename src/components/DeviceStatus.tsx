import { useState, useEffect } from 'react';
import { Bluetooth, Wifi, Battery, Signal, CheckCircle, AlertCircle, Sun, Moon, Cpu, Cloud, Zap, RefreshCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface SystemConnection {
  id: string;
  name: string;
  icon: React.ElementType;
  status: 'connected' | 'warning' | 'disconnected';
  latency: number;
  description: string;
}

export function DeviceStatus() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Mock device data
  const [deviceData, setDeviceData] = useState({
    connected: true,
    signalQuality: 95,
    batteryLevel: 78,
    lastSync: '2 minutes ago',
    sensorStatus: 'optimal',
    firmwareVersion: '2.1.4'
  });

  const [connections, setConnections] = useState<SystemConnection[]>([
    { id: 'iot', name: 'IoT Sensor', icon: Bluetooth, status: 'connected', latency: 12, description: 'VitalSense Pro v2' },
    { id: 'internet', name: 'Internet', icon: Wifi, status: 'connected', latency: 45, description: 'Network connection' },
    { id: 'ai', name: 'AI Models', icon: Cpu, status: 'connected', latency: 128, description: 'Health analysis' },
    { id: 'cloud', name: 'Cloud Sync', icon: Cloud, status: 'connected', latency: 89, description: 'Data backup' },
  ]);

  // Simulate real-time latency updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConnections(prev => prev.map(conn => {
        const newLatency = Math.max(5, conn.latency + Math.floor(Math.random() * 20) - 10);
        
        // Proper status transition logic
        let newStatus = conn.status;
        const rand = Math.random();
        if (conn.status === 'connected' && rand > 0.95) {
          newStatus = 'warning';
        } else if (conn.status === 'warning' && rand > 0.5) {
          newStatus = 'connected';
        }
        
        return {
          ...conn,
          latency: newLatency,
          status: newStatus
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return isDark ? 'text-emerald-400' : 'text-emerald-600';
    if (latency < 150) return isDark ? 'text-amber-400' : 'text-amber-600';
    return isDark ? 'text-red-400' : 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'connected') return <CheckCircle className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />;
    if (status === 'warning') return <AlertCircle className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />;
    return <AlertCircle className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'connected') return isDark ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200';
    if (status === 'warning') return isDark ? 'bg-amber-500/20 border-amber-500/30' : 'bg-amber-50 border-amber-200';
    return isDark ? 'bg-red-500/20 border-red-500/30' : 'bg-red-50 border-red-200';
  };

  const StatusCard = ({ conn }: { conn: SystemConnection }) => {
    const Icon = conn.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`rounded-2xl p-4 border transition-all ${getStatusColor(conn.status)}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            conn.status === 'connected'
              ? isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
              : conn.status === 'warning'
              ? isDark ? 'bg-amber-500/20' : 'bg-amber-100'
              : isDark ? 'bg-red-500/20' : 'bg-red-100'
          }`}>
            <Icon className={`w-5 h-5 ${
              conn.status === 'connected'
                ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                : conn.status === 'warning'
                ? isDark ? 'text-amber-400' : 'text-amber-600'
                : isDark ? 'text-red-400' : 'text-red-600'
            }`} />
          </div>
          {getStatusIcon(conn.status)}
        </div>
        <h3 className={`font-semibold text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{conn.name}</h3>
        <p className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{conn.description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${
            conn.status === 'connected'
              ? isDark ? 'text-emerald-400' : 'text-emerald-600'
              : conn.status === 'warning'
              ? isDark ? 'text-amber-400' : 'text-amber-600'
              : isDark ? 'text-red-400' : 'text-red-600'
          }`}>
            {conn.latency}ms
          </span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-2 h-2 rounded-full ${
              conn.status === 'connected'
                ? 'bg-emerald-500'
                : conn.status === 'warning'
                ? 'bg-amber-500'
                : 'bg-red-500'
            }`}
          />
        </div>
      </motion.div>
    );
  };

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
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isDark ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Bluetooth className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r ${
              isDark ? 'from-blue-300 to-cyan-300' : 'from-blue-600 to-cyan-600'
            } bg-clip-text text-transparent`}>
              Device Status
            </h1>
            <p className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Sensor & connectivity health</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Overall Device Health */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-3xl p-6 border overflow-hidden relative ${
            isDark ? 'bg-gradient-to-br from-gray-800 to-gray-800/50 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
          } shadow-xl`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Overall Health</h2>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>All systems operational</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <span className={`text-sm font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Online</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
              <Signal className={`w-4 h-4 mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{deviceData.signalQuality}%</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Signal</p>
            </div>
            <div className={`p-3 rounded-xl ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-50'}`}>
              <Battery className={`w-4 h-4 mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{deviceData.batteryLevel}%</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Battery</p>
            </div>
            <div className={`p-3 rounded-xl ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-50'}`}>
              <Zap className={`w-4 h-4 mb-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Optimal</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
            </div>
          </div>
        </motion.div>

        {/* System Connectivity Grid */}
        <div>
          <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 px-1 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>System Connectivity</h2>
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {connections.map((conn) => (
              <StatusCard key={conn.id} conn={conn} />
            ))}
          </motion.div>
        </div>

        {/* Device Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-4 border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
        >
          <h3 className={`font-semibold text-sm mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Device Information</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Firmware Version</span>
              <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{deviceData.firmwareVersion}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Last Sync</span>
              <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{deviceData.lastSync}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sensor Status</span>
              <span className={`text-xs font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{deviceData.sensorStatus}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border ${
            isDark
              ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          Sync Now
        </motion.button>
      </div>
    </div>
  );
}
