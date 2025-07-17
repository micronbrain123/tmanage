import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Settings, 
  Search, 
  HelpCircle,
  Calendar
} from 'lucide-react';

const WorkflowBoard = () => {
  const workflowColumns = [
    { 
      title: 'New', 
      count: 0, 
      color: 'bg-gray-50',
      textColor: 'text-gray-600'
    },
    { 
      title: 'In progress', 
      count: 0, 
      color: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      title: 'Pending', 
      count: 0, 
      color: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    { 
      title: 'Delivered', 
      count: 0, 
      color: 'bg-blue-50',
      textColor: 'text-blue-600'
    }
  ];

  const EmptyStateIcon = () => (
    <div className="w-16 h-16 mx-auto mb-4 opacity-30">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <circle cx="32" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 32c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="16" y="36" width="32" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="42" x2="44" y2="42" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="46" x2="36" y2="46" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="50" x2="40" y2="50" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-semibold text-gray-900">Workflows</h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <div className="w-6 h-6 grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  ))}
                </div>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <div className="w-6 h-6 grid grid-cols-4 gap-1">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  ))}
                </div>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Calendar className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="At least 3 characters" 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </button>
          </div>
        </div>
      </header>

      {/* Action Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700">
              <Plus className="w-4 h-4" />
              <span>Order</span>
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50">
              <Plus className="w-4 h-4" />
              <span>Estimate</span>
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Workflow Board */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-4 gap-6 h-full">
          {workflowColumns.map((column, index) => (
            <div key={index} className={`${column.color} rounded-lg p-4 flex flex-col`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`font-medium ${column.textColor}`}>
                  {column.title} — {column.count}
                </h3>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <EmptyStateIcon />
                <h4 className="font-medium text-gray-600 mb-2">Nothing here yet</h4>
                <p className="text-sm text-gray-500">
                  You don't have any accessible orders in this status group
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowBoard;