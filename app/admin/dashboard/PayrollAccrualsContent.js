import React from 'react';
import { Plus, ChevronDown } from 'lucide-react';

const PayrollAccrualsContent = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="p-3 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <button className="flex items-center gap-1 sm:gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 font-medium text-xs sm:text-sm">
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            Accrual
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-4 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-700 min-w-[400px] sm:min-w-0">
                <div className="flex items-center gap-1">
                  Period
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="flex items-center gap-1">
                  Employees
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="text-right flex items-center justify-end gap-1">
                  <span className="hidden sm:inline">Amount, ₹</span>
                  <span className="sm:hidden">Amount</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="p-8 sm:p-12 lg:p-16 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 opacity-20">
              <svg viewBox="0 0 96 96" fill="none" className="w-full h-full">
                {/* Calculator/accounting icon with confused face */}
                <rect x="28" y="16" width="40" height="64" rx="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                {/* Screen */}
                <rect x="32" y="20" width="32" height="12" rx="2" fill="currentColor" opacity="0.1"/>
                {/* Buttons grid */}
                <circle cx="36" cy="40" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
                <circle cx="48" cy="40" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
                <circle cx="60" cy="40" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
                <circle cx="36" cy="52" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
                <circle cx="48" cy="52" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
                <circle cx="60" cy="52" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
                <circle cx="36" cy="64" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
                <circle cx="48" cy="64" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
                <circle cx="60" cy="64" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
                {/* Confused face on screen */}
                <circle cx="42" cy="24" r="1" fill="currentColor" opacity="0.6"/>
                <circle cx="54" cy="24" r="1" fill="currentColor" opacity="0.6"/>
                <path d="M45 28 Q48 30 51 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" fill="none"/>
                {/* Question marks floating around */}
                <text x="18" y="30" fontSize="8" fill="currentColor" opacity="0.3">?</text>
                <text x="74" y="35" fontSize="6" fill="currentColor" opacity="0.3">?</text>
                <text x="20" y="70" fontSize="7" fill="currentColor" opacity="0.3">?</text>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-2 sm:mb-3">No payroll accruals yet</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4 px-4 max-w-md mx-auto">
              Create a payroll accrual to transfer it to the employees' balances
            </p>
            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm sm:text-base">
              Create accrual
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 sm:px-6 py-2">
        <div className="flex items-center justify-end gap-2 sm:gap-4 text-xs text-gray-600">
          <span>ENG</span>
          <span>18:36</span>
          <span>IN</span>
          <span className="hidden xs:inline">21-07-2025</span>
          <span className="xs:hidden">21/07</span>
        </div>
      </div>
    </div>
  );
};

export default PayrollAccrualsContent;