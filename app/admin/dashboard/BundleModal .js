import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import CategoryModal from './CategoryModal';

const BundleModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'All bundles > Bundles',
    description: '',
    barcode: '',
    laborServiceProduct: ''
  });

  const [bundleItems, setBundleItems] = useState([]);
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
      items: bundleItems
    });
  };

  const addBundleItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      price: 0,
      qty: 1,
      amount: 0
    };
    setBundleItems(prev => [...prev, newItem]);
  };

  const updateBundleItem = (id, field, value) => {
    setBundleItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'price' || field === 'qty') {
          updated.amount = updated.price * updated.qty;
        }
        return updated;
      }
      return item;
    }));
  };

  const removeBundleItem = (id) => {
    setBundleItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCategorySelect = (selectedCategory) => {
    setFormData(prev => ({
      ...prev,
      category: selectedCategory
    }));
  };

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">New bundle</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="p-4 space-y-4">
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

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-md bg-gray-50">
                  {formData.category}
                </div>
                <button
                  type="button"
                  className="px-2 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
                  onClick={openCategoryModal}
                >
                  <Plus className="w-3 h-3" />
                  Category
                </button>
              </div>
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

            {/* Barcode */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Barcode</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.barcode}
                  onChange={(e) => handleInputChange('barcode', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  className="px-2 py-1 text-xs text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Barcode
                </button>
              </div>
            </div>

            {/* Labor, service, or product */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Labor, service, or product <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.laborServiceProduct}
                onChange={(e) => handleInputChange('laborServiceProduct', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Name, barcode, code, SKU, or serial number</option>
                <option value="product1">Product 1</option>
                <option value="service1">Service 1</option>
                <option value="labor1">Labor 1</option>
              </select>
            </div>

            {/* Bundle Items Table */}
            <div>
              <div className="border border-gray-200 rounded-md">
                <div className="grid grid-cols-12 gap-2 p-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-2">Price, ₹</div>
                  <div className="col-span-2">Qty</div>
                  <div className="col-span-2">Amount, ₹</div>
                  <div className="col-span-1"></div>
                </div>
                
                {bundleItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 opacity-30">
                      <svg viewBox="0 0 64 64" className="w-full h-full text-gray-400">
                        <path fill="currentColor" d="M32 8c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zm0 44c-11.046 0-20-8.954-20-20s8.954-20 20-20 20 8.954 20 20-8.954 20-20 20z"/>
                        <path fill="currentColor" d="M40 28H24c-2.209 0-4 1.791-4 4s1.791 4 4 4h16c2.209 0 4-1.791 4-4s-1.791-4-4-4z"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">No items added yet</p>
                  </div>
                ) : (
                  bundleItems.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 p-2 border-b border-gray-100 last:border-b-0">
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateBundleItem(item.id, 'name', e.target.value)}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Item name"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateBundleItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateBundleItem(item.id, 'qty', parseInt(e.target.value) || 1)}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          min="1"
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="px-2 py-1 text-xs text-gray-600">
                          ₹{item.amount.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => removeBundleItem(item.id)}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <button
                type="button"
                onClick={addBundleItem}
                className="mt-2 px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add Item
              </button>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CategoryModal - Same pattern as ProductModal */}
      {isCategoryModalOpen && (
        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onSelectCategory={handleCategorySelect}
        />
      )}
    </>
  );
};

// DEMO COMPONENT TO TEST MODAL
const BundleModalDemo = () => {
  const [open, setOpen] = useState(true);

  const handleSubmit = (formData) => {
    console.log('Bundle form submitted:', formData);
    alert('Bundle created successfully!');
  };

  const handleClose = () => {
    console.log('Bundle modal closed');
    setOpen(false);
  };

  return (
    <BundleModal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default BundleModalDemo;