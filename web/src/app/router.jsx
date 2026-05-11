import MainLayout from './MainLayout.jsx';
import Home from '../pages/Home/Home.jsx';
import Catalog from '../pages/Catalog/Catalog.jsx';
import Product from '../pages/Product/Product.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import Chat from '../pages/Chat/Chat.jsx';
import Favorites from '../pages/Favorites/Favorites.jsx';
import Login from '../pages/Auth/Login.jsx';
import Register from '../pages/Auth/Register.jsx';
import TryOn from '../pages/TryOn/TryOn.jsx';
import Designers from '../pages/Designers/Designers.jsx';
import About from '../pages/About/About.jsx';
import Company from '../pages/Company/Company.jsx';
import Contacts from '../pages/Contacts/Contacts.jsx';
import Reviews from '../pages/Reviews/Reviews.jsx';
import NewArrivals from '../pages/NewArrivals/NewArrivals.jsx';
import CustomUpcycle from '../pages/CustomUpcycle/CustomUpcycle.jsx';
import Promotions from '../pages/Promotions/Promotions.jsx';
import Checkout from '../pages/Checkout/Checkout.jsx';
import SellerApplication from '../pages/SellerApplication/SellerApplication.jsx';
import SellerDashboard from '../pages/SellerDashboard/SellerDashboard.jsx';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'catalog', element: <Catalog /> },
      { path: 'new', element: <NewArrivals /> },
      { path: 'catalog/new', element: <NewArrivals /> },
      { path: 'catalog/:category', element: <Catalog /> },
      { path: 'product/:id', element: <Product /> },
      { path: 'profile', element: <Profile /> },
      { path: 'profile/orders', element: <Profile section="orders" /> },
      { path: 'profile/favorites', element: <Profile section="favorites" /> },
      { path: 'profile/settings', element: <Profile section="settings" /> },
      { path: 'chat', element: <Chat /> },
      { path: 'chat/:dialogId', element: <Chat /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'seller/apply', element: <SellerApplication /> },
      { path: 'seller', element: <SellerDashboard /> },
      { path: 'seller/products', element: <SellerDashboard section="products" /> },
      { path: 'seller/add-product', element: <SellerDashboard section="add-product" /> },
      { path: 'seller/orders', element: <SellerDashboard section="orders" /> },
      { path: 'seller/collections', element: <SellerDashboard section="collections" /> },
      { path: 'seller/stock', element: <SellerDashboard section="stock" /> },
      { path: 'seller/reviews', element: <SellerDashboard section="reviews" /> },
      { path: 'seller/analytics', element: <SellerDashboard section="analytics" /> },
      { path: 'seller/finance', element: <SellerDashboard section="finance" /> },
      { path: 'seller/settings', element: <SellerDashboard section="settings" /> },
      { path: 'try-on', element: <TryOn /> },
      { path: 'custom-upcycle', element: <CustomUpcycle /> },
      { path: 'promotions', element: <Promotions /> },
      { path: 'designers', element: <Designers /> },
      { path: 'designer/:id', element: <Designers /> },
      { path: 'company', element: <Company /> },
      { path: 'about', element: <About /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'reviews', element: <Reviews /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];
