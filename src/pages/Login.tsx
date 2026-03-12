import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
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
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      if (mode === 'signup') {
        if (!formData.fullName) {
          throw new Error('Please enter your full name');
        }
        await signUp(formData.email, formData.password, formData.fullName);
      } else {
        await signIn(formData.email, formData.password);
      }

      // Clear form and redirect
      setFormData({ email: '', password: '', fullName: '' });
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      {/* Header */}
      <div className={`p-6 border-b ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'}`}>
        <button
          onClick={() => navigate('/')}
          className={`text-sm font-medium ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          ← Back to Home
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              VitalSense
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {mode === 'login' ? 'Welcome back' : 'Join us today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-none focus-within:ring-2 focus-within:ring-blue-500"
                  style={{
                    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
                    borderColor: isDark ? 'rgba(107, 114, 128, 0.2)' : 'rgba(229, 231, 235, 1)',
                  }}
                >
                  <User className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`flex-1 bg-transparent outline-none ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-none focus-within:ring-2 focus-within:ring-blue-500"
                style={{
                  backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
                  borderColor: isDark ? 'rgba(107, 114, 128, 0.2)' : 'rgba(229, 231, 235, 1)',
                }}
              >
                <Mail className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-none focus-within:ring-2 focus-within:ring-blue-500"
                style={{
                  backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
                  borderColor: isDark ? 'rgba(107, 114, 128, 0.2)' : 'rgba(229, 231, 235, 1)',
                }}
              >
                <Lock className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                }}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
