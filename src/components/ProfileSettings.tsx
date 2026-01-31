import { LogOut, User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export function ProfileSettings() {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await signOut();
      // Clear onboarding flag if you want users to see it again
      // localStorage.removeItem('vitalsense_onboarding_completed');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Profile
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your account settings
          </p>
        </div>

        {/* Profile Info Card */}
        <div className={`rounded-2xl p-6 mb-6 ${
          isDark 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isDark ? 'bg-purple-500/20' : 'bg-purple-100'
            }`}>
              <User className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {user?.user_metadata?.full_name || 'User'}
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                VitalSense Member
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <Mail className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Email</p>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user?.email}
                </p>
              </div>
            </div>

            {user?.created_at && (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-green-500/20' : 'bg-green-100'
                }`}>
                  <Calendar className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Member since</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {formatDate(user.created_at)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className={`rounded-2xl p-6 mb-6 ${
          isDark 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Account Actions
          </h3>
          
          <button
            onClick={handleSignOut}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium transition-all ${
              isDark 
                ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20' 
                : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
            }`}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        {/* App Info */}
        <div className={`text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          <p>VitalSense v1.0.0</p>
          <p className="mt-1">Health monitoring companion</p>
        </div>
      </div>
    </div>
  );
}