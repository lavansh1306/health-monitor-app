import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HealthMetricCardProps {
  title: string;
  score: number;
  maxScore?: number;
  riskLevel: 'low' | 'medium' | 'high';
  icon: ReactNode;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
}

export function HealthMetricCard({
  title,
  score,
  maxScore = 100,
  riskLevel,
  icon,
  trend = 'stable',
  description,
}: HealthMetricCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const scorePercentage = (score / maxScore) * 100;

  // Risk color mapping
  const getRiskColor = () => {
    if (riskLevel === 'low') return {
      border: isDark ? '#10b981' : '#10b981',
      bg: isDark ? 'rgba(16, 185, 129, 0.1)' : '#f0fdf4',
      badge: isDark ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5',
      badgeText: isDark ? '#6ee7b7' : '#047857',
      text: isDark ? '#6ee7b7' : '#059669',
      bar: '#10b981',
      score: isDark ? '#ffffff' : '#111827',
    };
    if (riskLevel === 'medium') return {
      border: isDark ? '#f59e0b' : '#f59e0b',
      bg: isDark ? 'rgba(245, 158, 11, 0.1)' : '#fffbeb',
      badge: isDark ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
      badgeText: isDark ? '#fcd34d' : '#b45309',
      text: isDark ? '#fcd34d' : '#d97706',
      bar: '#f59e0b',
      score: isDark ? '#ffffff' : '#111827',
    };
    return {
      border: isDark ? '#ef4444' : '#ef4444',
      bg: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2',
      badge: isDark ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2',
      badgeText: isDark ? '#fca5a5' : '#b91c1c',
      text: isDark ? '#fca5a5' : '#dc2626',
      bar: '#ef4444',
      score: isDark ? '#ffffff' : '#111827',
    };
  };

  const colors = getRiskColor();

  return (
    <div
      style={{
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '12px',
        backgroundColor: colors.bg,
        borderLeft: `4px solid ${colors.border}`,
        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
        borderLeftWidth: '4px',
        boxShadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
        transition: 'all 200ms',
      }}
    >
      {/* Header with Icon and Title */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            flexShrink: 0,
            color: isDark ? '#9ca3af' : '#6b7280',
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: isDark ? '#f3f4f6' : '#111827',
              margin: '0 0 6px 0',
            }}
          >
            {title}
          </h3>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '600',
              padding: '4px 8px',
              borderRadius: '20px',
              backgroundColor: colors.badge,
              color: colors.badgeText,
              display: 'inline-block',
            }}
          >
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
          </span>
        </div>
      </div>

      {/* Score Display with Trend */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
        <span
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: colors.score,
          }}
        >
          {score}
        </span>
        <span style={{ fontSize: '12px', color: isDark ? '#9ca3af' : '#6b7280' }}>
          / {maxScore}
        </span>
        {trend !== 'stable' && (
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '500',
              color: trend === 'down' ? (isDark ? '#6ee7b7' : '#059669') : (isDark ? '#fca5a5' : '#dc2626'),
            }}
          >
            {trend === 'up' ? (
              <TrendingUp style={{ width: '14px', height: '14px' }} />
            ) : (
              <TrendingDown style={{ width: '14px', height: '14px' }} />
            )}
            {trend === 'up' ? 'Increasing' : 'Improving'}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: '8px',
          borderRadius: '4px',
          backgroundColor: isDark ? '#374151' : '#e5e7eb',
          overflow: 'hidden',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: '4px',
            backgroundColor: colors.bar,
            width: `${Math.min(scorePercentage, 100)}%`,
            transition: 'width 500ms ease',
          }}
        />
      </div>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: '12px',
            lineHeight: '1.5',
            color: isDark ? '#9ca3af' : '#6b7280',
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
