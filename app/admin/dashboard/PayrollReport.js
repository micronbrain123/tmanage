import React from 'react';
import { ChevronDown, Printer, Download } from 'lucide-react';

const PayrollReport = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Payroll report</h1>
          <p className="text-gray-600 text-sm">It shows the rule to employees for completed labors and services, processed orders and sales</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
              <div className="relative">
                <button className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
                  <span>01 Jul 2025 — 22 Jul 2025</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <button className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
                  <span>All</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Take into account orders */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Take into account orders</label>
              <div className="relative">
                <button className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
                  <span>By date "Closed"</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
              Apply
            </button>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Empty State */}
          <div className="p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-4 opacity-20">
              <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                <rect x="15" y="20" width="50" height="40" stroke="currentColor" strokeWidth="2" fill="none" rx="2"/>
                <path d="M25 30h30M25 38h25M25 46h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="55" cy="15" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M52 15h6M55 12v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payroll data available</h3>
            <p className="text-gray-500">Apply filters to generate payroll report for the selected period and location</p>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex items-center justify-end gap-4 text-xs text-gray-600">
          <span>ENG</span>
          <span>17:12</span>
          <span>IN</span>
          <span>22-07-2025</span>
        </div>
      </div>
    </div>
  );
};

export default PayrollReport;