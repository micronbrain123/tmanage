"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Scissors, 
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  ArrowUpDown,
  Calendar as CalendarIcon
} from 'lucide-react';

export default function MyOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortField, setSortField] = useState('deliveryDate');
  const [sortDirection, setSortDirection] = useState('asc');

  const orders = [
    { 
      id: 'ORD-012', 
      customer: 'Rajesh Kumar', 
      item: 'Wedding Suit', 
      status: 'Cutting', 
      deliveryDate: '2025-07-15', 
      assignedDate: '2025-07-05',
      amount: '₹1,500',
      priority: 'High',
      measurements: 'View',
      instructions: 'Special stitching for shoulders'
    },
    { 
      id: 'ORD-018', 
      customer: 'Priya Sharma', 
      item: 'Saree Blouse', 
      status: 'Stitching', 
      deliveryDate: '2025-07-12', 
      assignedDate: '2025-07-03',
      amount: '₹800',
      priority: 'Medium',
      measurements: 'View',
      instructions: 'Needs fitting adjustment'
    },
    { 
      id: 'ORD-023', 
      customer: 'Amit Patel', 
      item: 'Formal Shirt', 
      status: 'Quality Check', 
      deliveryDate: '2025-07-10', 
      assignedDate: '2025-07-01',
      amount: '₹600',
      priority: 'Low',
      measurements: 'View',
      instructions: 'Standard pattern'
    },
    { 
      id: 'ORD-027', 
      customer: 'Neha Gupta', 
      item: 'Designer Kurti', 
      status: 'Cutting', 
      deliveryDate: '2025-07-18', 
      assignedDate: '2025-07-07',
      amount: '₹1,200',
      priority: 'High',
      measurements: 'View',
      instructions: 'Custom embroidery needed'
    },
    { 
      id: 'ORD-031', 
      customer: 'Vikram Singh', 
      item: 'Blazer', 
      status: 'Ready', 
      deliveryDate: '2025-07-08', 
      assignedDate: '2025-06-28',
      amount: '₹2,000',
      priority: 'Medium',
      measurements: 'View',
      instructions: 'Double stitching required'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Cutting': return 'bg-yellow-100 text-yellow-800';
      case 'Stitching': return 'bg-blue-100 text-blue-800';
      case 'Quality Check': return 'bg-purple-100 text-purple-800';
      case 'Ready': return 'bg-green-100 text-green-800';
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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.item.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || order.status === statusFilter;
      
      const matchesPriority = 
        priorityFilter === 'all' || order.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (sortField === 'deliveryDate') {
        return sortDirection === 'asc' 
          ? new Date(a.deliveryDate) - new Date(b.deliveryDate)
          : new Date(b.deliveryDate) - new Date(a.deliveryDate);
      }
      if (sortField === 'priority') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return sortDirection === 'asc' 
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortField === 'amount') {
        const amountA = parseInt(a.amount.replace(/[^0-9]/g, ''));
        const amountB = parseInt(b.amount.replace(/[^0-9]/g, ''));
        return sortDirection === 'asc' ? amountA - amountB : amountB - amountA;
      }
      return 0;
    });

  const updateOrderStatus = (orderId, newStatus) => {
    // In a real app, this would call an API to update the status
    console.log(`Updating order ${orderId} to status ${newStatus}`);
    // You would typically update state here after API call
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header with search and filters */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-800">My Orders</h3>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium">Filters</span>
              {showFilters ? (
                <ChevronUp className="w-4 h-4 ml-1 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
              )}
            </button>
          </div>
        </div>
        
        {/* Filters panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Cutting">Cutting</option>
                  <option value="Stitching">Stitching</option>
                  <option value="Quality Check">Quality Check</option>
                  <option value="Ready">Ready</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setPriorityFilter('all');
                  }}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  Order ID
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('priority')}
              >
                <div className="flex items-center">
                  Priority
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('deliveryDate')}
              >
                <div className="flex items-center">
                  Delivery Date
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center">
                  Earnings
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />
                      {order.deliveryDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          // View details action
                          console.log(`View details for order ${order.id}`);
                        }}
                      >
                        View
                      </button>
                      <div className="relative inline-block text-left">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {/* Dropdown menu would go here */}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                  No orders found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Order Details Modal (would be implemented in a real app) */}
      {/* <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} /> */}
      
      {/* Status Update Panel (example for one order) */}
      {/* This would be dynamic in a real app */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Update Order Status</h4>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => updateOrderStatus('ORD-012', 'Cutting')}
            className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full hover:bg-yellow-200"
          >
            Cutting
          </button>
          <button 
            onClick={() => updateOrderStatus('ORD-012', 'Stitching')}
            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200"
          >
            Stitching
          </button>
          <button 
            onClick={() => updateOrderStatus('ORD-012', 'Quality Check')}
            className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full hover:bg-purple-200"
          >
            Quality Check
          </button>
          <button 
            onClick={() => updateOrderStatus('ORD-012', 'Ready')}
            className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full hover:bg-green-200"
          >
            Ready
          </button>
        </div>
      </div>
    </div>
  );
}