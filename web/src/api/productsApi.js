import { products } from '../data/mockProducts.js';

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 180));

export const productsApi = {
  getProducts: () => wait(products),
  getProductById: (id) => wait(products.find((product) => product.id === id)),
  getFavorites: () => wait(products.filter((product) => product.isFavorite)),
  addToFavorites: (id) => wait({ id, isFavorite: true }),
  removeFromFavorites: (id) => wait({ id, isFavorite: false }),
};
