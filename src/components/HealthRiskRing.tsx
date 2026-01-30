import { useTheme } from '../contexts/ThemeContext';

interface HealthRiskRingProps {
  score: number; // 0-100 (lower is better)
}

export function HealthRiskRing({ score }: HealthRiskRingProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Determine color based on score
  const getColor = () => {
    if (score < 30) return { 
      stroke: '#10b981', 
      bg: isDark ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5',
      glow: 'rgba(16, 185, 129, 0.3)'
    }; // green
    if (score < 60) return { 
      stroke: '#f59e0b', 
      bg: isDark ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
      glow: 'rgba(245, 158, 11, 0.3)'
    }; // amber
    return { 
      stroke: '#ef4444', 
      bg: isDark ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2',
      glow: 'rgba(239, 68, 68, 0.3)'
    }; // red
  };

  const colors = getColor();
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className="relative w-44 h-44">
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl opacity-30"
        style={{ backgroundColor: colors.stroke }}
      ></div>
      
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={colors.bg}
          strokeWidth="10"
        />
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={colors.stroke}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ 
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: `drop-shadow(0 0 6px ${colors.glow})`
          }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{normalizedScore}</p>
        <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Risk Score</p>
      </div>
    </div>
  );
}
