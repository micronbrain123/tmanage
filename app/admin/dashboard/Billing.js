import React, { useState } from 'react';
import {
  FileText,
  ShoppingCart,
  DollarSign,
  ArrowDownRight,
  PlusCircle,
  Flame,
  Timer,
  Wallet,
  IndianRupee,
  ThumbsUp,
  TrendingUp,
  Percent,
  Star,
  BarChart3,
  Target,
  Activity,
  Users,
  Package,
  CreditCard,
  Link,
  RefreshCw,
  Calculator,
  UserCheck,
  Banknote
} from 'lucide-react';

import InvoicesContent from './InvoicesContent';
// import PaymentLinksContent from './PaymentLinksContent'; 
import RefundsContent from './RefundsContent';
import BalancesContent from './BalancesContent';
import PayrollCalculationContent from './PayrollCalculationContent';
import PayrollAccrualsContent from './PayrollAccrualsContent';

const FinanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('Payments');

  const tabs = [
    { name: 'Payments', icon: CreditCard },
    { name: 'Invoices', icon: FileText },
    { name: 'Payment links', icon: Link },
    { name: 'Refunds', icon: RefreshCw },
    { name: 'Balances', icon: Wallet },
    { name: 'Payroll Calculation', icon: Calculator },
    { name: 'Payroll Accruals', icon: UserCheck }
  ];

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

  const MetricCard = ({ metric, size = 'normal' }) => {
    const Icon = metric.icon;
    return (
      <div className={`${metric.color} border-2 rounded-2xl transition-all duration-200 cursor-pointer group ${size === 'large' ? 'md:col-span-2' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-5 h-5 ${metric.iconColor}`} />
              <h3 className="text-sm font-medium text-gray-700">{metric.title}</h3>
              {metric.badge && (
                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                  {metric.badge}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{metric.value}</div>
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
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaymentsContent = () => (
    <div className="space-y-6">
      {/* Payments Dashboard Header */}
      <div className="bg-white rounded-xl border p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Payments for accounts "Bank"</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-gray-50 rounded-lg p-4 w-full sm:w-auto">
            <div className="text-sm text-gray-600">BANK</div>
            <div className="text-xl md:text-2xl font-bold">0 ₹</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">+ Income</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">- Expense</button>
              <button className="bg-gray-400 text-white px-3 py-1 rounded text-sm">Transfer</button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 w-full sm:w-auto">
            <div className="text-sm text-gray-600">CASH</div>
            <div className="text-2xl md:text-3xl font-bold">0 ₹</div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          <div className="flex-1 w-full">
            <label className="text-sm text-gray-600 mb-1 block">Period</label>
            <input 
              type="text" 
              value="21 Jul 2025 — 21 Jul 2025" 
              className="border rounded px-3 py-1 w-full"
              readOnly
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button className="bg-blue-500 text-white px-4 py-1 rounded">Apply</button>
            <button className="border px-3 py-1 rounded">Print</button>
            <button className="border px-3 py-1 rounded">Export</button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-xs md:text-sm">Created</th>
                <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-xs md:text-sm">Comment</th>
                <th className="text-right py-3 px-2 md:px-4 font-medium text-gray-700 text-xs md:text-sm">Income, ₹</th>
                <th className="text-right py-3 px-2 md:px-4 font-medium text-gray-700 text-xs md:text-sm">Expense, ₹</th>
                <th className="text-right py-3 px-2 md:px-4 font-medium text-gray-700 text-xs md:text-sm">Balance, ₹</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state row */}
              <tr>
                <td colSpan="5" className="text-center py-8 md:py-12 px-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Banknote className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm md:text-base">No payment transactions found for this period</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const PaymentLinksContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border p-8 md:p-12 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Link className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">No payment links created</h3>
        <p className="text-gray-500 text-sm md:text-base">Create payment links to accept payments easily</p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4">Create Payment Link</button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Payments':
        return <PaymentsContent />;
      case 'Invoices':
        // Once you import InvoicesContent, uncomment this line:
        // return <InvoicesContent />;
        return <InvoicesContent />;
      case 'Payment links':
        // Once you import PaymentLinksContent, uncomment this line:
        // return <PaymentLinksContent />;
        return <PaymentLinksContent />;
      case 'Refunds':
        return <RefundsContent />;
      case 'Balances':
        // Once you import BalancesContent, uncomment this line:
        // return <BalancesContent />;
        return <BalancesContent />;
      case 'Payroll Calculation':
        // Once you import PayrollCalculationContent, uncomment this line:
        // return <PayrollCalculationContent />;
        return <PayrollCalculationContent />;
      case 'Payroll Accruals':
        // Once you import PayrollAccrualsContent, uncomment this line:
        // return <PayrollAccrualsContent />;
        return <PayrollAccrualsContent />;
      default:
        return <PaymentsContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Finance</h1>
            <div className="flex items-center gap-2">
              <span className="bg-purple-500 text-white px-3 py-1 rounded text-sm">Training</span>
              <button className="text-blue-500 hover:text-blue-600">Help</button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-3 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.name
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;