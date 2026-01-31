import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { DetailModal } from './DetailModal';
import { SimpleGraph } from './SimpleGraph';

interface AnimatedMetricCardProps {
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
};

export function AnimatedMetricCard({
  title,
  score,
  maxScore = 100,
  riskLevel,
  icon,
  trend = 'stable',
  description,
  index,
}: AnimatedMetricCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scorePercentage = (score / maxScore) * 100;

  const getRiskColor = () => {
    if (riskLevel === 'low')
      return {
        border: '#10b981',
        bg: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.05)',
        gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
        bar: '#10b981',
        score: isDark ? '#6ee7b7' : '#059669',
        badge: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)',
      };
    if (riskLevel === 'medium')
      return {
        border: '#f59e0b',
        bg: isDark ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.05)',
        gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))',
        bar: '#f59e0b',
        score: isDark ? '#fcd34d' : '#d97706',
        badge: isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.15)',
      };
    return {
      border: '#ef4444',
      bg: isDark ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.05)',
      gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
      bar: '#ef4444',
      score: isDark ? '#fca5a5' : '#dc2626',
      badge: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.15)',
    };
  };

  const colors = getRiskColor();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  // Get trend data based on title
  const getTrendData = () => {
    const key = title.toLowerCase().split(' ')[0];
    return trendDataMap[key] || trendDataMap.breathing;
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onClick={() => setIsModalOpen(true)}
        style={{
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      >
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: `0 8px 24px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}` }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: colors.bg,
            border: `2px solid ${colors.border}`,
            borderRadius: '16px',
            padding: '14px',
            overflow: 'hidden',
            position: 'relative',
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
            {/* Header */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.badge,
                  flexShrink: 0,
                  color: colors.score,
                }}
              >
                {icon}
              </motion.div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: isDark ? '#f3f4f6' : '#111827',
                    margin: '0 0 3px 0',
                  }}
                >
                  {title}
                </h3>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    padding: '3px 8px',
                    borderRadius: '16px',
                    backgroundColor: colors.badge,
                    color: colors.score,
                    display: 'inline-block',
                    cursor: 'pointer',
                  }}
                >
                  {riskLevel === 'low' ? '✓' : riskLevel === 'medium' ? '⚠' : '✕'} {riskLevel.toUpperCase()}
                </motion.span>
              </div>
              <ChevronRight
                size={20}
                style={{
                  color: colors.score,
                  opacity: 0.6,
                }}
              />
            </div>

            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '10px' }}>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: colors.score,
                }}
              >
                {score}
              </motion.span>
              <span style={{ fontSize: '11px', color: isDark ? '#9ca3af' : '#6b7280' }}>/ {maxScore}</span>
              {trend !== 'stable' && (
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontSize: '10px',
                    fontWeight: '600',
                    color: trend === 'down' ? '#10b981' : '#ef4444',
                  }}
                >
                  {trend === 'up' ? (
                    <TrendingUp style={{ width: '12px', height: '12px' }} />
                  ) : (
                    <TrendingDown style={{ width: '12px', height: '12px' }} />
                  )}
                  {trend === 'up' ? 'Rising' : 'Improving'}
                </motion.div>
              )}
            </div>

            {/* Animated Progress Bar */}
            <div
              style={{
                height: '5px',
                borderRadius: '2px',
                backgroundColor: isDark ? '#374151' : '#e5e7eb',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(scorePercentage, 100)}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 1.2, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  borderRadius: '2px',
                  background: `linear-gradient(90deg, ${colors.bar}, ${colors.score})`,
                  boxShadow: `0 0 8px ${colors.bar}80`,
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
