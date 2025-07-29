import React, { useState } from 'react';
import {
  Star,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  Eye,
  TrendingUp,
  Users,
  ClipboardList,
  CreditCard,
  X
} from 'lucide-react';

export default function Agencies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [agenciesData, setAgenciesData] = useState([
    {
      id: 1,
      name: 'StarTex Agency',
      phone: '+91 9876543210',
      email: 'contact@startex.com',
      orders: 25,
      specialty: 'Cotton',
      amount: 125000,
      joinDate: '2023-06-15',
      status: 'In Progress',
      rating: 4.8,
      image: 'ST'
    }
  ]);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    orders: 0,
    specialty: 'Cotton',
    amount: 0,
    status: 'Pending'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const filteredAgencies = agenciesData.filter((agency) => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agency.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agency.phone.includes(searchTerm);
    const matchesFilter = selectedFilter === 'all' || agency.specialty.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const openModal = (type, agency = null) => {
    setModalType(type);
    setSelectedAgency(agency);
    
    if (type === 'edit' && agency) {
      setFormData({
        name: agency.name,
        phone: agency.phone,
        email: agency.email,
        orders: agency.orders,
        specialty: agency.specialty,
        amount: agency.amount,
        status: agency.status
      });
    } else if (type === 'add') {
      setFormData({
        name: '',
        phone: '',
        email: '',
        orders: 0,
        specialty: 'Cotton',
        amount: 0,
        status: 'Pending'
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAgency(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'add') {
      // Add new agency
      const newAgency = {
        id: agenciesData.length + 1,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        rating: 0,
        image: formData.name.substring(0, 2).toUpperCase()
      };
      setAgenciesData([...agenciesData, newAgency]);
    } else if (modalType === 'edit' && selectedAgency) {
      // Update existing agency
      const updatedAgencies = agenciesData.map(agency => 
        agency.id === selectedAgency.id ? { ...agency, ...formData } : agency
      );
      setAgenciesData(updatedAgencies);
    }
    
    closeModal();
  };

  const handleDelete = () => {
    if (selectedAgency) {
      const updatedAgencies = agenciesData.filter(agency => agency.id !== selectedAgency.id);
      setAgenciesData(updatedAgencies);
      closeModal();
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Specialties' },
    { value: 'cotton', label: 'Cotton' },
    { value: 'silk', label: 'Silk' },
    { value: 'linen', label: 'Linen' }
  ];

  // Status styling mapping
  const statusStyles = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800'
  };

  return (
    <div className="space-y-4 sm:space-y-6 text-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Agencies Management</h1>
          <p className="text-gray-600 text-xs sm:text-sm">Manage and monitor agency partners efficiently.</p>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => openModal('add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-2 text-xs sm:text-sm font-medium flex-shrink-0"
          >
            <PlusCircle className="w-3 sm:w-4 h-3 sm:h-4" />
            <span className="hidden xs:inline">Add Agency</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-600">Total Agencies</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">{agenciesData.length}</p>
            </div>
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-600">Total Orders</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">{agenciesData.reduce((sum, a) => sum + a.orders, 0)}</p>
            </div>
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-600">Total Amount Paid</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">₹{agenciesData.reduce((sum, a) => sum + a.amount, 0).toLocaleString()}</p>
            </div>
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter with Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-3 sm:w-4 h-3 sm:h-4" />
            <input
              type="text"
              placeholder="Search agencies..."
              className="w-full pl-8 sm:pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-auto">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] sm:min-w-0">Agency</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-0">Contact</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-0">Orders</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-0">Fabric</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-0">Amount</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-0">Last</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[70px] sm:min-w-0">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-0">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-xs sm:text-sm">
                        {agency.image}
                      </div>
                      <div className="ml-2 sm:ml-4 min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{agency.name}</div>
                        <div className="flex items-center mt-1">
                          <Star className="w-2 sm:w-3 h-2 sm:h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-gray-500 ml-1">{agency.rating}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="text-xs sm:text-sm text-gray-900 truncate">{agency.phone}</div>
                    <div className="text-xs text-gray-500 truncate">{agency.email}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">{agency.orders}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">{agency.specialty}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">₹{agency.amount.toLocaleString()}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">{agency.joinDate}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[agency.status]}`}>
                      {agency.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded" onClick={() => openModal('view', agency)}>
                        <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded" onClick={() => openModal('edit', agency)}>
                        <Edit className="w-3 sm:w-4 h-3 sm:h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded" onClick={() => openModal('delete', agency)}>
                        <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">
                {modalType === 'add' && 'Add New Agency'}
                {modalType === 'edit' && 'Edit Agency'}
                {modalType === 'view' && 'Agency Details'}
                {modalType === 'delete' && 'Delete Agency'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>

            {modalType === 'delete' ? (
              <div className="p-4 sm:p-6">
                <p className="text-gray-700 mb-4 sm:mb-6 text-sm">Are you sure you want to delete {selectedAgency?.name}?</p>
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 order-1 sm:order-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : modalType === 'view' ? (
              <div className="p-4 sm:p-6 space-y-4">
                {selectedAgency && (
                  <>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 h-10 sm:h-12 w-10 sm:w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {selectedAgency.image}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base sm:text-lg font-medium text-gray-900 truncate">{selectedAgency.name}</h4>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-gray-500 ml-1">{selectedAgency.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{selectedAgency.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Email</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{selectedAgency.email}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Total Orders</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedAgency.orders}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Fabric Specialty</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedAgency.specialty}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Total Amount</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">₹{selectedAgency.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Join Date</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedAgency.joinDate}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs sm:text-sm text-gray-500">Status</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 capitalize">{selectedAgency.status}</p>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="p-4 sm:p-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Agency Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                      required
                      disabled={modalType === 'view'}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                      required
                      disabled={modalType === 'view'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                      required
                      disabled={modalType === 'view'}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="orders" className="block text-sm font-medium text-gray-700 mb-1">
                        Total Orders
                      </label>
                      <input
                        type="number"
                        id="orders"
                        name="orders"
                        value={formData.orders}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        required
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div>
                      <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                        Fabric Specialty
                      </label>
                      <select
                        id="specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        required
                        disabled={modalType === 'view'}
                      >
                        <option value="Cotton">Cotton</option>
                        <option value="Silk">Silk</option>
                        <option value="Linen">Linen</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Total Amount (₹)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                      required
                      disabled={modalType === 'view'}
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                      required
                      disabled={modalType === 'view'}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 order-1 sm:order-2"
                  >
                    {modalType === 'add' ? 'Add Agency' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}