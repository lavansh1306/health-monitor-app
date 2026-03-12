# 🏥 Health Monitor App

A modern, responsive health monitoring application built with React and TypeScript. Track your health metrics, monitor vitals, and maintain a healthy lifestyle with an intuitive interface.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.93.3-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

## ✨ Features

- 📊 **Real-time Health Metrics Tracking** - Monitor heart rate, blood pressure, steps, and more
- 🎨 **Beautiful UI/UX** - Modern design based on professional Figma mockups
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🌙 **Dark Mode Support** - Toggle between light and dark themes
- 🔐 **Secure Authentication** - Powered by Supabase
- 📈 **Data Visualization** - Interactive charts and graphs using Recharts
- ✨ **Smooth Animations** - Enhanced user experience with Framer Motion
- 🎯 **Experimental Features** - Access to cutting-edge health monitoring tools

## 🖥️ UI Overview — What's Shown & How It's Derived

The app is organised as a single-page application with a **fixed bottom navigation bar** and six main screens. All vital values are **simulated** (randomly fluctuated in-browser) for demonstration purposes; no real sensor data is read.

---

### 🏠 Home Dashboard (`HomeDashboard`)

The first screen you see when the app loads. It is composed of four sections:

| Section | What Is Shown | How It's Derived |
|---|---|---|
| **Header** | App name "VitalSense", current date, current time, "Live" pulse indicator | `new Date()` called on render; time re-reads from the system clock |
| **Health Score card** | A rotating ring (conic-gradient) and a central **Risk Score** number (0–100), status badge ("All Normal") | Initial risk score is hard-coded to `15`. The ring arc is `riskScore × 2.4` degrees. Status badge colour is determined by `riskLevel` state (`normal / monitor / attention`) |
| **Live Vitals grid** (6 cards) | Six metric cards updated every **3 seconds** | Seeded from reasonable baseline values; each tick applies a small random delta clamped within safe ranges: |
| | • **Blood Oxygen (SpO₂)** — value in `%` | Baseline 98 %, random walk ±1 pt, clamped 94–100 % |
| | • **Heart Rate** — value in `bpm` | Baseline 72 bpm, random walk ±2 pt, clamped 60–100 bpm |
| | • **Respiratory Rate** — value in `/min` | Baseline 16 /min, random walk ±1 pt, clamped 12–20 /min |
| | • **Temperature** — value in `°F` | Baseline 98.6 °F, random walk ±0.15 pt, clamped 97.5–99.5 °F |
| | • **Hydration** — value in `%` | Baseline 85 %, random walk ±1.5 pt, clamped 70–100 % |
| | • **Stress Index** — value `/100` | Baseline 22, random walk ±2.5 pt, clamped 10–50 |
| **Sleep Analysis card** | Duration (7 h 42 m), Quality (86 %), Sleep Cycles (5) | Static mock values |
| **Connectivity Status** | WiFi Connection status, Sensor Battery status (both green "connected") | Static mock values |
| **Medical Disclaimer** | Plain-text notice | Static copy |

---

### 📊 Health Insights (`HealthInsights`)

Shows an **Overall Health Status** score and a 2-column grid of eight risk-indicator cards, sorted high → medium → low risk.

| Element | What Is Shown | How It's Derived |
|---|---|---|
| **Overall Health Score** | A percentage (0–100) and text label (Excellent / Good / Fair / Needs Attention) | Arithmetic mean of the eight metric scores below, compared against thresholds: >70 = Excellent, >50 = Good, >30 = Fair, else Needs Attention |
| **Breathing Irregularity** | Score 34/100, risk: medium, trend: ↑ | Static mock value |
| **Illness Risk Flag** | Score 12/100, risk: low, trend: ↓ | Static mock value |
| **Early Hypoxia Detection** | Score 8/100, risk: low, trend: → | Static mock value |
| **Oxygen Desaturation Events** | Score 2/100, risk: low, trend: → | Static mock value |
| **Fatigue & Stress Index** | Score 18/100, risk: low, trend: → | Static mock value |
| **Recovery Rate Score** | Score 85/100, risk: low, trend: → | Static mock value |
| **Vital Stability Index** | Score 92/100, risk: low, trend: → | Static mock value |
| **Cardio-Respiratory Fitness** | Score 78/100, risk: low, trend: → | Static mock value |
| **Disclaimer footer** | Screening-only notice | Static copy |

---

### 📈 Trends & History (`TrendsHistory`)

Shows area charts of three vitals over time with a **24 h / 7 d toggle**.

| Element | What Is Shown | How It's Derived |
|---|---|---|
| **Time-range toggle** | 24 h (8 data points, hourly) or 7 d (7 data points, daily) | Toggle state (`daily` / `weekly`); charts re-render with the matching dataset |
| **Blood Oxygen chart** | SpO₂ % area chart, current value 98 % | Static mock arrays (`dailyData` / `weeklyData`) |
| **Heart Rate chart** | bpm area chart, current value 72 bpm | Same static mock arrays |
| **Respiratory Rate chart** | breaths/min area chart, current value 16 /min | Same static mock arrays |
| **Detected Events** | One amber "Mild SpO₂ Drop" event (Yesterday 2:34 AM · 95 % for 2 min) | Static mock event |

---

### 🔬 Experimental Features (`ExperimentalFeatures`)

Shows six research-prototype risk cards sorted high → medium → low.

| Metric Card | Score | Risk Level | How It's Derived |
|---|---|---|---|
| Breathing Irregularity | 42/100 | High | Static mock value |
| Oxygen Saturation Risk | 35/100 | Medium | Static mock value |
| Cardiac Recovery Index | 68/100 | Medium | Static mock value |
| Stress Response Level | 22/100 | Low | Static mock value |
| Physical Activity Score | 78/100 | Low | Static mock value |
| Circadian Rhythm Alignment | 15/100 | Low | Static mock value |

An amber warning banner and a blue informational note about risk indicators are also displayed.

---

### 📡 Device Status (`DeviceStatus`)

Shows sensor and connectivity health, updated every **2 seconds**.

| Element | What Is Shown | How It's Derived |
|---|---|---|
| **Overall Health card** | Signal Quality 95 %, Battery 78 %, Status "Optimal" | Initial static values |
| **System Connectivity grid** (4 cards) | IoT Sensor (Bluetooth), Internet (WiFi), AI Models (CPU), Cloud Sync — each showing latency in ms and a connected/warning/disconnected dot | Latency updated every 2 s with a ±10 ms random walk; status has a 5 % chance per tick of flipping `connected → warning` and a 50 % chance of recovering `warning → connected` |
| **Device Information** | Firmware v2.1.4, Last Sync "2 minutes ago", Sensor Status "optimal" | Static mock values |
| **Sync Now** button | Triggers a re-sync action | UI-only button (no backend call in demo) |

---

### ⚙️ Settings / Profile (`ProfileSettings`)

| Element | What Is Shown | How It's Derived |
|---|---|---|
| **Dark Mode toggle** | Reflects current theme (dark/light) | Reads from `ThemeContext`; toggling calls `toggleTheme()` which persists in React context |
| **Health Tracking toggle** | On by default | Local `useState` |
| **Data Sharing toggle** | Off by default | Local `useState` |
| **Alert Notifications toggle** | On by default | Local `useState` |
| **Public Profile toggle** | Off by default | Local `useState` |
| **App Info** | Name "VitalSense", version v1.0.0 | Hard-coded |
| **Sign Out button** | Red button to sign out | UI-only in demo |

---

### 🔽 Bottom Navigation Bar (`BottomNav`)

Always visible at the bottom. Contains five tabs: **Home**, **Insights**, **Trends**, **Device**, **Profile**. The active tab is highlighted with a blue pill background and a small blue dot indicator. Tapping a tab sets the `activeScreen` state in `App.tsx` which swaps the rendered screen.

## 🚀 Tech Stack

### Frontend
- **React** 18.3.1 - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### UI Components
- **Radix UI** - Accessible, unstyled coponent library
- **Lucide React** - Beautiful icon set
- **Recharts** - Comosable charting library
- **shadcn/ui** - Re-usable component collectn

### Backend & Data
- **Supabase** - Backend as a Service (BaaS)
- **React Hook Form** - Form validation and management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lavansh1306/health-monitor-app.git
   cd health-monitor-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

The optimized build will be available in the `build` directory.

## 📁 Project Structure

```
health-monitor-app/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── MetricCard.tsx
│   │   ├── StatusMonitor.tsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   └── Home.tsx
│   ├── contexts/       # React contexts
│   ├── lib/            # Utility functions
│   ├── styles/         # CSS and styling files
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind configuration
└── package.json        # Dependencies and scripts
```

## 🎨 Design

This project is based on the professional UI design available at:
[Health Monitoring App UI - Figma](https://www.figma.com/design/seCPrXx8dugu5qfYrzWiAK/Health-Monitoring-App-UI)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from the Figma community
- Built with modern React best practices
- Powered by the amazing open-source community

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by [lavansh1306](https://github.com/lavansh1306)
