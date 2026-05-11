const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 500));

export const tryOnApi = {
  uploadPhoto: (file) => wait({ photoId: 'photo-mock', name: file?.name }),
  startTryOn: (productId, photoId) => wait({ id: 'tryon-mock', productId, photoId, status: 'processing' }),
  getTryOnResult: (id) => wait({ id, status: 'done', imageUrl: null }),
};
