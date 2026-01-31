import { motion } from 'framer-motion';
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
      strokeGradient: ['#10b981', '#06b6d4'],
      bg: isDark ? 'rgba(16, 185, 129, 0.15)' : '#d1fae5',
      glow: 'rgba(16, 185, 129, 0.5)',
      label: 'Excellent'
    }; // green
    if (score < 60) return { 
      stroke: '#f59e0b',
      strokeGradient: ['#f59e0b', '#fbbf24'],
      bg: isDark ? 'rgba(245, 158, 11, 0.15)' : '#fef3c7',
      glow: 'rgba(245, 158, 11, 0.5)',
      label: 'Good'
    }; // amber
    return { 
      stroke: '#ef4444',
      strokeGradient: ['#ef4444', '#f87171'],
      bg: isDark ? 'rgba(239, 68, 68, 0.15)' : '#fee2e2',
      glow: 'rgba(239, 68, 68, 0.5)',
      label: 'Monitor'
    }; // red
  };

  const colors = getColor();
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <motion.div 
      className="relative w-56 h-56 flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
    >
      {/* Multiple glow layers for premium effect */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ backgroundColor: colors.stroke }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute inset-6 rounded-full blur-2xl"
        style={{ backgroundColor: colors.stroke }}
        animate={{ 
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.08, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      />
      
      <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.strokeGradient[0]} />
            <stop offset="100%" stopColor={colors.strokeGradient[1]} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer decorative ring */}
        <circle
          cx="60"
          cy="60"
          r="58"
          fill="none"
          stroke={isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}
          strokeWidth="1"
        />
        
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={colors.bg}
          strokeWidth="12"
          opacity="0.5"
        />
        
        {/* Progress circle with gradient and glow */}
        <motion.circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          filter="url(#glow)"
          style={{
            boxShadow: `0 0 20px ${colors.glow}`,
          }}
        />
        
        {/* Center decorative circle */}
        <circle
          cx="60"
          cy="60"
          r="48"
          fill={isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'}
          opacity="0.3"
        />
      </svg>
      
      {/* Center content with premium styling */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            textShadow: [
              '0 0 20px rgba(16, 185, 129, 0)',
              `0 0 20px ${colors.glow}`,
              '0 0 20px rgba(16, 185, 129, 0)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-center"
        >
          <p className={`text-6xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {normalizedScore}
          </p>
          <p className={`text-xs font-bold uppercase tracking-widest mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Risk Score
          </p>
        </motion.div>
        
        {/* Status label */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`mt-4 px-4 py-1.5 rounded-full text-xs font-bold ${
            score < 30 ? (isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700') :
            score < 60 ? (isDark ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-700') :
            isDark ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-red-100 text-red-700'
          }`}
        >
          {colors.label}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
