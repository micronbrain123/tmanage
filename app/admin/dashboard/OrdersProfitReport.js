import React, { useState } from 'react';
import { ChevronDown, Search, Calendar, Settings } from 'lucide-react';

const OrdersProfitReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchLocationTerm, setSearchLocationTerm] = useState('');
  const [searchTypeTerm, setSearchTypeTerm] = useState('');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState({
    myLocation: true
  });
  const [selectedTypes, setSelectedTypes] = useState({
    repair: true,
    tailorMade: true
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

  const ordersData = []; // Empty for "No data found" state

  const toggleLocation = (locationType) => {
    setSelectedLocations(prev => ({
      ...prev,
      [locationType]: !prev[locationType]
    }));
  };

  const toggleType = (orderType) => {
    setSelectedTypes(prev => ({
      ...prev,
      [orderType]: !prev[orderType]
    }));
  };

  const handleSelectAllLocations = () => {
    setSelectedLocations({
      myLocation: true
    });
  };

  const handleClearLocations = () => {
    setSelectedLocations({
      myLocation: false
    });
  };

  const handleSelectAllTypes = () => {
    setSelectedTypes({
      repair: true,
      tailorMade: true
    });
  };

  const handleClearTypes = () => {
    setSelectedTypes({
      repair: false,
      tailorMade: false
    });
  };

  const handleApply = () => {
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(true);
  };

  const handlePeriodClick = () => {
    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
    setIsLocationDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleLocationClick = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleTypeClick = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
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
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Orders profit</h1>
          <p className="text-gray-600 text-sm">Profit is calculated using the following formula: (amount) – (cost) – (employee commissions) – (taxes). The amount includes discounts.</p>
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

            {/* Location Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleLocationClick}
            >
              <div className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                <div className="w-2 h-2 rounded bg-gray-400"></div>
              </div>
              <span className="text-sm font-medium">Location: {selectedLocation}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Type Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleTypeClick}
            >
              <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
              <span className="text-sm font-medium">Type: {selectedType}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
              onClick={handleApply}
            >
              Apply
            </button>

            {/* <div className="ml-auto flex items-center gap-2">
              <span className="text-sm font-medium">Actions</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
              <Settings className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div> */}
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

          {/* Location Selection Dropdown */}
          {isLocationDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-64" style={{left: '200px'}}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 border border-gray-200 rounded px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchLocationTerm}
                    onChange={(e) => setSearchLocationTerm(e.target.value)}
                    className="flex-1 outline-none text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="myLocationOrder"
                      checked={selectedLocations.myLocation}
                      onChange={() => toggleLocation('myLocation')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <label htmlFor="myLocationOrder" className="text-sm font-medium">My location</label>
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

          {/* Type Selection Dropdown */}
          {isTypeDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-64" style={{left: '400px'}}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 border border-gray-200 rounded px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTypeTerm}
                    onChange={(e) => setSearchTypeTerm(e.target.value)}
                    className="flex-1 outline-none text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="repair"
                      checked={selectedTypes.repair}
                      onChange={() => toggleType('repair')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="repair" className="text-sm font-medium">Repair</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="tailorMade"
                      checked={selectedTypes.tailorMade}
                      onChange={() => toggleType('tailorMade')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="tailorMade" className="text-sm font-medium">Tailor-made</label>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleSelectAllTypes}
                  >
                    Select all
                  </button>
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleClearTypes}
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
                        Document #
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Asset
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                      <div className="flex items-center justify-center gap-2">
                        <span>Price, ₹</span>
                        <div className="flex flex-col">
                          <div className="text-xs text-gray-500">Labors and services</div>
                          <div className="text-xs text-gray-500">Products</div>
                        </div>
                        <div className="text-xs text-gray-500">Amount</div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                      <div className="flex items-center justify-center gap-2">
                        <span>Cost, ₹</span>
                        <div className="flex flex-col">
                          <div className="text-xs text-gray-500">Labors and services</div>
                          <div className="text-xs text-gray-500">Products</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                      <div className="flex items-center justify-center gap-2">
                        <span>Wage, ₹</span>
                        <div className="flex flex-col">
                          <div className="text-xs text-gray-500">Total</div>
                          <div className="text-xs text-gray-500">Managers</div>
                          <div className="text-xs text-gray-500">Technicians</div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {ordersData.length > 0 ? (
                    ordersData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.documentNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.asset}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-center">{item.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-center">{item.cost}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-center">{item.wage}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center">
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
        {!showTable && !isPeriodDropdownOpen && !isLocationDropdownOpen && !isTypeDropdownOpen && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            <p>Select period, location and type filters, then click Apply to view the orders profit report</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersProfitReport;