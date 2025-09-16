import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Scissors,
  Eye,
  Users
} from 'lucide-react';
import axios from 'axios';
import ServiceModal from '../../components/Services/ServiceModal';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

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
          serviceDescription: 'Professional haircut with styling',
          price: 45,
          category: 'men',
          serviceType: 'Hair',
          bookingCount: 25,
          img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'
        },
        {
          _id: '2',
          serviceName: 'Hair Color',
          serviceDescription: 'Full hair coloring service',
          price: 120,
          category: 'women',
          serviceType: 'Hair',
          bookingCount: 18,
          img: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'
        },
        {
          _id: '3',
          serviceName: 'Beard Trim',
          serviceDescription: 'Professional beard trimming and shaping',
          price: 25,
          category: 'men',
          serviceType: 'Beard',
          bookingCount: 32,
          img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3d1?w=400'
        },
        {
          _id: '4',
          serviceName: 'Facial Treatment',
          serviceDescription: 'Deep cleansing facial treatment',
          price: 80,
          category: 'women',
          serviceType: 'Facial',
          bookingCount: 15,
          img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_BASE_URL}/service/deleteService/${serviceId}`);
        setServices(services?.filter(service => service._id !== serviceId));
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const handleServiceSave = (savedService) => {
    if (editingService) {
      setServices(services.map(service => 
        service._id === savedService._id ? savedService : service
      ));
    } else {
      setServices([...services, savedService]);
    }
    setShowModal(false);
    setEditingService(null);
  };

  const filteredServices = Array.isArray(services) ? services.filter(service => {
    const matchesSearch = service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.serviceDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">Manage your salon services and pricing</p>
        </div>
        <button
          onClick={handleAddService}
          className="btn-primary mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
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
                <option value="all">All Categories</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service._id} className="service-card card-hover">
            <div className="relative">
              <img
                src={service.img || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'}
                alt={service.serviceName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  service.category === 'men' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-pink-100 text-pink-800'
                }`}>
                  {service.category}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{service.serviceName}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{service.serviceDescription}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{service.bookingCount}</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                    {service.serviceType}
                  </span>
                </div>
                <span className="text-xl font-bold text-primary-600">
                  ${service.price}
                </span>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => handleEditService(service)}
                  className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="flex-1 btn-danger text-sm py-2 flex items-center justify-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Scissors className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first service'
            }
          </p>
          {!searchTerm && filterCategory === 'all' && (
            <button onClick={handleAddService} className="btn-primary">
              Add Service
            </button>
          )}
        </div>
      )}

      {/* Service Modal */}
      {showModal && (
        <ServiceModal
          service={editingService}
          onClose={handleModalClose}
          onSave={handleServiceSave}
        />
      )}
    </div>
  );
};

export default Services;
