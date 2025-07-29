import React, { useState, useEffect } from 'react';
import {
  Activity,
  Calendar,
  MapPin,
  User,
  Zap,
  ChevronDown
} from 'lucide-react';

const ActivityLogContent = () => {
  const [filters, setFilters] = useState({
    period: 'This month',
    location: 'All',
    employee: 'All',
    events: 'All'
  });

  const [dropdownStates, setDropdownStates] = useState({
    period: false,
    location: false,
    employee: false,
    events: false
  });

  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: '',
    showCalendar: false
  });

  const toggleDropdown = (type) => {
    setDropdownStates(prev => {
      // Close all dropdowns first
      const newState = {
        period: false,
        location: false,
        employee: false,
        events: false
      };
      // Then open the clicked one
      newState[type] = !prev[type];
      return newState;
    });
  };

  const closeAllDropdowns = () => {
    setDropdownStates({
      period: false,
      location: false,
      employee: false,
      events: false
    });
  };

  const periodOptions = [
    { label: 'Today', value: 'Today' },
    { label: 'This week', value: 'This week' },
    { label: 'This month', value: 'This month' },
    { label: 'This year', value: 'This year' },
    { type: 'divider' },
    { label: 'Yesterday', value: 'Yesterday' },
    { label: 'Last week', value: 'Last week' },
    { label: 'Last month', value: 'Last month' },
    { label: 'Last year', value: 'Last year' },
    { type: 'divider' },
    { label: 'Custom range', value: 'Custom range', special: true }
  ];

  const locationOptions = [
    { label: 'All', value: 'All' },
    { label: 'My location', value: 'My location' }
  ];

  const employeeOptions = [
    { label: 'All', value: 'All' },
    { label: 'micron brain', value: 'micron brain' }
  ];

  const eventOptions = [
    { label: 'All', value: 'All' },
    { type: 'divider' },
    { label: 'Tasks', value: 'Tasks', category: true },
    { label: 'Task created', value: 'Task created' },
    { label: 'Task deleted', value: 'Task deleted' },
    { label: 'Task completed', value: 'Task completed' },
    { label: 'Task returned', value: 'Task returned' },
    { label: 'Deadline changed', value: 'Deadline changed' },
    { label: 'Assignee changed', value: 'Assignee changed' }
  ];

  const getOptionsForType = (type) => {
    switch (type) {
      case 'period': return periodOptions;
      case 'location': return locationOptions;
      case 'employee': return employeeOptions;
      case 'events': return eventOptions;
      default: return [];
    }
  };

  const handleCustomDateSubmit = () => {
    if (customDateRange.startDate && customDateRange.endDate) {
      const formatDate = (date) => new Date(date).toLocaleDateString();
      const rangeText = `${formatDate(customDateRange.startDate)} - ${formatDate(customDateRange.endDate)}`;
      setFilters(prev => ({ ...prev, period: rangeText }));
      setCustomDateRange(prev => ({ ...prev, showCalendar: false }));
      closeAllDropdowns();
    }
  };

  const FilterDropdown = ({ label, value, type, icon: Icon }) => {
    const options = getOptionsForType(type);
    const isOpen = dropdownStates[type];

    return (
      <div className="relative">
        <label className="text-sm text-gray-600 mb-1 block">{label}</label>
        <div className="relative">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleDropdown(type);
            }}
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors min-w-[120px] justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4 text-gray-500" />}
              <span>{value}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div 
              className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[200px] max-h-64 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {type === 'period' && customDateRange.showCalendar ? (
                <div className="p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From:</label>
                      <input
                        type="date"
                        value={customDateRange.startDate}
                        onChange={(e) => setCustomDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
                      <input
                        type="date"
                        value={customDateRange.endDate}
                        onChange={(e) => setCustomDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCustomDateSubmit}
                        className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600"
                      >
                        Apply
                      </button>
                      <button
                        onClick={() => {
                          setCustomDateRange(prev => ({ ...prev, showCalendar: false }));
                          closeAllDropdowns();
                        }}
                        className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {type === 'location' && (
                    <div className="p-2 border-b">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  )}
                  {type === 'employee' && (
                    <div className="p-2 border-b">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  )}
                  {type === 'events' && (
                    <div className="p-2 border-b">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <button className="text-blue-500 text-sm hover:text-blue-600">Select all</button>
                        <button className="text-blue-500 text-sm hover:text-blue-600">Clear</button>
                      </div>
                    </div>
                  )}
                  
                  <div className="py-1">
                    {options.map((option, index) => {
                      if (option.type === 'divider') {
                        return <div key={index} className="border-t border-gray-200 my-1" />;
                      }
                      
                      if (option.category) {
                        return (
                          <div key={index} className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50">
                            {option.label}
                          </div>
                        );
                      }

                      return (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (option.special && option.value === 'Custom range') {
                              setCustomDateRange(prev => ({ ...prev, showCalendar: true }));
                            } else {
                              setFilters(prev => ({ ...prev, [type]: option.value }));
                              closeAllDropdowns();
                            }
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          {type === 'employee' && option.value === 'micron brain' && (
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              M
                            </div>
                          )}
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside all dropdown containers
      if (!event.target.closest('.filter-dropdown-container')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-6 p-4">
      {/* Description */}
      <div className="bg-white rounded-xl border p-5">
        <p className="text-gray-600">List of all events in the company account.</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-end gap-4 flex-wrap filter-dropdown-container">
          <FilterDropdown
            label="Period:"
            value={filters.period}
            type="period"
            icon={Calendar}
          />
          <FilterDropdown
            label="Location:"
            value={filters.location}
            type="location"
            icon={MapPin}
          />
          <FilterDropdown
            label="Employee:"
            value={filters.employee}
            type="employee"
            icon={User}
          />
          <FilterDropdown
            label="Events:"
            value={filters.events}
            type="events"
            icon={Zap}
          />
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No activity found</h3>
          <p className="text-gray-500">No events found for the selected period and filters</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogContent;