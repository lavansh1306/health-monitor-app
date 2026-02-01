// Grid-based metric card component for health dashboard
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { DetailModal } from './DetailModal';
import { SimpleGraph } from './SimpleGraph';

interface MetricGridCardProps {
  title: string;
  score: number;
  maxScore?: number;
  riskLevel: 'low' | 'medium' | 'high';
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
  index: number;
}

// Sample trend data
const trendDataMap: Record<string, Array<{ day: string; value: number }>> = {
  breathing: [
    { day: 'Mon', value: 28 },
    { day: 'Tue', value: 31 },
    { day: 'Wed', value: 35 },
    { day: 'Thu', value: 33 },
    { day: 'Fri', value: 36 },
    { day: 'Sat', value: 34 },
    { day: 'Sun', value: 34 },
  ],
  illness: [
    { day: 'Mon', value: 18 },
    { day: 'Tue', value: 15 },
    { day: 'Wed', value: 14 },
    { day: 'Thu', value: 12 },
    { day: 'Fri', value: 11 },
    { day: 'Sat', value: 12 },
    { day: 'Sun', value: 12 },
  ],
  hypoxia: [
    { day: 'Mon', value: 10 },
    { day: 'Tue', value: 9 },
    { day: 'Wed', value: 8 },
    { day: 'Thu', value: 7 },
    { day: 'Fri', value: 8 },
    { day: 'Sat', value: 8 },
    { day: 'Sun', value: 8 },
  ],
  desaturation: [
    { day: 'Mon', value: 3 },
    { day: 'Tue', value: 2 },
    { day: 'Wed', value: 1 },
    { day: 'Thu', value: 1 },
    { day: 'Fri', value: 2 },
    { day: 'Sat', value: 1 },
    { day: 'Sun', value: 2 },
  ],
  fatigue: [
    { day: 'Mon', value: 22 },
    { day: 'Tue', value: 20 },
    { day: 'Wed', value: 18 },
    { day: 'Thu', value: 16 },
    { day: 'Fri', value: 15 },
    { day: 'Sat', value: 17 },
    { day: 'Sun', value: 18 },
  ],
  recovery: [
    { day: 'Mon', value: 80 },
    { day: 'Tue', value: 82 },
    { day: 'Wed', value: 84 },
    { day: 'Thu', value: 85 },
    { day: 'Fri', value: 86 },
    { day: 'Sat', value: 85 },
    { day: 'Sun', value: 85 },
  ],
};

export function MetricGridCard({
  title,
  score,
  maxScore = 100,
  riskLevel,
  icon,
  trend = 'stable',
  description,
  index,
}: MetricGridCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getRiskColor = () => {
    if (riskLevel === 'low') {
      return {
        border: '#10b981',
        bg: isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.25)',
        gradient: isDark 
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08))'
          : 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))',
        bar: '#10b981',
        score: isDark ? '#6ee7b7' : '#047857',
        badge: isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.35)',
        text: isDark ? '#d1fae5' : '#065f46',
      };
    }
    if (riskLevel === 'medium') {
      return {
        border: '#f59e0b',
        bg: isDark ? 'rgba(245, 158, 11, 0.12)' : 'rgba(245, 158, 11, 0.25)',
        gradient: isDark
          ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.08))'
          : 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))',
        bar: '#f59e0b',
        score: isDark ? '#fcd34d' : '#b45309',
        badge: isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.35)',
        text: isDark ? '#fef3c7' : '#78350f',
      };
    }
    return {
      border: '#ef4444',
      bg: isDark ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.25)',
      gradient: isDark
        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.08))'
        : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
      bar: '#ef4444',
      score: isDark ? '#fca5a5' : '#991b1b',
      badge: isDark ? 'rgba(239, 68, 68, 0.25)' : 'rgba(239, 68, 68, 0.35)',
      text: isDark ? '#fee2e2' : '#7f1d1d',
    };
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const colors = getRiskColor();
  const scorePercentage = (score / maxScore) * 100;

  const getTrendData = () => {
    const key = title.toLowerCase().split(' ')[0];
    return trendDataMap[key] || trendDataMap.recovery;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
        }}
        onClick={() => setIsModalOpen(true)}
        style={{
          cursor: 'pointer',
          aspectRatio: '1',
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: `0 12px 24px rgba(0, 0, 0, 0.6)` }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: colors.bg,
            border: `2px solid ${colors.border}`,
            borderRadius: '16px',
            padding: '14px',
            overflow: 'hidden',
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Animated gradient background */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: colors.gradient,
              backgroundSize: '200% 200%',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: 15 }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.badge,
                color: colors.score,
                marginBottom: '8px',
              }}
            >
              {icon}
            </motion.div>

            {/* Title */}
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: colors.text,
                margin: '0 0 6px 0',
                lineHeight: '1.2',
              }}
            >
              {title}
            </h3>

            {/* Risk Badge */}
            <span
              style={{
                fontSize: '9px',
                fontWeight: '600',
                padding: '2px 6px',
                borderRadius: '12px',
                backgroundColor: colors.badge,
                color: colors.score,
                display: 'inline-block',
                border: `1px solid ${colors.border}`,
              }}
            >
              {riskLevel === 'low' ? '✓' : riskLevel === 'medium' ? '⚠' : '✕'} {riskLevel.toUpperCase()}
            </span>
          </div>

          {/* Score */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.08 + 0.2, type: 'spring', stiffness: 200 }}
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: colors.score,
                marginBottom: '6px',
              }}
            >
              {score}
            </motion.div>

            {/* Progress Bar */}
            <div
              style={{
                height: '3px',
                borderRadius: '1.5px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(scorePercentage, 100)}%` }}
                transition={{ delay: index * 0.08 + 0.15, duration: 1, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  borderRadius: '1.5px',
                  background: `linear-gradient(90deg, ${colors.bar}, ${colors.score})`,
                  boxShadow: `0 0 6px ${colors.bar}80`,
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        score={score}
        maxScore={maxScore}
        riskLevel={riskLevel}
        description={description || ''}
        icon={icon}
        trend={trend}
      >
        <SimpleGraph data={getTrendData()} color={colors.bar} />
      </DetailModal>
    </>
  );
}
