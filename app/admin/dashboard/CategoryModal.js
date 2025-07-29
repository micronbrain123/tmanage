import React, { useState } from 'react';

const CategoryModal = ({ onClose, onCreate }) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [parentCategory, setParentCategory] = useState('All labors and services');
  const [commissions, setCommissions] = useState([]);

  const addCommission = () => {
    setCommissions([...commissions, { calculationRule: '', commission: '' }]);
  };

  const handleCreate = () => {
    onCreate({ categoryTitle, parentCategory, commissions });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-[9999] flex justify-center items-start p-4 sm:pt-8">
      <div className="bg-white w-full max-w-md sm:max-w-lg lg:max-w-xl max-h-[95vh] sm:max-h-[90vh] shadow-xl rounded-lg overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <h2 className="text-base sm:text-lg font-medium">Add category</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl sm:text-lg p-1"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-120px)]">
          <div className="space-y-4">
            {/* Category Title */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Category title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category title"
              />
            </div>

            {/* Parent Category */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Parent category <span className="text-red-500">*</span>
              </label>
              <select
                value={parentCategory}
                onChange={(e) => setParentCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All labors and services">All labors and services</option>
                <option value="Bridal">Bridal</option>
                <option value="General">General</option>
                <option value="Denim">Denim</option>
              </select>
            </div>

            {/* Employee Exceptional Commissions */}
            <div>
              <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-3 sm:mb-4">Employee exceptional commissions</h3>

              {/* Commission Headers - Hidden on mobile, visible on larger screens */}
              <div className="hidden sm:flex gap-4 mb-2">
                <div className="flex-1 text-xs font-medium text-gray-700">Calculation rule</div>
                <div className="flex-1 text-xs font-medium text-gray-700">Commission</div>
              </div>

              {/* Commission Rows */}
              {commissions.map((commission, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-2">
                  {/* Mobile: Show label above each field */}
                  <div className="flex-1">
                    <label className="block sm:hidden text-xs font-medium text-gray-700 mb-1">
                      Calculation rule
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select calculation rule</option>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed amount</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block sm:hidden text-xs font-medium text-gray-700 mb-1">
                      Commission
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter commission"
                    />
                  </div>
                </div>
              ))}

              {/* No Commissions State */}
              {commissions.length === 0 && (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="text-gray-400 text-xl sm:text-2xl">📄</div>
                  </div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-2">No commissions yet</h4>
                  <p className="text-gray-600 text-xs mb-3 sm:mb-4 px-2 sm:px-0">
                    Set up commissions here to pay your employees an exceptional reward for this category instead of the basic commissions
                  </p>
                  <button
                    onClick={addCommission}
                    className="text-blue-500 hover:text-blue-700 text-xs"
                  >
                    Add commission
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 p-3 sm:p-4 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 text-sm border sm:border-0 rounded sm:rounded-none"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;