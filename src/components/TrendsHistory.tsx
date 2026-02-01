import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart, Tooltip } from 'recharts';
import { Calendar, AlertCircle, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`px-4 py-3 rounded-lg border backdrop-blur-sm ${isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'} shadow-xl`}
        >
          <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-xs font-medium" style={{ color: item.color }}>
              {item.name}: {item.value}
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  const ChartCard = ({ 
    title, 
    subtitle, 
    current, 
    color, 
    dataKey, 
    gradient,
    unit 
  }: { 
    title: string; 
    subtitle: string; 
    current: number; 
    color: string; 
    dataKey: string; 
    gradient: { id: string; colors: [string, string] };
    unit: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-4 border overflow-hidden ${
        isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
      } shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold`} style={{ color }}>
            {current}{unit}
          </p>
          <p className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Current</p>
        </div>
      </div>
      
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={gradient.id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradient.colors[0]} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={gradient.colors[1]} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#374151' : '#e5e7eb'}
              vertical={false}
            />
            <XAxis 
              dataKey={timeRange === 'daily' ? 'time' : 'day'} 
              tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }}
              stroke={isDark ? '#4b5563' : '#e5e7eb'}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }}
              stroke={isDark ? '#4b5563' : '#e5e7eb'}
              tickLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey={dataKey}
              name={title}
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#${gradient.id})`}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

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
            isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'
          }`}>
            <TrendingUp className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          </div>
          <div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r ${
              isDark ? 'from-cyan-300 to-blue-300' : 'from-cyan-600 to-blue-600'
            } bg-clip-text text-transparent`}>
              Trends & History
            </h1>
            <p className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Vital signs over time</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Time Range Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-xl p-1 flex border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} shadow-sm`}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setTimeRange('daily')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              timeRange === 'daily'
                ? isDark 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                : isDark 
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            24h
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setTimeRange('weekly')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              timeRange === 'weekly'
                ? isDark 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                : isDark 
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            7d
          </motion.button>
        </motion.div>

        {/* Charts Grid */}
        <div className="space-y-4">
          <ChartCard
            title="Blood Oxygen"
            subtitle="SpO₂ %"
            current={98}
            color="#3b82f6"
            dataKey="spo2"
            gradient={{ id: 'colorSpo2', colors: ['#3b82f6', '#1e40af'] }}
            unit="%"
          />
          <ChartCard
            title="Heart Rate"
            subtitle="Beats per minute"
            current={72}
            color="#ef4444"
            dataKey="hr"
            gradient={{ id: 'colorHr', colors: ['#ef4444', '#dc2626'] }}
            unit=" bpm"
          />
          <ChartCard
            title="Respiratory Rate"
            subtitle="Breaths per minute"
            current={16}
            color="#14b8a6"
            dataKey="rr"
            gradient={{ id: 'colorRr', colors: ['#14b8a6', '#0d9488'] }}
            unit=" /min"
          />
        </div>

        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} p-4 shadow-lg`}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Detected Events</h3>
          </div>
          
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-start gap-3 p-3 rounded-xl border ${
                isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${isDark ? 'bg-amber-400' : 'bg-amber-600'}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Mild SpO₂ Drop</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Yesterday, 2:34 AM · 95% for 2 min</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-3 rounded-xl text-center ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}
            >
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No critical events this week</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
