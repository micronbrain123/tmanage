import React, { useState } from 'react';
import { 
  Clock, 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  PlusCircle, 
  Search, 
  Filter, 
  Download, 
  Edit,
  Eye,
  Trash2,
  Calendar,
  DollarSign,
  X
} from 'lucide-react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const allOrders = [
    { 
      id: 'ORD-001', 
      customer: 'Rajesh Kumar', 
      item: 'Wedding Suit', 
      status: 'Cutting', 
      delivery: '2025-07-15', 
      amount: '₹8,500',
      priority: 'High',
      orderDate: '2025-07-01',
      tailor: 'Ramesh Mistri',
      phone: '+91 9876543210',
      measurements: 'Chest: 42, Waist: 38, Length: 32',
      notes: 'Need to complete before wedding date'
    },
    { 
      id: 'ORD-002', 
      customer: 'Priya Sharma', 
      item: 'Saree Blouse', 
      status: 'Stitching', 
      delivery: '2025-07-12', 
      amount: '₹2,200',
      priority: 'Medium',
      orderDate: '2025-07-02',
      tailor: 'Sunita Devi',
      phone: '+91 9876543211',
      measurements: 'Bust: 34, Waist: 30',
      notes: 'Special embroidery requested'
    },
    { 
      id: 'ORD-003', 
      customer: 'Amit Patel', 
      item: 'Formal Shirt', 
      status: 'Quality Check', 
      delivery: '2025-07-10', 
      amount: '₹1,800',
      priority: 'Low',
      orderDate: '2025-07-03',
      tailor: 'Mohan Lal',
      phone: '+91 9876543212',
      measurements: 'Neck: 16, Sleeve: 34',
      notes: 'French cuffs required'
    },
    { 
      id: 'ORD-004', 
      customer: 'Sneha Joshi', 
      item: 'Lehenga', 
      status: 'Ready', 
      delivery: '2025-07-09', 
      amount: '₹15,000',
      priority: 'High',
      orderDate: '2025-06-25',
      tailor: 'Kavita Sharma',
      phone: '+91 9876543213',
      measurements: 'Waist: 28, Length: 42',
      notes: 'Bridal lehenga - urgent'
    },
    { 
      id: 'ORD-005', 
      customer: 'Vikram Singh', 
      item: 'Kurta Pajama', 
      status: 'Cutting', 
      delivery: '2025-07-18', 
      amount: '₹3,500',
      priority: 'Medium',
      orderDate: '2025-07-04',
      tailor: 'Ramesh Mistri',
      phone: '+91 9876543214',
      measurements: 'Chest: 40, Length: 44',
      notes: 'Festive wear for Eid'
    },
    { 
      id: 'ORD-006', 
      customer: 'Meera Gupta', 
      item: 'Designer Dress', 
      status: 'Stitching', 
      delivery: '2025-07-20', 
      amount: '₹6,800',
      priority: 'High',
      orderDate: '2025-07-05',
      tailor: 'Sunita Devi',
      phone: '+91 9876543215',
      measurements: 'Bust: 36, Waist: 32, Hips: 38',
      notes: 'Party wear - designer fabric'
    },
    { 
      id: 'ORD-007', 
      customer: 'Ravi Agarwal', 
      item: 'Blazer', 
      status: 'Overdue', 
      delivery: '2025-07-06', 
      amount: '₹4,200',
      priority: 'High',
      orderDate: '2025-06-28',
      tailor: 'Mohan Lal',
      phone: '+91 9876543216',
      measurements: 'Chest: 44, Sleeve: 35',
      notes: 'Business formal - delayed due to fabric issue'
    },
    { 
      id: 'ORD-008', 
      customer: 'Kavya Reddy', 
      item: 'Anarkali Suit', 
      status: 'Delivered', 
      delivery: '2025-07-05', 
      amount: '₹7,500',
      priority: 'Medium',
      orderDate: '2025-06-22',
      tailor: 'Kavita Sharma',
      phone: '+91 9876543217',
      measurements: 'Bust: 38, Waist: 34, Length: 48',
      notes: 'Delivered on time - customer satisfied'
    }
  ];

  const statusStats = [
    { label: 'Pending', count: allOrders.filter(o => o.status === 'Cutting').length, color: 'yellow', icon: Clock },
    { label: 'In Progress', count: allOrders.filter(o => o.status === 'Stitching' || o.status === 'Quality Check').length, color: 'blue', icon: Activity },
    { label: 'Completed', count: allOrders.filter(o => o.status === 'Ready' || o.status === 'Delivered').length, color: 'green', icon: CheckCircle },
    { label: 'Overdue', count: allOrders.filter(o => o.status === 'Overdue').length, color: 'red', icon: AlertCircle }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Cutting': return 'bg-yellow-100 text-yellow-800';
      case 'Stitching': return 'bg-blue-100 text-blue-800';
      case 'Quality Check': return 'bg-purple-100 text-purple-800';
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.item.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleDeleteOrder = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // In a real app, you would make an API call to delete the order
    console.log('Order deleted:', selectedOrder.id);
    setShowDeleteModal(false);
    // You would typically refresh the orders list here
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const confirmExport = () => {
    // In a real app, you would generate and download the export file
    console.log('Exporting orders data');
    setShowExportModal(false);
  };

  const saveEditedOrder = () => {
    // In a real app, you would make an API call to save the changes
    console.log('Order updated:', selectedOrder);
    setShowEditModal(false);
    // You would typically refresh the orders list here
  };

  const createNewOrder = () => {
    // In a real app, you would make an API call to create a new order
    console.log('New order created');
    setShowNewOrderModal(false);
    // You would typically refresh the orders list here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
          <p className="text-sm text-gray-600 mt-1">Track and manage all customer orders</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button 
            onClick={() => setShowNewOrderModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Order</span>
          </button>
          <button 
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statusStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-${stat.color}-50 border border-${stat.color}-200 rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-${stat.color}-800`}>{stat.label}</p>
                  <p className={`text-2xl font-bold text-${stat.color}-900 mt-1`}>{stat.count}</p>
                </div>
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Cutting">Cutting</option>
              <option value="Stitching">Stitching</option>
              <option value="Quality Check">Quality Check</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              All Orders ({filteredOrders.length})
            </h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tailor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-blue-600">{order.id}</div>
                      <div className="text-xs text-gray-500">Order: {order.orderDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-xs text-gray-500">{order.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.tailor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.delivery}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditOrder(order)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteOrder(order)}
                        className="text-red-600 hover:text-red-800"
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

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No orders found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* View Order Modal */}
      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-bold text-gray-900">Order Details: {selectedOrder.id}</h3>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Customer Name</p>
                      <p className="text-sm font-medium">{selectedOrder.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-sm font-medium">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tailor Assigned</p>
                      <p className="text-sm font-medium">{selectedOrder.tailor}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Order Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Item</p>
                      <p className="text-sm font-medium">{selectedOrder.item}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="text-sm font-medium">{selectedOrder.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery Date</p>
                      <p className="text-sm font-medium">{selectedOrder.delivery}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="text-sm font-medium">{selectedOrder.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Priority</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedOrder.priority)}`}>
                        {selectedOrder.priority}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Measurements</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-line">{selectedOrder.measurements}</p>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-line">{selectedOrder.notes}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {showEditModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-bold text-gray-900">Edit Order: {selectedOrder.id}</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
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
                        value={selectedOrder.customer}
                        onChange={(e) => setSelectedOrder({...selectedOrder, customer: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={selectedOrder.phone}
                        onChange={(e) => setSelectedOrder({...selectedOrder, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Order Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
                      <input
                        type="text"
                        value={selectedOrder.item}
                        onChange={(e) => setSelectedOrder({...selectedOrder, item: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                      <input
                        type="date"
                        value={selectedOrder.delivery}
                        onChange={(e) => setSelectedOrder({...selectedOrder, delivery: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input
                        type="text"
                        value={selectedOrder.amount}
                        onChange={(e) => setSelectedOrder({...selectedOrder, amount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => setSelectedOrder({...selectedOrder, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="Cutting">Cutting</option>
                        <option value="Stitching">Stitching</option>
                        <option value="Quality Check">Quality Check</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={selectedOrder.priority}
                        onChange={(e) => setSelectedOrder({...selectedOrder, priority: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Measurements</h4>
                  <textarea
                    value={selectedOrder.measurements}
                    onChange={(e) => setSelectedOrder({...selectedOrder, measurements: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                  <textarea
                    value={selectedOrder.notes}
                    onChange={(e) => setSelectedOrder({...selectedOrder, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedOrder}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-bold text-gray-900">Confirm Deletion</h3>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-700">Are you sure you want to delete order <span className="font-semibold">{selectedOrder.id}</span> for customer <span className="font-semibold">{selectedOrder.customer}</span>?</p>
                <p className="text-red-600 mt-2">This action cannot be undone.</p>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-bold text-gray-900">Create New Order</h3>
                <button 
                  onClick={() => setShowNewOrderModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        placeholder="Enter phone number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Order Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
                      <input
                        type="text"
                        placeholder="Enter item description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input
                        type="text"
                        placeholder="Enter amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="Cutting">Cutting</option>
                        <option value="Stitching">Stitching</option>
                        <option value="Quality Check">Quality Check</option>
                        <option value="Ready">Ready</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assign Tailor</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">Select Tailor</option>
                        <option value="Ramesh Mistri">Ramesh Mistri</option>
                        <option value="Sunita Devi">Sunita Devi</option>
                        <option value="Mohan Lal">Mohan Lal</option>
                        <option value="Kavita Sharma">Kavita Sharma</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Measurements</h4>
                  <textarea
                    placeholder="Enter measurements details"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                  <textarea
                    placeholder="Any special instructions or notes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewOrder}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Order
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
                <h3 className="text-xl font-bold text-gray-900">Export Orders</h3>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="exportFormat" value="csv" defaultChecked className="h-4 w-4 text-blue-600" />
                      <span>CSV (Excel compatible)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="exportFormat" value="pdf" className="h-4 w-4 text-blue-600" />
                      <span>PDF Document</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                      <span>All current filters</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                      <span>Customer details</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                      <span>Measurement details</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmExport}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Orders</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;