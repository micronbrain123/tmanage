import React from 'react';
import { ChevronDown } from 'lucide-react';

const RefundsContent = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="p-3 sm:p-6">
        {/* Filters Section */}
        <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Period */}
            <div className="flex-1 lg:flex-initial">
              <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
              <div className="relative">
                <button className="flex items-center justify-between w-full lg:w-60 px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
                  <span className="truncate pr-2">21 Jul 2025 — 21 Jul 2025</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* Document Types */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Document types</label>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
                  All
                </button>
                <button className="px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
                  Orders
                </button>
                <button className="px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
                  Sales
                </button>
                <button className="px-4 py-1 text-xs sm:text-sm bg-blue-500 text-white rounded hover:bg-blue-600 font-medium">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Table Header - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-7 gap-4 px-4 py-3 text-sm font-medium text-gray-700">
              <div>Refund #</div>
              <div>Date and time</div>
              <div>Document</div>
              <div>Client</div>
              <div>Manager</div>
              <div>Comment</div>
              <div className="text-right">
                Amount
                <ChevronDown className="w-4 h-4 inline ml-1" />
              </div>
            </div>
          </div>

          {/* Mobile Table Header */}
          <div className="lg:hidden bg-gray-50 border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-700">Refunds</h2>
              <button className="flex items-center gap-1 text-sm text-gray-500">
                Sort
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Empty State */}
          <div className="p-8 sm:p-16 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 opacity-20">
              <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                <path d="M40 5L35 15H25L20 25V55L25 65H55L60 55V25L55 15H45L40 5Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M30 35L35 40L50 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No refunds yet</h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">Receive returns on orders and sales to make refunds to clients</p>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 sm:px-6 py-2">
        <div className="flex items-center justify-end gap-2 sm:gap-4 text-xs text-gray-600">
          <span>ENG</span>
          <span>17:55</span>
          <span>IN</span>
          <span className="hidden xs:inline">21-07-2025</span>
          <span className="xs:hidden">21/07</span>
        </div>
      </div>
    </div>
  );
};

export default RefundsContent;