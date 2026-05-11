import { currentUser } from '../data/mockUsers.js';

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 180));

export const authApi = {
  login: (data) => wait({ user: currentUser, token: 'mock-token', email: data.email }),
  register: (data) => wait({ user: { ...currentUser, ...data }, token: 'mock-token' }),
  logout: () => wait({ success: true }),
  getCurrentUser: () => wait(currentUser),
};
