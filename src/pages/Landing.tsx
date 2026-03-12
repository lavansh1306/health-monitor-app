import { motion } from 'framer-motion';
import { Activity, Heart, TrendingUp, ArrowRight, Smartphone, Lock, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export function Landing() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>VitalSense</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your Personal Health
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Monitoring Companion
              </span>
            </h1>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time vital signs monitoring, early screening insights, and comprehensive health tracking all in one intelligent platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              Start Monitoring Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: Heart,
                title: 'Real-time Monitoring',
                description: 'Track SpO₂, heart rate, respiratory rate, and more with instant updates'
              },
              {
                icon: TrendingUp,
                title: 'Health Insights',
                description: 'Get early screening alerts and personalized health recommendations'
              },
              {
                icon: BarChart3,
                title: 'Trend Analysis',
                description: 'Visualize your health patterns with detailed historical data analysis'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`p-8 rounded-2xl border transition-all ${isDark ? 'bg-gray-900/50 border-gray-800 hover:border-blue-500/50' : 'bg-gray-50 border-gray-200 hover:border-blue-500'}`}
              >
                <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`p-8 rounded-2xl border mt-12 ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-blue-50 border-blue-200'}`}
          >
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Enterprise-Grade Security
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Your health data is encrypted and protected with industry-leading security standards. We prioritize your privacy above all else.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-6 ${isDark ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to Take Control of Your Health?
          </h2>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Join thousands of users who are already monitoring their vital signs and taking proactive steps towards better health.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200'} py-8 px-6`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            © 2024 VitalSense. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
