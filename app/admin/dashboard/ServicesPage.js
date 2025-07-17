import React, { useState } from 'react';
import { Plus, Download, Upload, Search } from 'lucide-react';

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([
    { id: 1, name: 'Bridal. Adjust Straps', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 2, name: 'Bridal. Basic Hem', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 3, name: 'Bridal. Bridal Packages', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 4, name: 'Bridal. Bridesmaids Packages', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 5, name: 'Bridal. Groomsmen Packages', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 6, name: 'Bridal. Install Bra Cups', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 7, name: 'Bridal. Intricate Bridal', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 8, name: 'Bridal. Take In / Let Out', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 9, name: 'Consultation', category: 'General', warranty: 'No warranty', selected: false },
    { id: 10, name: 'Courier Service', category: 'General', warranty: 'No warranty', selected: false },
    { id: 11, name: 'Denim. Original Hem', category: 'Denim', warranty: 'No warranty', selected: false },
    // Add more services as needed
  ]);

  const categories = [
    { name: 'All labors and services', count: services.length },
    { name: 'Bridal', count: services.filter(s => s.category === 'Bridal').length },
    { name: 'General', count: services.filter(s => s.category === 'General').length },
    { name: 'Denim', count: services.filter(s => s.category === 'Denim').length },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All labors and services');

  const handleSelectAll = (checked) => {
    setServices(services.map(service => ({ ...service, selected: checked })));
  };

  const handleSelectService = (id, checked) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, selected: checked } : service
    ));
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All labors and services' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedCount = services.filter(s => s.selected).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600">
              <Plus className="w-4 h-4" />
              Service
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border rounded-md pl-10 pr-4 py-2 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <button className="border px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="border px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Import
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r p-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700 mb-3">Category</div>
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between py-2 cursor-pointer ${selectedCategory === category.name ? 'text-blue-600' : 'text-gray-700'}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="flex items-center gap-2">
                  {index === 0 && <span className="text-gray-400">▼</span>}
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="text-sm text-gray-500">{category.count}</span>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600">Total — {services.length}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Services List */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedCount === services.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Warranty
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={service.selected}
                          onChange={(e) => handleSelectService(service.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.warranty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="text-sm text-gray-600">
                Total — {filteredServices.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;