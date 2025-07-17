import React, { useState } from 'react';
import { Plus, Download, Upload, Settings, Search } from 'lucide-react';

const EmployeeHoursPage = () => {
  const [selectedView, setSelectedView] = useState('month');
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Micro Brain',
      hours: {
        '11-07-2025': 8,
        '12-07-2025': 8,
        '13-07-2025': 0,
        '14-07-2025': 6,
        '15-07-2025': 8,
        '16-07-2025': 7,
        '17-07-2025': 0,
      },
      selected: false
    },
    // Add more employees as needed
  ]);

  const dates = [
    '11-07-2025', // Wed
    '12-07-2025', // Thu
    '13-07-2025', // Fri
    '14-07-2025', // Sat
    '15-07-2025', // Sun
    '16-07-2025', // Mon
    '17-07-2025', // Tue
  ];

  const handleSelectAll = (checked) => {
    setEmployees(employees.map(employee => ({ ...employee, selected: checked })));
  };

  const handleSelectEmployee = (id, checked) => {
    setEmployees(employees.map(employee => 
      employee.id === id ? { ...employee, selected: checked } : employee
    ));
  };

  const selectedCount = employees.filter(e => e.selected).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Employee hours</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button 
                className={`px-3 py-2 ${selectedView === 'month' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setSelectedView('month')}
              >
                Month
              </button>
              <button 
                className={`px-3 py-2 ${selectedView === 'week' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setSelectedView('week')}
              >
                Week
              </button>
              <button 
                className={`px-3 py-2 ${selectedView === 'day' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setSelectedView('day')}
              >
                Day
              </button>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border rounded-md pl-10 pr-4 py-2 w-64"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            
            <button className="border px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="border px-4 py-2 rounded-md hover:bg-gray-50">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="border rounded-md px-3 py-1 hover:bg-gray-50">
              Today
            </button>
            <div className="text-lg font-medium">July 2025</div>
          </div>
        </div>

        {/* Employee Hours Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCount === employees.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  {dates.map((date, index) => (
                    <th key={index} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {date.split('-')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={employee.selected}
                        onChange={(e) => handleSelectEmployee(employee.id, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.name}
                    </td>
                    {dates.map((date, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                        {employee.hours[date] || 0} h.
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="text-sm text-gray-600">
              Total — {employees.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHoursPage;