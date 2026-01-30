import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart, Tooltip } from 'recharts';
import { Calendar, AlertCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function TrendsHistory() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly'>('daily');

  // Mock data for daily view
  const dailyData = [
    { time: '00:00', spo2: 97, hr: 65, rr: 14 },
    { time: '03:00', spo2: 96, hr: 62, rr: 13 },
    { time: '06:00', spo2: 97, hr: 68, rr: 15 },
    { time: '09:00', spo2: 98, hr: 72, rr: 16 },
    { time: '12:00', spo2: 98, hr: 78, rr: 17 },
    { time: '15:00', spo2: 97, hr: 82, rr: 18 },
    { time: '18:00', spo2: 98, hr: 75, rr: 16 },
    { time: '21:00', spo2: 97, hr: 70, rr: 15 }
  ];

  // Mock data for weekly view
  const weeklyData = [
    { day: 'Mon', spo2: 97, hr: 70, rr: 15 },
    { day: 'Tue', spo2: 98, hr: 72, rr: 16 },
    { day: 'Wed', spo2: 97, hr: 71, rr: 15 },
    { day: 'Thu', spo2: 98, hr: 73, rr: 16 },
    { day: 'Fri', spo2: 97, hr: 74, rr: 16 },
    { day: 'Sat', spo2: 98, hr: 69, rr: 15 },
    { day: 'Sun', spo2: 98, hr: 68, rr: 14 }
  ];

  const data = timeRange === 'daily' ? dailyData : weeklyData;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: item.color }}>
              {item.name}: {item.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-xl border-b ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Trends & History</h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vital signs over time</p>
            </div>
            <div className="flex items-center gap-2">
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
              <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Time Range Toggle */}
        <div className={`rounded-xl p-1 flex border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
          <button
            onClick={() => setTimeRange('daily')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              timeRange === 'daily'
                ? isDark 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : isDark 
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeRange('weekly')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              timeRange === 'weekly'
                ? isDark 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : isDark 
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Weekly
          </button>
        </div>

        {/* SpO2 Chart */}
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Blood Oxygen (SpO₂)</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Percentage</p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>98%</p>
                <p className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Current</p>
              </div>
            </div>
          </div>
          
          <div className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSpo2Dark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
                <XAxis 
                  dataKey={timeRange === 'daily' ? 'time' : 'day'} 
                  tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }}
                  stroke={isDark ? '#4b5563' : '#e5e7eb'}
                  tickLine={false}
                />
                <YAxis 
                  domain={[90, 100]} 
                  tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }}
                  stroke={isDark ? '#4b5563' : '#e5e7eb'}
                  tickLine={false}
                  width={30}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="spo2"
                  name="SpO₂"
                  stroke="#3b82f6" 
                  strokeWidth={2.5}
                  fill="url(#colorSpo2Dark)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heart Rate Chart */}
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Heart Rate</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Beats per minute</p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>72</p>
                <p className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Current</p>
              </div>
            </div>
          </div>
          
          <div className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHrDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
                <XAxis 
                  dataKey={timeRange === 'daily' ? 'time' : 'day'} 
                  tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }}
                  stroke={isDark ? '#4b5563' : '#e5e7eb'}
                  tickLine={false}
                />
                <YAxis 
                  domain={[50, 90]} 
                  tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }}
                  stroke={isDark ? '#4b5563' : '#e5e7eb'}
                  tickLine={false}
                  width={30}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="hr"
                  name="Heart Rate"
                  stroke="#ef4444" 
                  strokeWidth={2.5}
                  fill="url(#colorHrDark)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Respiratory Rate Chart */}
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Respiratory Rate</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Breaths per minute</p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>16</p>
                <p className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Current</p>
              </div>
            </div>
          </div>
          
          <div className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRrDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
                <XAxis 
                  dataKey={timeRange === 'daily' ? 'time' : 'day'} 
                  tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }}
                  stroke={isDark ? '#4b5563' : '#e5e7eb'}
                  tickLine={false}
                />
                <YAxis 
                  domain={[10, 20]} 
                  tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }}
                  stroke={isDark ? '#4b5563' : '#e5e7eb'}
                  tickLine={false}
                  width={30}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="rr"
                  name="Respiratory Rate"
                  stroke="#14b8a6" 
                  strokeWidth={2.5}
                  fill="url(#colorRrDark)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Abnormal Events */}
        <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4 shadow-lg`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Detected Events</h3>
          
          <div className="space-y-3">
            <div className={`flex items-start gap-3 p-3 rounded-xl border ${isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
              <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Mild SpO₂ Drop</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Yesterday, 2:34 AM - 95% for 2 minutes</p>
              </div>
            </div>

            <div className={`p-3 rounded-xl text-center ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No other events detected this week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
