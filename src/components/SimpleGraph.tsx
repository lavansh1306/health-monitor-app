import { useTheme } from '../contexts/ThemeContext';

interface TrendDataPoint {
  day: string;
  value: number;
}

interface SimpleGraphProps {
  data: TrendDataPoint[];
  color: string;
}

export function SimpleGraph({ data, color }: SimpleGraphProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return 150 - ((value - minValue) / range) * 120;
  };

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * 280;
    const y = getY(d.value);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div>
      <svg
        viewBox="0 0 300 180"
        style={{
          width: '100%',
          height: '200px',
          marginBottom: '16px',
        }}
      >
        {/* Grid Lines */}
        {[0, 25, 50, 75, 100, 125, 150].map((y) => (
          <line
            key={`grid-${y}`}
            x1="10"
            y1={y + 15}
            x2="290"
            y2={y + 15}
            stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        <line x1="10" y1="15" x2="10" y2="155" stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} strokeWidth="2" />
        <line x1="10" y1="155" x2="290" y2="155" stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} strokeWidth="2" />

        {/* Path with gradient */}
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <polygon
          points={`10,155 ${points} 290,155`}
          fill={`url(#gradient-${color})`}
          opacity="0.6"
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1 || 1)) * 280 + 10;
          const y = getY(d.value);
          return (
            <g key={`point-${i}`}>
              <circle cx={x} cy={y} r="4" fill={color} opacity="0.8" />
              <circle cx={x} cy={y} r="6" fill={color} opacity="0.3" />
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          fontSize: '12px',
        }}
      >
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            borderRadius: '8px',
          }}
        >
          <p style={{ margin: '0 0 4px 0', color: isDark ? '#9ca3af' : '#6b7280' }}>Average</p>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: 'bold',
              color: color,
            }}
          >
            {Math.round(data.reduce((a, d) => a + d.value, 0) / data.length)}
          </p>
        </div>
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            borderRadius: '8px',
          }}
        >
          <p style={{ margin: '0 0 4px 0', color: isDark ? '#9ca3af' : '#6b7280' }}>Peak</p>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: 'bold',
              color: color,
            }}
          >
            {Math.max(...data.map((d) => d.value))}
          </p>
        </div>
      </div>
    </div>
  );
}
