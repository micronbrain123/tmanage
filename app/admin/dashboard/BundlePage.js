import React, { useState } from 'react';
import { Plus, Download, Upload, Settings, Package } from 'lucide-react';
import CategoryModal from './CategoryModal';
import BundleModal from './BundleModal ';

const BundlePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [bundles, setBundles] = useState([
    {
      id: 1,
      barcode: '210000000074',
      name: 'Tailoring (Linen Suit)',
      description: 'Premium linen suit tailoring service',
      price: 207.5,
      selected: false
    },
    {
      id: 2,
      barcode: '210000000085',
      name: 'Wedding Package',
      description: 'Complete wedding attire package',
      price: 450.0,
      selected: false
    },
    {
      id: 3,
      barcode: '210000000096',
      name: 'Formal Wear Bundle',
      description: 'Business formal wear collection',
      price: 320.75,
      selected: false
    }
  ]);

  const categories = [
    { name: 'All bundles', count: bundles.length },
    { name: 'Tailoring', count: bundles.filter(b => b.name.includes('Tailoring')).length },
    { name: 'Packages', count: bundles.filter(b => b.name.includes('Package')).length }
  ];

  const handleSelectAll = (checked) => {
    setBundles(bundles.map(bundle => ({ ...bundle, selected: checked })));
  };

  const handleSelectBundle = (id, checked) => {
    setBundles(bundles.map(bundle =>
      bundle.id === id ? { ...bundle, selected: checked } : bundle
    ));
  };

  const handleCategoryClick = () => {
    setShowCategoryModal(true);
  };

  const handleBundleClick = () => {
    setShowBundleModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };

  const handleCloseBundleModal = () => {
    setShowBundleModal(false);
  };

  const selectedCount = bundles.filter(b => b.selected).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={handleCategoryClick}
              className="bg-green-500 text-white px-3 py-2 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-green-600"
            >
              <Plus className="w-3 h-3" />
              <span className="hidden xs:inline">Category</span>
            </button>
            <button 
              onClick={handleBundleClick}
              className="bg-green-500 text-white px-3 py-2 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-green-600"
            >
              <Plus className="w-3 h-3" />
              <span className="hidden xs:inline">Bundle</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select className="border border-gray-200 rounded px-2 py-2 text-sm bg-white min-w-0">
              <option>All</option>
              <option>Tailoring</option>
              <option>Packages</option>
            </select>
            <button className="border border-gray-200 px-2 sm:px-3 py-2 rounded text-sm flex items-center gap-1.5 hover:bg-gray-50">
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="border border-gray-200 px-2 sm:px-3 py-2 rounded text-sm flex items-center gap-1.5 hover:bg-gray-50">
              <Upload className="w-3 h-3" />
              <span className="hidden sm:inline">Import</span>
            </button>
            <button className="border border-gray-200 px-2 py-2 rounded hover:bg-gray-50">
              <Settings className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-56 bg-white p-3 sm:p-4 lg:min-h-[calc(100vh-73px)]">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-gray-600 mb-2">Category</div>
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {index === 0 && <span className="text-gray-400 text-xs flex-shrink-0">▼</span>}
                  <span className="text-sm text-gray-700 truncate">{category.name}</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded flex-shrink-0 ml-2">
                  {category.count}
                </span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t lg:border-t-0">
              <div className="text-sm text-gray-600 font-medium">Total — {bundles.length}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 min-w-0">
          {/* Bundles Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b"> 
                  <tr>
                    <th className="px-2 sm:px-4 py-3 text-left w-8 sm:w-12">
                      <input
                        type="checkbox"
                        checked={selectedCount === bundles.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-0">
                      Name
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] sm:min-w-0">
                      Description
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-0">
                      Barcode
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-0">
                      Price, ₹
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bundles.map((bundle) => (
                    <tr key={bundle.id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-3">
                        <input
                          type="checkbox"
                          checked={bundle.selected}
                          onChange={(e) => handleSelectBundle(bundle.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs text-gray-900">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Package className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{bundle.name}</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs text-gray-900">
                        <span className="truncate block">{bundle.description}</span>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs text-gray-900">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="w-1 h-4 bg-gray-400 flex-shrink-0"></div>
                          <span className="truncate">{bundle.barcode}</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs text-gray-900 font-medium">
                        <span className="whitespace-nowrap">₹{bundle.price.toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-3 sm:px-4 py-3 bg-gray-50">
              <div className="text-xs text-gray-600 font-medium">
                Total — {bundles.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCategoryModal && (
        <CategoryModal onClose={handleCloseCategoryModal} />
      )}
      
      {showBundleModal && (
        <BundleModal onClose={handleCloseBundleModal} />
      )}
    </div>
  );
};

export default BundlePage;