import React, { useState, Suspense } from 'react';
import { Plus, Download, Upload, ChevronDown, ChevronRight } from 'lucide-react';

// Lazy-loaded modals
const CategoryModal = React.lazy(() => import('./CategoryModal'));
const ServiceModal = React.lazy(() => import('./ServiceModal'));

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({ 'All labors and services': true });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [services, setServices] = useState([
    { id: 1, name: 'Bridal. Adjust Straps', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 2, name: 'Bridal. Basic Hem', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 3, name: 'Bridal. Bridal Packages', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 4, name: 'Bridal. Bridesmaids Packages', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 5, name: 'Bridal. Groomsmen Packages', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 6, name: 'Bridal. Install Bra Cups', category: 'Bridal', warranty: 'No warranty', selected: false },
    { id: 7, name: 'Bridal. Intricate Bridal', category: 'Bridal', warranty: 'No warranty', selected: false },
  ]);

  const categories = [
    { name: 'All labors and services', count: services.length, expandable: true },
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

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All labors and services' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedCount = services.filter(s => s.selected).length;
  const totalPages = Math.ceil(filteredServices.length / 10);

  const openModal = (type) => {
    if (type === 'category') {
      setShowCategoryModal(true);
    } else {
      setShowServiceModal(true);
    }
  };

  const closeModal = () => {
    setShowCategoryModal(false);
    setShowServiceModal(false);
  };

  const handleCreateCategory = (categoryData) => {
    console.log('Creating category:', categoryData);
    closeModal();
  };

  const handleCreateService = (serviceData) => {
    console.log('Creating service:', serviceData);
    closeModal();
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {/* Modals */}
      {showCategoryModal && (
        <Suspense fallback={<div className="fixed inset-0 bg-white flex items-center justify-center">Loading category modal...</div>}>
          <CategoryModal 
            onClose={closeModal} 
            onCreate={handleCreateCategory} 
          />
        </Suspense>
      )}

      {showServiceModal && (
        <Suspense fallback={<div className="fixed inset-0 bg-white flex items-center justify-center">Loading service modal...</div>}>
          <ServiceModal 
            onClose={closeModal} 
            onCreate={handleCreateService} 
          />
        </Suspense>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row pt-2 gap-4 lg:gap-6 px-2 sm:px-4 lg:px-0">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-white lg:bg-transparent rounded-lg shadow-sm lg:shadow-none p-3 lg:p-2">
          {/* Mobile: Horizontal buttons, Desktop: Vertical buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => openModal('category')}
              className="bg-green-500 text-white px-3 py-2 rounded text-sm flex items-center gap-1 hover:bg-green-600 flex-1 lg:flex-none justify-center lg:justify-start"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Category</span>
            </button>
            <button
              onClick={() => openModal('service')}
              className="bg-green-500 text-white px-3 py-2 rounded text-sm flex items-center gap-1 hover:bg-green-600 flex-1 lg:flex-none justify-center lg:justify-start"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Service</span>
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700 mb-3">Category</div>
            {categories.map((category, index) => (
              <div key={index} className="space-y-1">
                <div
                  className={`flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-50 rounded ${selectedCategory === category.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {category.expandable && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(category.name);
                        }}
                        className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                      >
                        {expandedCategories[category.name] ?
                          <ChevronDown className="w-4 h-4" /> :
                          <ChevronRight className="w-4 h-4" />
                        }
                      </button>
                    )}
                    <span className="text-sm truncate">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 flex-shrink-0 ml-2">{category.count}</span>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t mt-4">
              <div className="text-sm text-gray-600">Total — {services.length}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 px-2 sm:px-0">
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-end gap-2 mb-4">
            <button className="border border-gray-300 px-3 sm:px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </button>
            <button className="border border-gray-300 px-3 sm:px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>

          {/* Services Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-2 sm:px-4 py-3 text-left w-8 sm:w-12">
                      <input
                        type="checkbox"
                        checked={selectedCount === services.length && services.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 min-w-[100px] sm:min-w-0">
                      Category
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 min-w-[80px] sm:min-w-0">
                      Quantity
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 min-w-[120px] sm:min-w-0">
                      Name
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 min-w-[100px] sm:min-w-0">
                      Warranty
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={service.selected}
                          onChange={(e) => handleSelectService(service.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">🏷️</span>
                          </div>
                          <span className="truncate">{service.category}</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        -
                      </td>
                      <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">🏷️</span>
                          </div>
                          <span className="truncate">{service.name}</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        <span className="truncate">{service.warranty}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-2">
              <button className="p-2 border rounded hover:bg-gray-50">
                ‹
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">
                2
              </button>
              <button className="p-2 border rounded hover:bg-gray-50">
                ›
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Total — {filteredServices.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;