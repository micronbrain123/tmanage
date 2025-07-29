import React, { useState } from 'react';
import { Plus, Download, Upload, Settings, Search } from 'lucide-react';
import CategoryModal from './CategoryModal';
import ProductModal from './ProductModal';

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      barcode: '2100000000050',
      sku: '4321',
      name: 'Corduroy Rib Black (m)',
      image: '#000000',
      category: 'Materials',
      quantity: 45,
      price: 25.0,
      selected: false
    },
    {
      id: 2,
      barcode: '2100000000036',
      sku: '8765',
      name: 'Denim Blue (m)',
      image: '#4169E1',
      category: 'Materials',
      quantity: 23,
      price: 18.5,
      selected: false
    },
    {
      id: 3,
      barcode: '2100000000012',
      sku: '0909',
      name: 'Linen Beige (m)',
      image: '#F5F5DC',
      category: 'Materials',
      quantity: 67,
      price: 22.75,
      selected: false
    }
  ]);

  const categories = [
    { name: 'All products', count: products.length },
    { name: 'Materials', count: products.filter(p => p.category === 'Materials').length }
  ];

  const handleSelectAll = (checked) => {
    setProducts(products.map(product => ({ ...product, selected: checked })));
  };

  const handleSelectProduct = (id, checked) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, selected: checked } : product
    ));
  };

  const handleOpenCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };

  const handleOpenProductModal = () => {
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
  };

  const selectedCount = products.filter(p => p.selected).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={handleOpenCategoryModal}
              className="bg-green-500 text-white px-3 py-2 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-green-600"
            >
              <Plus className="w-3 h-3" />
              <span className="hidden xs:inline">Category</span>
            </button>
            <button 
              onClick={handleOpenProductModal}
              className="bg-green-500 text-white px-3 py-2 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-green-600"
            >
              <Plus className="w-3 h-3" />
              <span className="hidden xs:inline">Product</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select className="border border-gray-200 rounded px-2 py-2 text-sm bg-white min-w-0">
              <option>All</option>
              <option>Materials</option>
              <option>Accessories</option>
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
              <div className="text-sm text-gray-600 font-medium">Total — {products.length}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 min-w-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-2 sm:px-4 py-3 text-left w-8 sm:w-12">
                      <input
                        type="checkbox"
                        checked={selectedCount === products.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-0">
                      Barcode
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[60px] sm:min-w-0">
                      SKU
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[50px] sm:min-w-0">
                      Image
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-0">
                      Name
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-0">
                      Quantity
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[70px] sm:min-w-0">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-3">
                        <input
                          type="checkbox"
                          checked={product.selected}
                          onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs text-gray-900">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="w-3 h-3 bg-gray-300 rounded flex items-center justify-center flex-shrink-0">
                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-sm"></div>
                          </div>
                          <span className="truncate">{product.barcode}</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs text-gray-900 font-medium">
                        <span className="truncate block">{product.sku}</span>
                      </td>
                      <td className="px-2 sm:px-4 py-3">
                        <div
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded flex-shrink-0"
                          style={{ backgroundColor: product.image }}
                        ></div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs text-gray-900">
                        <span className="truncate block">{product.name}</span>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs text-gray-900">
                        <span className="bg-gray-100 px-1.5 sm:px-2 py-1 rounded text-xs whitespace-nowrap">{product.quantity}</span>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs text-gray-900 font-medium">
                        <span className="whitespace-nowrap">${product.price.toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-3 sm:px-4 py-3 bg-gray-50">
              <div className="text-xs text-gray-600 font-medium">
                Total — {products.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <CategoryModal 
          isOpen={showCategoryModal}
          onClose={handleCloseCategoryModal}
        />
      )}

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal 
          isOpen={showProductModal}
          onClose={handleCloseProductModal}
        />
      )}
    </div>
  );
};

export default ProductPage;