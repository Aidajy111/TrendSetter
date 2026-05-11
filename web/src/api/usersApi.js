import { currentUser } from '../data/mockUsers.js';

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 180));

export const usersApi = {
  getProfile: () => wait(currentUser),
  updateProfile: (data) => wait({ ...currentUser, ...data }),
};
