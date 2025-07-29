import React, { useState } from 'react';
import { ChevronDown, Search, Calendar } from 'lucide-react';

const CashFlowReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [selectedAccount, setSelectedAccount] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState({
    myLocation: true,
    bank: true,
    cash: true
  });

  const periodOptions = [
    'Today',
    'This week',
    'This month',
    'This year',
    'Yesterday',
    'Last week',
    'Last month',
    'Last year',
    'Custom range'
  ];

  const cashFlowData = []; // Empty for "No data found" state

  const toggleAccount = (accountType) => {
    setSelectedAccounts(prev => ({
      ...prev,
      [accountType]: !prev[accountType]
    }));
  };

  const handleSelectAll = () => {
    setSelectedAccounts({
      myLocation: true,
      bank: true,
      cash: true
    });
  };

  const handleClear = () => {
    setSelectedAccounts({
      myLocation: false,
      bank: false,
      cash: false
    });
  };

  const handleApply = () => {
    setIsPeriodDropdownOpen(false);
    setIsAccountDropdownOpen(false);
    setShowTable(true);
  };

  const handlePeriodClick = () => {
    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
    setIsAccountDropdownOpen(false);
    setShowTable(false);
  };

  const handleAccountClick = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setShowTable(false);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setIsPeriodDropdownOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Cash flow</h1>
          <p className="text-gray-600 text-sm">It shows the income and expense for the selected period by cash flow items</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg p-4 mb-6 relative">
          <div className="flex items-center gap-4">
            {/* Period Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handlePeriodClick}
            >
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Period: {selectedPeriod}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isPeriodDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Account Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleAccountClick}
            >
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <span className="text-sm font-medium">Account: {selectedAccount}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>

          {/* Period Selection Dropdown */}
          {isPeriodDropdownOpen && (
            <div className="absolute top-full left-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
              <div className="py-2">
                {periodOptions.map((period, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50"
                    onClick={() => handlePeriodSelect(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Account Selection Dropdown */}
          {isAccountDropdownOpen && (
            <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '200px'}}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 border border-gray-200 rounded px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 outline-none text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="myLocation"
                      checked={selectedAccounts.myLocation}
                      onChange={() => toggleAccount('myLocation')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <label htmlFor="myLocation" className="text-sm font-medium">My location</label>
                  </div>

                  <div className="ml-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="bank"
                        checked={selectedAccounts.bank}
                        onChange={() => toggleAccount('bank')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="bank" className="text-sm">Bank</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="cash"
                        checked={selectedAccounts.cash}
                        onChange={() => toggleAccount('cash')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="cash" className="text-sm">Cash</label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleSelectAll}
                  >
                    Select all
                  </button>
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Table - Shows when Apply is clicked */}
        {showTable && (
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Item
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                      <div className="flex items-center justify-end gap-2">
                        Income, ₹
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                      <div className="flex items-center justify-end gap-2">
                        Expense, ₹
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {cashFlowData.length > 0 ? (
                    cashFlowData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.income}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.expense}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <div className="w-12 h-12 border-4 border-gray-300 rounded-full flex items-center justify-center">
                              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No data found</h3>
                          <p className="text-sm text-gray-500">Try changing filters or start using program more actively to collect data</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Default state when no table is shown */}
        {!showTable && !isPeriodDropdownOpen && !isAccountDropdownOpen && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            <p>Select period and account filters, then click Apply to view the cash flow report</p>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex items-center justify-end gap-4 text-xs text-gray-600">
          <span>ENG</span>
          <span>{new Date().toLocaleTimeString().slice(0, 5)}</span>
          <span>IN</span>
          <span>{new Date().toLocaleDateString('en-GB')}</span>
        </div>
      </div>
    </div>
  );
};

export default CashFlowReport;