import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  PlusCircle,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  Trash2,
  X,
  FileText,
  User,
  Calendar,
  Package
} from 'lucide-react';

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [selectedBill, setSelectedBill] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewBillModal, setShowNewBillModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const allBills = [
    {
      id: 'BILL-001',
      orderId: 'ORD-105',
      customer: 'Rahul Sharma',
      date: '2025-07-10',
      dueDate: '2025-07-20',
      amount: '₹5,499',
      paidAmount: '₹5,499',
      status: 'Paid',
      paymentMethod: 'Credit Card',
      items: [
        { name: 'Silk Saree', price: '₹4,500', quantity: 1 },
        { name: 'Cotton Dupatta', price: '₹999', quantity: 1 }
      ],
      tax: '₹549',
      discount: '₹0',
      notes: 'Paid via Razorpay'
    },
    {
      id: 'BILL-002',
      orderId: 'ORD-106',
      customer: 'Priya Patel',
      date: '2025-07-11',
      dueDate: '2025-07-21',
      amount: '₹12,999',
      paidAmount: '₹6,500',
      status: 'Partial',
      paymentMethod: 'Bank Transfer',
      items: [
        { name: 'Designer Lehenga', price: '₹12,000', quantity: 1 },
        { name: 'Blouse Piece', price: '₹999', quantity: 1 }
      ],
      tax: '₹1,299',
      discount: '₹300',
      notes: 'Balance to be paid on delivery'
    },
    {
      id: 'BILL-003',
      orderId: 'ORD-107',
      customer: 'Amit Kumar',
      date: '2025-07-12',
      dueDate: '2025-07-22',
      amount: '₹3,798',
      paidAmount: '₹0',
      status: 'Unpaid',
      paymentMethod: '',
      items: [
        { name: 'Formal Shirt', price: '₹1,299', quantity: 2 },
        { name: 'Cotton Trousers', price: '₹1,200', quantity: 1 }
      ],
      tax: '₹379',
      discount: '₹100',
      notes: 'Pending customer confirmation'
    },
    {
      id: 'BILL-004',
      orderId: 'ORD-108',
      customer: 'Neha Gupta',
      date: '2025-07-13',
      dueDate: '2025-07-23',
      amount: '₹6,798',
      paidAmount: '₹6,798',
      status: 'Paid',
      paymentMethod: 'UPI',
      items: [
        { name: 'Designer Kurti', price: '₹2,499', quantity: 1 },
        { name: 'Palazzo Pants', price: '₹1,499', quantity: 2 }
      ],
      tax: '₹679',
      discount: '₹500',
      notes: 'Paid via PhonePe'
    },
    {
      id: 'BILL-005',
      orderId: 'ORD-109',
      customer: 'Vikram Singh',
      date: '2025-07-14',
      dueDate: '2025-07-24',
      amount: '₹4,398',
      paidAmount: '₹4,398',
      status: 'Paid',
      paymentMethod: 'Debit Card',
      items: [
        { name: 'Denim Jacket', price: '₹2,499', quantity: 1 },
        { name: 'Casual T-Shirt', price: '₹799', quantity: 2 }
      ],
      tax: '₹439',
      discount: '₹150',
      notes: 'Paid at store'
    },
    {
      id: 'BILL-006',
      orderId: 'ORD-110',
      customer: 'Sneha Joshi',
      date: '2025-07-15',
      dueDate: '2025-07-25',
      amount: '₹8,997',
      paidAmount: '₹0',
      status: 'Overdue',
      paymentMethod: '',
      items: [
        { name: 'Silk Saree', price: '₹5,499', quantity: 1 },
        { name: 'Blouse Piece', price: '₹999', quantity: 1 },
        { name: 'Designer Dupatta', price: '₹2,499', quantity: 1 }
      ],
      tax: '₹899',
      discount: '₹0',
      notes: 'Payment reminder sent'
    },
    {
      id: 'BILL-007',
      orderId: 'ORD-111',
      customer: 'Rajesh Iyer',
      date: '2025-07-16',
      dueDate: '2025-07-26',
      amount: '₹2,598',
      paidAmount: '₹2,598',
      status: 'Paid',
      paymentMethod: 'Cash',
      items: [
        { name: 'Cotton Shirt', price: '₹1,299', quantity: 2 }
      ],
      tax: '₹259',
      discount: '₹0',
      notes: 'Paid on delivery'
    },
    {
      id: 'BILL-008',
      orderId: 'ORD-112',
      customer: 'Meera Reddy',
      date: '2025-07-17',
      dueDate: '2025-07-27',
      amount: '₹9,497',
      paidAmount: '₹9,497',
      status: 'Paid',
      paymentMethod: 'Credit Card',
      items: [
        { name: 'Designer Dress', price: '₹6,999', quantity: 1 },
        { name: 'Evening Clutch', price: '₹2,498', quantity: 1 }
      ],
      tax: '₹949',
      discount: '₹500',
      notes: 'Paid via Razorpay'
    }
  ];

  const statusStats = [
    { label: 'Paid', count: allBills.filter(b => b.status === 'Paid').length, color: 'green', icon: CheckCircle },
    { label: 'Partial', count: allBills.filter(b => b.status === 'Partial').length, color: 'blue', icon: Clock },
    { label: 'Unpaid', count: allBills.filter(b => b.status === 'Unpaid').length, color: 'yellow', icon: AlertCircle },
    { label: 'Overdue', count: allBills.filter(b => b.status === 'Overdue').length, color: 'red', icon: AlertCircle }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Partial': return 'bg-blue-100 text-blue-800';
      case 'Unpaid': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBills = allBills.filter(bill => {
    const matchesSearch = bill.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
    const matchesPaymentMethod = paymentMethodFilter === 'all' || bill.paymentMethod === paymentMethodFilter;
    
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setShowViewModal(true);
  };

  const handleEditBill = (bill) => {
    setSelectedBill(bill);
    setShowEditModal(true);
  };

  const handleDeleteBill = (bill) => {
    setSelectedBill(bill);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // In a real app, you would make an API call to delete the bill
    console.log('Bill deleted:', selectedBill.id);
    setShowDeleteModal(false);
    // You would typically refresh the bills list here
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const confirmExport = () => {
    // In a real app, you would generate and download the export file
    console.log('Exporting bills data');
    setShowExportModal(false);
  };

  const saveEditedBill = () => {
    // In a real app, you would make an API call to save the changes
    console.log('Bill updated:', selectedBill);
    setShowEditModal(false);
    // You would typically refresh the bills list here
  };

  const createNewBill = () => {
    // In a real app, you would make an API call to create a new bill
    console.log('New bill created');
    setShowNewBillModal(false);
    // You would typically refresh the bills list here
  };

  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Billing Management</h1>
          <p className="text-gray-600 text-sm">Manage and track all customer bills and payments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowNewBillModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Bill</span>
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
              placeholder="Search bills by customer, ID or order..."
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
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
            </select>

            <select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            >
              <option value="all">All Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              All Bills ({filteredBills.length})
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
                  Bill ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBills.map((bill, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {bill.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bill.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bill.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bill.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bill.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bill.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bill.paidAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewBill(bill)}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditBill(bill)}
                        className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteBill(bill)}
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

        {filteredBills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No bills found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* View Bill Modal */}
      {showViewModal && selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Bill Details: {selectedBill.id}</h3>
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
                      <p className="text-sm font-medium">{selectedBill.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="text-sm font-medium">{selectedBill.orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bill Date</p>
                      <p className="text-sm font-medium">{selectedBill.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="text-sm font-medium">{selectedBill.dueDate}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-sm font-medium">{selectedBill.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Paid Amount</p>
                      <p className="text-sm font-medium">{selectedBill.paidAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedBill.status)}`}>
                        {selectedBill.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="text-sm font-medium">{selectedBill.paymentMethod || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tax</p>
                      <p className="text-sm font-medium">{selectedBill.tax}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Discount</p>
                      <p className="text-sm font-medium">{selectedBill.discount}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Items</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left text-sm font-medium text-gray-500 pb-2">Item</th>
                          <th className="text-right text-sm font-medium text-gray-500 pb-2">Price</th>
                          <th className="text-right text-sm font-medium text-gray-500 pb-2">Qty</th>
                          <th className="text-right text-sm font-medium text-gray-500 pb-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedBill.items.map((item, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-2 text-sm">{item.name}</td>
                            <td className="py-2 text-sm text-right">{item.price}</td>
                            <td className="py-2 text-sm text-right">{item.quantity}</td>
                            <td className="py-2 text-sm text-right">
                              ₹{(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-line">{selectedBill.notes}</p>
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

      {/* Edit Bill Modal */}
      {showEditModal && selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Bill: {selectedBill.id}</h3>
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
                        value={selectedBill.customer}
                        onChange={(e) => setSelectedBill({...selectedBill, customer: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                      <input
                        type="text"
                        value={selectedBill.orderId}
                        onChange={(e) => setSelectedBill({...selectedBill, orderId: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bill Date</label>
                      <input
                        type="date"
                        value={selectedBill.date}
                        onChange={(e) => setSelectedBill({...selectedBill, date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                      <input
                        type="date"
                        value={selectedBill.dueDate}
                        onChange={(e) => setSelectedBill({...selectedBill, dueDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                      <input
                        type="text"
                        value={selectedBill.amount}
                        onChange={(e) => setSelectedBill({...selectedBill, amount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount</label>
                      <input
                        type="text"
                        value={selectedBill.paidAmount}
                        onChange={(e) => setSelectedBill({...selectedBill, paidAmount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={selectedBill.status}
                        onChange={(e) => setSelectedBill({...selectedBill, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Partial">Partial</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                      <select
                        value={selectedBill.paymentMethod}
                        onChange={(e) => setSelectedBill({...selectedBill, paymentMethod: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="">Select Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tax</label>
                      <input
                        type="text"
                        value={selectedBill.tax}
                        onChange={(e) => setSelectedBill({...selectedBill, tax: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                      <input
                        type="text"
                        value={selectedBill.discount}
                        onChange={(e) => setSelectedBill({...selectedBill, discount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Items</h4>
                  <div className="space-y-4">
                    {selectedBill.items.map((item, i) => (
                      <div key={i} className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const newItems = [...selectedBill.items];
                              newItems[i].name = e.target.value;
                              setSelectedBill({...selectedBill, items: newItems});
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => {
                              const newItems = [...selectedBill.items];
                              newItems[i].price = e.target.value;
                              setSelectedBill({...selectedBill, items: newItems});
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newItems = [...selectedBill.items];
                              newItems[i].quantity = parseInt(e.target.value) || 0;
                              setSelectedBill({...selectedBill, items: newItems});
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newItems = [...selectedBill.items, { name: '', price: '₹0', quantity: 1 }];
                        setSelectedBill({...selectedBill, items: newItems});
                      }}
                      className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                  <textarea
                    value={selectedBill.notes}
                    onChange={(e) => setSelectedBill({...selectedBill, notes: e.target.value})}
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
                  onClick={saveEditedBill}
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
      {showDeleteModal && selectedBill && (
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
                <p className="text-sm text-gray-700">Are you sure you want to delete bill <span className="font-medium">{selectedBill.id}</span> for order <span className="font-medium">{selectedBill.orderId}</span>?</p>
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
                  Delete Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Bill Modal */}
      {showNewBillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Bill</h3>
                <button 
                  onClick={() => setShowNewBillModal(false)}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                      <input
                        type="text"
                        placeholder="Enter order ID"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bill Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                      <input
                        type="text"
                        placeholder="₹0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount</label>
                      <input
                        type="text"
                        placeholder="₹0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                        <option value="Partial">Partial</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="">Select Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tax</label>
                      <input
                        type="text"
                        placeholder="₹0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                      <input
                        type="text"
                        placeholder="₹0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Items</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                        <input
                          type="text"
                          placeholder="Enter item name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                          type="text"
                          placeholder="₹0.00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input
                          type="number"
                          placeholder="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>
                    <button
                      className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                  <textarea
                    placeholder="Enter any additional notes..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-24"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewBillModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewBill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Create Bill
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
                <h3 className="text-lg font-medium text-gray-900">Export Bills</h3>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-700 mb-4">Select the format you want to export:</p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="export-csv"
                      name="export-format"
                      value="csv"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="export-csv" className="ml-2 block text-sm text-gray-700">
                      CSV (Comma Separated Values)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="export-excel"
                      name="export-format"
                      value="excel"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="export-excel" className="ml-2 block text-sm text-gray-700">
                      Excel (.xlsx)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="export-pdf"
                      name="export-format"
                      value="pdf"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="export-pdf" className="ml-2 block text-sm text-gray-700">
                      PDF Document
                    </label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
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
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;