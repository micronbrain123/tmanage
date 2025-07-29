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
  Package
} from 'lucide-react';

const DashboardContent = () => {
  const [hasOrders, setHasOrders] = useState(false); // Toggle this to show different states

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
};

export default DashboardContent;