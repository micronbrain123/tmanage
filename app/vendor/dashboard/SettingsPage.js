"use client";

import React, { useState } from 'react';
import {
    Settings,
    Bell,
    Lock,
    DollarSign,
    Calendar,
    User,
    Truck,
    CheckCircle,
    XCircle,
    ChevronDown,
    ChevronUp,
    Save,
    Clock,
    Mail,
    CreditCard,
    Globe,
    Palette,
    Moon,
    Sun
} from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [notifications, setNotifications] = useState({
        newOrders: true,
        deadlineReminders: true,
        paymentReceived: true,
        systemUpdates: false,
        promotions: false,
    });
    const [security, setSecurity] = useState({
        twoFactorAuth: false,
        passwordChangeRequired: false,
        loginAlerts: true,
    });
    const [payment, setPayment] = useState({
        paymentMethod: 'bank_transfer',
        bankName: 'State Bank of India',
        accountNumber: 'XXXXXX7890',
        ifscCode: 'SBIN0001234',
        upiId: 'ramesh.mistri@upi',
        schedule: 'weekly' // Add this line
    });
    const [appearance, setAppearance] = useState({
        theme: 'light',
        density: 'normal',
        font: 'default',
    });
    const [availability, setAvailability] = useState([
        { day: 'Monday', enabled: true, start: '09:00', end: '18:00' },
        { day: 'Tuesday', enabled: true, start: '09:00', end: '18:00' },
        { day: 'Wednesday', enabled: true, start: '09:00', end: '18:00' },
        { day: 'Thursday', enabled: true, start: '09:00', end: '18:00' },
        { day: 'Friday', enabled: true, start: '09:00', end: '18:00' },
        { day: 'Saturday', enabled: false, start: '10:00', end: '15:00' },
        { day: 'Sunday', enabled: false, start: '', end: '' },
    ]);
    const [isSaving, setIsSaving] = useState(false);

    const handleNotificationChange = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSecurityChange = (key) => {
        setSecurity(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handlePaymentMethodChange = (method) => {
        setPayment(prev => ({
            ...prev,
            paymentMethod: method
        }));
    };

    const handleAppearanceChange = (key, value) => {
        setAppearance(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const toggleDayAvailability = (day) => {
        setAvailability(prev =>
            prev.map(d =>
                d.day === day ? { ...d, enabled: !d.enabled } : d
            )
        );
    };

    const updateAvailabilityTime = (day, field, value) => {
        setAvailability(prev =>
            prev.map(d =>
                d.day === day ? { ...d, [field]: value } : d
            )
        );
    };

    const handleSaveSettings = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            // Show success message
        }, 1000);
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'payment', label: 'Payment', icon: DollarSign },
        { id: 'availability', label: 'Availability', icon: Calendar },
        { id: 'appearance', label: 'Appearance', icon: Palette },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Settings Sidebar */}
                <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                            <Settings className="w-5 h-5 mr-2 text-blue-600" />
                            Settings
                        </h2>
                    </div>
                    <nav className="p-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-left transition-colors ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 mr-3" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Settings Content */}
                <div className="flex-1 p-4 md:p-6">
                    {/* General Settings */}
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            defaultValue="Ramesh Mistri"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            defaultValue="ramesh.mistri@tailorpro.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            defaultValue="+91 9876543210"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            rows={3}
                                            defaultValue="123 Tailor Street, Mumbai, Maharashtra 400001"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            defaultValue="Suits & Blazers"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            defaultValue="15 years"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">About Your Work</label>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            rows={4}
                                            defaultValue="Master tailor with expertise in formal wear and custom fittings. Specialized in wedding suits and corporate blazers."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Notification Preferences</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <Bell className="w-5 h-5 text-blue-600 mr-3" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">New Order Assignments</h4>
                                            <p className="text-sm text-gray-600">Get notified when new orders are assigned to you</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notifications.newOrders}
                                            onChange={() => handleNotificationChange('newOrders')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 text-orange-600 mr-3" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">Deadline Reminders</h4>
                                            <p className="text-sm text-gray-600">Receive reminders for upcoming order deadlines</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notifications.deadlineReminders}
                                            onChange={() => handleNotificationChange('deadlineReminders')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <DollarSign className="w-5 h-5 text-green-600 mr-3" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">Payment Received</h4>
                                            <p className="text-sm text-gray-600">Notify me when payments are processed</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notifications.paymentReceived}
                                            onChange={() => handleNotificationChange('paymentReceived')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <Mail className="w-5 h-5 text-gray-600 mr-3" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">System Updates</h4>
                                            <p className="text-sm text-gray-600">Receive important system notifications</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notifications.systemUpdates}
                                            onChange={() => handleNotificationChange('systemUpdates')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <CreditCard className="w-5 h-5 text-purple-600 mr-3" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">Promotions & Offers</h4>
                                            <p className="text-sm text-gray-600">Receive special offers and promotions</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notifications.promotions}
                                            onChange={() => handleNotificationChange('promotions')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-gray-800">Change Password</h4>
                                        <button className="text-sm text-blue-600 hover:text-blue-800">Change</button>
                                    </div>
                                    <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <Lock className="w-5 h-5 text-blue-600 mr-3" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                                            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={security.twoFactorAuth}
                                            onChange={() => handleSecurityChange('twoFactorAuth')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <User className="w-5 h-5 text-green-600 mr-3" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">Login Alerts</h4>
                                            <p className="text-sm text-gray-600">Get notified when your account is accessed from a new device</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={security.loginAlerts}
                                            onChange={() => handleSecurityChange('loginAlerts')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-800 mb-2">Active Sessions</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                            <div>
                                                <p className="font-medium">Chrome on Windows</p>
                                                <p className="text-sm text-gray-600">Mumbai, India • Last active 2 hours ago</p>
                                            </div>
                                            <button className="text-red-600 hover:text-red-800 text-sm">Log out</button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                            <div>
                                                <p className="font-medium">Safari on iPhone</p>
                                                <p className="text-sm text-gray-600">Delhi, India • Last active 3 days ago</p>
                                            </div>
                                            <button className="text-red-600 hover:text-red-800 text-sm">Log out</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment Settings */}
                    {activeTab === 'payment' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Payment Settings</h3>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-3">Payment Method</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <button
                                            onClick={() => handlePaymentMethodChange('bank_transfer')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${payment.paymentMethod === 'bank_transfer'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${payment.paymentMethod === 'bank_transfer'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {payment.paymentMethod === 'bank_transfer' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <span>Bank Transfer</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handlePaymentMethodChange('upi')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${payment.paymentMethod === 'upi'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${payment.paymentMethod === 'upi'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {payment.paymentMethod === 'upi' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <span>UPI Payment</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handlePaymentMethodChange('cash')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${payment.paymentMethod === 'cash'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${payment.paymentMethod === 'cash'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {payment.paymentMethod === 'cash' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <span>Cash Payment</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {payment.paymentMethod === 'bank_transfer' && (
                                    <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={payment.bankName}
                                                onChange={(e) => setPayment(prev => ({ ...prev, bankName: e.target.value }))}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    value={payment.accountNumber}
                                                    onChange={(e) => setPayment(prev => ({ ...prev, accountNumber: e.target.value }))}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    value={payment.ifscCode}
                                                    onChange={(e) => setPayment(prev => ({ ...prev, ifscCode: e.target.value }))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {payment.paymentMethod === 'upi' && (
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={payment.upiId}
                                            onChange={(e) => setPayment(prev => ({ ...prev, upiId: e.target.value }))}
                                        />
                                    </div>
                                )}

                                {/* Payment Schedule Section */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-800 mb-3">Payment Schedule</h4>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                id="weekly-payment"
                                                name="payment-schedule"
                                                type="radio"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                checked={payment.schedule === 'weekly'}
                                                onChange={() => setPayment(prev => ({ ...prev, schedule: 'weekly' }))}
                                            />
                                            <label htmlFor="weekly-payment" className="ml-2 block text-sm text-gray-700">
                                                Weekly Payments
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="order-payment"
                                                name="payment-schedule"
                                                type="radio"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                checked={payment.schedule === 'per_order'}
                                                onChange={() => setPayment(prev => ({ ...prev, schedule: 'per_order' }))}
                                            />
                                            <label htmlFor="order-payment" className="ml-2 block text-sm text-gray-700">
                                                Per Order
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Availability Settings */}
                    {activeTab === 'availability' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Working Hours & Availability</h3>

                            <div className="space-y-3">
                                {availability.map((day) => (
                                    <div key={day.day} className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={day.enabled}
                                                        onChange={() => toggleDayAvailability(day.day)}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                                <span className="ml-3 font-medium">{day.day}</span>
                                            </div>
                                            {day.enabled && (
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex items-center">
                                                        <label className="sr-only">Start Time</label>
                                                        <input
                                                            type="time"
                                                            className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={day.start}
                                                            onChange={(e) => updateAvailabilityTime(day.day, 'start', e.target.value)}
                                                        />
                                                    </div>
                                                    <span>to</span>
                                                    <div className="flex items-center">
                                                        <label className="sr-only">End Time</label>
                                                        <input
                                                            type="time"
                                                            className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={day.end}
                                                            onChange={(e) => updateAvailabilityTime(day.day, 'end', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {!day.enabled && (
                                            <p className="text-sm text-gray-600 ml-14">Not available</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <h4 className="font-medium text-blue-800 mb-2">Temporary Unavailability</h4>
                                <p className="text-sm text-blue-700 mb-3">Going on vacation or need time off? Set dates when you won't be accepting orders.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            Set Unavailable
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Appearance Settings */}
                    {activeTab === 'appearance' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Appearance</h3>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-3">Theme</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <button
                                            onClick={() => handleAppearanceChange('theme', 'light')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${appearance.theme === 'light'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${appearance.theme === 'light'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {appearance.theme === 'light' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <div>
                                                    <span>Light</span>
                                                    <Sun className="w-4 h-4 ml-2 inline-block text-yellow-500" />
                                                </div>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleAppearanceChange('theme', 'dark')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${appearance.theme === 'dark'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${appearance.theme === 'dark'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {appearance.theme === 'dark' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <div>
                                                    <span>Dark</span>
                                                    <Moon className="w-4 h-4 ml-2 inline-block text-indigo-500" />
                                                </div>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleAppearanceChange('theme', 'system')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${appearance.theme === 'system'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${appearance.theme === 'system'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {appearance.theme === 'system' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <div>
                                                    <span>System Default</span>
                                                    <Globe className="w-4 h-4 ml-2 inline-block text-blue-500" />
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-800 mb-3">Density</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <button
                                            onClick={() => handleAppearanceChange('density', 'compact')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${appearance.density === 'compact'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${appearance.density === 'compact'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {appearance.density === 'compact' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <span>Compact</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleAppearanceChange('density', 'normal')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${appearance.density === 'normal'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${appearance.density === 'normal'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {appearance.density === 'normal' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <span>Normal</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleAppearanceChange('density', 'spacious')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${appearance.density === 'spacious'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${appearance.density === 'spacious'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {appearance.density === 'spacious' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <span>Spacious</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-3">Font Preference</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <button
                                            onClick={() => handleAppearanceChange('font', 'default')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${appearance.font === 'default'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${appearance.font === 'default'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {appearance.font === 'default' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <span>System Default</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleAppearanceChange('font', 'sans')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${appearance.font === 'sans'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${appearance.font === 'sans'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {appearance.font === 'sans' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <span>Modern Sans</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleAppearanceChange('font', 'serif')}
                                            className={`p-4 border rounded-lg text-left transition-colors ${appearance.font === 'serif'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${appearance.font === 'serif'
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {appearance.font === 'serif' && (
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <span>Classic Serif</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                    <h4 className="font-medium text-yellow-800 mb-2">Preview Mode</h4>
                                    <p className="text-sm text-yellow-700 mb-3">See how your changes will look before saving them.</p>
                                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                                        Preview Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Save Button */}
            <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-end">
                <button
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className={`px-6 py-2.5 rounded-lg text-white flex items-center ${isSaving ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isSaving ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}