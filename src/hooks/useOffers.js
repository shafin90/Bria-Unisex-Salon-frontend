import { useApiEffect, useMutation } from './useApi.js';
import { offerService } from '../services';

// Hook for fetching offers
export const useOffers = () => {
  return useApiEffect(offerService.getOffers);
};

// Hook for offer mutations
export const useOfferMutations = () => {
  const createOffer = useMutation(offerService.createOffer);
  const updateOffer = useMutation(offerService.updateOffer);
  const deleteOffer = useMutation(offerService.deleteOffer);

  return {
    createOffer,
    updateOffer,
    deleteOffer
  };
};
