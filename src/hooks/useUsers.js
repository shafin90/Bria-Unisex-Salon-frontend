import { useApiEffect, useMutation } from './useApi.js';
import { userService } from '../services';

// Hook for fetching users
export const useUsers = (params = {}) => {
  return useApiEffect(() => userService.getUsers(params), [JSON.stringify(params)]);
};

// Hook for user mutations
export const useUserMutations = () => {
  const createUser = useMutation(userService.createUser);
  const updateUser = useMutation(userService.updateUser);
  const deleteUser = useMutation(userService.deleteUser);

  return {
    createUser,
    updateUser,
    deleteUser
  };
};
