import React, { useState } from 'react';
import { ChevronDown, Search, RotateCcw } from 'lucide-react';

const TotalMoneyReport = () => {
  const [selectedAccount, setSelectedAccount] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState({
    myLocation: true,
    bank: true,
    cash: true
  });

  const accountData = [
    { name: 'My location', type: 'location', balance: 0, currency: '₹' },
    { name: 'Bank', type: 'bank', balance: 0, currency: '₹' },
    { name: 'Cash', type: 'cash', balance: 0, currency: '₹' },
  ];

  const totalCashless = 0;
  const totalCash = 0;
  const total = 0;

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
    setIsDropdownOpen(false);
    setShowTable(true);
  };

  const handleAccountClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setShowTable(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Total money</h1>
          <p className="text-gray-600 text-sm">Total account sum to moment</p>
        </div>

        {/* Account Filter Section */}
        <div className="bg-white rounded-lg p-4 mb-6 relative">
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleAccountClick}
            >
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <span className="text-sm font-medium">Account: {selectedAccount}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>

          {/* Account Selection Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount, ₹
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accountData.map((account, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {account.type === 'location' && (
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          )}
                          <span className="text-sm text-gray-900">{account.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        —
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end space-y-1">
                <div className="text-right space-y-1">
                  <div className="flex justify-between items-center min-w-48">
                    <span className="text-sm text-gray-600">Total cashless:</span>
                    <span className="text-sm text-blue-600">{totalCashless}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total cash:</span>
                    <span className="text-sm text-blue-600">{totalCash}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-1">
                    <span className="text-sm font-medium text-gray-900">Total:</span>
                    <span className="text-sm font-medium text-blue-600">{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Default state when no table is shown */}
        {!showTable && !isDropdownOpen && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            <p>Select account filters and click Apply to view the money report</p>
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

export default TotalMoneyReport;