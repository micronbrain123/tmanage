import React, { useState } from "react";
import {Search, Edit, Trash2, Eye, X, UserPlus, CheckCircle,} from "lucide-react";

export default function Vendors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);
  const [selectedVendor, setSelectedVendor] =
    useState(null);
  const [showDetailsModal, setShowDetailsModal] =
    useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [vendors, setVendors] = useState([
    {
      id: "VEND-001",
      name: "Elite Fabrics Co.",
      email: "contact@elitefabrics.com",
      password: "elitefabrics123",
      phone: "+91 9123456780",
      address: "456 Textile Lane, Surat, GJ 395003",
      joinDate: "2023-09-10",
      totalSupplies: 15,
      totalAmount: 125000,
      lastSupply: "2025-06-28",
      status: "In Progress",
      assignedItems: [
        "Cotton Fabric",
        "Silk Fabric",
        "Linen",
      ],
      currentWork: "Saree",
      promiseDays: 10,
      dayProgress: 6,
      updates: [
        {
          date: "2025-07-01",
          note: "Fabric cutting started",
          status: "In Progress",
        },
        {
          date: "2025-07-04",
          note: "Stitching 50% complete",
          status: "In Progress",
        },
        {
          date: "2025-07-07",
          note: "Sent for final pressing",
          status: "Pending",
        },
      ],
      notes: "Reliable supplier for premium fabrics.",
      recentSupplies: [
        {
          id: "SUP-010",
          item: "Cotton Fabric",
          amount: 25000,
          status: "Delivered",
        },
        {
          id: "SUP-015",
          item: "Silk Fabric",
          amount: 45000,
          status: "In Transit",
        },
      ],
    },
  ]);

  const [newVendor, setNewVendor] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    status: "Active",
  });

  const filterOptions = [
    { value: "all", label: "All Vendors" },
    { value: "Pending", label: "Pending" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vendor.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm);

    const matchesFilter =
      selectedFilter === "all" ||
      vendor.status.toLowerCase() ===
        selectedFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const sortedVendors = [...filteredVendors].sort(
    (a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (
        sortBy === "totalAmount" ||
        sortBy === "totalSupplies"
      ) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }
  );

  const handleAddVendor = () => {
    setNewVendor({
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "Active",
    });
    setShowAddModal(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = `VEND-${String(
      vendors.length + 1
    ).padStart(3, "0")}`;
    const vendorToAdd = {
      ...newVendor,
      id: newId,
      joinDate: new Date().toISOString().split("T")[0],
      totalSupplies: 0,
      totalAmount: 0,
      assignedItems: [],
      updates: [],
      recentSupplies: [],
    };
    setVendors([...vendors, vendorToAdd]);
    setShowAddModal(false);
  };

  const handleEditVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedVendors = vendors.map((vendor) =>
      vendor.id === selectedVendor.id
        ? selectedVendor
        : vendor
    );
    setVendors(updatedVendors);
    setShowEditModal(false);
  };

  const handleDeleteVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedVendors = vendors.filter(
      (vendor) => vendor.id !== selectedVendor.id
    );
    setVendors(updatedVendors);
    setShowDeleteModal(false);
  };

  const handleViewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowDetailsModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({ ...newVendor, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedVendor({ ...selectedVendor, [name]: value });
  };

  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Vendors Management
          </h1>
          <p className="text-gray-600 text-sm">
            Manage your vendor database
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddVendor}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Vendor</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">
                Total Vendors
              </p>
              <p className="text-lg font-bold text-gray-900">
                {vendors.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">
                Active Vendors
              </p>
              <p className="text-lg font-bold text-gray-900">
                {
                  vendors.filter(
                    (v) => v.status === "Active"
                  ).length
                }
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">
                Total Supplies
              </p>
              <p className="text-lg font-bold text-gray-900">
                {vendors.reduce(
                  (sum, v) => sum + v.totalSupplies,
                  0
                )}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">
                Total Amount Paid
              </p>
              <p className="text-lg font-bold text-gray-900">
                ₹
                {vendors
                  .reduce(
                    (sum, v) => sum + v.totalAmount,
                    0
                  )
                  .toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search vendors by name, email or phone"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div>
            <select
              value={selectedFilter}
              onChange={(e) =>
                setSelectedFilter(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            >
              {filterOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th
                  className="py-3 px-4 text-left font-medium text-gray-700 cursor-pointer select-none hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    if (sortBy === "name") {
                      setSortOrder(
                        sortOrder === "asc" ? "desc" : "asc"
                      );
                    } else {
                      setSortBy("name");
                      setSortOrder("asc");
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    Vendor Name
                    {sortBy === "name" && (
                      <span className="text-xs">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Email
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Password
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Phone
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Address
                </th>
                <th
                  className="py-3 px-4 text-left font-medium text-gray-700 cursor-pointer select-none hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    if (sortBy === "totalSupplies") {
                      setSortOrder(
                        sortOrder === "asc" ? "desc" : "asc"
                      );
                    } else {
                      setSortBy("totalSupplies");
                      setSortOrder("asc");
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    Total Supplies
                    {sortBy === "totalSupplies" && (
                      <span className="text-xs">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left font-medium text-gray-700 cursor-pointer select-none hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    if (sortBy === "totalAmount") {
                      setSortOrder(
                        sortOrder === "asc" ? "desc" : "asc"
                      );
                    } else {
                      setSortBy("totalAmount");
                      setSortOrder("asc");
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    Total Amount
                    {sortBy === "totalAmount" && (
                      <span className="text-xs">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Updates
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedVendors.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-8 text-gray-500"
                  >
                    No vendors found.
                  </td>
                </tr>
              )}

              {sortedVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {vendor.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {vendor.email}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {vendor.password}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {vendor.phone}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {vendor.address}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {vendor.totalSupplies}
                  </td>
                  <td className="py-3 px-4 text-gray-600 font-medium">
                    ₹{vendor.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        vendor.status
                      )}`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      title="View recent supplies"
                      onClick={() =>
                        handleViewVendor(vendor)
                      }
                      className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        title="Edit vendor"
                        onClick={() =>
                          handleEditVendor(vendor)
                        }
                        className="text-yellow-500 hover:text-yellow-700 transition-colors p-1 rounded hover:bg-yellow-50"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        title="Delete vendor"
                        onClick={() =>
                          handleDeleteVendor(vendor)
                        }
                        className="text-red-500 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vendor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                Add New Vendor
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleAddSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="add-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Vendor Name
                </label>
                <input
                  id="add-name"
                  type="text"
                  name="name"
                  placeholder="Enter vendor name"
                  required
                  value={newVendor.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="add-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="add-email"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  required
                  value={newVendor.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="add-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="add-password"
                  type="password"
                  name="password"
                  placeholder="Set password"
                  required
                  value={newVendor.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="add-phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  id="add-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  required
                  value={newVendor.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="add-address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  id="add-address"
                  type="text"
                  name="address"
                  placeholder="Enter full address"
                  required
                  value={newVendor.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="add-status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="add-status"
                  name="status"
                  value={newVendor.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* Submit button remains the same */}
            </form>
          </div>
        </div>
      )}

      {/* Edit Vendor Modal */}
      {showEditModal && selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                Edit Vendor
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleEditSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="edit-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Vendor Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  name="name"
                  placeholder="Enter vendor name"
                  required
                  value={selectedVendor.name}
                  onChange={handleEditInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="edit-email"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  required
                  value={selectedVendor.email}
                  onChange={handleEditInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="edit-password"
                  type="password"
                  name="password"
                  placeholder="Set new password"
                  required
                  value={selectedVendor.password}
                  onChange={handleEditInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  id="edit-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  required
                  value={selectedVendor.phone}
                  onChange={handleEditInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  id="edit-address"
                  type="text"
                  name="address"
                  placeholder="Enter full address"
                  required
                  value={selectedVendor.address}
                  onChange={handleEditInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="edit-status"
                  name="status"
                  value={selectedVendor.status}
                  onChange={handleEditInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* Submit button remains the same */}
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                Confirm Deletion
              </h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mb-6">
              Are you sure you want to delete vendor{" "}
              <strong>{selectedVendor.name}</strong>? This
              action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Vendor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vendor Details Modal */}
      {showDetailsModal && selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative text-sm">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-3">
              {selectedVendor.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-gray-700">
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Vendor ID
                </p>
                <p>{selectedVendor.id}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Assigned Items
                </p>
                <ul className="list-disc list-inside space-y-0.5">
                  {selectedVendor.assignedItems.map(
                    (item) => (
                      <li key={item}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Current Work
                </p>
                <p>{selectedVendor.currentWork || "N/A"}</p>

                <p className="font-medium text-gray-900 mt-3 mb-1">
                  Promise Days
                </p>
                <p>{selectedVendor.promiseDays ?? "N/A"}</p>

                <p className="font-medium text-gray-900 mt-3 mb-1">
                  Day Progress
                </p>
                <p>{selectedVendor.dayProgress ?? "N/A"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3 text-gray-900">
                Updates
              </h3>
              <table className="w-full border-collapse text-sm text-gray-800">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="py-2 px-3 text-left font-medium">
                      Date
                    </th>
                    <th className="py-2 px-3 text-left font-medium">
                      Update
                    </th>
                    <th className="py-2 px-3 text-left font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedVendor.updates &&
                  selectedVendor.updates.length > 0 ? (
                    selectedVendor.updates.map(
                      (update, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="py-2 px-3">
                            {update.date}
                          </td>
                          <td className="py-2 px-3">
                            {update.note}
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                                update.status ===
                                "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : update.status ===
                                    "In Progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {update.status}
                            </span>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-3 text-center text-gray-500"
                      >
                        No updates available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
