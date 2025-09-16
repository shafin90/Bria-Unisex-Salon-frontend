import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle,
  ArrowLeft,
  Scissors
} from 'lucide-react';
import axios from 'axios';

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedService = location.state?.selectedService;

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    service: selectedService ? [{
      serviceName: selectedService.serviceName,
      servicePrice: selectedService.price,
      serviceImg: selectedService.img
    }] : [],
    date: '',
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [availableTimes] = useState([
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ]);

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    // Animate form
    gsap.fromTo('.booking-form', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceToggle = (service) => {
    const isSelected = formData.service.some(s => s.serviceName === service.serviceName);
    
    if (isSelected) {
      setFormData({
        ...formData,
        service: formData.service.filter(s => s.serviceName !== service.serviceName)
      });
    } else {
      setFormData({
        ...formData,
        service: [...formData.service, {
          serviceName: service.serviceName,
          servicePrice: service.price,
          serviceImg: service.img
        }]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        confirmationCode: `BR${Date.now().toString().slice(-6)}`
      };

      const response = await axios.post(`${API_BASE_URL}/booking/addBooking`, bookingData);
      
      if (response.data) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: '',
          phoneNumber: '',
          service: [],
          date: '',
          time: ''
        });
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = () => {
    return formData.service.reduce((total, service) => total + service.servicePrice, 0);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // 30 days from now
    return maxDate.toISOString().split('T')[0];
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment has been successfully booked. You will receive a confirmation message shortly.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Back to Home
            </button>
            <button
              onClick={() => setSuccess(false)}
              className="btn-secondary w-full"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
              <p className="text-gray-600">Schedule your visit to Bria Salon</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="booking-form bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="input-field pl-10"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="input-field pl-10"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="input-field pl-10"
                          min={getMinDate()}
                          max={getMaxDate()}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="input-field pl-10"
                          required
                        >
                          <option value="">Select time</option>
                          {availableTimes.map((time) => (
                            <option key={time} value={time.toLowerCase()}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || formData.service.length === 0}
                    className="w-full btn-primary py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Booking...
                      </div>
                    ) : (
                      'Book Appointment'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Service Selection & Summary */}
            <div className="space-y-6">
              {/* Service Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Services</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Hair Cut & Style', price: 45, img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400' },
                    { name: 'Hair Color', price: 120, img: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400' },
                    { name: 'Beard Trim', price: 25, img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3d1?w=400' },
                    { name: 'Facial Treatment', price: 80, img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400' },
                    { name: 'Hair Wash & Blow Dry', price: 35, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400' },
                    { name: 'Eyebrow Shaping', price: 20, img: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400' }
                  ].map((service) => {
                    const isSelected = formData.service.some(s => s.serviceName === service.name);
                    return (
                      <div
                        key={service.name}
                        onClick={() => handleServiceToggle(service)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={service.img}
                            alt={service.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-600">${service.price}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-primary-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Booking Summary */}
              {formData.service.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  
                  <div className="space-y-3 mb-4">
                    {formData.service.map((service, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{service.serviceName}</span>
                        <span className="font-medium">${service.servicePrice}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary-600">${getTotalPrice()}</span>
                    </div>
                  </div>
                  
                  {formData.date && formData.time && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Time:</strong> {formData.time}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
