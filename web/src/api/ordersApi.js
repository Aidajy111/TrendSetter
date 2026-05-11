import { orders } from '../data/mockOrders.js';

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 180));

export const ordersApi = {
  createOrder: (data) => wait({ id: 'order-new', ...data, status: 'created' }),
  getOrders: () => wait(orders),
};
