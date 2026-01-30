import { useState, useEffect } from 'react';
import { Bluetooth, Wifi, Battery, Signal, CheckCircle, AlertCircle, Sun, Moon, Cpu, Cloud, Zap, RefreshCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-xl border-b ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <Bluetooth className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Device Status</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sensor & connectivity health</p>
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
        {/* Real-time Connectivity Monitor */}
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>System Connectivity</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Live</span>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {connections.map((conn) => {
              const Icon = conn.icon;
              return (
                <div 
                  key={conn.id}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center gap-3">
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
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{conn.name}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{conn.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getLatencyColor(conn.latency)}`}>{conn.latency}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>ms</p>
                    </div>
                    {getStatusIcon(conn.status)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overall status bar */}
          <div className={`p-4 border-t ${isDark ? 'border-gray-700 bg-gray-700/30' : 'border-gray-100 bg-gray-50/50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Overall Health</span>
              <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {connections.filter(c => c.status === 'connected').length}/{connections.length} Active
              </span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(connections.filter(c => c.status === 'connected').length / connections.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Signal Quality */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                <Signal className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Signal Quality</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Real-time sensor accuracy</p>
              </div>
            </div>
            <span className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{deviceData.signalQuality}%</span>
          </div>

          <div className="mb-3">
            <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
                style={{ width: `${deviceData.signalQuality}%` }}
              ></div>
            </div>
          </div>

          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Excellent signal quality. Sensor is positioned correctly and readings are reliable.
          </p>
        </div>

        {/* Battery Level */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-teal-500/20' : 'bg-teal-100'}`}>
                <Battery className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
              </div>
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Battery Level</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sensor power status</p>
              </div>
            </div>
            <span className={`text-2xl font-bold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>{deviceData.batteryLevel}%</span>
          </div>

          <div className="mb-3">
            <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all"
                style={{ width: `${deviceData.batteryLevel}%` }}
              ></div>
            </div>
          </div>

          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Approximately 18 hours of continuous monitoring remaining.
          </p>
        </div>

        {/* Sensor Health */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Sensor Health</h3>

          <div className="space-y-3">
            {['Optical Sensor', 'Temperature Sensor', 'Accelerometer'].map((sensor) => (
              <div 
                key={sensor}
                className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'}`}
              >
                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{sensor}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Optimal</span>
                  <CheckCircle className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Info */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Device Information</h3>

          <div className="space-y-3">
            {[
              { label: 'Model', value: 'VitalSense Pro v2' },
              { label: 'Firmware', value: deviceData.firmwareVersion },
              { label: 'Serial Number', value: 'VS2-8472-A39' },
              { label: 'Last Calibration', value: '3 days ago' },
            ].map((item, i) => (
              <div key={item.label}>
                <div className="flex items-center justify-between py-2">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</span>
                </div>
                {i < 3 && <div className={`h-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all ${
            isDark 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } shadow-lg shadow-blue-500/25`}>
            <RefreshCw className="w-5 h-5" />
            Reconnect Sensor
          </button>
          <button className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all ${
            isDark 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            <Zap className="w-5 h-5" />
            Calibrate Sensor
          </button>
        </div>
      </div>
    </div>
  );
}
