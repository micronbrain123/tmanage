import React, { useState } from 'react';
import { X, Plus, Upload } from 'lucide-react';
import CategoryModal from './CategoryModal';

const ProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    category: 'All products > Materials',
    name: '',
    description: '',
    unitOfMeasurement: '- Not specified -',
    code: '',
    sku: '',
    warrantyToClient: false,
    enableExpirationTracking: false,
    enableSerialization: false,
    repairPrice: '0',
    storePrice: '0',
    commissionType: 'percent',
    commissionValue: ''
  });

  const [image, setImage] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      image, // Include uploaded image in the submission
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">New product</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>All products &gt; Materials</option>
                  <option>All products &gt; Services</option>
                  <option>All products &gt; Equipment</option>
                </select>
                <button
                  type="button"
                  className="px-2 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
                  onClick={() => setIsCategoryModalOpen(true)}
                >
                  <Plus className="w-3 h-3" />
                  Category
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex justify-center">
              <label
                htmlFor="image-upload"
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500 text-center">Upload the image</span>
                  </>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImage(file);
                    }
                  }}
                />
              </label>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Unit of Measurement */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Unit of measurement <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.unitOfMeasurement}
                onChange={(e) => handleInputChange('unitOfMeasurement', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                <option>- Not specified -</option>
                <option>Pieces</option>
                <option>Kilograms</option>
                <option>Meters</option>
                <option>Liters</option>
              </select>
            </div>

            {/* Code */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              {[
                { label: 'Warranty to client', field: 'warrantyToClient' },
                { label: 'Enable expiration tracking', field: 'enableExpirationTracking' },
                { label: 'Enable serialization', field: 'enableSerialization' }
              ].map(({ label, field }) => (
                <label key={field} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-xs text-gray-700">{label}</span>
                </label>
              ))}
            </div>

            {/* Prices */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Prices</h3>
              <p className="text-xs text-gray-600 mb-2">
                Specify prices to use in orders, sales, and invoices. These can also be calculated
                using settings from the{' '}
                <span className="text-blue-500">Settings &gt; Prices and Discounts</span> page.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Repair price, ₹', field: 'repairPrice' },
                  { label: 'Store price, ₹', field: 'storePrice' }
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="0.01"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Commission */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Employee commissions</h3>
              <div className="flex items-center gap-3">
                {['percent', 'amount'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="commissionType"
                      value={type}
                      checked={formData.commissionType === type}
                      onChange={(e) => handleInputChange('commissionType', e.target.value)}
                      className="text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-xs text-gray-700">
                      {type === 'percent' ? 'Percent, %' : 'Amount, ₹'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CategoryModal */}
      {isCategoryModalOpen && (
        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
        />
      )}
    </>
  );
};

// DEMO COMPONENT TO TEST MODAL
const ProductModalDemo = () => {
  const [open, setOpen] = useState(true);

  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    alert('Product created successfully!');
  };

  const handleClose = () => {
    console.log('Modal closed');
    setOpen(false);
  };

  return (
    <ProductModal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default ProductModalDemo;