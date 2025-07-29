import React, { useState } from 'react';
import { ChevronDown, Search, Calendar, MapPin, Filter, Settings, MoreHorizontal } from 'lucide-react';

const ClosedOrdersReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('New');
  const [excludeZeroAmounts, setExcludeZeroAmounts] = useState(false);
  
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [typeSearchTerm, setTypeSearchTerm] = useState('');
  const [statusSearchTerm, setStatusSearchTerm] = useState('');

  const [selectedLocations, setSelectedLocations] = useState({
    myLocation: true
  });

  const [selectedTypes, setSelectedTypes] = useState({
    repair: true,
    tailorMade: true
  });

  const [selectedStatuses, setSelectedStatuses] = useState({
    new: true,
    inProgress: false,
    accepted: false,
    pending: false,
    rejected: false,
    done: false,
    waitingForCollection: false,
    closed: false,
    archived: false
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

  const statusOptions = [
    { key: 'new', label: 'New', color: 'bg-blue-500', textColor: 'text-blue-700' },
    { key: 'inProgress', label: 'In progress', color: 'bg-green-500', textColor: 'text-green-700' },
    { key: 'accepted', label: 'Accepted', color: 'bg-green-600', textColor: 'text-green-700' },
    { key: 'pending', label: 'Pending', color: 'bg-orange-500', textColor: 'text-orange-700' },
    { key: 'rejected', label: 'Rejected', color: 'bg-orange-600', textColor: 'text-orange-700' },
    { key: 'done', label: 'Done', color: 'bg-gray-600', textColor: 'text-gray-700' },
    { key: 'waitingForCollection', label: 'Waiting for collection', color: 'bg-gray-700', textColor: 'text-gray-700' },
    { key: 'closed', label: 'Closed', color: 'bg-gray-500', textColor: 'text-gray-700' },
    { key: 'archived', label: 'Archived', color: 'bg-gray-400', textColor: 'text-gray-700' }
  ];

  const closedOrdersData = []; // Empty for "No data found" state

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

  const toggleStatus = (statusKey) => {
    setSelectedStatuses(prev => ({
      ...prev,
      [statusKey]: !prev[statusKey]
    }));
  };

  const handleSelectAllLocations = () => {
    setSelectedLocations({ myLocation: true });
  };

  const handleClearLocations = () => {
    setSelectedLocations({ myLocation: false });
  };

  const handleSelectAllTypes = () => {
    setSelectedTypes({ repair: true, tailorMade: true });
  };

  const handleClearTypes = () => {
    setSelectedTypes({ repair: false, tailorMade: false });
  };

  const handleExpandStatuses = () => {
    setSelectedStatuses({
      new: true,
      inProgress: true,
      accepted: true,
      pending: true,
      rejected: true,
      done: true,
      waitingForCollection: true,
      closed: true,
      archived: true
    });
  };

  const handleCollapseStatuses = () => {
    setSelectedStatuses({
      new: false,
      inProgress: false,
      accepted: false,
      pending: false,
      rejected: false,
      done: false,
      waitingForCollection: false,
      closed: false,
      archived: false
    });
  };

  const handleApply = () => {
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setIsStatusDropdownOpen(false);
    setShowTable(true);
  };

  const closeAllDropdowns = () => {
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setIsStatusDropdownOpen(false);
  };

  const handlePeriodClick = () => {
    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
    setIsLocationDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setIsStatusDropdownOpen(false);
    setShowTable(false);
  };

  const handleLocationClick = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setIsStatusDropdownOpen(false);
    setShowTable(false);
  };

  const handleTypeClick = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsStatusDropdownOpen(false);
    setShowTable(false);
  };

  const handleStatusClick = () => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsTypeDropdownOpen(false);
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Closed orders</h2>
          <p className="text-gray-600 text-sm">Orders closed in the selected period</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg p-4 mb-6 relative">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="excludeZero"
              checked={excludeZeroAmounts}
              onChange={(e) => setExcludeZeroAmounts(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <label htmlFor="excludeZero" className="text-sm text-gray-700">Exclude zero amounts</label>
          </div>

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

            {/* Type Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleTypeClick}
            >
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Type: {selectedType}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Status Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50"
              onClick={handleStatusClick}
            >
              <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              </div>
              <span className="text-sm font-medium">Time in status: {selectedStatus}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
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

          {/* Type Selection Dropdown */}
          {isTypeDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '450px', width: '300px'}}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 border border-gray-200 rounded px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={typeSearchTerm}
                    onChange={(e) => setTypeSearchTerm(e.target.value)}
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

          {/* Status Selection Dropdown */}
          {isStatusDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '700px', width: '350px'}}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 border border-gray-200 rounded px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={statusSearchTerm}
                    onChange={(e) => setStatusSearchTerm(e.target.value)}
                    className="flex-1 outline-none text-sm"
                  />
                </div>

                <div className="space-y-4">
                  {/* New Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">New</span>
                    </div>
                    <div className="ml-6">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">New</span>
                      </div>
                    </div>
                  </div>

                  {/* In Progress Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">In progress</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">In progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded">Accepted</span>
                      </div>
                    </div>
                  </div>

                  {/* Pending Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Pending</span>
                    </div>
                    <div className="ml-6">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Rejected</span>
                      </div>
                    </div>
                  </div>

                  {/* Done Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Done</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Done</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">Waiting for collection</span>
                      </div>
                    </div>
                  </div>

                  {/* Closed Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Closed</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Closed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">Archived</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleExpandStatuses}
                  >
                    Expand
                  </button>
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleCollapseStatuses}
                  >
                    Collapse all
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
                        Employee
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
                        Time in status, ...
                        <div className="flex flex-col">
                          <ChevronDown className="w-3 h-3 text-gray-400 -mb-1" style={{transform: 'rotate(180deg)'}} />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {closedOrdersData.length > 0 ? (
                    closedOrdersData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.dateTime}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.orderNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.employee}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.client}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.clientPhone}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.asset}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.timeInStatus}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Search className="w-12 h-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No data found</h3>
                          <p className="text-gray-500 max-w-md text-center">
                            There are no closed orders matching your criteria. Try adjusting your filters.
                          </p>
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
    </div>
  );
};

export default ClosedOrdersReport;