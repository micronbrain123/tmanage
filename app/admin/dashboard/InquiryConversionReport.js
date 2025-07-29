import React, { useState } from 'react';
import { ChevronDown, Search, Calendar, MapPin, Settings, MoreHorizontal } from 'lucide-react';

const InquiryConversionReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState({
    withoutLocation: true,
    myLocation: true
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

  // Demo data for the conversion table
  const conversionData = [
    {
      id: 1,
      inquiryType: 'Lead',
      quantity: 45,
      conversion: 12,
      general: 26.7,
      orders: 8,
      sales: 18560
    },
    {
      id: 2,
      inquiryType: 'Missed call',
      quantity: 23,
      conversion: 5,
      general: 21.7,
      orders: 3,
      sales: 8920
    },
    {
      id: 3,
      inquiryType: 'Website inquiry',
      quantity: 18,
      conversion: 7,
      general: 38.9,
      orders: 5,
      sales: 12340
    },
    {
      id: 4,
      inquiryType: 'Phone call',
      quantity: 31,
      conversion: 14,
      general: 45.2,
      orders: 11,
      sales: 22450
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

  const handleApply = () => {
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsActionsDropdownOpen(false);
    setShowTable(true);
  };

  const handlePeriodClick = () => {
    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
    setIsLocationDropdownOpen(false);
    setIsActionsDropdownOpen(false);
    setShowTable(false);
  };

  const handleLocationClick = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsActionsDropdownOpen(false);
    setShowTable(false);
  };

  const handleActionsClick = () => {
    setIsActionsDropdownOpen(!isActionsDropdownOpen);
    setIsPeriodDropdownOpen(false);
    setIsLocationDropdownOpen(false);
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
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Inquiry conversion</h1>
          <p className="text-gray-600 text-sm">Conversion from inquiries to orders and sales</p>
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
              className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-50 min-w-[180px]"
              onClick={handleLocationClick}
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Location: {selectedLocation}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
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

          {/* Actions Dropdown */}
          {isActionsDropdownOpen && (
            <div className="absolute top-full right-6 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
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
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Inquiry type</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200" colSpan="2">Inquiries</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700" colSpan="3">Conversion</th>
                  </tr>
                  <tr className="bg-gray-50 border-t border-gray-200">
                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border-r border-gray-200"></th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600 border-r border-gray-200">Quantity</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600 border-r border-gray-200">Conversion</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600 border-r border-gray-200">General</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600 border-r border-gray-200">Orders</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">Sales</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {conversionData.length > 0 ? (
                    conversionData.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">{item.inquiryType}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center border-r border-gray-200">{item.quantity}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center border-r border-gray-200">{item.conversion}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center border-r border-gray-200">{item.general}%</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center border-r border-gray-200">{item.orders}</td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">${item.sales.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-16 text-center">
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
        {!showTable && !isPeriodDropdownOpen && !isLocationDropdownOpen && !isActionsDropdownOpen && (
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

export default InquiryConversionReport;