import { products } from './mockProducts.js';
import streetFashion from '../assets/images/home/street-fashion.jpg';
import runwayModel from '../assets/images/home/gotsiy-model.jpg';
import designerWork from '../assets/images/home/designer-work.jpg';
import studioReal from '../assets/images/home/studio-real.jpg';
import atelier from '../assets/images/home/designer-work.jpg';
import runwayClose from '../assets/images/home/runway-model.jpg';

const fashionImages = {
  streetwear: streetFashion,
  business: studioReal,
  glamour: runwayClose,
  casual: designerWork,
  studio: studioReal,
  atelier,
  editorial: runwayModel,
  runway: runwayModel,
  redLook: streetFashion,
};

export const heroTiles = [
  { id: 'streetwear', title: 'Street wear', image: fashionImages.streetwear, to: '/catalog/streetwear', variant: 'wide' },
  { id: 'business', title: 'Business', image: fashionImages.business, to: '/catalog/business', variant: 'tall' },
  { id: 'casual', title: 'Casual', image: fashionImages.casual, to: '/catalog/casual' },
  { id: 'glamour', title: 'Glamour', image: fashionImages.glamour, to: '/catalog/glamour' },
];

export const productSections = [
  {
    id: 'season',
    title: 'Сезонная одежда',
    subtitle: 'От лучших дизайнеров по всей России',
    products,
  },
  {
    id: 'special',
    title: 'Специально для вас',
    subtitle: 'От лучших дизайнеров по всей России',
    products,
  },
];

export const sliders = [
  {
    id: 'classes',
    title: 'Мастер-классы',
    subtitle: 'Создаем вместе',
    slides: [
      {
        image: fashionImages.studio,
        text: 'Добро пожаловать в наш бутик! Здесь вы найдете изысканные наряды, созданные с любовью к стилю и деталям.',
      },
      {
        image: fashionImages.atelier,
        text: 'Создавайте вещи вместе с дизайнерами: от эскиза до готовой посадки и финального образа.',
      },
      {
        image: fashionImages.runway,
        text: 'Практические встречи, кастомизация и новые техники для тех, кто хочет понимать одежду глубже.',
      },
    ],
  },
  {
    id: 'designers',
    title: 'Дизайнеры',
    subtitle: 'Наше комьюнити',
    slides: [
      {
        image: fashionImages.streetwear,
        text: 'Познакомьтесь с авторами коллекций, которые создают локальную моду и новые силуэты.',
      },
      {
        image: fashionImages.editorial,
        text: 'TrendSetter объединяет дизайнеров, бутики и покупателей в одной живой fashion-платформе.',
      },
      {
        image: fashionImages.redLook,
        text: 'Выбирайте бренды, следите за новинками и находите одежду с характером.',
      },
    ],
  },
];

export const recommendations = [
  { id: 'editorial', title: 'Business', image: fashionImages.redLook, size: 'large' },
  { id: 'studio', title: 'Business', image: fashionImages.streetwear },
  { id: 'casual-small', title: 'Business', image: fashionImages.casual },
];
