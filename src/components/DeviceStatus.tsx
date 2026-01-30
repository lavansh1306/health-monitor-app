import { Bluetooth, Wifi, Battery, Signal, CheckCircle, AlertCircle } from 'lucide-react';

export function DeviceStatus() {
  // Mock device data
  const deviceData = {
    connected: true,
    signalQuality: 95,
    batteryLevel: 78,
    lastSync: '2 minutes ago',
    sensorStatus: 'optimal',
    firmwareVersion: '2.1.4'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Bluetooth className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl text-gray-900">Device Status</h1>
            <p className="text-sm text-gray-500">Sensor connectivity & health</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Connection Status */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900">Connection Status</h3>
            {deviceData.connected ? (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700">Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs text-red-700">Disconnected</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bluetooth className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Bluetooth</p>
                  <p className="text-xs text-gray-500">VitalSense Sensor v2</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Network Sync</p>
                  <p className="text-xs text-gray-500">Last: {deviceData.lastSync}</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Signal Quality */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Signal className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Signal Quality</h3>
                <p className="text-xs text-gray-500">Real-time sensor accuracy</p>
              </div>
            </div>
            <span className="text-2xl text-green-600">{deviceData.signalQuality}%</span>
          </div>

          <div className="mb-3">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                style={{ width: `${deviceData.signalQuality}%` }}
              ></div>
            </div>
          </div>

          <p className="text-xs text-gray-600">
            Excellent signal quality. Sensor is positioned correctly and readings are reliable.
          </p>
        </div>

        {/* Battery Level */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <Battery className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Battery Level</h3>
                <p className="text-xs text-gray-500">Sensor power status</p>
              </div>
            </div>
            <span className="text-2xl text-teal-600">{deviceData.batteryLevel}%</span>
          </div>

          <div className="mb-3">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                style={{ width: `${deviceData.batteryLevel}%` }}
              ></div>
            </div>
          </div>

          <p className="text-xs text-gray-600">
            Approximately 18 hours of continuous monitoring remaining.
          </p>
        </div>

        {/* Sensor Health */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-gray-900 mb-4">Sensor Health</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
              <span className="text-sm text-gray-900">Optical Sensor</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-700">Optimal</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
              <span className="text-sm text-gray-900">Temperature Sensor</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-700">Optimal</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
              <span className="text-sm text-gray-900">Accelerometer</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-700">Optimal</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Device Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-gray-900 mb-4">Device Information</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Model</span>
              <span className="text-sm text-gray-900">VitalSense Pro v2</span>
            </div>
            <div className="h-px bg-gray-200"></div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Firmware</span>
              <span className="text-sm text-gray-900">{deviceData.firmwareVersion}</span>
            </div>
            <div className="h-px bg-gray-200"></div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Serial Number</span>
              <span className="text-sm text-gray-900">VS2-8472-A39</span>
            </div>
            <div className="h-px bg-gray-200"></div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Last Calibration</span>
              <span className="text-sm text-gray-900">3 days ago</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-4 rounded-full hover:bg-blue-700 transition-colors">
            Reconnect Sensor
          </button>
          <button className="w-full bg-gray-100 text-gray-700 py-4 rounded-full hover:bg-gray-200 transition-colors">
            Calibrate Sensor
          </button>
        </div>
      </div>
    </div>
  );
}
