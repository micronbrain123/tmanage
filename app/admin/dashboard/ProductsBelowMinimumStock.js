import React, { useState } from 'react';
import { ChevronDown, Search, Building, Package } from 'lucide-react';

const ProductsBelowMinimumStock = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All products');
  const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocations, setSelectedLocations] = useState({
    myLocation: true,
    productsWarehouse: true
  });

  const categoryOptions = [
    'All products',
    'Materials',
    'Electronics',
    'Clothing',
    'Food & Beverages',
    'Home & Garden'
  ];

  // Demo products below minimum stock data
  const productsData = [
    {
      id: 1,
      sku: 'SKU-001',
      name: 'Wireless Headphones',
      warehouse: 'My location',
      currentStockLevel: 5,
      purchaseNeeded: 15,
      lastPrice: 2500.00
    },
    {
      id: 2,
      sku: 'SKU-002',
      name: 'USB Cable Type-C',
      warehouse: 'Products warehouse',
      currentStockLevel: 3,
      purchaseNeeded: 47,
      lastPrice: 450.00
    },
    {
      id: 3,
      sku: 'SKU-003',
      name: 'Bluetooth Speaker',
      warehouse: 'My location',
      currentStockLevel: 2,
      purchaseNeeded: 23,
      lastPrice: 3200.00
    },
    {
      id: 4,
      sku: 'SKU-004',
      name: 'Phone Case',
      warehouse: 'Products warehouse',
      currentStockLevel: 8,
      purchaseNeeded: 12,
      lastPrice: 750.00
    },
    {
      id: 5,
      sku: 'SKU-005',
      name: 'Screen Protector',
      warehouse: 'My location',
      currentStockLevel: 1,
      purchaseNeeded: 29,
      lastPrice: 300.00
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

  const handleWarehouseClick = () => {
    setIsWarehouseDropdownOpen(!isWarehouseDropdownOpen);
    setIsCategoryDropdownOpen(false);
    setShowTable(false);
  };

  const handleCategoryClick = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    setIsWarehouseDropdownOpen(false);
    setShowTable(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const handleApply = () => {
    setIsWarehouseDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setShowTable(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Products below minimum stock</h2>
          <p className="text-gray-600 text-sm">Products you need to purchase. The count is based on the min and max stock levels set for every warehouse in the product profile.</p>
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
            
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
              onClick={handleApply}
            >
              Apply
            </button>

            {/* Actions Button */}
            <div className="ml-auto">
              <button className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50">
                <span className="text-sm font-medium">Actions</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Warehouse Selection Dropdown */}
          {isWarehouseDropdownOpen && (
            <div className="absolute top-full left-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-80">
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
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '220px', width: '250px'}}>
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
                  <div className="flex items-center gap-2 mb-2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">All products</span>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Materials</span>
                    </div>
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
                        SKU
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        Name
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        Warehouse
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        Current stock level
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        Purchase needed
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                      <div className="flex items-center justify-end gap-2">
                        The last price, ₹
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {productsData.map((product, index) => (
                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{product.sku}</td>
                      <td className="px-6 py-4 text-sm text-blue-600 hover:underline cursor-pointer border-r border-gray-200">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{product.warehouse}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{product.currentStockLevel}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{product.purchaseNeeded}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{product.lastPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Default "No data found" state when table is not shown */}
        {!showTable && !isWarehouseDropdownOpen && !isCategoryDropdownOpen && (
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
    </div>
  );
};

export default ProductsBelowMinimumStock;