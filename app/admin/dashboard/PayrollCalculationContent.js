import React, { useState } from 'react';
import { Calendar, Info, Settings, ChevronDown } from 'lucide-react';

const PayrollCalculationContent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('For month');
  const [selectedMonth, setSelectedMonth] = useState('July 2025');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-3 sm:p-6">
        {/* Description */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-xs sm:text-sm px-2 sm:px-0">
            Amounts of calculated but not accrued to the employees' balances compensations. You can set calculation rules in the employees settings.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 mb-4">
          {/* Period Selector */}
          <div className="flex bg-white rounded-lg border border-gray-200 text-xs sm:text-sm">
            <button 
              className={`px-3 sm:px-4 py-1 rounded-l-lg ${selectedPeriod === 'For month' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setSelectedPeriod('For month')}
            >
              For month
            </button>
            <button 
              className={`px-3 sm:px-4 py-1 rounded-r-lg ${selectedPeriod === 'Custom range' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setSelectedPeriod('Custom range')}
            >
              Custom range
            </button>
          </div>

          {/* Month Selector */}
          <div className="relative">
            <button className="flex items-center justify-between w-32 sm:w-40 px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-2 flex-shrink-0" />
              <span className="truncate">{selectedMonth}</span>
            </button>
          </div>

          {/* Info Notice */}
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 sm:px-4 py-1 w-full lg:flex-1">
            <Info className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-blue-700 flex-1 min-w-0">
              <span className="hidden sm:inline">Here you can view only the payroll that is not yet accrued to the employees' balances</span>
              <span className="sm:hidden">View payroll not yet accrued to employee balances</span>
            </span>
            <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0 cursor-pointer hover:text-blue-600" />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-8 gap-4 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-700 items-center min-w-[800px] sm:min-w-0">
                <div className="flex items-center">
                  <input type="checkbox" className="w-3 h-3 sm:w-4 sm:h-4 rounded border-gray-300" />
                </div>
                <div className="flex items-center gap-1">
                  Employee
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-1">
                  Position
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="text-right flex items-center justify-end gap-1">
                  <span className="hidden lg:inline">Base Salary, ₹</span>
                  <span className="lg:hidden">Base</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="text-right flex items-center justify-end gap-1">
                  <span className="hidden lg:inline">Commissions, ₹</span>
                  <span className="lg:hidden">Comm.</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="text-right flex items-center justify-end gap-1">
                  <span className="hidden lg:inline">Penalties, ₹</span>
                  <span className="lg:hidden">Pen.</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="text-right flex items-center justify-end gap-1">
                  <span className="hidden lg:inline">Bonuses, ₹</span>
                  <span className="lg:hidden">Bonus</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="text-right flex items-center justify-end gap-1">
                  <span className="hidden lg:inline">Total, ₹</span>
                  <span className="lg:hidden">Total</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="p-8 sm:p-12 lg:p-16 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 opacity-20">
              <svg viewBox="0 0 96 96" fill="none" className="w-full h-full">
                {/* Sleeping document/receipt icon */}
                <rect x="28" y="20" width="40" height="56" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="36" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                <line x1="36" y1="40" x2="52" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                <line x1="36" y1="48" x2="58" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                <line x1="36" y1="56" x2="54" y2="56" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                {/* Sleeping face */}
                <circle cx="40" cy="36" r="1" fill="currentColor" opacity="0.7"/>
                <circle cx="52" cy="36" r="1" fill="currentColor" opacity="0.7"/>
                <path d="M44 44 Q48 46 52 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" fill="none"/>
                {/* Sleep lines */}
                <path d="M72 24 Q74 22 76 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" fill="none"/>
                <path d="M76 28 Q78 26 80 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" fill="none"/>
                <path d="M74 32 Q76 30 78 32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" fill="none"/>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-2 sm:mb-3">No calculated payroll for this month</h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md mx-auto leading-relaxed px-4">
              Open this table later or set up payroll calculation rules in the Employees section
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollCalculationContent;