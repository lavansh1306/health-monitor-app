import { AlertTriangle, Wind, Activity, Moon, Battery, TrendingUp, BarChart3, Heart, ArrowLeft } from 'lucide-react';

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

function InsightCard({ icon, title, score, riskLevel, description }: InsightCardProps) {
  const getColorClasses = () => {
    if (riskLevel === 'low') return {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-700'
    };
    if (riskLevel === 'medium') return {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      badge: 'bg-amber-100 text-amber-700'
    };
    return {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-700'
    };
  };

  const colors = getColorClasses();

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-2xl p-5`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 ${colors.badge} rounded-full flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className={`text-2xl ${colors.text}`}>{score}</span>
        <span className={`text-xs px-3 py-1 ${colors.badge} rounded-full capitalize`}>
          {riskLevel} Risk
        </span>
      </div>
    </div>
  );
}

export function HealthInsights() {
  const insights = [
    {
      icon: <AlertTriangle className="w-5 h-5 text-green-700" />,
      title: 'Illness Risk Flag',
      score: 12,
      riskLevel: 'low' as const,
      description: 'Viral and respiratory illness screening indicator based on vital patterns.'
    },
    {
      icon: <Wind className="w-5 h-5 text-green-700" />,
      title: 'Early Hypoxia Detection',
      score: 8,
      riskLevel: 'low' as const,
      description: 'Early screening for oxygen deficiency and respiratory distress patterns.'
    },
    {
      icon: <Activity className="w-5 h-5 text-green-700" />,
      title: 'Oxygen Desaturation Events',
      score: 2,
      riskLevel: 'low' as const,
      description: 'Detected instances of blood oxygen level drops during monitoring.'
    },
    {
      icon: <Moon className="w-5 h-5 text-amber-700" />,
      title: 'Breathing Irregularity',
      score: 34,
      riskLevel: 'medium' as const,
      description: 'Sleep apnea and breathing pattern screening during rest periods.'
    },
    {
      icon: <Battery className="w-5 h-5 text-green-700" />,
      title: 'Fatigue & Stress Index',
      score: 18,
      riskLevel: 'low' as const,
      description: 'Overall wellness indicator based on vital stability and recovery patterns.'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-700" />,
      title: 'Recovery Rate Score',
      score: 85,
      riskLevel: 'low' as const,
      description: 'How quickly your heart rate and oxygen levels return to normal after activity.'
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-green-700" />,
      title: 'Vital Stability Index',
      score: 92,
      riskLevel: 'low' as const,
      description: 'Trend-based assessment of overall vital sign consistency and stability.'
    },
    {
      icon: <Heart className="w-5 h-5 text-green-700" />,
      title: 'Cardio-Respiratory Fitness',
      score: 78,
      riskLevel: 'low' as const,
      description: 'Combined heart and lung function screening score for overall fitness.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl text-gray-900">Health Insights</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1">Derived risk screening indicators</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {insights.map((insight, index) => (
          <InsightCard key={index} {...insight} />
        ))}

        {/* Footer Notice */}
        <div className="bg-gray-100 rounded-2xl p-4 mt-6">
          <p className="text-xs text-gray-600 leading-relaxed">
            These insights are screening indicators only and do not constitute medical diagnosis. 
            Consult healthcare professionals for interpretation and medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
