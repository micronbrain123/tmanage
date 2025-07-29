import React, { useState } from 'react';
import { ChevronDown, Search, Package, Building, Filter, Settings } from 'lucide-react';

const StockLevelsReport = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All products');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState({
    myLocation: true,
    productsWarehouse: true
  });

  const warehouseOptions = [
    'All',
    'Main Warehouse',
    'Secondary Warehouse',
    'Outlet Store'
  ];

  const categoryOptions = [
    'All products',
    'Materials',
    'Electronics',
    'Clothing',
    'Accessories'
  ];

  const filterOptions = [
    'All',
    'In stock',
    'Out of stock',
    'Products without a barcode'
  ];

  // Demo stock data
  const stockData = [
    {
      id: 1,
      code: '1234',
      sku: '4321',
      name: 'Corduroy Rib Black (m)',
      inStock: '0 m',
      cost: 0
    },
    {
      id: 2,
      code: '5678',
      sku: '8765',
      name: 'Denim Blue (m)',
      inStock: '0 m',
      cost: 0
    },
    {
      id: 3,
      code: '9090',
      sku: '0909',
      name: 'Linen Beige (m)',
      inStock: '0 m',
      cost: 0
    }
  ];

  const toggleLocation = (locationType) => {
    setSelectedLocations(prev => ({
      ...prev,
      [locationType]: !prev[locationType]
    }));
  };

  const handleSelectAllLocations = () => {
    setSelectedLocations({
      myLocation: true,
      productsWarehouse: true
    });
  };

  const handleClearLocations = () => {
    setSelectedLocations({
      myLocation: false,
      productsWarehouse: false
    });
  };

  const handleApply = () => {
    setIsWarehouseDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsFilterDropdownOpen(false);
    setIsActionsDropdownOpen(false);
    setShowTable(true);
  };

  const handleWarehouseClick = () => {
    setIsWarehouseDropdownOpen(!isWarehouseDropdownOpen);
    setIsCategoryDropdownOpen(false);
    setIsFilterDropdownOpen(false);
    setIsActionsDropdownOpen(false);
    setShowTable(false);
  };

  const handleCategoryClick = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    setIsWarehouseDropdownOpen(false);
    setIsFilterDropdownOpen(false);
    setIsActionsDropdownOpen(false);
    setShowTable(false);
  };

  const handleFilterClick = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
    setIsWarehouseDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsActionsDropdownOpen(false);
    setShowTable(false);
  };

  const handleActionsClick = () => {
    setIsActionsDropdownOpen(!isActionsDropdownOpen);
    setIsWarehouseDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsFilterDropdownOpen(false);
  };

  const handleWarehouseSelect = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsWarehouseDropdownOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsFilterDropdownOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Stock levels</h1>
          <p className="text-gray-600 text-sm">Current warehouse stock levels</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg p-4 mb-6 relative">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Warehouse Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50 min-w-[180px]"
              onClick={handleWarehouseClick}
            >
              <Building className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Warehouse: {selectedWarehouse}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${isWarehouseDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Category Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50 min-w-[180px]"
              onClick={handleCategoryClick}
            >
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Category: {selectedCategory}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Filter Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50 min-w-[180px]"
              onClick={handleFilterClick}
            >
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Filter: {selectedFilter}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
              onClick={handleApply}
            >
              Apply
            </button>

            {/* Actions Button */}
            <div className="ml-auto">
              <button 
                className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
                onClick={handleActionsClick}
              >
                <span className="text-sm font-medium">Actions</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isActionsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Settings Button */}
            <div>
              <button className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Warehouse Selection Dropdown */}
          {isWarehouseDropdownOpen && (
            <div className="absolute top-full left-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{width: '300px'}}>
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
                      checked={selectedLocations.myLocation}
                      onChange={() => toggleLocation('myLocation')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <label htmlFor="myLocation" className="text-sm font-medium">My location</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="productsWarehouse"
                      checked={selectedLocations.productsWarehouse}
                      onChange={() => toggleLocation('productsWarehouse')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="productsWarehouse" className="text-sm font-medium">Products warehouse</label>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleSelectAllLocations}
                  >
                    Select all
                  </button>
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleClearLocations}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Category Selection Dropdown */}
          {isCategoryDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '220px', width: '300px'}}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 border border-gray-200 rounded px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 outline-none text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">All products</span>
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-600">Materials</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button className="text-blue-600 text-sm hover:underline">
                    Expand
                  </button>
                  <button className="text-blue-600 text-sm hover:underline">
                    Collapse all
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filter Selection Dropdown */}
          {isFilterDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '440px', width: '250px'}}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 border border-gray-200 rounded px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 outline-none text-sm"
                  />
                </div>

                <div className="space-y-2">
                  {filterOptions.map((option, index) => (
                    <div key={index} className="text-sm text-gray-700 py-1 hover:bg-gray-50 px-2 rounded cursor-pointer">
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions Dropdown */}
          {isActionsDropdownOpen && (
            <div className="absolute top-full right-16 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
              <div className="py-2">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50">
                  Export to Excel
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50">
                  Export to PDF
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50">
                  Print Report
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Table - Shows when Apply is clicked */}
        {showTable && (
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        Code
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">SKU</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        Name
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200">
                      <div className="flex items-center gap-2 justify-center">
                        In stock
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2 justify-center">
                        Cost, ₹
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {stockData.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{item.code}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{item.sku}</td>
                      <td className="px-6 py-4 text-sm text-blue-600 hover:underline cursor-pointer border-r border-gray-200">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-center border-r border-gray-200">{item.inStock}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-center">{item.cost}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="4" className="px-6 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                      Total — 3
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900 text-center">
                      Total: 0 ₹
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Default state when no table is shown */}
        {!showTable && !isWarehouseDropdownOpen && !isCategoryDropdownOpen && !isFilterDropdownOpen && !isActionsDropdownOpen && (
          <div className="bg-white rounded-lg p-16 text-center">
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

export default StockLevelsReport;