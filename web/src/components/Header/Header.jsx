import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Heart,
  LogOut,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import {
  CART_STORAGE_KEY,
  FAVORITES_STORAGE_KEY,
  initialCartItems,
  initialFavoriteItems,
  readStoredItems,
} from '../../data/mockShop.js';
import styles from './Header.module.css';

const topLinksLeft = [
  { label: 'О компании', to: '/company' },
  { label: 'Отзывы', to: '/reviews' },
];

const topLinksRight = [
  { label: 'Контакты', to: '/contacts' },
  { label: 'Дизайнеры', to: '/designers' },
];

const mainLinks = [
  { label: 'КАТАЛОГ', to: '/catalog', icon: 'catalog' },
  { label: 'CUSTOMxUPCYCLE', to: '/custom-upcycle' },
  { label: 'НОВИНКИ', to: '/new' },
];

const notificationThreads = [
  {
    id: 'support',
    title: 'Чат поддержки',
    subtitle: 'TrendSetter',
    icon: MessageCircle,
    unread: 1,
    accent: 'support',
    messages: [
      { id: 's1', author: 'support', text: 'Здравствуйте! Поможем подобрать размер, оформить заказ или найти дизайнера.', time: '10:12' },
      { id: 's2', author: 'me', text: 'Нужна помощь с размером куртки.', time: '10:14' },
      { id: 's3', author: 'support', text: 'Пришлите рост и желаемую посадку, подскажем лучший вариант.', time: '10:15' },
    ],
  },
  {
    id: 'order',
    title: 'Уведомление о заказе',
    subtitle: 'Заказ TS-2047',
    icon: Package,
    unread: 1,
    accent: 'order',
    messages: [
      { id: 'o1', author: 'system', text: 'Заказ TS-2047 принят в обработку.', time: '09:30' },
      { id: 'o2', author: 'system', text: 'Дизайнер подтвердит детали в течение дня.', time: '09:31' },
    ],
  },
  {
    id: 'designer',
    title: 'Чат с дизайнером',
    subtitle: 'Лариса Долина',
    icon: Sparkles,
    unread: 2,
    accent: 'designer',
    messages: [
      { id: 'd1', author: 'designer', text: 'Здравствуйте! Я посмотрела ваш запрос на кастомизацию.', time: '12:20' },
      { id: 'd2', author: 'designer', text: 'Можно заменить пуговицы и сделать воротник крупнее.', time: '12:22' },
      { id: 'd3', author: 'me', text: 'Отлично, хочу оставить молочный цвет.', time: '12:25' },
    ],
  },
];

