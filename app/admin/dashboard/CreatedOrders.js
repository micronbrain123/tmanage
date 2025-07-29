import React, { useState } from 'react';
import { ChevronDown, Search, Calendar, MapPin, FileText, Settings, MoreHorizontal } from 'lucide-react';

const CreatedOrders = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDocumentType, setSelectedDocumentType] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isDocumentTypeDropdownOpen, setIsDocumentTypeDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState({
    myLocation: true
  });
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState({
    orders: true,
    estimates: true
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

  const documentTypeOptions = [
    { key: 'orders', label: 'Orders' },
    { key: 'estimates', label: 'Estimates' }
  ];

  const typeOptions = [
    { key: 'repair', label: 'Repair' },
    { key: 'tailorMade', label: 'Tailor-made' }
  ];

  const ordersData = []; // Empty for "No data found" state

  const toggleLocation = (locationType) => {
    setSelectedLocations(prev => ({
      ...prev,
      [locationType]: !prev[locationType]
    }));
  };

  const toggleDocumentType = (docType) => {
    setSelectedDocumentTypes(prev => ({
      ...prev,
      [docType]: !prev[docType]
    }));
  };

  const toggleType = (type) => {
    setSelectedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
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

  const handleSelectAllDocumentTypes = () => {
    const allSelected = {};
    documentTypeOptions.forEach(option => {
      allSelected[option.key] = true;
    });
    setSelectedDocumentTypes(allSelected);
  };

  const handleClearDocumentTypes = () => {
    const allUnselected = {};
    documentTypeOptions.forEach(option => {
      allUnselected[option.key] = false;
    });
    setSelectedDocumentTypes(allUnselected);
  };

  const handleSelectAllTypes = () => {
    const allSelected = {};
    typeOptions.forEach(option => {
      allSelected[option.key] = true;
    });
    setSelectedTypes(allSelected);
  };

  const handleClearTypes = () => {
    const allUnselected = {};
    typeOptions.forEach(option => {
      allUnselected[option.key] = false;
    });
    setSelectedTypes(allUnselected);
  };

  const handleApply = () => {
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsDocumentTypeDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(true);
  };

  const handlePeriodClick = () => {
    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
    setIsLocationDropdownOpen(false);
    setIsDocumentTypeDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleLocationClick = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsDocumentTypeDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleDocumentTypeClick = () => {
    setIsDocumentTypeDropdownOpen(!isDocumentTypeDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleTypeClick = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsDocumentTypeDropdownOpen(false);
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
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Created orders</h1>
          <p className="text-gray-600 text-sm">Orders created in the selected period</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg p-4 mb-6 relative">
          <div className="flex items-center gap-4 flex-wrap">
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

            {/* Document Type Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleDocumentTypeClick}
            >
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Document type: {selectedDocumentType}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDocumentTypeDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Type Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleTypeClick}
            >
              <span className="text-sm font-medium">Type: {selectedType}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
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

          {/* Document Type Selection Dropdown */}
          {isDocumentTypeDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '440px', width: '200px'}}>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-900 mb-2">All</div>
                  {documentTypeOptions.map((option) => (
                    <div key={option.key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={option.key}
                        checked={selectedDocumentTypes[option.key]}
                        onChange={() => toggleDocumentType(option.key)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor={option.key} className="text-sm">{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Type Selection Dropdown */}
          {isTypeDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '640px', width: '250px'}}>
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
                  {typeOptions.map((option) => (
                    <div key={option.key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={option.key}
                        checked={selectedTypes[option.key]}
                        onChange={() => toggleType(option.key)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor={option.key} className="text-sm font-medium">{option.label}</label>
                    </div>
                  ))}
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
                      Date and time
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Order #
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Client phone
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Asset
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {ordersData.length > 0 ? (
                    ordersData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.dateTime}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.orderNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.employee}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.client}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.clientPhone}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.asset}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center">
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
        {!showTable && !isPeriodDropdownOpen && !isLocationDropdownOpen && !isDocumentTypeDropdownOpen && !isTypeDropdownOpen && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            <p>Select period, location, document type and type filters, then click Apply to view the created orders report</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatedOrders;