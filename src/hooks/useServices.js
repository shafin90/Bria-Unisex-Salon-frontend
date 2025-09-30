import { useApiEffect, useMutation } from './useApi.js';
import { serviceService } from '../services';

// Hook for fetching services
export const useServices = () => {
  return useApiEffect(serviceService.getServices);
};

// Hook for fetching public services
export const usePublicServices = () => {
  return useApiEffect(serviceService.getPublicServices);
};

// Hook for service mutations
export const useServiceMutations = () => {
  const createService = useMutation(serviceService.createService);
  const updateService = useMutation(serviceService.updateService);
  const deleteService = useMutation(serviceService.deleteService);

  return {
    createService,
    updateService,
    deleteService
  };
};
