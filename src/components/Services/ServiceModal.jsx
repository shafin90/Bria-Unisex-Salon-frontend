import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, Upload, Scissors } from 'lucide-react';
import axios from 'axios';

const ServiceModal = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceDescription: '',
    price: '',
    category: 'men',
    serviceType: '',
    img: ''
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    if (service) {
      setFormData({
        serviceName: service.serviceName || '',
        serviceDescription: service.serviceDescription || '',
        price: service.price || '',
        category: service.category || 'men',
        serviceType: service.serviceType || '',
        img: service.img || ''
      });
      setImagePreview(service.img || '');
    }

    // Animate modal
    gsap.fromTo('.modal-overlay', 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    
    gsap.fromTo('.modal-content', 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          img: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      let response;
      if (service) {
        // Update existing service
        response = await axios.put(`${API_BASE_URL}/service/editService/${service._id}`, serviceData);
      } else {
        // Create new service
        response = await axios.post(`${API_BASE_URL}/service/addService`, serviceData);
      }

      onSave(response.data);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
      <div className="modal-content bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {service ? 'Edit Service' : 'Add New Service'}
                </h2>
                <p className="text-sm text-gray-600">
                  {service ? 'Update service information' : 'Create a new salon service'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Name */}
              <div className="md:col-span-2">
                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Hair Cut & Style"
                  required
                />
              </div>

              {/* Service Description */}
              <div className="md:col-span-2">
                <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="serviceDescription"
                  name="serviceDescription"
                  value={formData.serviceDescription}
                  onChange={handleChange}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Describe the service in detail..."
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>

              {/* Service Type */}
              <div className="md:col-span-2">
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <input
                  type="text"
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Hair, Beard, Facial, etc."
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Image
              </label>
              <div className="space-y-4">
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  service ? 'Update Service' : 'Create Service'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
