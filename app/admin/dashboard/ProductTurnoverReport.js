import React, { useState } from 'react';
import { ChevronDown, Search, Calendar, Package, MapPin, Tag } from 'lucide-react';

const ProductTurnoverReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [selectedWarehouse, setSelectedWarehouse] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All products');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [displayWithoutTurnover, setDisplayWithoutTurnover] = useState(false);
  const [selectedWarehouses, setSelectedWarehouses] = useState({
    myLocation: true,
    productsWarehouse: true
  });
  const [selectedTypes, setSelectedTypes] = useState({
    order: true,
    sale: true,
    clientRefund: true,
    posting: true,
    writeOff: true,
    transfer: true,
    purchaseReturns: true
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

  const typeOptions = [
    { key: 'order', label: 'Order' },
    { key: 'sale', label: 'Sale' },
    { key: 'clientRefund', label: 'Client refund' },
    { key: 'posting', label: 'Posting' },
    { key: 'writeOff', label: 'Write-off' },
    { key: 'transfer', label: 'Transfer' },
    { key: 'purchaseReturns', label: 'Purchase returns' }
  ];

  const productData = []; // Empty for "No data found" state

  const toggleWarehouse = (warehouseType) => {
    setSelectedWarehouses(prev => ({
      ...prev,
      [warehouseType]: !prev[warehouseType]
    }));
  };

  const toggleType = (typeKey) => {
    setSelectedTypes(prev => ({
      ...prev,
      [typeKey]: !prev[typeKey]
    }));
  };

  const handleWarehouseSelectAll = () => {
    setSelectedWarehouses({
      myLocation: true,
      productsWarehouse: true
    });
  };

  const handleWarehouseClear = () => {
    setSelectedWarehouses({
      myLocation: false,
      productsWarehouse: false
    });
  };

  const handleTypeSelectAll = () => {
    const allSelected = {};
    typeOptions.forEach(type => {
      allSelected[type.key] = true;
    });
    setSelectedTypes(allSelected);
  };

  const handleTypeClear = () => {
    const allUnselected = {};
    typeOptions.forEach(type => {
      allUnselected[type.key] = false;
    });
    setSelectedTypes(allUnselected);
  };

  const handleApply = () => {
    setIsPeriodDropdownOpen(false);
    setIsWarehouseDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(true);
  };

  const handlePeriodClick = () => {
    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
    setIsWarehouseDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleWarehouseClick = () => {
    setIsWarehouseDropdownOpen(!isWarehouseDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleCategoryClick = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsWarehouseDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleTypeClick = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsWarehouseDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
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
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Product turnover</h1>
          <p className="text-gray-600 text-sm">Product movement and stock levels by warehouses</p>
        </div>

        {/* Display products without turnover checkbox */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={displayWithoutTurnover}
              onChange={(e) => setDisplayWithoutTurnover(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            Display products without turnover
          </label>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg p-4 mb-6 relative">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Period Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50 min-w-[180px]"
              onClick={handlePeriodClick}
            >
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Period: {selectedPeriod}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${isPeriodDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Warehouse Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50 min-w-[180px]"
              onClick={handleWarehouseClick}
            >
              <MapPin className="w-4 h-4 text-gray-400" />
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

            {/* Type Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50 min-w-[140px]"
              onClick={handleTypeClick}
            >
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Type: {selectedType}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
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

          {/* Warehouse Selection Dropdown */}
          {isWarehouseDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '200px', width: '300px'}}>
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
                    <div className="flex items-center">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                      <ChevronDown className="w-4 h-4 text-gray-400 -ml-2" style={{transform: 'rotate(-90deg)'}} />
                    </div>
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium">My location</span>
                  </div>
                  <div className="ml-8 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="productsWarehouse"
                      checked={selectedWarehouses.productsWarehouse}
                      onChange={() => toggleWarehouse('productsWarehouse')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="productsWarehouse" className="text-sm">Products warehouse</label>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleWarehouseSelectAll}
                  >
                    Select all
                  </button>
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleWarehouseClear}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Category Selection Dropdown */}
          {isCategoryDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '400px', width: '300px'}}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 border border-gray-200 rounded px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={categorySearchTerm}
                    onChange={(e) => setCategorySearchTerm(e.target.value)}
                    className="flex-1 outline-none text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-gray-400" style={{transform: 'rotate(-90deg)'}} />
                    <span className="text-sm font-medium">All products</span>
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

          {/* Type Selection Dropdown */}
          {isTypeDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '600px', width: '200px'}}>
              <div className="p-4">
                <div className="space-y-3">
                  {typeOptions.map((type) => (
                    <div key={type.key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={type.key}
                        checked={selectedTypes[type.key]}
                        onChange={() => toggleType(type.key)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor={type.key} className="text-sm">{type.label}</label>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleTypeSelectAll}
                  >
                    Select all
                  </button>
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleTypeClear}
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
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Name
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700" colSpan="2">
                      Beginning of period
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700" colSpan="2">
                      Inbound
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700" colSpan="2">
                      Outbound
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700" colSpan="2">
                      End of period
                    </th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-2"></th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                      <div className="flex items-center justify-center gap-1">
                        Qty
                        <div className="flex flex-col">
                          <ChevronDown className="w-2 h-2 text-gray-400 -mb-0.5" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-2 h-2 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                      <div className="flex items-center justify-center gap-1">
                        Amount, ₹
                        <div className="flex flex-col">
                          <ChevronDown className="w-2 h-2 text-gray-400 -mb-0.5" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-2 h-2 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                      <div className="flex items-center justify-center gap-1">
                        Qty
                        <div className="flex flex-col">
                          <ChevronDown className="w-2 h-2 text-gray-400 -mb-0.5" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-2 h-2 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                      <div className="flex items-center justify-center gap-1">
                        Amount, ₹
                        <div className="flex flex-col">
                          <ChevronDown className="w-2 h-2 text-gray-400 -mb-0.5" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-2 h-2 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                      <div className="flex items-center justify-center gap-1">
                        Qty
                        <div className="flex flex-col">
                          <ChevronDown className="w-2 h-2 text-gray-400 -mb-0.5" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-2 h-2 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                      <div className="flex items-center justify-center gap-1">
                        Amount, ₹
                        <div className="flex flex-col">
                          <ChevronDown className="w-2 h-2 text-gray-400 -mb-0.5" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-2 h-2 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                      <div className="flex items-center justify-center gap-1">
                        Qty
                        <div className="flex flex-col">
                          <ChevronDown className="w-2 h-2 text-gray-400 -mb-0.5" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-2 h-2 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                      <div className="flex items-center justify-center gap-1">
                        Amount, ₹
                        <div className="flex flex-col">
                          <ChevronDown className="w-2 h-2 text-gray-400 -mb-0.5" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-2 h-2 text-gray-400" />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {productData.length > 0 ? (
                    productData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">{item.beginQty}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">{item.beginAmount}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">{item.inboundQty}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">{item.inboundAmount}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">{item.outboundQty}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">{item.outboundAmount}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">{item.endQty}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">{item.endAmount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-6 py-16 text-center">
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
        {!showTable && !isPeriodDropdownOpen && !isWarehouseDropdownOpen && !isCategoryDropdownOpen && !isTypeDropdownOpen && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            <p>Configure your filters above and click Apply to view the product turnover report</p>
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

export default ProductTurnoverReport;