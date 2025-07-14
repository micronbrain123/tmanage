import React, { useState } from 'react';
import {
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  PlusCircle,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  Trash2,
  Calendar,
  MapPin,
  User,
  Phone,
  X,
  Package
} from 'lucide-react';

const Deliveries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState('all');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewDeliveryModal, setShowNewDeliveryModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const allDeliveries = [
    {
      id: 'DEL-001',
      orderId: 'ORD-105',
      customer: 'Rahul Sharma',
      phone: '+91 9876543210',
      address: '12, Green Park, New Delhi - 110016',
      items: ['Silk Saree', 'Cotton Dupatta'],
      deliveryType: 'Standard',
      assignedTo: 'Delivery Partner 1',
      status: 'In Transit',
      estimatedDelivery: '2025-07-15',
      actualDelivery: '',
      trackingNumber: 'TRK123456789',
      notes: 'Fragile items - handle with care'
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-106',
      customer: 'Priya Patel',
      phone: '+91 9876543211',
      address: '45, MG Road, Bangalore - 560001',
      items: ['Designer Lehenga', 'Blouse Piece'],
      deliveryType: 'Express',
      assignedTo: 'Delivery Partner 2',
      status: 'Delivered',
      estimatedDelivery: '2025-07-12',
      actualDelivery: '2025-07-11',
      trackingNumber: 'TRK123456790',
      notes: 'Customer requested evening delivery'
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-107',
      customer: 'Amit Kumar',
      phone: '+91 9876543212',
      address: '78, Park Street, Kolkata - 700016',
      items: ['Formal Shirt', 'Cotton Trousers'],
      deliveryType: 'Standard',
      assignedTo: 'Delivery Partner 3',
      status: 'Pending',
      estimatedDelivery: '2025-07-18',
      actualDelivery: '',
      trackingNumber: 'TRK123456791',
      notes: 'Office delivery - 10am to 5pm'
    },
    {
      id: 'DEL-004',
      orderId: 'ORD-108',
      customer: 'Neha Gupta',
      phone: '+91 9876543213',
      address: '23, Linking Road, Mumbai - 400050',
      items: ['Designer Kurti', 'Palazzo Pants'],
      deliveryType: 'Express',
      assignedTo: 'Delivery Partner 4',
      status: 'Failed',
      estimatedDelivery: '2025-07-10',
      actualDelivery: '',
      trackingNumber: 'TRK123456792',
      notes: 'Customer not available - reschedule needed'
    },
    {
      id: 'DEL-005',
      orderId: 'ORD-109',
      customer: 'Vikram Singh',
      phone: '+91 9876543214',
      address: '56, Jubilee Hills, Hyderabad - 500033',
      items: ['Denim Jacket', 'Casual T-Shirt'],
      deliveryType: 'Standard',
      assignedTo: 'Delivery Partner 1',
      status: 'In Transit',
      estimatedDelivery: '2025-07-16',
      actualDelivery: '',
      trackingNumber: 'TRK123456793',
      notes: 'Gift wrapping requested'
    },
    {
      id: 'DEL-006',
      orderId: 'ORD-110',
      customer: 'Sneha Joshi',
      phone: '+91 9876543215',
      address: '34, Koregaon Park, Pune - 411001',
      items: ['Silk Saree', 'Blouse Piece'],
      deliveryType: 'Express',
      assignedTo: 'Delivery Partner 5',
      status: 'Delivered',
      estimatedDelivery: '2025-07-14',
      actualDelivery: '2025-07-13',
      trackingNumber: 'TRK123456794',
      notes: 'Left with security'
    },
    {
      id: 'DEL-007',
      orderId: 'ORD-111',
      customer: 'Rajesh Iyer',
      phone: '+91 9876543216',
      address: '89, Boat Club Road, Chennai - 600006',
      items: ['Cotton Shirt', 'Formal Trousers'],
      deliveryType: 'Standard',
      assignedTo: 'Delivery Partner 3',
      status: 'Pending',
      estimatedDelivery: '2025-07-19',
      actualDelivery: '',
      trackingNumber: 'TRK123456795',
      notes: 'Customer will call to schedule'
    },
    {
      id: 'DEL-008',
      orderId: 'ORD-112',
      customer: 'Meera Reddy',
      phone: '+91 9876543217',
      address: '67, Banjara Hills, Hyderabad - 500034',
      items: ['Designer Dress', 'Evening Clutch'],
      deliveryType: 'Express',
      assignedTo: 'Delivery Partner 2',
      status: 'In Transit',
      estimatedDelivery: '2025-07-17',
      actualDelivery: '',
      trackingNumber: 'TRK123456796',
      notes: 'Urgent delivery - wedding outfit'
    }
  ];

  const statusStats = [
    { label: 'Pending', count: allDeliveries.filter(d => d.status === 'Pending').length, color: 'yellow', icon: Clock },
    { label: 'In Transit', count: allDeliveries.filter(d => d.status === 'In Transit').length, color: 'blue', icon: Truck },
    { label: 'Delivered', count: allDeliveries.filter(d => d.status === 'Delivered').length, color: 'green', icon: CheckCircle },
    { label: 'Failed', count: allDeliveries.filter(d => d.status === 'Failed').length, color: 'red', icon: XCircle }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDeliveries = allDeliveries.filter(delivery => {
    const matchesSearch = delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    const matchesType = deliveryTypeFilter === 'all' || delivery.deliveryType === deliveryTypeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setShowViewModal(true);
  };

  const handleEditDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setShowEditModal(true);
  };

  const handleDeleteDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // In a real app, you would make an API call to delete the delivery
    console.log('Delivery deleted:', selectedDelivery.id);
    setShowDeleteModal(false);
    // You would typically refresh the deliveries list here
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const confirmExport = () => {
    // In a real app, you would generate and download the export file
    console.log('Exporting deliveries data');
    setShowExportModal(false);
  };

  const saveEditedDelivery = () => {
    // In a real app, you would make an API call to save the changes
    console.log('Delivery updated:', selectedDelivery);
    setShowEditModal(false);
    // You would typically refresh the deliveries list here
  };

  const createNewDelivery = () => {
    // In a real app, you would make an API call to create a new delivery
    console.log('New delivery created');
    setShowNewDeliveryModal(false);
    // You would typically refresh the deliveries list here
  };

  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Deliveries Management</h1>
          <p className="text-gray-600 text-sm">Track and manage all customer deliveries</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowNewDeliveryModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Delivery</span>
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
              placeholder="Search deliveries by customer, ID or order..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Failed">Failed</option>
            </select>

            <select
              value={deliveryTypeFilter}
              onChange={(e) => setDeliveryTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            >
              <option value="all">All Types</option>
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              All Deliveries ({filteredDeliveries.length})
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
                  Delivery ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Est. Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeliveries.map((delivery, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {delivery.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {delivery.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{delivery.customer}</div>
                    <div className="text-xs text-gray-500">{delivery.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      {delivery.items.map((item, i) => (
                        <span key={i} className="text-sm text-gray-900">{item}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {delivery.deliveryType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {delivery.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {delivery.estimatedDelivery}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewDelivery(delivery)}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditDelivery(delivery)}
                        className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDelivery(delivery)}
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

        {filteredDeliveries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No deliveries found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* View Delivery Modal */}
      {showViewModal && selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Delivery Details: {selectedDelivery.id}</h3>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Customer Name</p>
                      <p className="text-sm font-medium">{selectedDelivery.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-sm font-medium">{selectedDelivery.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery Address</p>
                      <p className="text-sm font-medium">{selectedDelivery.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="text-sm font-medium">{selectedDelivery.orderId}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Delivery Type</p>
                      <p className="text-sm font-medium">{selectedDelivery.deliveryType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assigned To</p>
                      <p className="text-sm font-medium">{selectedDelivery.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedDelivery.status)}`}>
                        {selectedDelivery.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimated Delivery</p>
                      <p className="text-sm font-medium">{selectedDelivery.estimatedDelivery}</p>
                    </div>
                    {selectedDelivery.actualDelivery && (
                      <div>
                        <p className="text-sm text-gray-500">Actual Delivery</p>
                        <p className="text-sm font-medium">{selectedDelivery.actualDelivery}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Tracking Number</p>
                      <p className="text-sm font-medium">{selectedDelivery.trackingNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Items</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-sm">
                      {selectedDelivery.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-line">{selectedDelivery.notes}</p>
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

      {/* Edit Delivery Modal */}
      {showEditModal && selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Delivery: {selectedDelivery.id}</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                      <input
                        type="text"
                        value={selectedDelivery.customer}
                        onChange={(e) => setSelectedDelivery({...selectedDelivery, customer: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={selectedDelivery.phone}
                        onChange={(e) => setSelectedDelivery({...selectedDelivery, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                      <textarea
                        value={selectedDelivery.address}
                        onChange={(e) => setSelectedDelivery({...selectedDelivery, address: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                      <input
                        type="text"
                        value={selectedDelivery.orderId}
                        onChange={(e) => setSelectedDelivery({...selectedDelivery, orderId: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Type</label>
                      <select
                        value={selectedDelivery.deliveryType}
                        onChange={(e) => setSelectedDelivery({...selectedDelivery, deliveryType: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Express">Express</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                      <select
                        value={selectedDelivery.assignedTo}
                        onChange={(e) => setSelectedDelivery({...selectedDelivery, assignedTo: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="Delivery Partner 1">Delivery Partner 1</option>
                        <option value="Delivery Partner 2">Delivery Partner 2</option>
                        <option value="Delivery Partner 3">Delivery Partner 3</option>
                        <option value="Delivery Partner 4">Delivery Partner 4</option>
                        <option value="Delivery Partner 5">Delivery Partner 5</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={selectedDelivery.status}
                        onChange={(e) => setSelectedDelivery({...selectedDelivery, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery</label>
                      <input
                        type="date"
                        value={selectedDelivery.estimatedDelivery}
                        onChange={(e) => setSelectedDelivery({...selectedDelivery, estimatedDelivery: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    {selectedDelivery.status === 'Delivered' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Actual Delivery</label>
                        <input
                          type="date"
                          value={selectedDelivery.actualDelivery}
                          onChange={(e) => setSelectedDelivery({...selectedDelivery, actualDelivery: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                      <input
                        type="text"
                        value={selectedDelivery.trackingNumber}
                        onChange={(e) => setSelectedDelivery({...selectedDelivery, trackingNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Items</h4>
                  <textarea
                    value={selectedDelivery.items.join('\n')}
                    onChange={(e) => setSelectedDelivery({...selectedDelivery, items: e.target.value.split('\n')})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-24"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                  <textarea
                    value={selectedDelivery.notes}
                    onChange={(e) => setSelectedDelivery({...selectedDelivery, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-24"
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
                  onClick={saveEditedDelivery}
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
      {showDeleteModal && selectedDelivery && (
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
                <p className="text-sm text-gray-700">Are you sure you want to delete delivery <span className="font-medium">{selectedDelivery.id}</span> for order <span className="font-medium">{selectedDelivery.orderId}</span>?</p>
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
                  Delete Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Delivery Modal */}
      {showNewDeliveryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Delivery</h3>
                <button 
                  onClick={() => setShowNewDeliveryModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                      <input
                        type="text"
                        placeholder="Enter customer name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        placeholder="Enter phone number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                      <textarea
                        placeholder="Enter complete delivery address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                      <input
                        type="text"
                        placeholder="Enter order ID"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Type</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Express">Express</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="Delivery Partner 1">Delivery Partner 1</option>
                        <option value="Delivery Partner 2">Delivery Partner 2</option>
                        <option value="Delivery Partner 3">Delivery Partner 3</option>
                        <option value="Delivery Partner 4">Delivery Partner 4</option>
                        <option value="Delivery Partner 5">Delivery Partner 5</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                      <input
                        type="text"
                        placeholder="Enter tracking number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Items</h4>
                  <textarea
                    placeholder="Enter items (one per line)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-24"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                  <textarea
                    placeholder="Any special instructions or notes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-24"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewDeliveryModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewDelivery}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Create Delivery
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
                <h3 className="text-lg font-medium text-gray-900">Export Deliveries</h3>
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
                      <span className="text-sm">Customer details</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Item lists</span>
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
                  <span>Export Deliveries</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deliveries;