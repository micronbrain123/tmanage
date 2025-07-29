import React, { useState } from 'react';
import { ChevronDown, Search, Calendar, MapPin, Filter, Settings, MoreHorizontal } from 'lucide-react';

const LostInquiriesReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedInquiryType, setSelectedInquiryType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isInquiryTypeDropdownOpen, setIsInquiryTypeDropdownOpen] = useState(false);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState({
    withoutLocation: true,
    myLocation: true
  });
  const [selectedInquiryTypes, setSelectedInquiryTypes] = useState({
    lead: true,
    missedCall: true
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

  // Demo data for the lost inquiries table
  const lostInquiriesData = [
    {
      id: 1,
      dateTime: '23/07/2025 14:30',
      inquiryNumber: 'INQ-001234',
      inquiryType: 'Lead',
      status: 'Lost',
      created: '23/07/2025',
      manager: 'John Smith',
      comment: 'Customer not interested'
    },
    {
      id: 2,
      dateTime: '23/07/2025 12:15',
      inquiryNumber: 'INQ-001235',
      inquiryType: 'Missed call',
      status: 'Lost',
      created: '23/07/2025',
      manager: 'Sarah Johnson',
      comment: 'No callback received'
    },
    {
      id: 3,
      dateTime: '22/07/2025 16:45',
      inquiryNumber: 'INQ-001236',
      inquiryType: 'Lead',
      status: 'Lost',
      created: '22/07/2025',
      manager: 'Mike Wilson',
      comment: 'Price too high'
    },
    {
      id: 4,
      dateTime: '22/07/2025 10:20',
      inquiryNumber: 'INQ-001237',
      inquiryType: 'Missed call',
      status: 'Lost',
      created: '22/07/2025',
      manager: 'Emily Davis',
      comment: 'Customer unreachable'
    }
  ];

  const toggleLocation = (locationType) => {
    setSelectedLocations(prev => ({
      ...prev,
      [locationType]: !prev[locationType]
    }));
  };

  const toggleInquiryType = (inquiryType) => {
    setSelectedInquiryTypes(prev => ({
      ...prev,
      [inquiryType]: !prev[inquiryType]
    }));
  };

  const handleSelectAllLocations = () => {
    setSelectedLocations({
      withoutLocation: true,
      myLocation: true
    });
  };

  const handleClearLocations = () => {
    setSelectedLocations({
      withoutLocation: false,
      myLocation: false
    });
  };

  const handleSelectAllInquiryTypes = () => {
    setSelectedInquiryTypes({
      lead: true,
      missedCall: true
    });
  };

  const handleClearInquiryTypes = () => {
    setSelectedInquiryTypes({
      lead: false,
      missedCall: false
    });
  };

  const handleApply = () => {
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsInquiryTypeDropdownOpen(false);
    setIsActionsDropdownOpen(false);
    setShowTable(true);
  };

  const handlePeriodClick = () => {
    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
    setIsLocationDropdownOpen(false);
    setIsInquiryTypeDropdownOpen(false);
    setIsActionsDropdownOpen(false);
  };

  const handleLocationClick = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsInquiryTypeDropdownOpen(false);
    setIsActionsDropdownOpen(false);
  };

  const handleInquiryTypeClick = () => {
    setIsInquiryTypeDropdownOpen(!isInquiryTypeDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsActionsDropdownOpen(false);
  };

  const handleActionsClick = () => {
    setIsActionsDropdownOpen(!isActionsDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsInquiryTypeDropdownOpen(false);
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
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Lost inquiries</h1>
          <p className="text-gray-600 text-sm">List of inquiries in statuses from the Lost group</p>
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

            {/* Location Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-blue-300 bg-blue-50 rounded px-3 py-2 hover:bg-blue-100 min-w-[180px]"
              onClick={handleLocationClick}
            >
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">Location: {selectedLocation}</span>
              <ChevronDown className={`w-4 h-4 text-blue-500 transition-transform ml-auto ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Inquiry Type Dropdown */}
            <div 
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50 min-w-[180px]"
              onClick={handleInquiryTypeClick}
            >
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Inquiry type: {selectedInquiryType}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${isInquiryTypeDropdownOpen ? 'rotate-180' : ''}`} />
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
                      id="withoutLocation"
                      checked={selectedLocations.withoutLocation}
                      onChange={() => toggleLocation('withoutLocation')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="withoutLocation" className="text-sm font-medium">Without location</label>
                  </div>
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

          {/* Inquiry Type Selection Dropdown */}
          {isInquiryTypeDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10" style={{left: '440px', width: '200px'}}>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="lead"
                      checked={selectedInquiryTypes.lead}
                      onChange={() => toggleInquiryType('lead')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="lead" className="text-sm font-medium">Lead</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="missedCall"
                      checked={selectedInquiryTypes.missedCall}
                      onChange={() => toggleInquiryType('missedCall')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="missedCall" className="text-sm font-medium">Missed call</label>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleSelectAllInquiryTypes}
                  >
                    Select all
                  </button>
                  <button 
                    className="text-blue-600 text-sm hover:underline"
                    onClick={handleClearInquiryTypes}
                  >
                    Clear
                  </button>
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
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Date and time</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Inquiry #</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Inquiry type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Created</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Manager</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Comment</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {lostInquiriesData.length > 0 ? (
                    lostInquiriesData.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{item.dateTime}</td>
                        <td className="px-6 py-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer border-r border-gray-200">{item.inquiryNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{item.inquiryType}</td>
                        <td className="px-6 py-4 text-sm border-r border-gray-200">
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{item.created}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{item.manager}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.comment}</td>
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
        {!showTable && !isPeriodDropdownOpen && !isLocationDropdownOpen && !isInquiryTypeDropdownOpen && !isActionsDropdownOpen && (
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
          <span>21:50</span>
          <span>IN</span>
          <span>23-07-2025</span>
        </div>
      </div>
    </div>
  );
};

export default LostInquiriesReport;