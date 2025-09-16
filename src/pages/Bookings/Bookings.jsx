import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Search, 
  Filter,
  CheckCircle,
  AlertCircle,
  Eye,
  MessageSquare
} from 'lucide-react';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    fetchBookings();
  }, []);

  // Animate bookings list after bookings are loaded
  useEffect(() => {
    if (bookings.length > 0 && !loading) {
      gsap.fromTo('.booking-item', 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [bookings, loading]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/booking/getAllBooking`);
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Mock data for demo
      setBookings([
        {
          _id: '1',
          name: 'Sarah Johnson',
          phoneNumber: '+1234567890',
          service: [
            { serviceName: 'Hair Cut & Style', servicePrice: 45 },
            { serviceName: 'Hair Color', servicePrice: 120 }
          ],
          date: '15-09-2024',
          time: '10:30 am',
          confirmationCode: 'BR001',
          reminderMessageSend: true
        },
        {
          _id: '2',
          name: 'Mike Chen',
          phoneNumber: '+1234567891',
          service: [
            { serviceName: 'Beard Trim', servicePrice: 25 }
          ],
          date: '15-09-2024',
          time: '11:00 am',
          confirmationCode: 'BR002',
          reminderMessageSend: false
        },
        {
          _id: '3',
          name: 'Emma Davis',
          phoneNumber: '+1234567892',
          service: [
            { serviceName: 'Facial Treatment', servicePrice: 80 }
          ],
          date: '16-09-2024',
          time: '2:00 pm',
          confirmationCode: 'BR003',
          reminderMessageSend: true
        },
        {
          _id: '4',
          name: 'John Smith',
          phoneNumber: '+1234567893',
          service: [
            { serviceName: 'Hair Cut & Style', servicePrice: 45 },
            { serviceName: 'Beard Trim', servicePrice: 25 }
          ],
          date: '16-09-2024',
          time: '3:30 pm',
          confirmationCode: 'BR004',
          reminderMessageSend: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = (services) => {
    return services.reduce((total, service) => total + service.servicePrice, 0);
  };

  const getStatusColor = (booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.date.split('-').reverse().join('-'));
    
    if (bookingDate < today) {
      return 'bg-gray-100 text-gray-800'; // Past
    } else if (bookingDate.toDateString() === today.toDateString()) {
      return 'bg-green-100 text-green-800'; // Today
    } else {
      return 'bg-blue-100 text-blue-800'; // Future
    }
  };

  const getStatusText = (booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.date.split('-').reverse().join('-'));
    
    if (bookingDate < today) {
      return 'Completed';
    } else if (bookingDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else {
      return 'Upcoming';
    }
  };

  const filteredBookings = Array.isArray(bookings) ? bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.phoneNumber.includes(searchTerm) ||
                         booking.confirmationCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'today' && getStatusText(booking) === 'Today') ||
                         (filterStatus === 'upcoming' && getStatusText(booking) === 'Upcoming') ||
                         (filterStatus === 'completed' && getStatusText(booking) === 'Completed');
    
    const matchesDate = !selectedDate || booking.date === selectedDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  }) : [];

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
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-600 mt-2">Manage customer appointments and reservations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => getStatusText(b) === 'Today').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => getStatusText(b) === 'Upcoming').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => getStatusText(b) === 'Completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field w-auto"
              >
                <option value="all">All Status</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field w-auto"
            />
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div key={booking._id} className="booking-item card-hover">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{booking.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking)}`}>
                        {getStatusText(booking)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{booking.phoneNumber}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Code: {booking.confirmationCode}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.service.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {service.serviceName} (${service.servicePrice})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-600">
                    ${getTotalPrice(booking.service)}
                  </p>
                  <div className="flex items-center mt-1">
                    {booking.reminderMessageSend ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
                    )}
                    <span className={`text-xs ${
                      booking.reminderMessageSend ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {booking.reminderMessageSend ? 'Reminder sent' : 'Reminder pending'}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600">
            {searchTerm || filterStatus !== 'all' || selectedDate
              ? 'Try adjusting your search or filter criteria'
              : 'No bookings have been made yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Bookings;
