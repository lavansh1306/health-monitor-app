import { useState } from 'react';
import { Moon, Sun, Play, Square, Clock, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

interface SleepSession {
  date: string;
  duration: number; // hours
  quality: number; // 0-100
  deepSleep: number; // percentage
  remSleep: number; // percentage
  lightSleep: number; // percentage
  awakenings: number;
}

export function SleepCapture() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [isTracking, setIsTracking] = useState(false);
  const [activeTab, setActiveTab] = useState<'tonight' | 'history'>('tonight');

  // Mock sleep data
  const sleepHistory: SleepSession[] = [
    { date: 'Mon', duration: 7.5, quality: 85, deepSleep: 20, remSleep: 25, lightSleep: 55, awakenings: 2 },
    { date: 'Tue', duration: 6.8, quality: 72, deepSleep: 18, remSleep: 22, lightSleep: 60, awakenings: 4 },
    { date: 'Wed', duration: 8.2, quality: 92, deepSleep: 25, remSleep: 28, lightSleep: 47, awakenings: 1 },
    { date: 'Thu', duration: 7.0, quality: 78, deepSleep: 19, remSleep: 24, lightSleep: 57, awakenings: 3 },
    { date: 'Fri', duration: 6.5, quality: 65, deepSleep: 15, remSleep: 20, lightSleep: 65, awakenings: 5 },
    { date: 'Sat', duration: 8.5, quality: 88, deepSleep: 23, remSleep: 27, lightSleep: 50, awakenings: 1 },
    { date: 'Sun', duration: 8.0, quality: 90, deepSleep: 24, remSleep: 26, lightSleep: 50, awakenings: 1 },
  ];

  // Last night's detailed data
  const lastNightData = [
    { time: '11PM', stage: 'Awake', value: 4 },
    { time: '12AM', stage: 'Light', value: 2 },
    { time: '1AM', stage: 'Deep', value: 1 },
    { time: '2AM', stage: 'Deep', value: 1 },
    { time: '3AM', stage: 'REM', value: 3 },
    { time: '4AM', stage: 'Light', value: 2 },
    { time: '5AM', stage: 'Deep', value: 1 },
    { time: '6AM', stage: 'REM', value: 3 },
    { time: '7AM', stage: 'Light', value: 2 },
  ];

  const averageQuality = Math.round(sleepHistory.reduce((a, b) => a + b.quality, 0) / sleepHistory.length);
  const averageDuration = (sleepHistory.reduce((a, b) => a + b.duration, 0) / sleepHistory.length).toFixed(1);

  const getQualityColor = (quality: number) => {
    if (quality >= 80) return 'text-emerald-500';
    if (quality >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getQualityBg = (quality: number) => {
    if (quality >= 80) return isDark ? 'bg-emerald-500/20' : 'bg-emerald-100';
    if (quality >= 60) return isDark ? 'bg-amber-500/20' : 'bg-amber-100';
    return isDark ? 'bg-red-500/20' : 'bg-red-100';
  };

  return (
    <div className={`rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'}`}>
              <Moon className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Sleep Capture</h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Track your sleep patterns</p>
            </div>
          </div>
          <button
            onClick={() => setIsTracking(!isTracking)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isTracking
                ? 'bg-red-500 text-white hover:bg-red-600'
                : isDark 
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isTracking ? (
              <>
                <Square className="w-4 h-4" />
                <span className="text-sm font-medium">Stop</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Start</span>
              </>
            )}
          </button>
        </div>

        {isTracking && (
          <div className={`mt-4 p-3 rounded-xl ${isDark ? 'bg-indigo-500/10 border border-indigo-500/30' : 'bg-indigo-50 border border-indigo-100'} flex items-center gap-3`}>
            <div className="relative">
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
            </div>
            <span className={`text-sm ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
              Sleep tracking active • Recording vitals...
            </span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className={`flex border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        {['tonight', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'tonight' | 'history')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? isDark 
                  ? 'text-indigo-400 border-b-2 border-indigo-400' 
                  : 'text-indigo-600 border-b-2 border-indigo-600'
                : isDark 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'tonight' ? 'Last Night' : 'History'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'tonight' ? (
          <div className="space-y-4">
            {/* Sleep score */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sleep Quality</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-3xl font-bold ${getQualityColor(90)}`}>90</span>
                  <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/100</span>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full ${getQualityBg(90)}`}>
                <span className={`text-sm font-medium ${getQualityColor(90)}`}>Excellent</span>
              </div>
            </div>

            {/* Sleep stages chart */}
            <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <p className={`text-xs font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Sleep Stages</p>
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lastNightData}>
                    <defs>
                      <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 10, fill: isDark ? '#9ca3af' : '#6b7280' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Area 
                      type="stepAfter" 
                      dataKey="value" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                      fill="url(#sleepGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-2">
                {['Deep', 'Light', 'REM', 'Awake'].map((stage, i) => (
                  <div key={stage} className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      i === 0 ? 'bg-indigo-600' : i === 1 ? 'bg-indigo-400' : i === 2 ? 'bg-purple-500' : 'bg-gray-400'
                    }`}></div>
                    <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} text-center`}>
                <Clock className={`w-4 h-4 mx-auto mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>8h 0m</p>
                <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Duration</p>
              </div>
              <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} text-center`}>
                <Zap className={`w-4 h-4 mx-auto mb-1 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>24%</p>
                <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Deep Sleep</p>
              </div>
              <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} text-center`}>
                <TrendingUp className={`w-4 h-4 mx-auto mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`} />
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>1</p>
                <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Awakenings</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Weekly averages */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weekly Average</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{averageDuration}h</span>
                  <span className={`text-sm ${getQualityColor(averageQuality)}`}>{averageQuality}% quality</span>
                </div>
              </div>
            </div>

            {/* Weekly chart */}
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sleepHistory}>
                  <defs>
                    <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10, fill: isDark ? '#9ca3af' : '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[5, 10]}
                    tick={{ fontSize: 10, fill: isDark ? '#9ca3af' : '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                    width={25}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1f2937' : '#fff',
                      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`${value}h`, 'Sleep']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="duration" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    fill="url(#durationGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Recent nights */}
            <div className="space-y-2">
              {sleepHistory.slice(-3).reverse().map((session, i) => (
                <div 
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getQualityBg(session.quality)}`}>
                      <Moon className={`w-4 h-4 ${getQualityColor(session.quality)}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{session.date}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{session.duration}h sleep</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${getQualityColor(session.quality)}`}>{session.quality}%</p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>quality</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
