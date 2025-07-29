"use client";

import React, { useState } from 'react';
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

import DashboardContent from './DashboardContent ';
import ServicesPage from './ServicesPage';
import ProductPage from './ProductPage';
import BundlePage from './BundlePage';
import EmployeeHoursPage from './EmployeeHoursPage';
import TasksPage from './TasksPage';
import Orders from './Orders';
import Agencies from './Agencies';
import Vendors from './Vendors';
import Items from './Items';
import Deliveries from './Deliveries';
import Billing from './Billing';
import Reports from './Reports';
import SettingsPage from './SettingsPage';
import InventoryManagement from './InventoryManagement';
import WorkflowBoard from './WorkflowBoard';

export default function BusinessDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
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
    { id: 'billing', label: 'Finance', icon: CreditCard },
    { id: 'reports', label: 'Reports', icon: Ruler },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderDashboardContent = () => {
    switch (dashboardTab) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'Employee hours':
        return <EmployeeHoursPage />;
      case 'Services':
        return <ServicesPage />;
      case 'Products':
        return <ProductPage />;
      case 'Bundles':
        return <BundlePage />;
      default:
        return <DashboardContent />;
    }
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
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
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <div className="flex items-center min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
              <span className="text-white text-base sm:text-lg font-bold">M</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">My company</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white flex-shrink-0 ml-2"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Welcome */}
        <div className="p-4 sm:p-6 border-b border-gray-700">
          <div className="flex items-center text-amber-400 mb-2">
            <span className="text-base sm:text-lg">👋</span>
            <span className="ml-2 text-white font-medium text-sm sm:text-base">Welcome</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1 overflow-y-auto max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-260px)] dark-scrollbar pr-2">
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
                className={`w-full flex items-center px-4 sm:px-6 py-2.5 sm:py-3 text-left transition-colors ${currentPage === item.id
                  ? 'bg-gray-700 text-white border-r-2 border-blue-500'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="flex-1 text-sm sm:text-base truncate">{item.label}</span>
                {item.beta && (
                  <span className="bg-purple-500 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium ml-2 flex-shrink-0">
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
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center min-w-0 flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-2 sm:mr-3 flex-shrink-0"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">My company</h2>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button className="text-gray-600 hover:text-gray-800 flex items-center">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm hidden xs:inline">Help</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-3 sm:p-4 lg:p-6">
          {currentPage === 'dashboard' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 overflow-x-auto">
                <div className="flex space-x-4 sm:space-x-8 min-w-max sm:min-w-0">
                  {['Dashboard', 'Employee hours', 'Services', 'Products', 'Bundles'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDashboardTab(tab)}
                      className={`py-2 sm:py-3 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${dashboardTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Render content based on active tab */}
              {renderDashboardContent()}
            </div>
          )}

          {/* Other Pages */}
          {currentPage !== 'dashboard' && (
            <div className="w-full overflow-hidden">
              {currentPage === 'orders' && <Orders />}
              {currentPage === 'task' && <TasksPage />}
              {currentPage === 'agencies' && <Agencies />}
              {currentPage === 'vendors' && <Vendors />}
              {currentPage === 'inventory' && <InventoryManagement />}
              {currentPage === 'items' && <Items />}
              {currentPage === 'deliveries' && <Deliveries />}
              {currentPage === 'billing' && <Billing />}
              {currentPage === 'workflows' && <WorkflowBoard />}
              {currentPage === 'reports' && <Reports />}
              {currentPage === 'settings' && <SettingsPage />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}