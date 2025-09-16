import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Scissors, 
  Filter, 
  Search,
  ChevronRight,
  Clock,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PublicServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    fetchServices();
  }, []);

  // Animate services grid after services are loaded
  useEffect(() => {
    if (services.length > 0 && !loading) {
      gsap.fromTo('.service-card', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [services, loading]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/service/getAllService`);
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Mock data for demo
      setServices([
        {
          _id: '1',
          serviceName: 'Hair Cut & Style',
          serviceDescription: 'Professional haircut with modern styling techniques. Our expert stylists will give you the perfect look that suits your face shape and lifestyle.',
          price: 45,
          category: 'men',
          serviceType: 'Hair',
          bookingCount: 25,
          img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'
        },
        {
          _id: '2',
          serviceName: 'Hair Color',
          serviceDescription: 'Expert hair coloring and highlights. From subtle highlights to bold colors, we use premium products for stunning results.',
          price: 120,
          category: 'women',
          serviceType: 'Hair',
          bookingCount: 18,
          img: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'
        },
        {
          _id: '3',
          serviceName: 'Beard Trim',
          serviceDescription: 'Professional beard trimming and shaping. Get the perfect beard style with our precision trimming techniques.',
          price: 25,
          category: 'men',
          serviceType: 'Beard',
          bookingCount: 32,
          img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3d1?w=400'
        },
        {
          _id: '4',
          serviceName: 'Facial Treatment',
          description: 'Deep cleansing and rejuvenating facial treatment. Relax and rejuvenate with our premium facial services.',
          price: 80,
          category: 'women',
          serviceType: 'Facial',
          bookingCount: 15,
          img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400'
        },
        {
          _id: '5',
          serviceName: 'Hair Wash & Blow Dry',
          serviceDescription: 'Professional hair wash with premium products and expert blow-dry styling for a fresh, polished look.',
          price: 35,
          category: 'women',
          serviceType: 'Hair',
          bookingCount: 22,
          img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'
        },
        {
          _id: '6',
          serviceName: 'Eyebrow Shaping',
          serviceDescription: 'Professional eyebrow shaping and styling to frame your face perfectly and enhance your natural beauty.',
          price: 20,
          category: 'women',
          serviceType: 'Eyebrow',
          bookingCount: 28,
          img: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = Array.isArray(services) ? services.filter(service => {
    const matchesSearch = service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.serviceDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of professional beauty and grooming services
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services..."
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
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="input-field w-auto"
                >
                  <option value="all">All Services</option>
                  <option value="men">Men's Services</option>
                  <option value="women">Women's Services</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service._id} className="service-card group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative">
                  <img
                    src={service.img || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'}
                    alt={service.serviceName}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      service.category === 'men' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-pink-100 text-pink-800'
                    }`}>
                      {service.category === 'men' ? 'Men' : 'Women'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.serviceName}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.serviceDescription}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{service.bookingCount || 0} bookings</span>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {service.serviceType}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">${service.price}</span>
                      <span className="text-sm text-gray-500 ml-1">starting from</span>
                    </div>
                    <Link 
                      to="/book" 
                      state={{ selectedService: service }}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <span>Book Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Scissors className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No services available at the moment'
              }
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
            <p className="text-xl mb-6 opacity-90">
              Choose your preferred service and book your appointment online
            </p>
            <Link 
              to="/book" 
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Clock className="w-5 h-5" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicServices;
