import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Users as UsersIcon, 
  Search, 
  Phone, 
  Calendar, 
  TrendingUp,
  Star,
  Clock
} from 'lucide-react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    fetchUsers();
  }, []);

  // Animate users list after users are loaded
  useEffect(() => {
    if (users.length > 0 && !loading) {
      gsap.fromTo('.user-card', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [users, loading]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/getFrequentlyUser`);
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Mock data for demo
      setUsers([
        {
          _id: '1',
          name: 'Sarah Johnson',
          phoneNumber: '+1234567890',
          totalBookings: 12,
          totalSpent: 540,
          lastVisit: '10-09-2024',
          favoriteService: 'Hair Cut & Style',
          averageRating: 4.8
        },
        {
          _id: '2',
          name: 'Mike Chen',
          phoneNumber: '+1234567891',
          totalBookings: 8,
          totalSpent: 320,
          lastVisit: '08-09-2024',
          favoriteService: 'Beard Trim',
          averageRating: 4.9
        },
        {
          _id: '3',
          name: 'Emma Davis',
          phoneNumber: '+1234567892',
          totalBookings: 15,
          totalSpent: 1200,
          lastVisit: '12-09-2024',
          favoriteService: 'Hair Color',
          averageRating: 4.7
        },
        {
          _id: '4',
          name: 'John Smith',
          phoneNumber: '+1234567893',
          totalBookings: 6,
          totalSpent: 270,
          lastVisit: '05-09-2024',
          favoriteService: 'Hair Cut & Style',
          averageRating: 4.6
        },
        {
          _id: '5',
          name: 'Lisa Wilson',
          phoneNumber: '+1234567894',
          totalBookings: 20,
          totalSpent: 1600,
          lastVisit: '14-09-2024',
          favoriteService: 'Facial Treatment',
          averageRating: 5.0
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getCustomerTier = (totalSpent) => {
    if (totalSpent >= 1000) return { tier: 'VIP', color: 'bg-purple-100 text-purple-800' };
    if (totalSpent >= 500) return { tier: 'Gold', color: 'bg-yellow-100 text-yellow-800' };
    if (totalSpent >= 200) return { tier: 'Silver', color: 'bg-gray-100 text-gray-800' };
    return { tier: 'Bronze', color: 'bg-orange-100 text-orange-800' };
  };

  const filteredUsers = Array.isArray(users) ? users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber.includes(searchTerm) ||
    user.favoriteService.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-2">Manage your customers and view their booking history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">VIP Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.totalSpent >= 1000).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gold Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.totalSpent >= 500 && u.totalSpent < 1000).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${users.reduce((sum, user) => sum + user.totalSpent, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => {
          const tier = getCustomerTier(user.totalSpent);
          return (
            <div key={user._id} className="user-card card-hover">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${tier.color}`}>
                          {tier.tier}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-600">{user.averageRating}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{user.phoneNumber}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{user.totalBookings} bookings</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>${user.totalSpent} spent</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>Last: {user.lastVisit}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Favorite Service:</span> {user.favoriteService}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600">
                      ${user.totalSpent}
                    </p>
                    <p className="text-sm text-gray-500">Total Spent</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Try adjusting your search criteria'
              : 'No users have been registered yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Users;
