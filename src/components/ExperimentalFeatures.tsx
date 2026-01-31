import { useState } from 'react';
import { 
  AlertTriangle, 
  Info, 
  Sun, 
  Moon, 
  Heart, 
  Wind, 
  Zap, 
  Droplet,
  Activity,
  Brain
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { HealthMetricCard } from './HealthMetricCard';

interface HealthMetric {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export function ExperimentalFeatures() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Mock health metrics data - sorted by risk level (High/Medium first)
  const [healthMetrics] = useState<HealthMetric[]>([
    {
      id: 'breathing',
      title: 'Breathing Irregularity',
      score: 42,
      maxScore: 100,
      riskLevel: 'high',
      icon: <Wind className="w-5 h-5" />,
      trend: 'up',
      description: 'Elevated respiratory rate variability detected',
    },
    {
      id: 'hypoxia',
      title: 'Oxygen Saturation Risk',
      score: 35,
      maxScore: 100,
      riskLevel: 'medium',
      icon: <Droplet className="w-5 h-5" />,
      trend: 'down',
      description: 'SpO₂ baseline lower than typical range',
    },
    {
      id: 'recovery',
      title: 'Cardiac Recovery Index',
      score: 68,
      maxScore: 100,
      riskLevel: 'medium',
      icon: <Heart className="w-5 h-5" />,
      trend: 'stable',
      description: 'Heart rate recovery slower than baseline',
    },
    {
      id: 'stress',
      title: 'Stress Response Level',
      score: 22,
      maxScore: 100,
      riskLevel: 'low',
      icon: <Brain className="w-5 h-5" />,
      trend: 'down',
      description: 'HRV patterns indicate stable nervous system',
    },
    {
      id: 'activity',
      title: 'Physical Activity Score',
      score: 78,
      maxScore: 100,
      riskLevel: 'low',
      icon: <Activity className="w-5 h-5" />,
      trend: 'stable',
      description: 'Meeting daily movement guidelines',
    },
    {
      id: 'circadian',
      title: 'Circadian Rhythm Alignment',
      score: 15,
      maxScore: 100,
      riskLevel: 'low',
      icon: <Zap className="w-5 h-5" />,
      trend: 'stable',
      description: 'Sleep-wake cycle well-aligned with natural patterns',
    },
  ]);

  // Sort metrics: High risk first, then Medium, then Low
  const sortedMetrics = [...healthMetrics].sort((a, b) => {
    const riskOrder = { high: 0, medium: 1, low: 2 };
    return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-xl border-b ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Health Risk Assessment
              </h1>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Research & experimental indicators
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
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

      <div className="px-4 py-6">
        {/* Warning Banner */}
        <div className={`rounded-xl p-4 mb-6 border ${isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-start gap-3">
            <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            <div>
              <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                Experimental Features
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-amber-200/80' : 'text-amber-800'}`}>
                These health indicators are research prototypes. Not validated for clinical use—consult healthcare providers for medical decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedMetrics.map((metric) => (
            <HealthMetricCard
              key={metric.id}
              title={metric.title}
              score={metric.score}
              maxScore={metric.maxScore}
              riskLevel={metric.riskLevel}
              icon={metric.icon}
              trend={metric.trend}
              description={metric.description}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className={`mt-8 rounded-xl p-4 border ${isDark ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex items-start gap-3">
            <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`text-sm font-semibold mb-2 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                About Risk Indicators
              </h3>
              <ul className={`text-xs space-y-1.5 ${isDark ? 'text-blue-200/80' : 'text-blue-800'}`}>
                <li>• <strong>Risk Levels:</strong> Based on vital patterns and waveform analysis</li>
                <li>• <strong>Trends:</strong> Show direction of change (improving/increasing)</li>
                <li>• <strong>Scores:</strong> Relative risk indicators, not diagnostic values</li>
                <li>• <strong>Use Case:</strong> Research awareness and clinical follow-up only</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
