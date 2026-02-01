import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const healthScore = 85;
  const maxScore = 100;
  const percentage = (healthScore / maxScore) * 100;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Main Card */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold text-white mb-2">Health Score</h1>
            <p className="text-slate-400 text-sm">Your overall system health</p>
          </motion.div>

          {/* Radial Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Conic Gradient Circle */}
              <div
                className="absolute w-48 h-48 rounded-full shadow-lg"
                style={{
                  background: `conic-gradient(from 0deg, rgb(34, 197, 94) 0deg, rgb(34, 197, 94) ${percentage * 3.6}deg, rgb(30, 41, 59) ${percentage * 3.6}deg)`,
                }}
              />
              {/* Inner Circle (Dark Background) */}
              <div className="absolute w-40 h-40 rounded-full bg-slate-900 flex items-center justify-center border-2 border-slate-800">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-white">{healthScore}</div>
                  <div className="text-slate-400 text-sm mt-2">Score</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Status Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="space-y-4 mb-6"
          >
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors">
              <span className="text-slate-300 font-medium">Status</span>
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-green-400 font-semibold flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Healthy
              </motion.span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600">
              <span className="text-slate-300 font-medium">Last Updated</span>
              <span className="text-slate-400 text-sm">Just now</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600">
              <span className="text-slate-300 font-medium">Trend</span>
              <span className="text-emerald-400 text-sm font-semibold">↑ Improving</span>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View Detailed Insights
          </motion.button>

          {/* Footer Note */}
          <p className="text-center text-slate-500 text-xs mt-4">
            Data updated in real-time • Health screening only
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
