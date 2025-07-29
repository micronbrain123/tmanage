import React, { useState } from 'react';
import { ChevronDown, Search, Calendar, MapPin, FileText } from 'lucide-react';

const TaxSummary = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedMovementType, setSelectedMovementType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isMovementTypeDropdownOpen, setIsMovementTypeDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState({
    myLocation: true
  });
  const [selectedMovementTypes, setSelectedMovementTypes] = useState({
    order: true,
    sale: true,
    posting: true,
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

  const movementTypeOptions = [
    { key: 'order', label: 'Order' },
    { key: 'sale', label: 'Sale' },
    { key: 'posting', label: 'Posting' },
    { key: 'purchaseReturns', label: 'Purchase returns' }
  ];

  const taxData = []; // Empty for "No data found" state

  const toggleLocation = (locationType) => {
    setSelectedLocations(prev => ({
      ...prev,
      [locationType]: !prev[locationType]
    }));
  };

  const toggleMovementType = (movementType) => {
    setSelectedMovementTypes(prev => ({
      ...prev,
      [movementType]: !prev[movementType]
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

  const handleSelectAllMovementTypes = () => {
    const allSelected = {};
    movementTypeOptions.forEach(option => {
      allSelected[option.key] = true;
    });
    setSelectedMovementTypes(allSelected);
  };

  const handleClearMovementTypes = () => {
    const allUnselected = {};
    movementTypeOptions.forEach(option => {
      allUnselected[option.key] = false;
    });
    setSelectedMovementTypes(allUnselected);
  };

  const handleApply = () => {
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsMovementTypeDropdownOpen(false);
    setShowTable(true);
  };

  const handlePeriodClick = () => {
    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
    setIsLocationDropdownOpen(false);
    setIsMovementTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleLocationClick = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsMovementTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleMovementTypeClick = () => {
    setIsMovementTypeDropdownOpen(!isMovementTypeDropdownOpen);
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
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Tax summary</h1>
          <p className="text-gray-600 text-sm">Tax amounts calculated for orders, sales, and inventory postings</p>
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
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Location: {selectedLocation}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Movement Type Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleMovementTypeClick}
            >
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Movement type: {selectedMovementType}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isMovementTypeDropdownOpen ? 'rotate-180' : ''}`} />
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

          {/* Location Selection Dropdown */}
          {isLocationDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '200px', width: '300px'}}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 border border-gray-200 rounded px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={locationSearchTerm}
                    onChange={(e) => setLocationSearchTerm(e.target.value)}
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

          {/* Movement Type Selection Dropdown */}
          {isMovementTypeDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '440px', width: '300px'}}>
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
                  {movementTypeOptions.map((option) => (
                    <div key={option.key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={option.key}
                        checked={selectedMovementTypes[option.key]}
                        onChange={() => toggleMovementType(option.key)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor={option.key} className="text-sm font-medium">{option.label}</label>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleSelectAllMovementTypes}
                  >
                    Select all
                  </button>
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleClearMovementTypes}
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
                        Date and time
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Document
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Location
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                      <div className="flex items-center justify-end gap-2">
                        Amount, ₹
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {taxData.length > 0 ? (
                    taxData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.dateTime}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.document}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <div className="w-12 h-12 border-4 border-gray-300 rounded-full flex items-center justify-center">
                              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No data found</h3>
                          <p className="text-sm text-gray-500 max-w-md">Try changing filters or start using program more actively to collect data</p>
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
        {!showTable && !isPeriodDropdownOpen && !isLocationDropdownOpen && !isMovementTypeDropdownOpen && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            <p>Select period, location and movement type filters, then click Apply to view the tax summary report</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxSummary;