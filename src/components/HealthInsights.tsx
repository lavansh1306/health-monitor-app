import { AlertTriangle, Wind, Activity, Moon, Battery, TrendingUp, BarChart3, Heart, Sun, Info, Zap, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { MetricGridCard } from './MetricGridCard';
import { ParticleBackground } from './ParticleBackground';

interface InsightMetric {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export function HealthInsights() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [showParticles, setShowParticles] = useState(true);

  const metricsData: InsightMetric[] = [
    {
      id: 'breathing',
      title: 'Breathing Irregularity',
      score: 34,
      maxScore: 100,
      riskLevel: 'medium',
      icon: <Wind className="w-5 h-5" />,
      trend: 'up',
      description: 'Elevated respiratory rate variability detected. Sleep apnea screening shows irregular patterns during rest periods.',
    },
    {
      id: 'illness',
      title: 'Illness Risk Flag',
      score: 12,
      maxScore: 100,
      riskLevel: 'low',
      icon: <AlertTriangle className="w-5 h-5" />,
      trend: 'down',
      description: 'Viral and respiratory illness screening indicator based on vital patterns. Currently in healthy range.',
    },
    {
      id: 'hypoxia',
      title: 'Early Hypoxia Detection',
      score: 8,
      maxScore: 100,
      riskLevel: 'low',
      icon: <Activity className="w-5 h-5" />,
      trend: 'stable',
      description: 'Early screening for oxygen deficiency and respiratory distress patterns. All metrics normal.',
    },
    {
      id: 'desaturation',
      title: 'Oxygen Desaturation Events',
      score: 2,
      maxScore: 100,
      riskLevel: 'low',
      icon: <Moon className="w-5 h-5" />,
      trend: 'stable',
      description: 'Detected instances of blood oxygen level drops during monitoring. Minimal occurrences detected.',
    },
    {
      id: 'fatigue',
      title: 'Fatigue & Stress Index',
      score: 18,
      maxScore: 100,
      riskLevel: 'low',
      icon: <Battery className="w-5 h-5" />,
      trend: 'stable',
      description: 'Overall wellness indicator based on vital stability and recovery patterns.',
    },
    {
      id: 'recovery',
      title: 'Recovery Rate Score',
      score: 85,
      maxScore: 100,
      riskLevel: 'low',
      icon: <TrendingUp className="w-5 h-5" />,
      trend: 'stable',
      description: 'How quickly your heart rate and oxygen levels return to normal after activity.',
    },
    {
      id: 'stability',
      title: 'Vital Stability Index',
      score: 92,
      maxScore: 100,
      riskLevel: 'low',
      icon: <BarChart3 className="w-5 h-5" />,
      trend: 'stable',
      description: 'Trend-based assessment of overall vital sign consistency and stability.',
    },
    {
      id: 'fitness',
      title: 'Cardio-Respiratory Fitness',
      score: 78,
      maxScore: 100,
      riskLevel: 'low',
      icon: <Heart className="w-5 h-5" />,
      trend: 'stable',
      description: 'Combined heart and lung function screening score for overall fitness.',
    },
  ];

  // Sort by risk level: High → Medium → Low
  const sortedMetrics = metricsData.sort((a, b) => {
    const riskOrder = { high: 0, medium: 1, low: 2 };
    return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
  });

  // Calculate overall health score
  const avgScore = Math.round(metricsData.reduce((acc, m) => acc + m.score, 0) / metricsData.length);
  const healthStatus = avgScore > 70 ? 'Excellent' : avgScore > 50 ? 'Good' : avgScore > 30 ? 'Fair' : 'Needs Attention';
  const healthColor = avgScore > 70 ? '#10b981' : avgScore > 50 ? '#f59e0b' : '#ef4444';

  return (
    <div>
      {/* Particle Background */}
      {showParticles && <ParticleBackground isDark={isDark} />}

      <div style={{ padding: '16px 12px 100px 12px', position: 'relative', zIndex: 10 }}>
        {/* Overall Health Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            background: `linear-gradient(135deg, ${healthColor}20, ${healthColor}10)`,
            border: `2px solid ${healthColor}`,
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle, ${healthColor}40, transparent)`,
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Shield style={{ width: '20px', height: '20px', color: healthColor }} />
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Overall Health Status</span>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              style={{
                fontSize: '42px',
                fontWeight: 'bold',
                color: healthColor,
                marginBottom: '8px',
              }}
            >
              {avgScore}%
            </motion.div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: healthColor }}>
              Status: {healthStatus}
            </span>
          </div>
        </motion.div>

        {/* Metrics Grid - 2 columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          {sortedMetrics.map((metric, idx) => (
            <MetricGridCard
              key={metric.id}
              title={metric.title}
              score={metric.score}
              maxScore={metric.maxScore}
              riskLevel={metric.riskLevel}
              icon={metric.icon}
              trend={metric.trend}
              description={metric.description}
              index={idx}
            />
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            borderRadius: '16px',
            padding: '14px',
            border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
            background: isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.05)',
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Info
              style={{
                width: '16px',
                height: '16px',
                flexShrink: 0,
                color: isDark ? '#60a5fa' : '#2563eb',
              }}
            />
          </motion.div>
          <p
            style={{
              fontSize: '11px',
              lineHeight: '1.5',
              color: isDark ? 'rgba(219, 234, 254, 0.8)' : '#1e40af',
              margin: 0,
            }}
          >
            These insights are screening indicators only. Consult healthcare professionals for medical decisions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
