import { ReactNode, useState, useEffect, useId } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Animation constants
const ANIMATION_DURATION_MS = 1000;
const ANIMATION_STEPS = 30;

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  unit: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color: 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'teal';
  data: { value: number }[];
  status?: 'normal' | 'warning' | 'critical';
  animate?: boolean;
}

export function MetricCard({
  icon,
  title,
  value,
  unit,
  subtitle,
  trend = 'stable',
  trendValue,
  color,
  data,
  status = 'normal',
  animate = true
}: MetricCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  const gradientId = useId();

  // Animate value on mount
  useEffect(() => {
    if (!animate) return;
    let isMounted = true;
    const increment = value / ANIMATION_STEPS;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        if (isMounted) setDisplayValue(value);
        clearInterval(timer);
      } else {
        if (isMounted) setDisplayValue(Math.round(current));
      }
    }, ANIMATION_DURATION_MS / ANIMATION_STEPS);
    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [value, animate]);

  const colorClasses = {
    red: {
      light: 'from-red-50 to-red-100/50',
      dark: 'from-red-500/10 to-red-500/5',
      icon: isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600',
      stroke: '#ef4444',
      fill: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.15)'
    },
    blue: {
      light: 'from-blue-50 to-blue-100/50',
      dark: 'from-blue-500/10 to-blue-500/5',
      icon: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600',
      stroke: '#3b82f6',
      fill: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'
    },
    green: {
      light: 'from-emerald-50 to-emerald-100/50',
      dark: 'from-emerald-500/10 to-emerald-500/5',
      icon: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
      stroke: '#10b981',
      fill: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.15)'
    },
    purple: {
      light: 'from-purple-50 to-purple-100/50',
      dark: 'from-purple-500/10 to-purple-500/5',
      icon: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600',
      stroke: '#8b5cf6',
      fill: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.15)'
    },
    orange: {
      light: 'from-orange-50 to-orange-100/50',
      dark: 'from-orange-500/10 to-orange-500/5',
      icon: isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600',
      stroke: '#f97316',
      fill: isDark ? 'rgba(249, 115, 22, 0.1)' : 'rgba(249, 115, 22, 0.15)'
    },
    teal: {
      light: 'from-teal-50 to-teal-100/50',
      dark: 'from-teal-500/10 to-teal-500/5',
      icon: isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600',
      stroke: '#14b8a6',
      fill: isDark ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.15)'
    }
  };

  const currentColors = colorClasses[color];

  const statusColors = {
    normal: isDark ? 'text-emerald-400' : 'text-emerald-600',
    warning: isDark ? 'text-amber-400' : 'text-amber-600',
    critical: isDark ? 'text-red-400' : 'text-red-600'
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${
      isDark 
        ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    } transition-all duration-300 hover:shadow-lg group`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? currentColors.dark : currentColors.light} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
      
      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${currentColors.icon}`}>
            {icon}
          </div>
          {status && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              status === 'normal' 
                ? isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                : status === 'warning'
                ? isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                : isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          )}
        </div>

        {/* Title and subtitle */}
        <div className="mb-2">
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{title}</h3>
          {subtitle && (
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{subtitle}</p>
          )}
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {displayValue}
          </span>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{unit}</span>
        </div>

        {/* Trend */}
        {trendValue && (
          <div className="flex items-center gap-1 mb-3">
            <TrendIcon className={`w-3 h-3 ${
              trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-gray-400'
            }`} />
            <span className={`text-xs ${
              trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {trendValue}
            </span>
          </div>
        )}

        {/* Mini chart */}
        <div className="h-12 -mx-4 -mb-4 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={currentColors.stroke} stopOpacity={0.3}/>
                  <stop offset="100%" stopColor={currentColors.stroke} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  fontSize: '12px',
                  padding: '4px 8px'
                }}
                labelFormatter={() => ''}
                formatter={(val: number) => [val, title]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={currentColors.stroke}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
