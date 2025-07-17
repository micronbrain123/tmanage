"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Eye,
  DollarSign,
  Activity,
  Calendar,
  Scissors,
  Shirt,
  Ruler,
  Truck,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  PlusCircle,
  Edit,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  BookOpen,
  MessageSquare,
  CreditCard,
  BarChart3,
  Workflow,
  Contact,
  HelpCircle,
  Zap,
  Flame,
  Timer,
  Wallet,
  ThumbsUp,
  Percent,
  IndianRupee
} from 'lucide-react';

import ServicesPage from './ServicesPage';
import ProductPage from './ProductPage';
import BundlePage from './BundlePage';
import EmployeeHoursPage from './EmployeeHoursPage';

// Import the actual components
import TasksPage from './TasksPage';
import Orders from './Orders';
import Agencies from './Agencies';
import Vendors from './Vendors';
import Items from './Items';
import Deliveries from './Deliveries';
import Billing from './Billing';
import SettingsPage from './SettingsPage';
import InventoryManagement from './InventoryManagement';
import WorkflowBoard from './WorkflowBoard';

export default function BusinessDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [hasOrders, setHasOrders] = useState(false); // Toggle this to show different states
  const [dashboardTab, setDashboardTab] = useState('Dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'task', label: 'Tasks', icon: Calendar },
    { id: 'agencies', label: 'Agencies', icon: MessageSquare },
    { id: 'orders', label: 'Orders', icon: FileText },
    { id: 'vendors', label: 'Vendors', icon: Scissors },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'items', label: 'Items', icon: Package },
    { id: 'workflows', label: 'Workflows', icon: Workflow },
    { id: 'deliveries', label: 'Deliveries', icon: Truck },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Today's metrics (top row)
  const todayMetrics = [
    {
      title: 'Orders today',
      value: 0,
      subValue: '0 ₹',
      icon: FileText,
      color: 'bg-slate-100 hover:bg-slate-200 border-slate-200',
      iconColor: 'text-slate-600'
    },
    {
      title: 'Sales today',
      value: 0,
      subValue: '0 ₹',
      icon: ShoppingCart,
      color: 'bg-slate-100 hover:bg-slate-200 border-slate-200',
      iconColor: 'text-slate-600'
    },
    {
      title: 'Revenue today',
      value: '0 ₹',
      subValue: '0 ₹',
      icon: DollarSign,
      color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Client refunds today',
      value: '0 ₹',
      subValue: '0 ₹',
      icon: ArrowDownRight,
      color: 'bg-red-50 hover:bg-red-100 border-red-200',
      iconColor: 'text-red-600'
    },
  ];

  // Status metrics (middle row)
  const statusMetrics = [
    {
      title: 'New',
      value: 0,
      percentage: '0%',
      icon: PlusCircle,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600',
      badge: 'NEW'
    },
    {
      title: 'Urgent',
      value: 0,
      percentage: '0%',
      icon: Flame,
      color: 'bg-red-50 hover:bg-red-100 border-red-200',
      iconColor: 'text-red-600'
    },
    {
      title: 'Overdue',
      value: 0,
      percentage: '0%',
      icon: Timer,
      color: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Receivables',
      value: 0,
      subValue: '0 ₹',
      icon: Wallet,
      color: 'bg-slate-100 hover:bg-slate-200 border-slate-200',
      iconColor: 'text-slate-600'
    },
    {
      title: 'Total money in accounts',
      value: '0 ₹',
      subValue: 'Cash: 0 | Cashless: 0',
      icon: IndianRupee,
      color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
      iconColor: 'text-emerald-600'
    },
  ];

  // Bottom metrics (monthly stats)
  const monthlyMetrics = [
    {
      title: 'Orders created',
      value: 0,
      badge: '0',
      icon: FileText,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Orders won',
      value: 0,
      subValue: '0 ₹',
      icon: ThumbsUp,
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      title: 'Revenue this month',
      value: '0 ₹',
      subValue: '0 ₹',
      icon: TrendingUp,
      color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Client refunds this month',
      value: '0 ₹',
      subValue: '0 ₹',
      icon: ArrowDownRight,
      color: 'bg-red-50 hover:bg-red-100 border-red-200',
      iconColor: 'text-red-600'
    },
  ];

  // Additional metrics (bottom row)
  const additionalMetrics = [
    {
      title: 'Conversion',
      value: '0%',
      badge: '0%',
      icon: Percent,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Company rating',
      value: 0,
      icon: Star,
      color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
      iconColor: 'text-yellow-600',
      badge: '0'
    },
    {
      title: 'Average Order value',
      value: '0 ₹',
      subValue: '0 ₹',
      icon: BarChart3,
      color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Average Sale value',
      value: '0 ₹',
      subValue: '0 ₹',
      icon: Target,
      color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
      iconColor: 'text-emerald-600'
    },
  ];

  const MetricCard = ({ metric, size = 'normal' }) => {
    const Icon = metric.icon;
    return (
      <div className={`${metric.color} border-2 rounded-2xl p-6 transition-all duration-200 cursor-pointer group ${size === 'large' ? 'col-span-2' : ''
        }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-5 h-5 ${metric.iconColor}`} />
              <h3 className="text-sm font-medium text-gray-700">{metric.title}</h3>
              {metric.beta && (
                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                  BETA
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
              {metric.subValue && (
                <div className="flex items-center gap-2">
                  <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded font-medium">
                    {metric.subValue}
                  </span>
                </div>
              )}
              {metric.percentage && (
                <div className="flex items-center gap-2">
                  <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded font-medium">
                    {metric.percentage}
                  </span>
                </div>
              )}
              {metric.badge && (
                <div className="flex items-center gap-2">
                  <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded font-medium">
                    {metric.badge}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Create orders and receive payments for them to see their dynamics here
        </p>
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    switch (dashboardTab) {
      case 'Dashboard':
        return (
          <div className="space-y-6">
            {!hasOrders ? (
              <>
                {/* Today's Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {todayMetrics.map((metric, index) => (
                    <MetricCard key={index} metric={metric} />
                  ))}
                </div>

                {/* Status Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {statusMetrics.map((metric, index) => (
                    <MetricCard key={index} metric={metric} />
                  ))}
                </div>

                {/* Empty State */}
                <EmptyState />

                {/* Monthly Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {monthlyMetrics.map((metric, index) => (
                    <MetricCard key={index} metric={metric} />
                  ))}
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {additionalMetrics.map((metric, index) => (
                    <MetricCard key={index} metric={metric} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500">Orders view would appear here when hasOrders is true</p>
              </div>
            )}

            {/* Bottom sections placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders in progress</h3>
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No orders in progress</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders by assigned technicians</h3>
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No assigned technicians</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Dropped off orders</h3>
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No dropped off orders</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Employee hours':
        return <EmployeeHoursPage />;
      case 'Services':
        return <ServicesPage />;
      case 'Products':
        return <ProductPage />;
      case 'Bundles':
        return <BundlePage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>

        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-lg font-bold">M</span>
            </div>
            <h1 className="text-xl font-bold text-white">My company</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Welcome */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center text-amber-400 mb-2">
            <span className="text-lg">👋</span>
            <span className="ml-2 text-white font-medium">Welcome</span>
          </div>
        </div>

        {/* Navigation - Added max-height and overflow-y-auto */}
        <nav className="mt-4 flex-1 overflow-y-auto max-h-[calc(100vh-260px)] dark-scrollbar pr-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                  // Reset dashboard tab when switching to dashboard
                  if (item.id === 'dashboard') {
                    setDashboardTab('Dashboard');
                  }
                }}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${currentPage === item.id
                    ? 'bg-gray-700 text-white border-r-2 border-blue-500'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="flex-1">{item.label}</span>
                {item.beta && (
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    BETA
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-3"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">My company</h2>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800">
                <HelpCircle className="w-5 h-5" />
                <span className="ml-2 text-sm">Help</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {currentPage === 'dashboard' && (
            <div className="space-y-6">
              {/* Navigation Tabs */}
              <div className="flex space-x-8 border-b border-gray-200">
                {['Dashboard', 'Employee hours', 'Services', 'Products', 'Bundles'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDashboardTab(tab)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${dashboardTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Render content based on active tab */}
              {renderDashboardContent()}
            </div>
          )}

          {/* Other Pages */}
          {currentPage !== 'dashboard' && (
            <>
              {currentPage === 'orders' && <Orders />}
              {currentPage === 'task' && <TasksPage />}
              {currentPage === 'agencies' && <Agencies />}
              {currentPage === 'vendors' && <Vendors />}
              {currentPage === 'inventory' && <InventoryManagement />}
              {currentPage === 'items' && <Items />}
              {currentPage === 'deliveries' && <Deliveries />}
              {currentPage === 'billing' && <Billing />}
              {currentPage === 'workflows' && <WorkflowBoard />}
              {currentPage === 'settings' && <SettingsPage />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}