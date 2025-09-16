import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Gift, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Calendar,
  Users,
  Eye,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import axios from 'axios';
import OfferModal from '../../components/Offers/OfferModal';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    fetchOffers();
  }, []);

  // Animate offers grid after offers are loaded
  useEffect(() => {
    if (offers.length > 0 && !loading) {
      gsap.fromTo('.offer-card', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [offers, loading]);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/offer/getAllOffer`);
      setOffers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      // Mock data for demo
      setOffers([
        {
          _id: '1',
          offerName: 'Summer Hair Special',
          offerImg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
          startDate: '01-06-2024',
          endDate: '31-08-2024',
          usageLimit: 100,
          status: 'Active'
        },
        {
          _id: '2',
          offerName: 'New Customer Discount',
          offerImg: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
          startDate: '01-01-2024',
          endDate: '31-12-2024',
          usageLimit: 50,
          status: 'Active'
        },
        {
          _id: '3',
          offerName: 'Beard Trim Package',
          offerImg: 'https://images.unsplash.com/photo-1503951914875-452162b0f3d1?w=400',
          startDate: '01-09-2024',
          endDate: '30-09-2024',
          usageLimit: 75,
          status: 'Inactive'
        },
        {
          _id: '4',
          offerName: 'Holiday Special',
          offerImg: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400',
          startDate: '01-12-2024',
          endDate: '31-12-2024',
          usageLimit: 200,
          status: 'Active'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOffer = () => {
    setEditingOffer(null);
    setShowModal(true);
  };

  const handleEditOffer = (offer) => {
    setEditingOffer(offer);
    setShowModal(true);
  };

  const handleDeleteOffer = async (offerId) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        await axios.delete(`${API_BASE_URL}/offer/deleteOffer/${offerId}`);
        setOffers(offers.filter(offer => offer._id !== offerId));
      } catch (error) {
        console.error('Error deleting offer:', error);
        alert('Failed to delete offer');
      }
    }
  };

  const handleToggleStatus = async (offer) => {
    try {
      const newStatus = offer.status === 'Active' ? 'Inactive' : 'Active';
      await axios.put(`${API_BASE_URL}/offer/editOffer/${offer._id}`, {
        ...offer,
        status: newStatus
      });
      
      setOffers(offers.map(o => 
        o._id === offer._id ? { ...o, status: newStatus } : o
      ));
    } catch (error) {
      console.error('Error updating offer status:', error);
      alert('Failed to update offer status');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingOffer(null);
  };

  const handleOfferSave = (savedOffer) => {
    if (editingOffer) {
      setOffers(offers.map(offer => 
        offer._id === savedOffer._id ? savedOffer : offer
      ));
    } else {
      setOffers([...offers, savedOffer]);
    }
    setShowModal(false);
    setEditingOffer(null);
  };

  const isOfferActive = (offer) => {
    if (!offer?.startDate || !offer?.endDate || !offer?.status) return false;
    
    const today = new Date();
    const startDate = new Date(offer.startDate.split('-').reverse().join('-'));
    const endDate = new Date(offer.endDate.split('-').reverse().join('-'));
    
    return offer.status === 'Active' && today >= startDate && today <= endDate;
  };

  const getDaysRemaining = (endDate) => {
    if (!endDate) return 0;
    
    const today = new Date();
    const end = new Date(endDate.split('-').reverse().join('-'));
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredOffers = Array.isArray(offers) ? offers.filter(offer => {
    const offerName = offer?.offerName || '';
    const matchesSearch = offerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && offer?.status === 'Active') ||
                         (filterStatus === 'inactive' && offer?.status === 'Inactive');
    return matchesSearch && matchesStatus;
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
          <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
          <p className="text-gray-600 mt-2">Manage promotional offers and discounts</p>
        </div>
        <button
          onClick={handleAddOffer}
          className="btn-primary mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Offer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Offers</p>
              <p className="text-2xl font-bold text-gray-900">{offers.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Offers</p>
              <p className="text-2xl font-bold text-gray-900">
                {offers.filter(o => o?.status === 'Active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <ToggleRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive Offers</p>
              <p className="text-2xl font-bold text-gray-900">
                {offers.filter(o => o?.status === 'Inactive').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
              <ToggleLeft className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search offers..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div key={offer._id} className="offer-card card-hover">
            <div className="relative">
              <img
                src={offer.offerImg || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'}
                alt={offer?.offerName || 'Offer'}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  isOfferActive(offer)
                    ? 'bg-green-100 text-green-800'
                    : offer.status === 'Active'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {isOfferActive(offer) ? 'Live' : offer.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{offer?.offerName || 'Untitled Offer'}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{offer?.startDate || 'N/A'} - {offer?.endDate || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>Limit: {offer?.usageLimit || 'N/A'}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {getDaysRemaining(offer?.endDate) > 0 
                    ? `${getDaysRemaining(offer?.endDate)} days left`
                    : 'Expired'
                  }
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => handleEditOffer(offer)}
                  className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleToggleStatus(offer)}
                  className={`flex-1 text-sm py-2 flex items-center justify-center space-x-1 rounded-lg transition-colors duration-200 ${
                    offer.status === 'Active'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {offer.status === 'Active' ? (
                    <>
                      <ToggleLeft className="w-4 h-4" />
                      <span>Deactivate</span>
                    </>
                  ) : (
                    <>
                      <ToggleRight className="w-4 h-4" />
                      <span>Activate</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDeleteOffer(offer._id)}
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

      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No offers found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first promotional offer'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button onClick={handleAddOffer} className="btn-primary">
              Add Offer
            </button>
          )}
        </div>
      )}

      {/* Offer Modal */}
      {showModal && (
        <OfferModal
          offer={editingOffer}
          onClose={handleModalClose}
          onSave={handleOfferSave}
        />
      )}
    </div>
  );
};

export default Offers;
