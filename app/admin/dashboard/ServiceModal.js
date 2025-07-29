import React from 'react';
import { useState } from 'react';

const ProductModal = ({ onClose, onCreate }) => {
  const [productData, setProductData] = useState({
    category: 'All products > Materials',
    name: '',
    description: '',
    unitOfMeasurement: '- Not specified -',
    code: '',
    sku: '',
    warrantyToClient: false,
    enableExpirationTracking: false,
    enableSerialization: false,
    repairPrice: 0,
    storePrice: 0,
    commissionType: 'percent',
    commissionValue: '',
    barcodes: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    onCreate(productData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-[9999] flex justify-center items-start p-2 sm:p-4 sm:pt-8">
      <div className="bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl max-h-[98vh] sm:max-h-[90vh] shadow-xl rounded-lg overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <h2 className="text-base sm:text-lg font-medium">New product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl sm:text-lg p-1"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(98vh-140px)] sm:max-h-[calc(90vh-120px)]">
          <div className="space-y-3">
            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="flex-1 text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="All products > Materials">All products &gt; Materials</option>
                  <option value="All products > Services">All products &gt; Services</option>
                  <option value="All products > Equipment">All products &gt; Equipment</option>
                </select>
                <button
                  type="button"
                  className="px-2 py-1.5 text-xs border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 whitespace-nowrap"
                >
                  + Category
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <div className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mb-1">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500 text-center px-1">Upload image</span>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[50px] sm:min-h-[60px] resize-none"
                placeholder="Enter description"
              />
            </div>

            {/* Unit of Measurement */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Unit of measurement <span className="text-red-500">*</span>
              </label>
              <select
                name="unitOfMeasurement"
                value={productData.unitOfMeasurement}
                onChange={handleChange}
                className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="- Not specified -">- Not specified -</option>
                <option value="Pieces">Pieces</option>
                <option value="Kilograms">Kilograms</option>
                <option value="Meters">Meters</option>
                <option value="Liters">Liters</option>
              </select>
            </div>

            {/* Code */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Code
              </label>
              <input
                type="text"
                name="code"
                value={productData.code}
                onChange={handleChange}
                className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product code"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleChange}
                className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter SKU"
              />
            </div>

            {/* Barcodes */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Barcodes
              </label>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600 text-xs"
              >
                + Barcode
              </button>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="warrantyToClient"
                  checked={productData.warrantyToClient}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-xs text-gray-700">Warranty to client</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="enableExpirationTracking"
                  checked={productData.enableExpirationTracking}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-xs text-gray-700">Enable expiration tracking</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="enableSerialization"
                  checked={productData.enableSerialization}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-xs text-gray-700">Enable serialization</span>
              </label>
            </div>

            {/* Prices */}
            <div>
              <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Prices</h3>
              <p className="text-xs text-gray-600 mb-2">
                Specify the prices for this product to be used in orders, sales, and invoices. Prices can also be set through postings, where they will be automatically calculated using the settings from the <span className="text-blue-500">Settings &gt; Prices and Discounts</span> page.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Repair price, ₹ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="repairPrice"
                    value={productData.repairPrice}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Store price, ₹ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="storePrice"
                    value={productData.storePrice}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Stock Control */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">Stock control</h3>
                <button
                  type="button"
                  className="self-start sm:self-auto px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                >
                  Rule
                </button>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                When product stock reaches specified minimum level, the system will add it to the Products Below Minimum Stock report in a quantity up to the maximum level.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Warehouse
                  </label>
                  <select className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select warehouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Min. stock level
                  </label>
                  <input
                    type="number"
                    className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Max. stock level
                  </label>
                  <input
                    type="number"
                    className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="text-center py-3 sm:py-4 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-gray-400 mb-1">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" fill="currentColor" viewBox="0 0 100 100">
                    <path d="M20 70 Q30 60, 40 70 T60 70 T80 70" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="75" cy="55" r="6" fill="currentColor"/>
                    <path d="M72 52 L78 52 M75 49 L75 55" stroke="white" strokeWidth="1"/>
                  </svg>
                </div>
                <p className="text-gray-500 font-medium text-sm">No rules yet</p>
                <p className="text-xs text-gray-400 mt-1 px-2 sm:px-4">
                  Set up minimum and maximum stock level for products to use the Products below minimum stock report and make purchase orders on time
                </p>
              </div>
            </div>

            {/* Employee Commissions */}
            <div>
              <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Employee commissions</h3>
              <p className="text-xs text-gray-600 mb-2">
                Set up commissions here to pay your employees an exceptional reward for this item instead of the basic commissions.
              </p>
              
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="commissionType"
                    value="percent"
                    checked={productData.commissionType === 'percent'}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-xs text-gray-700">Percent, %</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="commissionType"
                    value="amount"
                    checked={productData.commissionType === 'amount'}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-xs text-gray-700">Amount, ₹</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 p-3 sm:p-4 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border sm:border-0 rounded sm:rounded-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

// Demo showing the modal
const ProductModalDemo = () => {
  const [showModal, setShowModal] = useState(true);

  const handleCreate = (productData) => {
    console.log('Product created:', productData);
    alert('Product created successfully!');
  };

  const handleClose = () => {
    console.log('Modal closed');
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  return (
    <ProductModal
      onClose={handleClose}
      onCreate={handleCreate}
    />
  );
};

export default ProductModalDemo;