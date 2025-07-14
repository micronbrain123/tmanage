"use client";

import React, { useState } from 'react';
import { 
  User,
  Edit,
  Check,
  X,
  Scissors,
  Star,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [showSkills, setShowSkills] = useState(true);

  // Vendor profile data
  const [profile, setProfile] = useState({
    name: 'Ramesh Mistri',
    email: 'ramesh.mistri@tailorpro.com',
    phone: '+91 9876543210',
    address: '123 Tailor Street, Mumbai, Maharashtra 400001',
    experience: '15 years',
    specialization: 'Suits & Blazers',
    bio: 'Master tailor with expertise in formal wear and custom fittings. Specialized in wedding suits and corporate blazers.',
    joinedDate: '2023-05-15',
    password: '********'
  });

  const [tempProfile, setTempProfile] = useState({...profile});

  const performanceStats = [
    { metric: 'Average Rating', value: '4.7', icon: Star, trend: '+0.2' },
    { metric: 'Completion Rate', value: '94%', icon: CheckCircle, trend: '+3%' },
    { metric: 'On-Time Delivery', value: '89%', icon: Clock, trend: '+5%' },
    { metric: 'Rejection Rate', value: '2%', icon: AlertCircle, trend: '-1%' },
  ];

  const earningsData = [
    { month: 'Jun 2025', amount: '₹22,500', orders: 14 },
    { month: 'May 2025', amount: '₹24,800', orders: 16 },
    { month: 'Apr 2025', amount: '₹21,300', orders: 13 },
    { month: 'Mar 2025', amount: '₹19,700', orders: 12 },
  ];

  const skills = [
    { name: 'Suits', level: 'Expert', experience: '12 years' },
    { name: 'Blazers', level: 'Expert', experience: '10 years' },
    { name: 'Formal Shirts', level: 'Advanced', experience: '8 years' },
    { name: 'Wedding Wear', level: 'Advanced', experience: '9 years' },
    { name: 'Casual Wear', level: 'Intermediate', experience: '5 years' },
  ];

  const handleEdit = () => {
    setTempProfile({...profile});
    setEditMode(true);
  };

  const handleSave = () => {
    setProfile({...tempProfile});
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              {editMode && (
                <button className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md border border-gray-200">
                  <Edit className="w-4 h-4 text-blue-600" />
                </button>
              )}
            </div>
            <div>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={tempProfile.name}
                  onChange={handleChange}
                  className="text-xl font-bold border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
              )}
              <div className="flex items-center mt-1">
                <Scissors className="w-4 h-4 text-gray-500 mr-1" />
                {editMode ? (
                  <input
                    type="text"
                    name="specialization"
                    value={tempProfile.specialization}
                    onChange={handleChange}
                    className="text-sm text-gray-600 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <span className="text-sm text-gray-600">{profile.specialization}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {editMode ? (
              <>
                <button 
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button 
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </>
            ) : (
              <button 
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <button 
          onClick={() => setShowStats(!showStats)}
          className="w-full flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 hover:bg-gray-50"
        >
          <h3 className="text-lg font-semibold text-gray-800">Performance Stats</h3>
          {showStats ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        {showStats && (
          <div className="p-4 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {performanceStats.map((stat, index) => {
                const Icon = stat.icon;
                const isPositive = stat.trend.startsWith('+');
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.metric}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        stat.metric.includes('Rejection') 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-green-100 text-green-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <p className={`text-sm mt-2 ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend} from last month
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 hover:bg-gray-50"
        >
          <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
          {showDetails ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        {showDetails && (
          <div className="p-4 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={tempProfile.email}
                        onChange={handleChange}
                        className="w-full mt-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    {editMode ? (
                      <input
                        type="tel"
                        name="phone"
                        value={tempProfile.phone}
                        onChange={handleChange}
                        className="w-full mt-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    {editMode ? (
                      <textarea
                        name="address"
                        value={tempProfile.address}
                        onChange={handleChange}
                        className="w-full mt-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                        rows="2"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.address}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Experience</p>
                    {editMode ? (
                      <input
                        type="text"
                        name="experience"
                        value={tempProfile.experience}
                        onChange={handleChange}
                        className="w-full mt-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.experience}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Joined Date</p>
                    <p className="text-gray-900">{profile.joinedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Lock className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Password</p>
                    {editMode ? (
                      <input
                        type="password"
                        name="password"
                        value={tempProfile.password}
                        onChange={handleChange}
                        className="w-full mt-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.password}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-500 mb-2">About</p>
              {editMode ? (
                <textarea
                  name="bio"
                  value={tempProfile.bio}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <button 
          onClick={() => setShowSkills(!showSkills)}
          className="w-full flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 hover:bg-gray-50"
        >
          <h3 className="text-lg font-semibold text-gray-800">Skills & Specializations</h3>
          {showSkills ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        {showSkills && (
          <div className="p-4 lg:p-6">
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      <div className="flex items-center mt-1 space-x-4">
                        <span className="text-sm text-gray-600">Level: {skill.level}</span>
                        <span className="text-sm text-gray-600">Experience: {skill.experience}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {editMode && (
                        <>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: skill.level === 'Expert' ? '90%' : 
                               skill.level === 'Advanced' ? '75%' : '50%' 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              
              {editMode && (
                <button className="w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors">
                  <span>+ Add New Skill</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Earnings History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Earnings History</h3>
        </div>
        <div className="p-4 lg:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders Completed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Earnings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {earningsData.map((earning, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {earning.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {earning.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {earning.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                      <button>View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}