const formatRub = (value) => `${value.toLocaleString('ru-RU')}Р`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => readStoredItems(CART_STORAGE_KEY, initialCartItems));
  const [favoriteItems, setFavoriteItems] = useState(() => readStoredItems(FAVORITES_STORAGE_KEY, initialFavoriteItems));
  const [activeThreadId, setActiveThreadId] = useState('support');
  const [threadMessages, setThreadMessages] = useState(() =>
    Object.fromEntries(notificationThreads.map((thread) => [thread.id, thread.messages])),
  );
  const [draft, setDraft] = useState('');
  const [readThreads, setReadThreads] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const cartRef = useRef(null);
  const favoritesRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isProfileRoute = location.pathname.startsWith('/profile');

  const activeThread = notificationThreads.find((thread) => thread.id === activeThreadId) || notificationThreads[0];
  const ActiveThreadIcon = activeThread.icon;
  const activeMessages = threadMessages[activeThread.id] || [];
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const favoritesCount = favoriteItems.length;
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const notificationsCount = useMemo(
    () => notificationThreads.reduce((sum, thread) => (readThreads.includes(thread.id) ? sum : sum + thread.unread), 0),
    [readThreads],
  );

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem('trendsetter-token')));
    setIsProfileMenuOpen(false);
    setIsNotificationsOpen(false);
    setIsCartOpen(false);
    setIsFavoritesOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileMenuOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) setIsNotificationsOpen(false);
      if (cartRef.current && !cartRef.current.contains(event.target)) setIsCartOpen(false);
      if (favoritesRef.current && !favoritesRef.current.contains(event.target)) setIsFavoritesOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const syncShopState = () => {
      setCartItems(readStoredItems(CART_STORAGE_KEY, initialCartItems));
      setFavoriteItems(readStoredItems(FAVORITES_STORAGE_KEY, initialFavoriteItems));
    };

    window.addEventListener('trendsetter-shop-update', syncShopState);
    window.addEventListener('storage', syncShopState);
    return () => {
      window.removeEventListener('trendsetter-shop-update', syncShopState);
      window.removeEventListener('storage', syncShopState);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const closeUtilityMenus = () => {
    setIsProfileMenuOpen(false);
    setIsNotificationsOpen(false);
    setIsCartOpen(false);
    setIsFavoritesOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!isSearchOpen) {
      setIsSearchOpen(true);
      return;
    }

    const query = searchValue.trim();
    if (query) {
      navigate(`/catalog?search=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setIsOpen(false);
      return;
    }

    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('trendsetter-token');
    setIsAuthenticated(false);
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const updateCartQty = (id, delta) => {
    setCartItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeCartItem = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const removeFavoriteItem = (id) => {
    setFavoriteItems((current) => current.filter((item) => item.id !== id));
  };

  const moveFavoriteToCart = (item) => {
    setCartItems((current) => {
      const exists = current.find((cartItem) => cartItem.id === item.id);
      if (exists) {
        return current.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem));
      }
      return [...current, { ...item, size: 'M', qty: 1 }];
    });
    removeFavoriteItem(item.id);
    setIsCartOpen(true);
    setIsFavoritesOpen(false);
  };

  const openThread = (threadId) => {
    setActiveThreadId(threadId);
    setReadThreads((current) => (current.includes(threadId) ? current : [...current, threadId]));
  };

  const sendPopupMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setThreadMessages((current) => ({
      ...current,
      [activeThread.id]: [
        ...(current[activeThread.id] || []),
        { id: `${activeThread.id}-${Date.now()}`, author: 'me', text, time: 'сейчас' },
      ],
    }));
    setDraft('');
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.inner}>
          <div className={styles.topLeft}>
            {!isAuthenticated && (
              <Link className={styles.login} to="/login">
                Войти
              </Link>
            )}
            {topLinksLeft.map((link) => (
              <Link key={link.label} to={link.to} className={styles.topLink}>
                {link.label}
              </Link>
            ))}
          </div>
          <Link className={styles.logo} to="/" aria-label="TrendSetter главная">
            TREND<span>/</span>SETTER
          </Link>
          <div className={styles.topRight}>
            {topLinksRight.map((link) => (
              <Link key={link.label} to={link.to} className={styles.topLink}>
                {link.label}
              </Link>
            ))}
            <form className={`${styles.searchForm} ${isSearchOpen ? styles.searchOpen : ''}`} onSubmit={handleSearchSubmit}>
              <input
                ref={searchInputRef}
                aria-label="Поиск товаров"
                placeholder="Поиск"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <button className={styles.iconButton} type="submit" aria-label="Поиск">
                <Search size={23} strokeWidth={2.1} />
              </button>
            </form>

            <div className={styles.dropdownWrap} ref={cartRef}>
              <button
                className={`${styles.iconButton} ${isCartOpen ? styles.activeIcon : ''}`}
                type="button"
                aria-label="Корзина"
                aria-expanded={isCartOpen}
                onClick={() => {
                  const nextOpen = !isCartOpen;
                  closeUtilityMenus();
                  setIsCartOpen(nextOpen);
                }}
              >
                <ShoppingCart size={24} strokeWidth={2.1} />
                {cartCount > 0 && <span>{cartCount}</span>}
              </button>
              {isCartOpen && (
                <section className={`${styles.shopPopup} ${styles.cartPopup}`} aria-label="Мини-корзина">
                  <div className={styles.shopHeader}>
                    <div>
                      <strong>Корзина</strong>
                      <p>{cartCount > 0 ? `${cartCount} товара готовы к заказу` : 'Пока пусто'}</p>
                    </div>
                    <b>{formatRub(cartSubtotal)}</b>
                  </div>
                  {cartItems.length > 0 ? (
                    <>
                      <div className={styles.shopList}>
                        {cartItems.map((item) => (
                          <article className={`${styles.shopItem} ${styles.cartItem}`} key={item.id}>
                            <Link className={styles.shopImageLink} to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)}>
                              <img src={item.image} alt={item.title} />
                            </Link>
                            <div className={styles.shopInfo}>
                              <div className={styles.shopInfoTop}>
                                <div>
                                  <h3>{item.title}</h3>
                                  <p>{item.designer}</p>
                                </div>
                                <b>{formatRub(item.price * item.qty)}</b>
                              </div>
                              <div className={styles.shopItemBottom}>
                                <small>Размер: {item.size}</small>
                                <div className={styles.qtyRow}>
                                  <button type="button" onClick={() => updateCartQty(item.id, -1)} aria-label="Уменьшить">
                                    <Minus size={14} />
                                  </button>
                                  <span>{item.qty}</span>
                                  <button type="button" onClick={() => updateCartQty(item.id, 1)} aria-label="Увеличить">
                                    <Plus size={14} />
                                  </button>
                                </div>
                                <button className={styles.deleteItem} type="button" onClick={() => removeCartItem(item.id)} aria-label="Удалить">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                      <div className={styles.shopFooter}>
                        <div>
                          <span>Итого</span>
                          <strong>{formatRub(cartSubtotal)}</strong>
                        </div>
                        <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                          Оформить заказ
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className={styles.emptyShop}>
                      <ShoppingCart size={34} />
                      <h3>Корзина пустая</h3>
                      <p>Добавьте товар из каталога, чтобы оформить заказ.</p>
                      <Link to="/catalog" onClick={() => setIsCartOpen(false)}>В каталог</Link>
                    </div>
                  )}
                </section>
              )}
            </div>

            <div className={styles.dropdownWrap} ref={favoritesRef}>
              <button
                className={`${styles.iconButton} ${isFavoritesOpen ? styles.activeIcon : ''}`}
                type="button"
                aria-label="Избранное"
                aria-expanded={isFavoritesOpen}
                onClick={() => {
                  const nextOpen = !isFavoritesOpen;
                  closeUtilityMenus();
                  setIsFavoritesOpen(nextOpen);
                }}
              >
                <Heart size={24} strokeWidth={2.1} />
                {favoritesCount > 0 && <span>{favoritesCount}</span>}
              </button>
              {isFavoritesOpen && (
                <section className={`${styles.shopPopup} ${styles.favoritesPopup}`} aria-label="Избранные товары">
                  <div className={styles.shopHeader}>
                    <div>
                      <strong>Избранное</strong>
                      <p>{favoritesCount > 0 ? 'Сохраненные дизайнерские вещи' : 'Список пуст'}</p>
                    </div>
                    <Heart size={24} />
                  </div>
                  {favoriteItems.length > 0 ? (
                    <>
                      <div className={styles.shopList}>
                        {favoriteItems.map((item) => (
                          <article className={`${styles.shopItem} ${styles.favoriteItem}`} key={item.id}>
                            <Link className={styles.shopImageLink} to={`/product/${item.id}`} onClick={() => setIsFavoritesOpen(false)}>
                              <img src={item.image} alt={item.title} />
                            </Link>
                            <div className={styles.shopInfo}>
                              <div className={styles.shopInfoTop}>
                                <div>
                                  <h3>{item.title}</h3>
                                  <p>{item.designer}</p>
                                </div>
                              </div>
                              <div className={styles.favoriteBottom}>
                                <small>{formatRub(item.price)}</small>
                                <button className={styles.moveButton} type="button" onClick={() => moveFavoriteToCart(item)}>
                                  В корзину
                                </button>
                              </div>
                            </div>
                            <div className={styles.itemSide}>
                              <button type="button" onClick={() => removeFavoriteItem(item.id)} aria-label="Убрать из избранного">
                                <X size={17} />
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                      <div className={styles.shopFooter}>
                        <div>
                          <span>Подборка</span>
                          <strong>{favoriteItems.length} шт.</strong>
                        </div>
                        <Link to="/favorites" onClick={() => setIsFavoritesOpen(false)}>
                          Открыть все
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className={styles.emptyShop}>
                      <Heart size={34} />
                      <h3>Избранное пустое</h3>
                      <p>Нажимайте сердечко на товарах, чтобы сохранить их здесь.</p>
                      <Link to="/catalog" onClick={() => setIsFavoritesOpen(false)}>Искать товары</Link>
                    </div>
                  )}
                </section>
              )}
            </div>

            {isAuthenticated && (
              <>
                {!isProfileRoute && (
                  <div className={styles.dropdownWrap} ref={notificationsRef}>
                    <button
                      className={`${styles.iconButton} ${isNotificationsOpen ? styles.activeIcon : ''}`}
                      type="button"
                      aria-label="Уведомления"
                      aria-expanded={isNotificationsOpen}
                      onClick={() => {
                        const nextOpen = !isNotificationsOpen;
                        closeUtilityMenus();
                        setIsNotificationsOpen(nextOpen);
                        if (nextOpen) {
                          openThread(activeThreadId);
                        }
                      }}
                    >
                      <Bell size={23} strokeWidth={2.1} />
                      {notificationsCount > 0 && <span>{notificationsCount}</span>}
                    </button>
                    {isNotificationsOpen && (
                      <section className={styles.notificationPopup} aria-label="Центр уведомлений">
                        <div className={styles.notificationHeader}>
                          <div>
                            <strong>Уведомления</strong>
                            <p>Поддержка, заказ и дизайнер</p>
                          </div>
                          <Link to="/chat" onClick={() => setIsNotificationsOpen(false)}>
                            Открыть чат
                          </Link>
                        </div>
                        <div className={styles.notificationBody}>
                          <div className={styles.threadList}>
                            {notificationThreads.map((thread) => {
                              const Icon = thread.icon;
                              const isActive = thread.id === activeThread.id;
                              const isRead = readThreads.includes(thread.id);

                              return (
                                <button
                                  className={`${styles.threadItem} ${isActive ? styles.threadActive : ''}`}
                                  key={thread.id}
                                  type="button"
                                  onClick={() => openThread(thread.id)}
                                >
                                  <span className={`${styles.threadIcon} ${styles[thread.accent]}`}>
                                    <Icon size={17} />
                                  </span>
                                  <span>
                                    <b>{thread.title}</b>
                                    <small>{thread.subtitle}</small>
                                  </span>
                                  {!isRead && thread.unread > 0 && <em>{thread.unread}</em>}
                                </button>
                              );
                            })}
                          </div>
                          <div className={styles.popupChat}>
                            <div className={styles.chatTop}>
                              <span className={`${styles.threadIcon} ${styles[activeThread.accent]}`}>
                                <ActiveThreadIcon size={17} />
                              </span>
                              <div>
                                <b>{activeThread.title}</b>
                                <small>
                                  <CheckCircle2 size={13} />
                                  онлайн
                                </small>
                              </div>
                            </div>
                            <div className={styles.popupMessages}>
                              {activeMessages.map((message) => (
                                <p
                                  className={`${styles.popupMessage} ${message.author === 'me' ? styles.popupMessageMine : ''}`}
                                  key={message.id}
                                >
                                  <span>{message.text}</span>
                                  <small>{message.time}</small>
                                </p>
                              ))}
                            </div>
                            <form className={styles.popupComposer} onSubmit={sendPopupMessage}>
                              <input
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                placeholder="Напишите сообщение"
                              />
                              <button type="submit" aria-label="Отправить сообщение">
                                <Send size={17} />
                              </button>
                            </form>
                          </div>
                        </div>
                      </section>
                    )}
                  </div>
                )}
                <div className={styles.dropdownWrap} ref={profileRef}>
                  <button
                    className={`${styles.iconButton} ${isProfileMenuOpen ? styles.activeIcon : ''}`}
                    type="button"
                    aria-label="Профиль"
                    aria-expanded={isProfileMenuOpen}
                    onClick={() => {
                      const nextOpen = !isProfileMenuOpen;
                      closeUtilityMenus();
                      setIsProfileMenuOpen(nextOpen);
                    }}
                  >
                    <UserRound size={23} strokeWidth={2.1} />
                  </button>
                  {isProfileMenuOpen && (
                    <div className={styles.dropdown}>
                      <strong>Анна Белова</strong>
                      <Link to="/profile">
                        <UserRound size={16} />
                        Профиль
                      </Link>
                      <Link to="/profile/orders">
                        <Package size={16} />
                        Заказы
                      </Link>
                      <Link to="/profile/settings">
                        <Settings size={16} />
                        Настройки
                      </Link>
                      <button type="button" onClick={handleLogout}>
                        <LogOut size={16} />
                        Выйти
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <button className={styles.burger} type="button" onClick={() => setIsOpen((value) => !value)} aria-label="Меню">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <nav className={`${styles.navBar} ${isOpen ? styles.open : ''}`} aria-label="Основная навигация">
        <div className={styles.navInner}>
          {mainLinks.map((link) => (
            <NavLink key={link.label} to={link.to} className={styles.navLink} onClick={() => setIsOpen(false)}>
              {link.icon === 'catalog' && (
                <span className={styles.catalogIcon} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              )}
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
