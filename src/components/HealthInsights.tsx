import { AlertTriangle, Wind, Activity, Moon, Battery, TrendingUp, BarChart3, Heart, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

function InsightCard({ icon, title, score, riskLevel, description }: InsightCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getColorClasses = () => {
    if (riskLevel === 'low') return {
      bg: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50',
      border: isDark ? 'border-emerald-500/30' : 'border-emerald-200',
      text: isDark ? 'text-emerald-400' : 'text-emerald-700',
      badge: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      icon: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
    };
    if (riskLevel === 'medium') return {
      bg: isDark ? 'bg-amber-500/10' : 'bg-amber-50',
      border: isDark ? 'border-amber-500/30' : 'border-amber-200',
      text: isDark ? 'text-amber-400' : 'text-amber-700',
      badge: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700',
      icon: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'
    };
    return {
      bg: isDark ? 'bg-red-500/10' : 'bg-red-50',
      border: isDark ? 'border-red-500/30' : 'border-red-200',
      text: isDark ? 'text-red-400' : 'text-red-700',
      badge: isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700',
      icon: isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
    };
  };

  const colors = getColorClasses();

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-2xl p-4 transition-all hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 ${colors.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className={`font-medium text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className={`text-2xl font-bold ${colors.text}`}>{score}</span>
        <span className={`text-xs px-3 py-1 ${colors.badge} rounded-full capitalize font-medium`}>
          {riskLevel} Risk
        </span>
      </div>
    </div>
  );
}

export function HealthInsights() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const insights = [
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'Illness Risk Flag',
      score: 12,
      riskLevel: 'low' as const,
      description: 'Viral and respiratory illness screening indicator based on vital patterns.'
    },
    {
      icon: <Wind className="w-5 h-5" />,
      title: 'Early Hypoxia Detection',
      score: 8,
      riskLevel: 'low' as const,
      description: 'Early screening for oxygen deficiency and respiratory distress patterns.'
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: 'Oxygen Desaturation Events',
      score: 2,
      riskLevel: 'low' as const,
      description: 'Detected instances of blood oxygen level drops during monitoring.'
    },
    {
      icon: <Moon className="w-5 h-5" />,
      title: 'Breathing Irregularity',
      score: 34,
      riskLevel: 'medium' as const,
      description: 'Sleep apnea and breathing pattern screening during rest periods.'
    },
    {
      icon: <Battery className="w-5 h-5" />,
      title: 'Fatigue & Stress Index',
      score: 18,
      riskLevel: 'low' as const,
      description: 'Overall wellness indicator based on vital stability and recovery patterns.'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Recovery Rate Score',
      score: 85,
      riskLevel: 'low' as const,
      description: 'How quickly your heart rate and oxygen levels return to normal after activity.'
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Vital Stability Index',
      score: 92,
      riskLevel: 'low' as const,
      description: 'Trend-based assessment of overall vital sign consistency and stability.'
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: 'Cardio-Respiratory Fitness',
      score: 78,
      riskLevel: 'low' as const,
      description: 'Combined heart and lung function screening score for overall fitness.'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-xl border-b ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Health Insights</h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Derived risk screening indicators</p>
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

      <div className="px-4 py-6 space-y-4">
        {insights.map((insight, index) => (
          <InsightCard key={index} {...insight} />
        ))}

        {/* Footer Notice */}
        <div className={`rounded-2xl p-4 border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100 border-gray-200'} mt-6`}>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            These insights are screening indicators only and do not constitute medical diagnosis. 
            Consult healthcare professionals for interpretation and medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
