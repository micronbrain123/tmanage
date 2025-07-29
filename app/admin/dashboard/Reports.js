import React, { useState } from 'react';
import {
  Activity,
  DollarSign,
  FileText,
  ShoppingCart,
  Package,
  BarChart3,
  ChevronDown
} from 'lucide-react';

import PayrollReport from './PayrollReport';
import ActivityLogContent from './ActivityLogContent';
import TotalMoneyReport from './TotalMoneyReport';
import CashFlowReport from './CashFlowReport';
import OrdersProfitReport from './OrdersProfitReport';
import SalesProfitReport from './SalesProfitReport';
import TaxSummary from './TaxSummary';

// Only import the components that actually exist
import CreatedOrders from './CreatedOrders';
import ClosedOrdersReport from './ClosedOrdersRepor';
import OrdersInProgress from './OrdersInProgress';
import TechniciansReport from './TechniciansReport';
import LaboursServicesReport from './LaboursServicesReport';
import AllInquiriesReport from './AllInquiriesReport';
import InquiryConversionReport from './InquiryConversionReport';
import EmployeePerformanceReport from './EmployeePerformanceReport';
import LostInquiriesReport from './LostInquiriesRepor';
import ProductTurnoverReport from './ProductTurnoverReport';
import StockLevelsReport from './StockLevelsReport';
import InventoryWriteOffs from './InventoryWriteOffs';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('Activity log');

  // Tab-specific dropdown states
  const [tabDropdowns, setTabDropdowns] = useState({
    Finance: { selected: 'Payroll Report', options: ['Payroll Report', 'Total Money', 'Cash Flow', 'Orders Profit', 'Sales Profit', 'Tax Summary'] },
    Orders: { selected: 'Created Orders', options: ['Created Orders', 'Closed Orders', 'Orders in Progress', 'Technicians Report', 'Labours and Services Report'] },
    Inquiries: { selected: 'All inquiries', options: ['All inquiries', 'Inquiry Conversion', 'Employee Performance', 'Lost inquiries'] },
    Warehouse: { selected: 'Product turnover', options: ['Product turnover', 'Stock levels', 'Inventory write-offs', 'Products below minimum Stocks'] }
  });

  const tabs = [
    { name: 'Activity log', icon: Activity },
    { name: 'Finance', icon: DollarSign },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Inquiries', icon: FileText },
    { name: 'Warehouse', icon: Package },
  ];

  // Add state for tab report type dropdowns
  const [tabDropdownStates, setTabDropdownStates] = useState({
    Finance: false,
    Orders: false,
    Inquiries: false,
    Warehouse: false
  });

  const toggleTabDropdown = (tabName) => {
    setTabDropdownStates(prev => ({
      ...prev,
      [tabName]: !prev[tabName]
    }));
  };

  const closeAllTabDropdowns = () => {
    setTabDropdownStates({
      Finance: false,
      Orders: false,
      Inquiries: false,
      Warehouse: false
    });
  };

  // Updated Tab dropdown component with custom dropdown
  const TabDropdown = ({ tabName, selectedValue, options }) => {
    const isOpen = tabDropdownStates[tabName];

    return (
      <div className="mb-6">
        <div className="bg-white rounded-xl border p-3">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Select Report Type:</label>
            <div className="relative">
              <button
                onClick={() => toggleTabDropdown(tabName)}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-1 text-sm hover:bg-gray-50 transition-colors min-w-[200px] justify-between"
              >
                <span>{selectedValue.toUpperCase()}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[250px] max-h-64 overflow-y-auto">
                  <div className="py-1">
                    {options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleDropdownChange(tabName, option);
                          closeAllTabDropdowns();
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${selectedValue === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                      >
                        {option.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handle dropdown change
  const handleDropdownChange = (tabName, value) => {
    setTabDropdowns(prev => ({
      ...prev,
      [tabName]: {
        ...prev[tabName],
        selected: value
      }
    }));
  };

  // Add click outside handler
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if clicking outside the specific tab dropdown areas
      if (!event.target.closest('.tab-dropdown') &&
        !event.target.closest('[class*="dropdown"]')) {
        closeAllTabDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Render content based on selected dropdown value
  const renderDropdownContent = (tabName, selectedValue) => {
    // Handle Finance tab reports
    if (tabName === 'Finance') {
      switch (selectedValue) {
        case 'Payroll Report':
          return <PayrollReport />;
        case 'Total Money':
          return <TotalMoneyReport />;
        case 'Cash Flow':
          return <CashFlowReport />;
        case 'Orders Profit':
          return <OrdersProfitReport />;
        case 'Sales Profit':
          return <SalesProfitReport />;
        case 'Tax Summary':
          return <TaxSummary />;
        default:
          return <PayrollReport />;
      }
    }

    // Handle Orders tab reports
    if (tabName === 'Orders') {
      switch (selectedValue) {
        case 'Created Orders':
          return <CreatedOrders />;
        case 'Closed Orders':
          return <ClosedOrdersReport />;
        case 'Orders in Progress':
          return <OrdersInProgress />;
        case 'Technicians Report':
          return <TechniciansReport />;
        case 'Labours and Services Report':
          return <LaboursServicesReport />;
        default:
          return (
            <div className="bg-white rounded-xl border p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tabName} - {selectedValue.toUpperCase()} Report
              </h3>
              <p className="text-gray-500 mb-4">
                Content for {selectedValue.toUpperCase()} will be rendered here from separate component files
              </p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Load {selectedValue.toUpperCase()} Data
              </button>
            </div>
          );
      }
    }

    // Handle Inquiries tab reports
    if (tabName === 'Inquiries') {
      switch (selectedValue) {
        case 'All inquiries':
          return <AllInquiriesReport />;
        case 'Inquiry Conversion':
          return <InquiryConversionReport />;
        case 'Employee Performance':
          return <EmployeePerformanceReport />;
        case 'Lost inquiries':
          return <LostInquiriesReport />;
        default:
          return (
            <div className="bg-white rounded-xl border p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tabName} - {selectedValue.toUpperCase()} Report
              </h3>
              <p className="text-gray-500 mb-4">
                Content for {selectedValue.toUpperCase()} will be rendered here from separate component files
              </p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Load {selectedValue.toUpperCase()} Data
              </button>
            </div>
          );
      }
    }

    // Handle Warehouse tab reports
    if (tabName === 'Warehouse') {
      switch (selectedValue) {
        case 'Product turnover':
          return <ProductTurnoverReport />;
        case 'Stock levels':
          return <StockLevelsReport />;
        case 'Inventory write-offs':
          return <InventoryWriteOffs />;
        case 'Products below minimum Stocks':
          return <ProductTurnoverReport />;
        default:
          return (
            <div className="bg-white rounded-xl border p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tabName} - {selectedValue.toUpperCase()} Report
              </h3>
              <p className="text-gray-500 mb-4">
                Content for {selectedValue.toUpperCase()} will be rendered here from separate component files
              </p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Load {selectedValue.toUpperCase()} Data
              </button>
            </div>
          );
      }
    }

    // Fallback content
    return (
      <div className="bg-white rounded-xl border p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {tabName} - {selectedValue.toUpperCase()} Report
        </h3>
        <p className="text-gray-500 mb-4">
          Content for {selectedValue.toUpperCase()} will be rendered here from separate component files
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Load {selectedValue.toUpperCase()} Data
        </button>
      </div>
    );
  };

  const FinanceContent = () => (
    <div className="space-y-6 tab-dropdown">
      <TabDropdown
        tabName="Finance"
        selectedValue={tabDropdowns.Finance.selected}
        options={tabDropdowns.Finance.options}
      />
      {renderDropdownContent('Finance', tabDropdowns.Finance.selected)}
    </div>
  );

  const OrdersContent = () => (
    <div className="space-y-6 tab-dropdown">
      <TabDropdown
        tabName="Orders"
        selectedValue={tabDropdowns.Orders.selected}
        options={tabDropdowns.Orders.options}
      />
      {renderDropdownContent('Orders', tabDropdowns.Orders.selected)}
    </div>
  );

  const InquiriesContent = () => (
    <div className="space-y-6 tab-dropdown">
      <TabDropdown
        tabName="Inquiries"
        selectedValue={tabDropdowns.Inquiries.selected}
        options={tabDropdowns.Inquiries.options}
      />
      {renderDropdownContent('Inquiries', tabDropdowns.Inquiries.selected)}
    </div>
  );

  const WarehouseContent = () => (
    <div className="space-y-6 tab-dropdown">
      <TabDropdown
        tabName="Warehouse"
        selectedValue={tabDropdowns.Warehouse.selected}
        options={tabDropdowns.Warehouse.options}
      />
      {renderDropdownContent('Warehouse', tabDropdowns.Warehouse.selected)}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Activity log':
        return <ActivityLogContent />;
      case 'Finance':
        return <FinanceContent />;
      case 'Orders':
        return <OrdersContent />;
      case 'Inquiries':
        return <InquiriesContent />;
      case 'Warehouse':
        return <WarehouseContent />;
      default:
        return <ActivityLogContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.name
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
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

export default Reports;