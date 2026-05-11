import studioReal from '../assets/images/home/studio-real.jpg';
import designerWork from '../assets/images/home/designer-work.jpg';
import runwayModel from '../assets/images/home/runway-model.jpg';
import streetFashion from '../assets/images/home/street-fashion.jpg';
import { products } from './mockProducts.js';

export const SELLER_APPLICATION_KEY = 'trendsetter-seller-application';

export const sellerStatuses = {
  none: { label: 'Стать продавцом', tone: 'neutral' },
  pending: { label: 'Заявка на проверке', tone: 'pending' },
  approved: { label: 'Одобрено', tone: 'approved' },
  rejected: { label: 'Заявка отклонена', tone: 'rejected' },
  blocked: { label: 'Заблокировано', tone: 'blocked' },
};

export const sellerSections = [
  { id: 'home', label: 'Главная', to: '/seller' },
  { id: 'products', label: 'Товары', to: '/seller/products' },
  { id: 'add-product', label: 'Добавить товар', to: '/seller/add-product' },
  { id: 'orders', label: 'Заказы', to: '/seller/orders' },
  { id: 'collections', label: 'Коллекции', to: '/seller/collections' },
  { id: 'stock', label: 'Остатки', to: '/seller/stock' },
  { id: 'reviews', label: 'Отзывы', to: '/seller/reviews' },
  { id: 'analytics', label: 'Аналитика', to: '/seller/analytics' },
  { id: 'finance', label: 'Финансы', to: '/seller/finance' },
  { id: 'settings', label: 'Настройки магазина', to: '/seller/settings' },
];

export const approvedDesigners = [
  {
    id: 'larisa-guzeeva',
    brandName: 'Larisa Guzeeva Studio',
    legalName: 'Лариса Гузеева',
    city: 'Улан-Удэ',
    description: 'Авторская верхняя одежда, апсайкл и streetwear-капсулы с мягкой посадкой.',
    categories: ['бомберы', 'куртки', 'апсайкл'],
    productsCount: 24,
    rating: '4.9',
    logo: 'LG',
    cover: studioReal,
    socials: ['instagram.com/larisa.studio', 'tiktok.com/@larisastudio'],
    products: products.slice(0, 3),
    status: 'approved',
    publicProfileComplete: true,
  },
  {
    id: 'atelier-north',
    brandName: 'Atelier North',
    legalName: 'ООО Ателье Норд',
    city: 'Москва',
    description: 'Минималистичные жакеты, костюмная линия и индивидуальный пошив для города.',
    categories: ['жакеты', 'костюмы', 'шерсть'],
    productsCount: 18,
    rating: '4.8',
    logo: 'AN',
    cover: designerWork,
    socials: ['instagram.com/ateliernorth'],
    products: products.slice(1, 3),
    status: 'approved',
    publicProfileComplete: true,
  },
  {
    id: 'buryat-craft',
    brandName: 'Buryat Craft',
    legalName: 'Buryat Craft',
    city: 'Иркутск',
    description: 'Крафтовая одежда, вышивка, этно-детали и современные унисекс-силуэты.',
    categories: ['ручная работа', 'декор', 'унисекс'],
    productsCount: 31,
    rating: '4.7',
    logo: 'BC',
    cover: runwayModel,
    socials: ['instagram.com/buryatcraft', 'tiktok.com/@buryatcraft'],
    products: products,
    status: 'approved',
    publicProfileComplete: true,
  },
];

export const emptySellerApplication = {
  status: 'none',
  sellerType: 'самозанятый дизайнер',
  sellerName: '',
  inn: '',
  ogrn: '',
  phone: '',
  email: '',
  city: '',
  brandName: '',
  brandDescription: '',
  categories: '',
  socials: '',
  logoName: '',
  coverName: '',
  identityDocument: '',
  companyDocument: '',
  bankDetails: '',
  certificate: '',
  brandRights: '',
  publicProfileComplete: false,
  submittedAt: '',
};

export function readSellerApplication() {
  try {
    const stored = localStorage.getItem(SELLER_APPLICATION_KEY);
    if (!stored) return emptySellerApplication;
    return { ...emptySellerApplication, ...JSON.parse(stored) };
  } catch {
    return emptySellerApplication;
  }
}

export function saveSellerApplication(application) {
  localStorage.setItem(SELLER_APPLICATION_KEY, JSON.stringify(application));
  window.dispatchEvent(new Event('trendsetter-seller-update'));
}

export function getPublicDesigners(application = readSellerApplication()) {
  const userDesigner =
    application.status === 'approved' && application.publicProfileComplete
      ? [
          {
            id: 'my-brand',
            brandName: application.brandName || 'Мой бренд',
            legalName: application.sellerName || 'Пользователь TrendSetter',
            city: application.city || 'Москва',
            description: application.brandDescription || 'Публичный профиль бренда продавца TrendSetter.',
            categories: application.categories ? application.categories.split(',').map((item) => item.trim()).filter(Boolean) : ['дизайнерская одежда'],
            productsCount: 0,
            rating: 'Новый',
            logo: (application.brandName || 'MB').slice(0, 2).toUpperCase(),
            cover: streetFashion,
            socials: application.socials ? application.socials.split('\n').filter(Boolean) : [],
            products: [],
            status: 'approved',
            publicProfileComplete: true,
          },
        ]
      : [];

  return [...userDesigner, ...approvedDesigners].filter((designer) => designer.status === 'approved' && designer.publicProfileComplete);
}
