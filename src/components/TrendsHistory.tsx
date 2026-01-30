import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calendar, AlertCircle } from 'lucide-react';

export function TrendsHistory() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl text-gray-900">Trends & History</h1>
            <p className="text-sm text-gray-500 mt-1">Vital signs over time</p>
          </div>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Time Range Toggle */}
        <div className="bg-white rounded-full p-1 flex shadow-sm border border-gray-200">
          <button
            onClick={() => setTimeRange('daily')}
            className={`flex-1 py-2 px-4 rounded-full text-sm transition-colors ${
              timeRange === 'daily'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeRange('weekly')}
            className={`flex-1 py-2 px-4 rounded-full text-sm transition-colors ${
              timeRange === 'weekly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600'
            }`}
          >
            Weekly
          </button>
        </div>

        {/* SpO2 Chart */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900">Blood Oxygen (SpO₂)</h3>
              <p className="text-sm text-gray-500">Percentage</p>
            </div>
            <div className="text-right">
              <p className="text-2xl text-gray-900">98%</p>
              <p className="text-xs text-green-600">Current</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSpo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={timeRange === 'daily' ? 'time' : 'day'} 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                stroke="#e5e7eb"
              />
              <YAxis 
                domain={[90, 100]} 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                stroke="#e5e7eb"
              />
              <Area 
                type="monotone" 
                dataKey="spo2" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fill="url(#colorSpo2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Heart Rate Chart */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900">Heart Rate</h3>
              <p className="text-sm text-gray-500">Beats per minute</p>
            </div>
            <div className="text-right">
              <p className="text-2xl text-gray-900">72</p>
              <p className="text-xs text-green-600">Current</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={timeRange === 'daily' ? 'time' : 'day'} 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                stroke="#e5e7eb"
              />
              <YAxis 
                domain={[50, 90]} 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                stroke="#e5e7eb"
              />
              <Area 
                type="monotone" 
                dataKey="hr" 
                stroke="#ef4444" 
                strokeWidth={2}
                fill="url(#colorHr)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Respiratory Rate Chart */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900">Respiratory Rate</h3>
              <p className="text-sm text-gray-500">Breaths per minute</p>
            </div>
            <div className="text-right">
              <p className="text-2xl text-gray-900">16</p>
              <p className="text-xs text-green-600">Current</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={timeRange === 'daily' ? 'time' : 'day'} 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                stroke="#e5e7eb"
              />
              <YAxis 
                domain={[10, 20]} 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                stroke="#e5e7eb"
              />
              <Area 
                type="monotone" 
                dataKey="rr" 
                stroke="#14b8a6" 
                strokeWidth={2}
                fill="url(#colorRr)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Abnormal Events */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-gray-900 mb-4">Detected Events</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">Mild SpO₂ Drop</p>
                <p className="text-xs text-gray-600 mt-1">Yesterday, 2:34 AM - 95% for 2 minutes</p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-sm text-gray-600">No other events detected this week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
