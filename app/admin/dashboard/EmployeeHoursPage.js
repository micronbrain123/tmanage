import React, { useState } from 'react';
import { Plus, Download, Upload, Settings, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const EmployeeHoursPage = () => {
  const [selectedTab, setSelectedTab] = useState('Schedule');
  const [selectedView, setSelectedView] = useState('Month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // July 2025
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'micron brain',
      hours: {
        '2025-07-01': 0,
        '2025-07-02': 0,
        '2025-07-03': 0,
        '2025-07-04': 0,
        '2025-07-05': 0,
      },
      timesheets: {
        '2025-07-01': { start: '09:00', end: '17:00', break: '1h' },
        '2025-07-02': { start: '09:00', end: '17:00', break: '1h' },
        '2025-07-03': { start: '09:00', end: '17:00', break: '1h' },
        '2025-07-04': { start: '09:00', end: '17:00', break: '1h' },
        '2025-07-05': { start: '09:00', end: '17:00', break: '1h' },
      },
      selected: false
    },
    // Add more employees as needed
  ]);

  // Get dates for the current week view
  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Start from Monday
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const handleSelectAll = (checked) => {
    setEmployees(employees.map(employee => ({ ...employee, selected: checked })));
  };

  const handleSelectEmployee = (id, checked) => {
    setEmployees(employees.map(employee => 
      employee.id === id ? { ...employee, selected: checked } : employee
    ));
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const selectedCount = employees.filter(e => e.selected).length;

  // Render different table content based on selected tab
const renderTableContent = () => {
    if (selectedTab === 'Schedule') {
      return (
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="px-2 sm:px-4 py-3 whitespace-nowrap sticky left-0 bg-white z-10 border-r border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-purple-600 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {employee.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-1 sm:ml-2 min-w-0">
                    <div className="text-xs font-medium text-gray-900 truncate">
                      {employee.name}
                    </div>
                  </div>
                </div>
              </td>
              {weekDates.map((date, index) => (
                <td key={index} className="px-2 sm:px-4 py-3 whitespace-nowrap text-center min-w-[80px] sm:min-w-[112px]">
                  <div className="text-xs text-gray-900">
                    {employee.hours[formatDateKey(date)] || 0} h.
                  </div>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gray-400 h-1.5 rounded-full" 
                        style={{ 
                          width: `${Math.min(((employee.hours[formatDateKey(date)] || 0) / 8) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    } else {
      return (
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="px-2 sm:px-4 py-3 whitespace-nowrap sticky left-0 bg-white z-10 border-r border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-purple-600 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {employee.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-1 sm:ml-2 min-w-0">
                    <div className="text-xs font-medium text-gray-900 truncate">
                      {employee.name}
                    </div>
                  </div>
                </div>
              </td>
              {weekDates.map((date, index) => (
                <td key={index} className="px-2 sm:px-4 py-3 whitespace-nowrap text-center min-w-[100px] sm:min-w-[112px]">
                  <div className="text-xs text-gray-700">
                    {employee.timesheets[formatDateKey(date)]?.start || '--'} - {employee.timesheets[formatDateKey(date)]?.end || '--'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Break: {employee.timesheets[formatDateKey(date)]?.break || '--'}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="">
        {/* Schedule Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button 
              className={`px-3 py-2 rounded text-sm ${selectedTab === 'Schedule' ? 'bg-gray-200' : 'bg-gray-100'}`}
              onClick={() => setSelectedTab('Schedule')}
            >
              Schedule
            </button>
            <button 
              className={`px-3 py-2 rounded text-sm ${selectedTab === 'Timesheets' ? 'bg-gray-200' : 'bg-gray-100'}`}
              onClick={() => setSelectedTab('Timesheets')}
            >
              Timesheets
            </button>
            <div className="relative">
              <button 
                className="px-3 py-2 bg-white border rounded-md text-sm flex items-center gap-2 hover:bg-gray-50"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedView}
                <ChevronLeft className={`w-3 h-3 transform transition-transform ${isDropdownOpen ? 'rotate-90' : '-rotate-90'}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full mt-1 bg-white border rounded-md shadow-lg z-20 min-w-full">
                  <button 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left whitespace-nowrap"
                    onClick={() => {
                      setSelectedView('Month');
                      setIsDropdownOpen(false);
                    }}
                  >
                    Month
                  </button>
                  <button 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left whitespace-nowrap"
                    onClick={() => {
                      setSelectedView('Week');
                      setIsDropdownOpen(false);
                    }}
                  >
                    Week
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="text-sm font-medium order-1 sm:order-none">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <button 
              className="px-3 py-2 border rounded-md hover:bg-gray-50 text-sm"
              onClick={goToToday}
            >
              Today
            </button>
            <div className="flex items-center gap-1">
              <button 
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() => navigateWeek(-1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() => navigateWeek(1)}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Employee Schedule Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-2 sm:px-4 py-3 text-left w-32 sm:w-40 sticky left-0 bg-gray-50 z-20 border-r border-gray-200">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </div>
                  </th>
                  {weekDates.map((date, index) => (
                    <th key={index} className="px-2 sm:px-4 py-3 text-center min-w-[80px] sm:min-w-[112px]">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="hidden sm:block">
                          {formatDate(date).split(' ')[0]} {formatDate(date).split(' ')[1]} {formatDate(date).split(' ')[2]}, {getDayName(date)}
                        </div>
                        <div className="sm:hidden">
                          <div>{formatDate(date).split(' ')[1]} {formatDate(date).split(' ')[2]}</div>
                          <div className="text-xs text-gray-400">{getDayName(date).substring(0, 3)}</div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              {renderTableContent()}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHoursPage;