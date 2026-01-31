import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  score: number;
  maxScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
  children: React.ReactNode;
}

export function DetailModal({
  isOpen,
  onClose,
  title,
  score,
  maxScore,
  riskLevel,
  description,
  icon,
  children,
}: DetailModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getRiskColor = () => {
    if (riskLevel === 'low') return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' };
    if (riskLevel === 'medium') return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
    return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' };
  };

  const risk = getRiskColor();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
              zIndex: 40,
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: '90vh',
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              borderRadius: '24px 24px 0 0',
              padding: '24px 16px 32px 16px',
              zIndex: 50,
              overflowY: 'auto',
            }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDark ? '#f3f4f6' : '#111827',
              }}
            >
              <X size={20} />
            </motion.button>

            {/* Header */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', marginTop: '12px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: risk.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: risk.color,
                }}
              >
                {icon}
              </div>
              <div>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: isDark ? '#f3f4f6' : '#111827',
                    margin: '0 0 4px 0',
                  }}
                >
                  {title}
                </h2>
                <p
                  style={{
                    fontSize: '12px',
                    color: isDark ? '#9ca3af' : '#6b7280',
                    margin: 0,
                  }}
                >
                  {riskLevel.toUpperCase()} RISK
                </p>
              </div>
            </div>

            {/* Score Display */}
            <div
              style={{
                background: risk.bg,
                border: `2px solid ${risk.color}`,
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  color: isDark ? '#9ca3af' : '#6b7280',
                  margin: '0 0 8px 0',
                }}
              >
                Current Score
              </p>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: risk.color,
                  margin: '0 0 4px 0',
                }}
              >
                {score}
              </div>
              <p
                style={{
                  fontSize: '12px',
                  color: isDark ? '#9ca3af' : '#6b7280',
                  margin: 0,
                }}
              >
                out of {maxScore}
              </p>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '13px',
                lineHeight: '1.6',
                color: isDark ? '#d1d5db' : '#374151',
                marginBottom: '24px',
                padding: '12px',
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                borderRadius: '12px',
                borderLeft: `4px solid ${risk.color}`,
              }}
            >
              {description}
            </p>

            {/* Chart Area */}
            <div
              style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                borderRadius: '16px',
                marginBottom: '20px',
              }}
            >
              {children}
            </div>

            {/* Additional Info */}
            <div
              style={{
                padding: '12px',
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                borderRadius: '12px',
                fontSize: '12px',
                color: isDark ? '#93c5fd' : '#1e40af',
                lineHeight: '1.6',
              }}
            >
              📊 <strong>Trend Analysis:</strong> This metric tracks your health over time. Regular monitoring helps identify patterns and potential improvements.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
