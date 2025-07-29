"use client";

import { PlusCircle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState('in-progress');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Tasks</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Assign tasks to complete work on time</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm flex-shrink-0 self-start sm:self-auto">
          <PlusCircle className="w-4 h-4" />
          <span className="hidden xs:inline">Create task</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-md shadow-sm p-3 mb-4">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-2">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm ${activeTab === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
            >
              All tasks
            </button>
            <button
              onClick={() => setActiveTab('assigned-to-me')}
              className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm ${activeTab === 'assigned-to-me' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
            >
              <span className="hidden sm:inline">Assigned to me</span>
              <span className="sm:hidden">To me</span>
            </button>
            <button
              onClick={() => setActiveTab('assigned-by-me')}
              className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm ${activeTab === 'assigned-by-me' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
            >
              <span className="hidden sm:inline">Assigned by me</span>
              <span className="sm:hidden">By me</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select className="border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm min-w-0 flex-1 sm:flex-none sm:w-auto">
              <option>Author: All</option>
              <option>My tasks</option>
              <option>Team tasks</option>
            </select>

            <select className="border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm min-w-0 flex-1 sm:flex-none sm:w-auto">
              <option>This month</option>
              <option>Today</option>
              <option>This week</option>
            </select>

            <div className="w-full sm:w-auto sm:ml-auto">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md px-2 py-1 pl-8 text-xs sm:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 sm:gap-2 mb-3 overflow-x-auto">
        <button
          onClick={() => setStatusFilter('in-progress')}
          className={`px-3 sm:px-4 py-2 rounded-t-md text-xs sm:text-sm font-medium whitespace-nowrap ${statusFilter === 'in-progress' ? 'bg-white border-t-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <div className="flex items-center gap-1">
            <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
            <span className="hidden sm:inline">In progress</span>
            <span className="sm:hidden">Progress</span>
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('done')}
          className={`px-3 sm:px-4 py-2 rounded-t-md text-xs sm:text-sm font-medium whitespace-nowrap ${statusFilter === 'done' ? 'bg-white border-t-2 border-green-500 text-green-600' : 'text-gray-500'}`}
        >
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4" />
            Done
          </div>
        </button>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        {statusFilter === 'in-progress' ? (
          <div className="p-4 sm:p-6 text-center">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-1">No tasks in progress</h3>
            <p className="text-xs text-gray-500 mb-3">Assign tasks to complete work</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md inline-flex items-center gap-1.5 text-xs sm:text-sm">
              <PlusCircle className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="hidden xs:inline">Create task</span>
            </button>
          </div>
        ) : (
          <div className="p-4 sm:p-6 text-center">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-1">No completed tasks</h3>
            <p className="text-xs text-gray-500">Completed tasks appear here</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-gray-500">
        <div>ENG | IN</div>
        <div className="text-right sm:text-left">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} |{' '}
          {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}