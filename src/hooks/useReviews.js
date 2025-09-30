import { useApiEffect, useMutation } from './useApi.js';
import { reviewService } from '../services';

// Hook for fetching reviews
export const useReviews = (params = {}) => {
  return useApiEffect(() => reviewService.getReviews(params), [JSON.stringify(params)]);
};

// Hook for review mutations
export const useReviewMutations = () => {
  const submitReview = useMutation(reviewService.submitReview);
  const createReview = useMutation(reviewService.createReview);
  const updateReview = useMutation(reviewService.updateReview);
  const deleteReview = useMutation(reviewService.deleteReview);
  const approveReview = useMutation(reviewService.approveReview);

  return {
    submitReview,
    createReview,
    updateReview,
    deleteReview,
    approveReview
  };
};
