import React, { useState } from 'react';
import {
  Settings,
  User,
  Lock,
  Bell,
  Mail,
  CreditCard,
  Database,
  Shield,
  Globe,
  Palette,
  FileText,
  Zap,
  Users,
  Calendar,
  BarChart2,
  HelpCircle,
  LogOut
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    // General Settings
    siteName: 'Admin Dashboard',
    siteUrl: 'https://admin.example.com',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',

    // Profile Settings
    name: 'Admin User',
    email: 'admin@example.com',
    profilePhoto: '',
    phone: '+91 9876543210',

    // Security Settings
    twoFactorAuth: true,
    passwordChangeRequired: false,
    loginAlerts: true,
    sessionTimeout: 30,

    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    billingAlerts: true,
    securityAlerts: true,

    // Payment Settings
    currency: 'INR',
    taxRate: 18,
    invoicePrefix: 'INV',
    paymentMethods: ['credit_card', 'upi', 'bank_transfer', 'cash'],

    // Appearance
    theme: 'light',
    primaryColor: '#3b82f6',
    sidebarCollapsed: false,
    density: 'normal',

    // Advanced
    maintenanceMode: false,
    debugMode: false,
    apiAccess: false,
    dataRetention: 365,

    // Team
    newUserRole: 'editor',
    userRegistration: false,
    defaultPermissions: ['view', 'edit', 'delete'],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    console.log('Settings saved:', formData);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', icon: Settings, label: 'General' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'security', icon: Lock, label: 'Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'payments', icon: CreditCard, label: 'Payments' },
    { id: 'appearance', icon: Palette, label: 'Appearance' },
    { id: 'advanced', icon: Zap, label: 'Advanced' },
    { id: 'team', icon: Users, label: 'Team' },
    { id: 'backup', icon: Database, label: 'Backup' },
    { id: 'privacy', icon: Shield, label: 'Privacy' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Site Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                  <input
                    type="text"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site URL</label>
                  <input
                    type="url"
                    name="siteUrl"
                    value={formData.siteUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="Asia/Kolkata">India (IST)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                  <select
                    name="dateFormat"
                    value={formData.dateFormat}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                  <select
                    name="timeFormat"
                    value={formData.timeFormat}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="12h">12-hour</option>
                    <option value="24h">24-hour</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile Information</h3>
              <div className="flex items-center space-x-4 mt-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {formData.profilePhoto ? (
                    <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">Change Photo</button>
                  <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size 2MB</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Login Security</h3>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Two-factor authentication</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={formData.twoFactorAuth}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Require password change</p>
                    <p className="text-xs text-gray-500">Force password change every 90 days</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="passwordChangeRequired"
                      checked={formData.passwordChangeRequired}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Login alerts</p>
                    <p className="text-xs text-gray-500">Get notified of new logins to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="loginAlerts"
                      checked={formData.loginAlerts}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    value={formData.sessionTimeout}
                    onChange={handleChange}
                    min="1"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Password</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Confirm new password"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Notification Preferences</h3>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive important updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                    <p className="text-xs text-gray-500">Get instant alerts on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={formData.pushNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">SMS Notifications</p>
                    <p className="text-xs text-gray-500">Receive text messages for critical alerts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={formData.smsNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Notification Types</h3>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Billing Alerts</p>
                    <p className="text-xs text-gray-500">Notify me about payments and invoices</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="billingAlerts"
                      checked={formData.billingAlerts}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Security Alerts</p>
                    <p className="text-xs text-gray-500">Notify me about security events</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="securityAlerts"
                      checked={formData.securityAlerts}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Payment Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    name="taxRate"
                    value={formData.taxRate}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Prefix</label>
                  <input
                    type="text"
                    name="invoicePrefix"
                    value={formData.invoicePrefix}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Payment Methods</h3>
              <div className="mt-4 space-y-3">
                {['credit_card', 'upi', 'bank_transfer', 'cash', 'paypal'].map(method => (
                  <div key={method} className="flex items-center">
                    <input
                      type="checkbox"
                      id={method}
                      name="paymentMethods"
                      checked={formData.paymentMethods.includes(method)}
                      onChange={(e) => {
                        const newMethods = e.target.checked
                          ? [...formData.paymentMethods, method]
                          : formData.paymentMethods.filter(m => m !== method);
                        setFormData({ ...formData, paymentMethods: newMethods });
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={method} className="ml-2 block text-sm text-gray-700 capitalize">
                      {method.replace('_', ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Theme Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleChange}
                      className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <span className="text-sm">{formData.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Density</label>
                  <select
                    name="density"
                    value={formData.density}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="compact">Compact</option>
                    <option value="normal">Normal</option>
                    <option value="comfortable">Comfortable</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Layout</h3>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Collapse Sidebar</p>
                    <p className="text-xs text-gray-500">Show minimized sidebar by default</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="sidebarCollapsed"
                      checked={formData.sidebarCollapsed}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Preview</h3>
              <div className="mt-4 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sample Card</p>
                      <p className="text-xs text-gray-500">This is how UI elements will look</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                    Button
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-xs text-gray-500">Item 1</p>
                    <p className="text-sm font-medium">123</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-xs text-gray-500">Item 2</p>
                    <p className="text-sm font-medium">456</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-xs text-gray-500">Item 3</p>
                    <p className="text-sm font-medium">789</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'advanced':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">System Settings</h3>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Maintenance Mode</p>
                    <p className="text-xs text-gray-500">Take the system offline for maintenance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={formData.maintenanceMode}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Debug Mode</p>
                    <p className="text-xs text-gray-500">Enable detailed error reporting</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="debugMode"
                      checked={formData.debugMode}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">API Access</p>
                    <p className="text-xs text-gray-500">Allow third-party applications to access API</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="apiAccess"
                      checked={formData.apiAccess}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Data Retention</h3>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Keep data for (days)</label>
                <input
                  type="number"
                  name="dataRetention"
                  value={formData.dataRetention}
                  onChange={handleChange}
                  min="30"
                  max="1095"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Set how long to keep user data before automatic deletion</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Danger Zone</h3>
              <div className="mt-4 space-y-4 p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <p className="text-sm font-medium text-red-700">Reset All Settings</p>
                  <p className="text-xs text-red-600">This will restore all settings to their default values</p>
                  <button className="mt-2 px-4 py-2 bg-white border border-red-300 text-red-700 rounded-md text-sm font-medium hover:bg-red-50">
                    Reset Settings
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700">Delete Account</p>
                  <p className="text-xs text-red-600">This will permanently delete your account and all data</p>
                  <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Team Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Role for New Users</label>
                  <select
                    name="newUserRole"
                    value={formData.newUserRole}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div className="flex items-center justify-between md:col-span-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Allow User Registration</p>
                    <p className="text-xs text-gray-500">Let users sign up without invitation</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="userRegistration"
                      checked={formData.userRegistration}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Default Permissions</h3>
              <div className="mt-4 space-y-3">
                {['view', 'edit', 'delete', 'create', 'export', 'manage_users'].map(permission => (
                  <div key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      id={permission}
                      name="defaultPermissions"
                      checked={formData.defaultPermissions.includes(permission)}
                      onChange={(e) => {
                        const newPermissions = e.target.checked
                          ? [...formData.defaultPermissions, permission]
                          : formData.defaultPermissions.filter(p => p !== permission);
                        setFormData({ ...formData, defaultPermissions: newPermissions });
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={permission} className="ml-2 block text-sm text-gray-700 capitalize">
                      {permission.replace('_', ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Invite Team Members</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Addresses</label>
                  <textarea
                    placeholder="Enter email addresses, separated by commas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Send Invitations
                </button>
              </div>
            </div>
          </div>
        );
      case 'backup':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Backup Settings</h3>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Automatic Backups</p>
                    <p className="text-xs text-gray-500">Enable daily automatic backups</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Backup Storage</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="local">Local Server</option>
                    <option value="aws">Amazon S3</option>
                    <option value="google">Google Drive</option>
                    <option value="dropbox">Dropbox</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Manual Backup</h3>
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">Create a manual backup of your database and files.</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Create Backup Now
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Restore Backup</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Backup File</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                  Restore Backup
                </button>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Privacy Settings</h3>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">GDPR Compliance</p>
                    <p className="text-xs text-gray-500">Enable GDPR data protection features</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Data Anonymization</p>
                    <p className="text-xs text-gray-500">Anonymize user data in exports</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Cookie Consent</p>
                    <p className="text-xs text-gray-500">Show cookie consent banner</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Data Requests</h3>
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">Manage user data requests and privacy controls.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                    Export User Data
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
                    Delete User Data
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Privacy Policy</h3>
              <div className="mt-4">
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-40"
                  placeholder="Enter your privacy policy content here..."
                ></textarea>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Update Privacy Policy
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Admin Settings</h2>
          <p className="text-xs text-gray-500">Configure your dashboard</p>
        </div>
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label} Settings
              </h1>
              <p className="text-sm text-gray-600">
                Configure your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} preferences
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 w-full sm:w-auto"
            >
              Save Changes
            </button>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;