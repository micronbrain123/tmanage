import React, { useState } from 'react';
import { Plus, Settings, ChevronDown, Building, User, CreditCard, Users, Calendar, Clock, Zap } from 'lucide-react';

const InvoicesPage = () => {
  const [activeTab, setActiveTab] = useState('Invoices');
  const [filters, setFilters] = useState({
    legalEntity: 'All',
    client: 'All',
    payer: 'All',
    manager: 'All',
    created: 'This month',
    issueDate: 'All time',
    dueDate: 'All time',
    status: 'All'
  });

  const [sortConfig, setSortConfig] = useState({
    field: 'created',
    direction: 'desc'
  });

  const tableColumns = [
    { key: 'invoiceNumber', label: 'Invoice #', sortable: true },
    { key: 'created', label: 'Created', sortable: true },
    { key: 'issueDate', label: 'Issue date', sortable: true },
    { key: 'dueDate', label: 'Due date', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'statusDeadline', label: 'Status deadline', sortable: true },
    { key: 'legalEntity', label: 'Legal entity', sortable: true },
    { key: 'client', label: 'Client', sortable: true },
    { key: 'payer', label: 'Payer', sortable: false }
  ];

  const filterOptions = [
    { key: 'legalEntity', label: 'Legal entity', icon: Building },
    { key: 'client', label: 'Client', icon: User },
    { key: 'payer', label: 'Payer', icon: CreditCard },
    { key: 'manager', label: 'Manager', icon: Users },
    { key: 'created', label: 'Created', icon: Calendar },
    { key: 'issueDate', label: 'Issue date', icon: Calendar },
    { key: 'dueDate', label: 'Due date', icon: Clock },
    { key: 'status', label: 'Status', icon: Zap }
  ];

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (field) => {
    if (sortConfig.field !== field) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const handleCreateInvoice = () => {
    console.log('Creating new invoice...');
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-3 sm:p-5">

        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={handleCreateInvoice}
            className="bg-green-500 text-white px-3 sm:px-4 py-1 rounded-md text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 hover:bg-green-600 transition-colors"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Invoice</span>
            <span className="xs:hidden">+</span>
          </button>

          {filterOptions.map(({ key, label, icon: Icon }) => (
            <div key={key} className="relative">
              <button className="bg-white border border-gray-300 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm flex items-center gap-1 sm:gap-2 hover:border-blue-500 transition-colors">
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                <span className="text-gray-700 hidden sm:inline">
                  {label}: {filters[key]}
                </span>
                <span className="text-gray-700 sm:hidden truncate max-w-[60px]">
                  {filters[key]}
                </span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>

        {/* Actions Section */}
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <div className="relative">
            <button className="bg-white border border-gray-300 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors">
              Actions
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </button>
          </div>
          <button className="bg-white border border-gray-300 p-2 rounded-md hover:border-gray-400 transition-colors">
            <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
          </button>
        </div>

        {/* Invoice Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] sm:min-w-0">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {tableColumns.map((column) => (
                    <th
                      key={column.key}
                      className="px-3 sm:px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.sortable ? (
                        <button
                          onClick={() => handleSort(column.key)}
                          className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                        >
                          <span className="truncate">{column.label}</span>
                          <span className="text-gray-400 text-xs flex-shrink-0">
                            {getSortIcon(column.key)}
                          </span>
                        </button>
                      ) : (
                        <span className="truncate">{column.label}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {/* Empty State */}
                <tr>
                  <td colSpan={tableColumns.length} className="px-4 sm:px-6 py-12 sm:py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                        <svg
                          className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        No invoices yet
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-4 text-center max-w-md">
                        Customize templates and create invoices for your customers just in a few clicks
                      </p>
                      <button
                        onClick={handleCreateInvoice}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base"
                      >
                        Create invoice
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination (hidden when empty) */}
        <div className="hidden mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button className="px-2 sm:px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                ‹
              </button>
              <button className="px-2 sm:px-3 py-2 bg-blue-500 text-white rounded-md text-xs sm:text-sm">
                1
              </button>
              <button className="px-2 sm:px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-2 sm:px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                ›
              </button>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Total — 0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;