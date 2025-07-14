import React, { useState } from 'react';
import {
  PlusCircle,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  Trash2,
  X,
  Clock,
  Activity,
  CheckCircle,
  AlertCircle,
  Tag,
  Box,
  Scissors,
  Shirt
} from 'lucide-react';

const Items = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const allItems = [
    {
      id: 'ITEM-001',
      name: 'Silk Saree',
      category: 'Saree',
      fabric: 'Silk',
      price: '₹5,499',
      stock: 42,
      status: 'In Stock',
      lastUpdated: '2025-07-10',
      description: 'Pure Kanchipuram silk saree with zari border',
      measurements: 'Length: 5.5m, Width: 1.2m',
      colors: ['Red', 'Green', 'Blue']
    },
    {
      id: 'ITEM-002',
      name: 'Cotton Shirt',
      category: 'Shirt',
      fabric: 'Cotton',
      price: '₹1,299',
      stock: 85,
      status: 'In Stock',
      lastUpdated: '2025-07-12',
      description: 'Premium cotton formal shirt',
      measurements: 'Sizes: S, M, L, XL',
      colors: ['White', 'Blue', 'Black']
    },
    {
      id: 'ITEM-003',
      name: 'Designer Lehenga',
      category: 'Lehenga',
      fabric: 'Silk',
      price: '₹12,999',
      stock: 15,
      status: 'Low Stock',
      lastUpdated: '2025-07-08',
      description: 'Bridal lehenga with intricate embroidery',
      measurements: 'Custom sizes available',
      colors: ['Red', 'Pink', 'Maroon']
    },
    {
      id: 'ITEM-004',
      name: 'Denim Jeans',
      category: 'Jeans',
      fabric: 'Denim',
      price: '₹2,499',
      stock: 0,
      status: 'Out of Stock',
      lastUpdated: '2025-07-05',
      description: 'Slim fit denim jeans',
      measurements: 'Waist: 28-40, Length: 32-34',
      colors: ['Blue', 'Black']
    },
    {
      id: 'ITEM-005',
      name: 'Linen Kurta',
      category: 'Kurta',
      fabric: 'Linen',
      price: '₹1,899',
      stock: 28,
      status: 'In Stock',
      lastUpdated: '2025-07-11',
      description: 'Casual linen kurta for men',
      measurements: 'Sizes: S, M, L, XL',
      colors: ['Beige', 'White', 'Blue']
    },
    {
      id: 'ITEM-006',
      name: 'Chiffon Dupatta',
      category: 'Dupatta',
      fabric: 'Chiffon',
      price: '₹899',
      stock: 63,
      status: 'In Stock',
      lastUpdated: '2025-07-09',
      description: 'Lightweight chiffon dupatta',
      measurements: 'Length: 2.5m, Width: 0.9m',
      colors: ['Pink', 'Peach', 'White']
    },
    {
      id: 'ITEM-007',
      name: 'Woolen Blazer',
      category: 'Blazer',
      fabric: 'Wool',
      price: '₹6,999',
      stock: 8,
      status: 'Low Stock',
      lastUpdated: '2025-07-07',
      description: 'Premium woolen blazer for formal occasions',
      measurements: 'Sizes: 38-44',
      colors: ['Black', 'Navy', 'Gray']
    },
    {
      id: 'ITEM-008',
      name: 'Printed T-Shirt',
      category: 'T-Shirt',
      fabric: 'Cotton',
      price: '₹799',
      stock: 92,
      status: 'In Stock',
      lastUpdated: '2025-07-13',
      description: 'Casual cotton t-shirt with printed design',
      measurements: 'Sizes: S, M, L, XL',
      colors: ['White', 'Black', 'Red', 'Yellow']
    }
  ];

  const statusStats = [
    { label: 'In Stock', count: allItems.filter(i => i.status === 'In Stock').length, color: 'green', icon: Box },
    { label: 'Low Stock', count: allItems.filter(i => i.status === 'Low Stock').length, color: 'yellow', icon: Activity },
    { label: 'Out of Stock', count: allItems.filter(i => i.status === 'Out of Stock').length, color: 'red', icon: AlertCircle },
    { label: 'Categories', count: new Set(allItems.map(i => i.category)).size, color: 'blue', icon: Tag }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.fabric.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDeleteItem = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // In a real app, you would make an API call to delete the item
    console.log('Item deleted:', selectedItem.id);
    setShowDeleteModal(false);
    // You would typically refresh the items list here
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const confirmExport = () => {
    // In a real app, you would generate and download the export file
    console.log('Exporting items data');
    setShowExportModal(false);
  };

  const saveEditedItem = () => {
    // In a real app, you would make an API call to save the changes
    console.log('Item updated:', selectedItem);
    setShowEditModal(false);
    // You would typically refresh the items list here
  };

  const createNewItem = () => {
    // In a real app, you would make an API call to create a new item
    console.log('New item created');
    setShowNewItemModal(false);
    // You would typically refresh the items list here
  };

  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Items Management</h1>
          <p className="text-gray-600 text-sm">Manage and track all inventory items</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowNewItemModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Item</span>
          </button>
          <button 
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statusStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-${stat.color}-50 border border-${stat.color}-200 rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium text-${stat.color}-800`}>{stat.label}</p>
                  <p className={`text-lg font-bold text-${stat.color}-900`}>{stat.count}</p>
                </div>
                <Icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search items by name, ID or fabric..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Saree">Saree</option>
              <option value="Shirt">Shirt</option>
              <option value="Lehenga">Lehenga</option>
              <option value="Jeans">Jeans</option>
              <option value="Kurta">Kurta</option>
              <option value="Dupatta">Dupatta</option>
              <option value="Blazer">Blazer</option>
              <option value="T-Shirt">T-Shirt</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            >
              <option value="all">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              All Items ({filteredItems.length})
            </h3>
            <button className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fabric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.fabric}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewItem(item)}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditItem(item)}
                        className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item)}
                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No items found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* View Item Modal */}
      {showViewModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Item Details: {selectedItem.id}</h3>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Item Name</p>
                      <p className="text-sm font-medium">{selectedItem.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="text-sm font-medium">{selectedItem.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fabric</p>
                      <p className="text-sm font-medium">{selectedItem.fabric}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-sm font-medium">{selectedItem.price}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Inventory Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Stock Quantity</p>
                      <p className="text-sm font-medium">{selectedItem.stock}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="text-sm font-medium">{selectedItem.lastUpdated}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Available Colors</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedItem.colors.map((color, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-100">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Description</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm">{selectedItem.description}</p>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Measurements/Sizes</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-line">{selectedItem.measurements}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Item: {selectedItem.id}</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                      <input
                        type="text"
                        value={selectedItem.name}
                        onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={selectedItem.category}
                        onChange={(e) => setSelectedItem({...selectedItem, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="Saree">Saree</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Lehenga">Lehenga</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Kurta">Kurta</option>
                        <option value="Dupatta">Dupatta</option>
                        <option value="Blazer">Blazer</option>
                        <option value="T-Shirt">T-Shirt</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fabric</label>
                      <input
                        type="text"
                        value={selectedItem.fabric}
                        onChange={(e) => setSelectedItem({...selectedItem, fabric: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="text"
                        value={selectedItem.price}
                        onChange={(e) => setSelectedItem({...selectedItem, price: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Inventory Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        value={selectedItem.stock}
                        onChange={(e) => setSelectedItem({...selectedItem, stock: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={selectedItem.status}
                        onChange={(e) => setSelectedItem({...selectedItem, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Colors</label>
                      <input
                        type="text"
                        value={selectedItem.colors.join(', ')}
                        onChange={(e) => setSelectedItem({...selectedItem, colors: e.target.value.split(', ')})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Enter colors separated by commas"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Description</h4>
                  <textarea
                    value={selectedItem.description}
                    onChange={(e) => setSelectedItem({...selectedItem, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 text-sm"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Measurements/Sizes</h4>
                  <textarea
                    value={selectedItem.measurements}
                    onChange={(e) => setSelectedItem({...selectedItem, measurements: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 text-sm"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-700">Are you sure you want to delete item <span className="font-medium">{selectedItem.id}</span> - <span className="font-medium">{selectedItem.name}</span>?</p>
                <p className="text-sm text-red-600 mt-2">This action cannot be undone.</p>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Item Modal */}
      {showNewItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Item</h3>
                <button 
                  onClick={() => setShowNewItemModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                      <input
                        type="text"
                        placeholder="Enter item name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="Saree">Saree</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Lehenga">Lehenga</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Kurta">Kurta</option>
                        <option value="Dupatta">Dupatta</option>
                        <option value="Blazer">Blazer</option>
                        <option value="T-Shirt">T-Shirt</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fabric</label>
                      <input
                        type="text"
                        placeholder="Enter fabric type"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="text"
                        placeholder="Enter price"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Inventory Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        placeholder="Enter stock quantity"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Colors</label>
                      <input
                        type="text"
                        placeholder="Enter colors separated by commas"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Description</h4>
                  <textarea
                    placeholder="Enter item description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 text-sm"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Measurements/Sizes</h4>
                  <textarea
                    placeholder="Enter measurements or available sizes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 text-sm"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewItemModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Create Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Export Items</h3>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="exportFormat" value="csv" defaultChecked className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">CSV (Excel compatible)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="exportFormat" value="pdf" className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">PDF Document</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">All current filters</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Item descriptions</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Inventory details</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmExport}
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Items</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;