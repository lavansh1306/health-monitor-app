import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { authHelpers } from '../lib/supabaseClient';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await authHelpers.signUp(
          formData.email,
          formData.password,
          { full_name: formData.fullName }
        );
        
        if (error) throw error;
        
        setError('success:Check your email to confirm your account!');
        setTimeout(() => {
          setMode('login');
          setError('');
        }, 3000);
      } else {
        const { error } = await authHelpers.signIn(formData.email, formData.password);
        
        if (error) throw error;
        
        onAuthSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    
    try {
      const { error } = await authHelpers.signInWithGoogle();
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const isSuccess = error.startsWith('success:');
  const errorMessage = isSuccess ? error.replace('success:', '') : error;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden ${
      isDark ? 'bg-black' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-30 ${
            isDark ? 'bg-blue-600' : 'bg-blue-300'
          }`}
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-30 ${
            isDark ? 'bg-purple-600' : 'bg-purple-300'
          }`}
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        className="flex-1 flex items-center justify-center px-4 py-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-sm">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mb-6 relative shadow-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Zap className="w-8 h-8 text-white" />
              <motion.div
                className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-40"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ zIndex: -1 }}
              />
            </motion.div>

            <h1 className={`text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                VitalSense
              </span>
            </h1>
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {mode === 'login' ? 'Welcome back to your health dashboard' : 'Start monitoring your health today'}
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className={`rounded-3xl p-8 backdrop-blur-xl shadow-2xl border transition-all ${
              isDark 
                ? 'bg-gray-900/70 border-gray-800/60' 
                : 'bg-white/80 border-white/80'
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              {mode === 'signup' && (
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      isDark ? 'text-gray-500 group-focus-within:text-purple-400' : 'text-gray-400 group-focus-within:text-purple-600'
                    }`} />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none font-medium ${
                        isDark 
                          ? 'bg-gray-800/60 border border-gray-700/50 text-white placeholder-gray-500 focus:bg-gray-800/80 focus:border-purple-500/50' 
                          : 'bg-white/90 border border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-purple-400'
                      }`}
                      placeholder="John Doe"
                      required={mode === 'signup'}
                    />
                  </div>
                </motion.div>
              )}

              {/* Email Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDark ? 'text-gray-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-600'
                  }`} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl transition-all focus:ring-2 focus:ring-blue-500/50 focus:outline-none font-medium ${
                      isDark 
                        ? 'bg-gray-800/60 border border-gray-700/50 text-white placeholder-gray-500 focus:bg-gray-800/80 focus:border-blue-500/50' 
                        : 'bg-white/90 border border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-400'
                    }`}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Password
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDark ? 'text-gray-500 group-focus-within:text-pink-400' : 'text-gray-400 group-focus-within:text-pink-600'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full pl-11 pr-11 py-3.5 rounded-xl transition-all focus:ring-2 focus:ring-pink-500/50 focus:outline-none font-medium ${
                      isDark 
                        ? 'bg-gray-800/60 border border-gray-700/50 text-white placeholder-gray-500 focus:bg-gray-800/80 focus:border-pink-500/50' 
                        : 'bg-white/90 border border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-pink-400'
                    }`}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                      isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Error/Success Message */}
              {error && (
                <motion.div 
                  className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 border ${
                    isSuccess
                      ? isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : isDark ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-red-50 text-red-700 border-red-300'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {isSuccess ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                {loading ? (
                  <motion.div
                    className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ) : (
                  <>
                    <span className="relative">{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative my-6">
                <div className={`absolute inset-0 flex items-center`}>
                  <div className={`w-full border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`} />
                </div>
                <div className="relative flex justify-center">
                  <span className={`px-4 text-sm font-medium ${
                    isDark ? 'bg-gray-900/70 text-gray-400' : 'bg-white/80 text-gray-600'
                  }`}>
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Button */}
              <motion.button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                  isDark 
                    ? 'bg-gray-800/60 border border-gray-700/50 text-white hover:bg-gray-800 hover:border-gray-600' 
                    : 'bg-white/90 border border-gray-300 text-gray-900 hover:bg-white hover:border-gray-400 shadow-sm hover:shadow'
                } active:scale-[0.98] disabled:opacity-50`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Continue with Google</span>
              </motion.button>
            </form>

            {/* Toggle Mode */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                  setFormData({ email: '', password: '', fullName: '' });
                }}
                className={`text-sm font-medium transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <span className="font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className={`mt-6 text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>🔒 Secured by Supabase</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
