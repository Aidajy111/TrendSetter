import streetFashion from '../assets/images/home/street-fashion.jpg';
import runwayModel from '../assets/images/home/gotsiy-model.jpg';
import designerWork from '../assets/images/home/designer-work.jpg';

export const products = [
  {
    id: 'cream-jacket',
    title: 'Авторский образ',
    brand: 'Лариса Гузеева',
    description: 'Лаконичный streetwear-комплект для городского гардероба',
    price: 5890,
    oldPrice: 9890,
    image: streetFashion,
    badge: 'Скидка 20%',
    badgeTone: 'accent',
    isFavorite: true,
  },
  {
    id: 'black-jacket',
    title: 'Подиумный жакет',
    brand: 'Лариса Гузеева',
    description: 'Фактурная дизайнерская вещь с возможностью кастомизации',
    price: 5890,
    oldPrice: 9890,
    image: runwayModel,
    badge: 'Можно кастомизировать',
    badgeTone: 'dark',
    isFavorite: false,
  },
  {
    id: 'pink-jacket',
    title: 'Студийный сет',
    brand: 'Лариса Гузеева',
    description: 'Образ от локального ателье с акцентом на материал',
    price: 5890,
    oldPrice: 7890,
    image: designerWork,
    isFavorite: false,
  },
];
