import React from 'react';
import { Download, ChevronDown } from 'lucide-react';

const BalancesContent = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="p-3 sm:p-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm">
          <button className="px-3 sm:px-4 py-1 bg-gray-200 text-gray-700 rounded">
            All
          </button>
          <button className="px-3 sm:px-4 py-1 text-gray-600 hover:bg-gray-100 rounded">
            Customers
          </button>
          <button className="px-3 sm:px-4 py-1 text-gray-600 hover:bg-gray-100 rounded">
            Suppliers
          </button>
          <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-gray-600 hover:bg-gray-100 rounded">
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Export</span>
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-4 gap-4 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-700 min-w-[500px] sm:min-w-0">
                <div className="flex items-center gap-1">
                  Name
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="text-right flex items-center justify-end gap-1">
                  <span className="hidden sm:inline">Receivable, ₹</span>
                  <span className="sm:hidden">Receivable</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="text-right flex items-center justify-end gap-1">
                  <span className="hidden sm:inline">Payable, ₹</span>
                  <span className="sm:hidden">Payable</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="text-right flex items-center justify-end gap-1">
                  <span className="hidden sm:inline">Balance, ₹</span>
                  <span className="sm:hidden">Balance</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="p-8 sm:p-12 lg:p-16 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 opacity-20">
              <svg viewBox="0 0 96 96" fill="none" className="w-full h-full">
                {/* Credit card icon */}
                <rect x="8" y="24" width="80" height="48" rx="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="8" y="32" width="80" height="8" fill="currentColor" opacity="0.3"/>
                <rect x="16" y="48" width="24" height="4" rx="2" fill="currentColor" opacity="0.5"/>
                <rect x="16" y="56" width="16" height="4" rx="2" fill="currentColor" opacity="0.5"/>
                <circle cx="72" cy="52" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="72" cy="52" r="2" fill="currentColor" opacity="0.5"/>
                {/* Money/receipt papers */}
                <rect x="32" y="8" width="24" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <rect x="40" y="12" width="8" height="2" rx="1" fill="currentColor" opacity="0.4"/>
                <rect x="36" y="16" width="16" height="1" rx="0.5" fill="currentColor" opacity="0.4"/>
                <rect x="36" y="20" width="12" height="1" rx="0.5" fill="currentColor" opacity="0.4"/>
                <rect x="36" y="24" width="14" height="1" rx="0.5" fill="currentColor" opacity="0.4"/>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 sm:mb-3">You're settled up</h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md mx-auto leading-relaxed px-4">
              Do business with your customers and suppliers and you'll see their account balances here when they are no longer zero
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 sm:px-6 py-2">
        <div className="flex items-center justify-end gap-2 sm:gap-4 text-xs text-gray-600">
          <span>ENG</span>
          <span>18:02</span>
          <span>IN</span>
          <span className="hidden xs:inline">21-07-2025</span>
          <span className="xs:hidden">21/07</span>
        </div>
      </div>
    </div>
  );
};

export default BalancesContent;