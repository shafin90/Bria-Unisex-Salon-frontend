import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Users, 
  Scissors, 
  Calendar, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalServices: 0,
    totalUsers: 0,
    recentBookings: [],
    topServices: []
  });
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    fetchDashboardData();
    
    // Animate dashboard cards
    gsap.fromTo('.dashboard-card', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard data from backend
      const response = await axios.get(`${API_BASE_URL}/dashboard/getDashboardData`);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set mock data for demo
      setDashboardData({
        totalBookings: 156,
        totalServices: 24,
        totalUsers: 89,
        recentBookings: [
          { name: 'Sarah Johnson', service: 'Hair Cut & Style', time: '10:30 AM', status: 'confirmed' },
          { name: 'Mike Chen', service: 'Beard Trim', time: '11:00 AM', status: 'pending' },
          { name: 'Emma Davis', service: 'Hair Color', time: '2:00 PM', status: 'confirmed' },
        ],
        topServices: [
          { name: 'Hair Cut & Style', bookings: 45 },
          { name: 'Beard Trim', bookings: 32 },
          { name: 'Hair Color', bookings: 28 },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Bookings',
      value: dashboardData.totalBookings,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Services',
      value: dashboardData.totalServices,
      icon: Scissors,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: 'Total Users',
      value: dashboardData.totalUsers,
      icon: Users,
      color: 'bg-purple-500',
      change: '+8%'
    },
    {
      title: 'Revenue',
      value: '$12,450',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+15%'
    }
  ];

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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at Bria Salon.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="dashboard-card card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {dashboardData.recentBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{booking.name}</p>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{booking.time}</p>
                  <div className="flex items-center mt-1">
                    {booking.status === 'confirmed' ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                    )}
                    <span className={`text-xs font-medium ${
                      booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Top Services</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {dashboardData.topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.bookings} bookings</p>
                  </div>
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(service.bookings / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200 text-left">
            <Scissors className="w-8 h-8 text-primary-600 mb-2" />
            <h3 className="font-medium text-gray-900">Add New Service</h3>
            <p className="text-sm text-gray-600">Create a new salon service</p>
          </button>
          
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 text-left">
            <Calendar className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">View Bookings</h3>
            <p className="text-sm text-gray-600">Manage appointments</p>
          </button>
          
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-left">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900">View Analytics</h3>
            <p className="text-sm text-gray-600">Check performance metrics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
