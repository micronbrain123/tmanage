import React, { useState } from 'react';
import { ChevronDown, Search, Calendar, Building } from 'lucide-react';

const InventoryWriteOffs = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [selectedWarehouse, setSelectedWarehouse] = useState('All');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocations, setSelectedLocations] = useState({
    myLocation: true,
    productsWarehouse: true
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

  // Demo write-off data
  const writeOffData = [
    {
      id: 1,
      dateTime: '2025-07-20 14:30',
      writeOffNumber: 'WO-001',
      warehouse: 'My location',
      comment: 'Damaged during transport',
      cost: 1250.00
    },
    {
      id: 2,
      dateTime: '2025-07-18 09:15',
      writeOffNumber: 'WO-002',
      warehouse: 'Products warehouse',
      comment: 'Expired inventory',
      cost: 850.50
    },
    {
      id: 3,
      dateTime: '2025-07-15 16:45',
      writeOffNumber: 'WO-003',
      warehouse: 'My location',
      comment: 'Quality control rejection',
      cost: 2100.75
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

  const handlePeriodClick = () => {
    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
    setIsWarehouseDropdownOpen(false);
    setShowTable(false);
  };

  const handleWarehouseClick = () => {
    setIsWarehouseDropdownOpen(!isWarehouseDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setShowTable(false);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setIsPeriodDropdownOpen(false);
  };

  const handleApply = () => {
    setIsPeriodDropdownOpen(false);
    setIsWarehouseDropdownOpen(false);
    setShowTable(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Inventory write-offs</h2>
          <p className="text-gray-600 text-sm">Write-offs and outgoing inventory for the selected period</p>
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
              <Building className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Warehouse: {selectedWarehouse}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${isWarehouseDropdownOpen ? 'rotate-180' : ''}`} />
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

          {/* Period Selection Dropdown */}
          {isPeriodDropdownOpen && (
            <div className="absolute top-full left-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
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
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '220px', width: '300px'}}>
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
        </div>

        {/* Results Table - Shows when Apply is clicked */}
        {showTable && (
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      Date and time
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      Write-off #
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      Warehouse
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      Comment
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                      Cost, ₹
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {writeOffData.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{item.dateTime}</td>
                      <td className="px-6 py-4 text-sm text-blue-600 hover:underline cursor-pointer border-r border-gray-200">{item.writeOffNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{item.warehouse}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{item.comment}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.cost.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Default "No data found" state when table is not shown */}
        {!showTable && !isPeriodDropdownOpen && !isWarehouseDropdownOpen && (
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

export default InventoryWriteOffs;