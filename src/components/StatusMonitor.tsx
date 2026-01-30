import { useState, useEffect } from 'react';
import { Wifi, Bluetooth, Cloud, Cpu, Activity, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// Update interval constant for connection status simulation (ms)
const CONNECTION_UPDATE_INTERVAL_MS = 2000;

interface ConnectionStatus {
  name: string;
  icon: React.ElementType;
  status: 'connected' | 'warning' | 'disconnected';
  latency: number;
  label: string;
}

export function StatusMonitor() {
  const { theme } = useTheme();
  const [connections, setConnections] = useState<ConnectionStatus[]>([
    { name: 'iot', icon: Bluetooth, status: 'connected', latency: 12, label: 'IoT Device' },
    { name: 'internet', icon: Wifi, status: 'connected', latency: 45, label: 'Internet' },
    { name: 'ai', icon: Cpu, status: 'connected', latency: 128, label: 'AI Models' },
    { name: 'cloud', icon: Cloud, status: 'connected', latency: 89, label: 'Cloud Sync' },
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
    }, CONNECTION_UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-emerald-500';
      case 'warning': return 'text-amber-500';
      case 'disconnected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'disconnected': return XCircle;
      default: return Activity;
    }
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-emerald-500';
    if (latency < 150) return 'text-amber-500';
    return 'text-red-500';
  };

  const isDark = theme === 'dark';

  return (
    <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>System Status</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {connections.map((conn) => {
          const StatusIcon = getStatusIcon(conn.status);
          const Icon = conn.icon;
          return (
            <div
              key={conn.name}
              className={`p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  conn.status === 'connected' 
                    ? isDark ? 'bg-emerald-500/20' : 'bg-emerald-100' 
                    : conn.status === 'warning'
                    ? isDark ? 'bg-amber-500/20' : 'bg-amber-100'
                    : isDark ? 'bg-red-500/20' : 'bg-red-100'
                }`}>
                  <Icon className={`w-4 h-4 ${getStatusColor(conn.status)}`} />
                </div>
                <StatusIcon className={`w-4 h-4 ${getStatusColor(conn.status)}`} />
              </div>
              
              <p className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{conn.label}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-lg font-bold ${getLatencyColor(conn.latency)}`}>{conn.latency}</span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>ms</span>
              </div>

              {/* Animated border indicator */}
              <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500 ${
                conn.status === 'connected' ? 'bg-emerald-500 w-full' :
                conn.status === 'warning' ? 'bg-amber-500 w-2/3' : 'bg-red-500 w-1/3'
              }`}></div>
            </div>
          );
        })}
      </div>

      {/* Overall connectivity bar */}
      <div className={`mt-4 p-3 rounded-xl ${isDark ? 'bg-gradient-to-r from-emerald-500/10 to-blue-500/10' : 'bg-gradient-to-r from-emerald-50 to-blue-50'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Overall Status</span>
          </div>
          <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
            {connections.filter(c => c.status === 'connected').length}/{connections.length} Active
          </span>
        </div>
        <div className={`mt-2 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(connections.filter(c => c.status === 'connected').length / connections.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
