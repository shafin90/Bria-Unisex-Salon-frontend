import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, Upload, Gift } from 'lucide-react';
import axios from 'axios';

const OfferModal = ({ offer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    offerName: '',
    offerImg: '',
    startDate: '',
    endDate: '',
    usageLimit: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    if (offer) {
      setFormData({
        offerName: offer.offerName || '',
        offerImg: offer.offerImg || '',
        startDate: offer.startDate || '',
        endDate: offer.endDate || '',
        usageLimit: offer.usageLimit || '',
        status: offer.status || 'Active'
      });
      setImagePreview(offer.offerImg || '');
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
  }, [offer]);

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
          offerImg: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const offerData = {
        ...formData,
        usageLimit: parseInt(formData.usageLimit)
      };

      let response;
      if (offer) {
        // Update existing offer
        response = await axios.put(`${API_BASE_URL}/offer/editOffer/${offer._id}`, offerData);
      } else {
        // Create new offer
        response = await axios.post(`${API_BASE_URL}/offer/addOffer`, offerData);
      }

      onSave(response.data);
    } catch (error) {
      console.error('Error saving offer:', error);
      alert('Failed to save offer');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    // Convert DD-MM-YYYY to YYYY-MM-DD for input
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateString;
  };

  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    // Convert YYYY-MM-DD to DD-MM-YYYY for API
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
      <div className="modal-content bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {offer ? 'Edit Offer' : 'Add New Offer'}
                </h2>
                <p className="text-sm text-gray-600">
                  {offer ? 'Update offer information' : 'Create a new promotional offer'}
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
              {/* Offer Name */}
              <div className="md:col-span-2">
                <label htmlFor="offerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Name *
                </label>
                <input
                  type="text"
                  id="offerName"
                  name="offerName"
                  value={formData.offerName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Summer Hair Special"
                  required
                />
              </div>

              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formatDateForInput(formData.startDate)}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    startDate: formatDateForAPI(e.target.value)
                  }))}
                  className="input-field"
                  required
                />
              </div>

              {/* End Date */}
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formatDateForInput(formData.endDate)}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    endDate: formatDateForAPI(e.target.value)
                  }))}
                  className="input-field"
                  required
                />
              </div>

              {/* Usage Limit */}
              <div>
                <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700 mb-2">
                  Usage Limit *
                </label>
                <input
                  type="number"
                  id="usageLimit"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="100"
                  min="1"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Offer Image
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
                  offer ? 'Update Offer' : 'Create Offer'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
