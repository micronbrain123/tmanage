import React, { useState } from 'react';
import { ChevronDown, Search, Settings, MoreHorizontal } from 'lucide-react';

const OrdersInProgress = () => {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDocumentType, setSelectedDocumentType] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isDocumentTypeDropdownOpen, setIsDocumentTypeDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState({
    myLocation: true
  });
  const [selectedTypes, setSelectedTypes] = useState({
    repair: true,
    tailorMade: true
  });

  const documentTypeOptions = [
    'All',
    'Orders',
    'Estimates'
  ];

  const typeOptions = [
    'Repair',
    'Tailor-made'
  ];

  const ordersData = []; // Empty for "No data found" state

  const toggleLocation = (locationType) => {
    setSelectedLocations(prev => ({
      ...prev,
      [locationType]: !prev[locationType]
    }));
  };

  const toggleType = (type) => {
    setSelectedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSelectAllLocation = () => {
    setSelectedLocations({
      myLocation: true
    });
  };

  const handleClearLocation = () => {
    setSelectedLocations({
      myLocation: false
    });
  };

  const handleSelectAllType = () => {
    setSelectedTypes({
      repair: true,
      tailorMade: true
    });
  };

  const handleClearType = () => {
    setSelectedTypes({
      repair: false,
      tailorMade: false
    });
  };

  const handleApply = () => {
    setIsLocationDropdownOpen(false);
    setIsDocumentTypeDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(true);
  };

  const handleLocationClick = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
    setIsDocumentTypeDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleDocumentTypeClick = () => {
    setIsDocumentTypeDropdownOpen(!isDocumentTypeDropdownOpen);
    setIsLocationDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleTypeClick = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
    setIsLocationDropdownOpen(false);
    setIsDocumentTypeDropdownOpen(false);
    setShowTable(false);
  };

  const handleDocumentTypeSelect = (docType) => {
    setSelectedDocumentType(docType);
    setIsDocumentTypeDropdownOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Orders in progress</h1>
          <p className="text-gray-600 text-sm">These orders are in progress</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg p-4 mb-6 relative">
          <div className="flex items-center gap-4">
            {/* Location Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleLocationClick}
            >
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <span className="text-sm font-medium">Location: {selectedLocation}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Document Type Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleDocumentTypeClick}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-3 h-3 border border-gray-400 rounded"></div>
              </div>
              <span className="text-sm font-medium">Document type: {selectedDocumentType}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDocumentTypeDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Type Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleTypeClick}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-3 h-3 border border-gray-400 rounded"></div>
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
          </div>

          {/* Location Selection Dropdown */}
          {isLocationDropdownOpen && (
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
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleSelectAllLocation}
                  >
                    Select all
                  </button>
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleClearLocation}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Document Type Selection Dropdown */}
          {isDocumentTypeDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '320px', minWidth: '150px'}}>
              <div className="py-2">
                {documentTypeOptions.map((docType, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50"
                    onClick={() => handleDocumentTypeSelect(docType)}
                  >
                    {docType}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Type Selection Dropdown */}
          {isTypeDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '540px', width: '300px'}}>
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
                    onClick={handleSelectAllType}
                  >
                    Select all
                  </button>
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleClearType}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Table - Only show when showTable is true */}
        {showTable && (
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Created
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Order #
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Type
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Client
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Client phone
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
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        Status
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                      <div className="flex items-center justify-end gap-2">
                        Created at
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {ordersData.length > 0 ? (
                    ordersData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.created}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.orderNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.client}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.clientPhone}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.asset}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.status}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.createdAt}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-16 text-center">
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

export default OrdersInProgress;