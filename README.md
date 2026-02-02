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
