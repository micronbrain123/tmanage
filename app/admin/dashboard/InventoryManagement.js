import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  Download, 
  Plus, 
  Edit, 
  Trash2, 
  Filter, 
  ChevronDown,
  Package,
  TrendingUp,
  FileText,
  RefreshCw,
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
  ShoppingCart,
  BarChart3
} from 'lucide-react';

export default function InventoryManagement() {
  const [activeTab, setActiveTab] = useState('stock');
  const [selectedWarehouse, setSelectedWarehouse] = useState('products-warehouse');
  const [selectedCategory, setSelectedCategory] = useState('all-products');
  const [selectedFilter, setSelectedFilter] = useState('not-specified');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for different tabs
  const stockData = [
    {
      id: 1,
      sku: '0909',
      name: 'Linen Beige (m)',
      image: '/api/placeholder/40/40',
      imageColor: 'bg-amber-100',
      inStock: '0 m',
      minStock: '-',
      repairPrice: 25,
      storePrice: 30,
      warranty: '-',
      expiration: '-'
    },
    {
      id: 2,
      sku: '4321',
      name: 'Corduroy Rib Black (m)',
      image: '/api/placeholder/40/40',
      imageColor: 'bg-gray-900',
      inStock: '0 m',
      minStock: '-',
      repairPrice: 5,
      storePrice: 8,
      warranty: '-',
      expiration: '-'
    },
    {
      id: 3,
      sku: '8765',
      name: 'Denim Blue (m)',
      image: '/api/placeholder/40/40',
      imageColor: 'bg-blue-600',
      inStock: '0 m',
      minStock: '-',
      repairPrice: 10,
      storePrice: 15,
      warranty: '-',
      expiration: '-'
    }
  ];

  const assetsData = [
    {
      id: 1,
      name: 'Sewing Machine A',
      type: 'Equipment',
      location: 'Workshop 1',
      condition: 'Good',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      value: 15000
    },
    {
      id: 2,
      name: 'Cutting Table',
      type: 'Furniture',
      location: 'Workshop 2',
      condition: 'Excellent',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-07-10',
      value: 8000
    }
  ];

  const postingsData = [
    {
      id: 1,
      date: '2024-01-20',
      type: 'Stock In',
      item: 'Linen Beige (m)',
      quantity: '+50 m',
      warehouse: 'Main Warehouse',
      user: 'Admin',
      notes: 'Weekly restock'
    },
    {
      id: 2,
      date: '2024-01-19',
      type: 'Stock Out',
      item: 'Denim Blue (m)',
      quantity: '-25 m',
      warehouse: 'Main Warehouse',
      user: 'John Doe',
      notes: 'Order #1234'
    }
  ];

  const tabs = [
    { id: 'stock', label: 'Stock', icon: Package },
    { id: 'assets', label: 'Assets', icon: BarChart3 },
    { id: 'postings', label: 'Postings', icon: FileText },
    { id: 'conversions', label: 'Conversions', icon: RefreshCw },
    { id: 'writeoffs', label: 'Write-offs', icon: AlertCircle },
    { id: 'transfers', label: 'Transfers', icon: Truck },
    { id: 'stocktakes', label: 'Stock takes', icon: CheckCircle },
    { id: 'returns', label: 'Purchase returns', icon: ArrowUpDown }
  ];

  const renderStockContent = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Warehouse</span>
          <div className="flex items-center gap-1 text-gray-500">
            <span className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white">2</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <select 
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="products-warehouse">Products warehouse</option>
            <option value="materials-warehouse">Materials warehouse</option>
          </select>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="all-products">All products</option>
            <option value="fabrics">Fabrics</option>
            <option value="accessories">Accessories</option>
          </select>
          
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="not-specified">- Not specified -</option>
            <option value="low-stock">Low stock</option>
            <option value="out-of-stock">Out of stock</option>
          </select>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[60px] sm:min-w-0">
                  <div className="flex items-center gap-2">
                    SKU
                    <ArrowUpDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                  </div>
                </th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700">Image</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[100px] sm:min-w-0">
                  <div className="flex items-center gap-2">
                    Name
                    <ArrowUpDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                  </div>
                </th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[70px] sm:min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline">In stock</span>
                    <span className="sm:hidden">Stock</span>
                    <ArrowUpDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                  </div>
                </th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[60px] sm:min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline">Min. stock</span>
                    <span className="sm:hidden">Min</span>
                    <ArrowUpDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                  </div>
                </th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[80px] sm:min-w-0">
                  <div className="flex items-center gap-2">
                    Prices, ₹
                    <ArrowUpDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                  </div>
                </th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[70px] sm:min-w-0">Warranty</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[80px] sm:min-w-0">
                  <span className="hidden sm:inline">Expiration pe...</span>
                  <span className="sm:hidden">Exp.</span>
                </th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-2 sm:p-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{item.sku}</td>
                  <td className="p-2 sm:p-4">
                    <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded ${item.imageColor}`}></div>
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">
                    <span className="truncate block">{item.name}</span>
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{item.inStock}</td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{item.minStock}</td>
                  <td className="p-2 sm:p-4">
                    <div className="space-y-1">
                      <div className="text-xs sm:text-sm text-gray-900">
                        <span className="hidden sm:inline">Repair price: </span>{item.repairPrice}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-900">
                        <span className="hidden sm:inline">Store price: </span>{item.storePrice}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{item.warranty}</td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{item.expiration}</td>
                  <td className="p-2 sm:p-4">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <MoreHorizontal className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-3 sm:px-4 py-3 bg-gray-50 border-t border-gray-200">
          <span className="text-xs sm:text-sm text-gray-700">Total — {stockData.length}</span>
        </div>
      </div>
    </div>
  );

  const renderAssetsContent = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h3 className="text-lg font-semibold text-gray-800">Assets Management</h3>
        <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm self-start sm:self-auto">
          <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
          <span className="hidden xs:inline">Add Asset</span>
        </button>
      </div>
      
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[100px] sm:min-w-0">Asset Name</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[60px] sm:min-w-0">Type</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[80px] sm:min-w-0">Location</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[70px] sm:min-w-0">Condition</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[80px] sm:min-w-0">
                  <span className="hidden sm:inline">Last Maintenance</span>
                  <span className="sm:hidden">Last</span>
                </th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[80px] sm:min-w-0">
                  <span className="hidden sm:inline">Next Maintenance</span>
                  <span className="sm:hidden">Next</span>
                </th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[70px] sm:min-w-0">Value (₹)</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[70px] sm:min-w-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assetsData.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">
                    <span className="truncate block">{asset.name}</span>
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{asset.type}</td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{asset.location}</td>
                  <td className="p-2 sm:p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      asset.condition === 'Good' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {asset.condition}
                    </span>
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{asset.lastMaintenance}</td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{asset.nextMaintenance}</td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{asset.value.toLocaleString()}</td>
                  <td className="p-2 sm:p-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Eye className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Edit className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPostingsContent = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h3 className="text-lg font-semibold text-gray-800">Inventory Postings</h3>
        <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm self-start sm:self-auto">
          <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
          <span className="hidden xs:inline">New Posting</span>
        </button>
      </div>
      
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[70px] sm:min-w-0">Date</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[60px] sm:min-w-0">Type</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[80px] sm:min-w-0">Item</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[60px] sm:min-w-0">Quantity</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[80px] sm:min-w-0">Warehouse</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[60px] sm:min-w-0">User</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[70px] sm:min-w-0">Notes</th>
                <th className="text-left p-2 sm:p-4 font-medium text-gray-700 min-w-[60px] sm:min-w-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {postingsData.map((posting) => (
                <tr key={posting.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{posting.date}</td>
                  <td className="p-2 sm:p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      posting.type === 'Stock In' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {posting.type}
                    </span>
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">
                    <span className="truncate block">{posting.item}</span>
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{posting.quantity}</td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{posting.warehouse}</td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">{posting.user}</td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-900">
                    <span className="truncate block">{posting.notes}</span>
                  </td>
                  <td className="p-2 sm:p-4">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Eye className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPlaceholderContent = (tabName) => (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 sm:p-12 text-center">
      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <Package className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 capitalize">{tabName}</h3>
      <p className="text-gray-500 text-sm sm:text-base">This section is under development</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'stock':
        return renderStockContent();
      case 'assets':
        return renderAssetsContent();
      case 'postings':
        return renderPostingsContent();
      default:
        return renderPlaceholderContent(activeTab);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Inventory</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3 sm:w-4 h-3 sm:h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-32 sm:w-auto"
            />
          </div>
          <button className="text-gray-600 hover:text-gray-800">
            <span className="text-xs sm:text-sm">Help</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 py-3 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-3 sm:w-4 h-3 sm:h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="min-h-[400px] sm:min-h-[600px]">
        {renderContent()}
      </div>
    </div>
  );
}