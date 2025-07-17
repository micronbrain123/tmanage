"use client";

import { PlusCircle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState('in-progress');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">Assign tasks to complete work on time</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm">
          <PlusCircle className="w-4 h-4" />
          Create task
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-md shadow-sm p-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md text-sm ${activeTab === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
            >
              All tasks
            </button>
            <button
              onClick={() => setActiveTab('assigned-to-me')}
              className={`px-3 py-1 rounded-md text-sm ${activeTab === 'assigned-to-me' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
            >
              Assigned to me
            </button>
            <button
              onClick={() => setActiveTab('assigned-by-me')}
              className={`px-3 py-1 rounded-md text-sm ${activeTab === 'assigned-by-me' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
            >
              Assigned by me
            </button>
          </div>

          <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option>Author: All</option>
            <option>My tasks</option>
            <option>Team tasks</option>
          </select>

          <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option>This month</option>
            <option>Today</option>
            <option>This week</option>
          </select>

          <div className="ml-auto">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md px-2 py-1 pl-8 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-40"
            />
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex space-x-2 mb-3">
        <button
          onClick={() => setStatusFilter('in-progress')}
          className={`px-4 py-2 rounded-t-md text-sm font-medium ${statusFilter === 'in-progress' ? 'bg-white border-t-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            In progress
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('done')}
          className={`px-4 py-2 rounded-t-md text-sm font-medium ${statusFilter === 'done' ? 'bg-white border-t-2 border-green-500 text-green-600' : 'text-gray-500'}`}
        >
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Done
          </div>
        </button>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        {statusFilter === 'in-progress' ? (
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-800 mb-1">No tasks in progress</h3>
            <p className="text-xs text-gray-500 mb-3">Assign tasks to complete work</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md inline-flex items-center gap-1.5 text-sm">
              <PlusCircle className="w-4 h-4" />
              Create task
            </button>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-800 mb-1">No completed tasks</h3>
            <p className="text-xs text-gray-500">Completed tasks appear here</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <div>ENG | IN</div>
        <div>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} |{' '}
          {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}