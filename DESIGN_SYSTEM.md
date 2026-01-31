# Health Risk Assessment - Design System Guide

## Component Overview

```
┌─────────────────────────────────────────────────────┐
│  HEADER - Health Risk Assessment                    │
│  Subtitle: Research & experimental indicators  [🌙] │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ⚠️  Experimental Features                            │
│ These health indicators are research prototypes...   │
└─────────────────────────────────────────────────────┘

┌──────────────────────────┐  ┌──────────────────────────┐
│ ┃ Breathing Irregularity │  │ ┃ Oxygen Saturation Risk  │
│ 🫁                       │  │ 💧                       │
│ HIGH                     │  │ MEDIUM                   │
│ 42 / 100    ↗ Increasing│  │ 35 / 100    ↘ Improving │
│ ████░░░░░░░░░░░░░░     │  │ ███░░░░░░░░░░░░░░░░░░ │
│ Elevated respiratory...  │  │ SpO₂ baseline lower...  │
└──────────────────────────┘  └──────────────────────────┘

┌──────────────────────────┐  ┌──────────────────────────┐
│ ┃ Cardiac Recovery Index │  │ ┃ Stress Response Level   │
│ ❤️                       │  │ 🧠                       │
│ MEDIUM                   │  │ LOW                      │
│ 68 / 100    ─ Stable     │  │ 22 / 100    ↘ Improving │
│ ██████░░░░░░░░░░░░░░░░ │  │ ██░░░░░░░░░░░░░░░░░░░ │
│ Heart rate recovery...   │  │ HRV patterns indicate... │
└──────────────────────────┘  └──────────────────────────┘

┌──────────────────────────┐  ┌──────────────────────────┐
│ ┃ Physical Activity Score│  │ ┃ Circadian Rhythm Align. │
│ 🏃                       │  │ ⚡                       │
│ LOW                      │  │ LOW                      │
│ 78 / 100    ─ Stable     │  │ 15 / 100    ─ Stable    │
│ ███████░░░░░░░░░░░░░░░ │  │ █░░░░░░░░░░░░░░░░░░░░ │
│ Meeting daily movement...│  │ Sleep-wake cycle well... │
└──────────────────────────┘  └──────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ℹ️ About Risk Indicators                             │
│ • Risk Levels: Based on vital patterns...            │
│ • Trends: Show direction of change...               │
│ • Scores: Relative risk indicators...               │
│ • Use Case: Research awareness...                   │
└─────────────────────────────────────────────────────┘
```

---

## Card Anatomy

```
┌─────────────────────────────────────────────┐
│ LEFT BORDER (Colored)                       │
│ ┌───────────────────────────────────────┐   │
│ │ ┌────┐                                │   │
│ │ │🫁  │ Breathing Irregularity          │   │
│ │ └────┘ [HIGH] Status Badge            │   │
│ │                                        │   │
│ │ 42 / 100           ↗ Increasing       │   │
│ │ ████████░░░░░░░░░░░ Progress Bar      │   │
│ │                                        │   │
│ │ Elevated respiratory rate variability │   │
│ │ detected (Description)                │   │
│ └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### Card Elements

| Element | Purpose | Styling |
|---------|---------|---------|
| **Left Border** | Risk level indicator | 4px colored (emerald/amber/rose) |
| **Icon Container** | Medical association | 12x12 rounded circle, soft background |
| **Title** | Metric name | text-sm font-bold |
| **Status Badge** | Quick risk assessment | text-xs, rounded-full, risk-colored |
| **Score Display** | Primary value | text-3xl font-bold |
| **Max Score** | Context reference | text-xs gray |
| **Trend Indicator** | Change direction | Icon + "Improving"/"Increasing" text |
| **Progress Bar** | Visual gauge | 2.5px height, colored fill |
| **Description** | Additional context | text-xs gray, subtle |

---

## Color System

### Light Mode
```
Background: bg-slate-50 (Off-white medical aesthetic)

Risk Levels:
├── Low (Emerald)
│   ├── Card Background: bg-emerald-50
│   ├── Border: border-l-emerald-500
│   ├── Badge: bg-emerald-100, text-emerald-700
│   └── Progress Bar: bg-emerald-500
│
├── Medium (Amber)
│   ├── Card Background: bg-amber-50
│   ├── Border: border-l-amber-500
│   ├── Badge: bg-amber-100, text-amber-700
│   └── Progress Bar: bg-amber-500
│
└── High (Rose)
    ├── Card Background: bg-rose-50
    ├── Border: border-l-rose-500
    ├── Badge: bg-rose-100, text-rose-700
    └── Progress Bar: bg-rose-500
```

### Dark Mode
```
Background: bg-gray-900 (Dark medical aesthetic)

Risk Levels:
├── Low (Emerald)
│   ├── Card Background: bg-emerald-500/10
│   ├── Border: border-l-emerald-500
│   ├── Badge: bg-emerald-500/20, text-emerald-400
│   └── Progress Bar: bg-emerald-500
│
├── Medium (Amber)
│   ├── Card Background: bg-amber-500/10
│   ├── Border: border-l-amber-500
│   ├── Badge: bg-amber-500/20, text-amber-400
│   └── Progress Bar: bg-amber-500
│
└── High (Rose)
    ├── Card Background: bg-rose-500/10
    ├── Border: border-l-rose-500
    ├── Badge: bg-rose-500/20, text-rose-400
    └── Progress Bar: bg-rose-500
```

---

## Typography Scale

```
Page Title:       text-lg font-bold (Health Risk Assessment)
Subtitle:         text-xs (Research & experimental indicators)

Card Title:       text-sm font-bold (Breathing Irregularity)
Status Badge:     text-xs font-semibold (HIGH/MEDIUM/LOW)
Score Value:      text-3xl font-bold (42)
Score Reference:  text-xs (/ 100)
Trend Label:      text-xs font-medium (Increasing/Improving)
Description:      text-xs (Supporting context)
```

---

## Responsive Behavior

### Mobile (< 768px)
```
Single Column Layout
┌─────────────────────┐
│    Card 1 (100%)    │
├─────────────────────┤
│    Card 2 (100%)    │
├─────────────────────┤
│    Card 3 (100%)    │
├─────────────────────┤
│    Card 4 (100%)    │
├─────────────────────┤
│    Card 5 (100%)    │
├─────────────────────┤
│    Card 6 (100%)    │
└─────────────────────┘
```

### Tablet/Desktop (≥ 768px)
```
Two Column Grid Layout
┌──────────────┬──────────────┐
│  Card 1      │  Card 2      │
├──────────────┼──────────────┤
│  Card 3      │  Card 4      │
├──────────────┼──────────────┤
│  Card 5      │  Card 6      │
└──────────────┴──────────────┘

Grid Properties:
- grid-cols-1 md:grid-cols-2
- gap-4 (16px)
- Automatic reflow on resize
```

---

## Trend Indicators

### Trend Up (Negative - Increasing Risk)
```
Icon: ↗ TrendingUp (Lucide)
Color: Rose-500 / Rose-400 (Dark)
Text: "Increasing"
Meaning: Risk score is rising
```

### Trend Down (Positive - Improving)
```
Icon: ↘ TrendingDown (Lucide)
Color: Emerald-500 / Emerald-400 (Dark)
Text: "Improving"
Meaning: Risk score is decreasing
```

### Trend Stable (Neutral)
```
No Icon/Text Displayed
Meaning: Risk score unchanged
```

---

## Medical Icons Used

| Icon | Component | Meaning |
|------|-----------|---------|
| 🫁 Wind | Breathing Irregularity | Respiratory issues |
| 💧 Droplet | Oxygen Saturation | Oxygenation levels |
| ❤️ Heart | Cardiac Recovery | Heart function |
| 🧠 Brain | Stress Response | Nervous system |
| 🏃 Activity | Physical Activity | Movement/exercise |
| ⚡ Zap | Circadian Rhythm | Energy/sleep cycles |

---

## States & Interactions

### Card Hover
```
- shadow-sm → shadow-md (elevated shadow)
- transition-all (smooth 200ms)
- No background color change (subtle interaction)
```

### Theme Toggle
```
- Instant switch between light/dark modes
- All colors automatically invert
- Preserves functionality across themes
```

---

## Accessibility Features

✅ **Color Contrast**
- All text meets WCAG AA standards
- Not reliant on color alone for meaning
- Icons + text labels for trends

✅ **Touch Targets**
- Cards: 48px+ minimum height
- Adequate padding: p-4 (16px)
- Buttons: 40x40px minimum

✅ **Typography**
- Clear font hierarchy
- Adequate line-height for readability
- text-xs to text-lg appropriate sizing

✅ **Semantic HTML**
- Proper heading levels
- List structure for information
- Theme context for ARIA-compliant dark mode

---

## Data Structure Example

```typescript
interface HealthMetric {
  id: string;                    // 'breathing', 'hypoxia', etc.
  title: string;                 // Display name
  score: number;                 // Current value (0-100)
  maxScore: number;              // Max reference value
  riskLevel: 'low' | 'medium' | 'high';  // Risk category
  icon: ReactNode;               // Lucide icon component
  trend: 'up' | 'down' | 'stable';       // Direction
  description: string;           // Context text
}
```

---

## Usage Example

```tsx
<HealthMetricCard
  title="Breathing Irregularity"
  score={42}
  maxScore={100}
  riskLevel="high"
  icon={<Wind className="w-5 h-5" />}
  trend="up"
  description="Elevated respiratory rate variability detected"
/>
```

---

## Performance Notes

- Cards render efficiently with React keys
- CSS transitions use GPU-accelerated properties
- Dark mode doesn't require re-renders
- Grid layout uses native CSS Grid (no JS)
- Icons are SVG (Lucide React - optimized)

---

## Browser Support

✅ All modern browsers (Chrome, Firefox, Safari, Edge)
✅ Mobile browsers (iOS Safari, Chrome Mobile)
✅ Responsive design with Tailwind breakpoints
✅ Dark mode support via CSS media queries + context
