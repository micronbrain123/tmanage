import React, { useState } from 'react';
import { Plus, Download, Upload, Settings, Search } from 'lucide-react';

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([
    {
      id: 1,
      barcode: '2100000000050',
      sku: '4321',
      name: 'Corduroy Rib Black (m)',
      image: '#000000',
      category: 'Materials',
      quantity: 45,
      price: 25.00,
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
      price: 18.50,
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

  const selectedCount = products.filter(p => p.selected).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600">
              <Plus className="w-4 h-4" />
              Category
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600">
              <Plus className="w-4 h-4" />
              Product
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <select className="border rounded-md px-3 py-2 bg-white">
              <option>All</option>
              <option>Materials</option>
              <option>Accessories</option>
            </select>
            <button className="border px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="border px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button className="border px-4 py-2 rounded-md hover:bg-gray-50">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r p-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700 mb-3">Category</div>
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  {index === 0 && <span className="text-gray-400">▼</span>}
                  <span className="text-sm text-gray-700">{category.name}</span>
                </div>
                <span className="text-sm text-gray-500">{category.count}</span>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600">Total — {products.length}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedCount === products.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Barcode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={product.selected}
                          onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gray-300 rounded flex items-center justify-center">
                            <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                          </div>
                          {product.barcode}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: product.image }}
                        ></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="text-sm text-gray-600">
                Total — {products.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;