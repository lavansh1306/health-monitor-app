interface HealthRiskRingProps {
  score: number; // 0-100 (lower is better)
}

export function HealthRiskRing({ score }: HealthRiskRingProps) {
  // Determine color based on score
  const getColor = () => {
    if (score < 30) return { stroke: '#10b981', bg: '#d1fae5' }; // green
    if (score < 60) return { stroke: '#f59e0b', bg: '#fef3c7' }; // amber
    return { stroke: '#ef4444', bg: '#fee2e2' }; // red
  };

  const colors = getColor();
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r="58"
          fill="none"
          stroke={colors.bg}
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r="58"
          fill="none"
          stroke={colors.stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-4xl text-gray-900">{normalizedScore}</p>
        <p className="text-xs text-gray-500">Risk Score</p>
      </div>
    </div>
  );
}
