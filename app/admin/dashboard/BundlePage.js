import React, { useState } from 'react';
import { Plus, Download, Upload, Settings, Package } from 'lucide-react';

const BundlePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bundles, setBundles] = useState([
    {
      id: 1,
      barcode: '210000000074',
      name: 'Tailoring (Linen Suit)',
      description: 'Premium linen suit tailoring service',
      price: 207.50,
      selected: false
    },
    {
      id: 2,
      barcode: '210000000085',
      name: 'Wedding Package',
      description: 'Complete wedding attire package',
      price: 450.00,
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

  const selectedCount = bundles.filter(b => b.selected).length;

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
              Bundle
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <select className="border rounded-md px-3 py-2 bg-white">
              <option>All</option>
              <option>Tailoring</option>
              <option>Packages</option>
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
              <div className="text-sm text-gray-600">Total — {bundles.length}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Bundles Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedCount === bundles.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Barcode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price, ₹
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bundles.map((bundle) => (
                    <tr key={bundle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={bundle.selected}
                          onChange={(e) => handleSelectBundle(bundle.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          {bundle.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {bundle.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-4 bg-gray-400"></div>
                          {bundle.barcode}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{bundle.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="text-sm text-gray-600">
                Total — {bundles.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundlePage;