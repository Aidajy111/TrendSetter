import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Heart, LocateFixed, MapPin, Percent, Search, X } from 'lucide-react';
import jacketCream from '../../assets/images/products/jacket-cream.svg';
import {
  CART_STORAGE_KEY,
  FAVORITES_STORAGE_KEY,
  initialCartItems,
  initialFavoriteItems,
  readStoredItems,
} from '../../data/mockShop.js';
import { formatPrice } from '../../utils/formatPrice.js';
import styles from './Catalog.module.css';

const cities = ['Москва', 'Улан-Удэ', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 'Иркутск'];

const PRODUCTS_PER_PAGE = 8;
const CATALOG_FILTERS_KEY = 'trendsetter-catalog-filters';
const defaultCatalogState = {
  city: 'Москва',
  customizable: [],
  filters: { brand: '', collection: '', style: '', color: '', season: '' },
  priceFrom: '',
  priceTo: '',
  selectedBoutiques: [],
  selectedTrends: [],
  selectedSizes: [],
  gender: '',
  sort: 'popular',
};

function readCatalogState() {
  try {
    const saved = localStorage.getItem(CATALOG_FILTERS_KEY);

    return saved ? { ...defaultCatalogState, ...JSON.parse(saved) } : defaultCatalogState;
  } catch {
    return defaultCatalogState;
  }
}

const catalogProducts = Array.from({ length: 18 }).map((_, index) => ({
  id: `nefor-jacket-${index + 1}`,
  title: index % 3 === 1 ? 'Подиумный жакет' : 'Нефорские куртки',
  brand: index % 2 === 0 ? 'Лариса Гузеева' : 'Atelier North',
  boutique: ['Бутик1', 'Бутик2', 'Бутик3', 'Бутик4'][index % 4],
  collection: index % 2 === 0 ? 'Зима 2026' : 'Urban Drop',
  style: index % 2 === 0 ? 'Streetwear' : 'Business',
  color: index % 2 === 0 ? 'Молочный' : 'Коричневый',
  season: index % 2 === 0 ? 'Зима' : 'Демисезон',
  gender: index % 4 === 0 ? 'Унисекс' : index % 3 === 0 ? 'Мужское' : 'Женское',
  trend: index % 2 === 0 ? 'Современные' : 'Вайбовые',
  size: ['XS', 'S', 'M', 'L', 'XL'][index % 5],
  customizable: index % 3 !== 1,
  description: 'Неклассические куртки с теплые и мягкие зимние',
  price: 4890 + index * 450,
  oldPrice: 9890,
  image: jacketCream,
}));

const filterOptions = {
  brand: ['Лариса Гузеева', 'Atelier North'],
  collection: ['Зима 2026', 'Urban Drop'],
  style: ['Streetwear', 'Business'],
  color: ['Молочный', 'Коричневый'],
  season: ['Зима', 'Демисезон'],
};

const filterLabels = {
  brand: 'Бренд',
  collection: 'Коллекция',
  style: 'Стиль',
  color: 'Цвет',
  season: 'Сезон',
};

const boutiques = ['Бутик1', 'Бутик2', 'Бутик3', 'Бутик4', 'Бутик5'];
const trends = ['Современные', 'Вайбовые', 'Ниче такие'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

function FilterGroup({ title, children }) {
  return (
    <section className={styles.filterGroup}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function CheckOption({ label, checked, onChange }) {
  return (
    <label className={styles.checkOption}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

function CatalogProductCard({ product, inCart, isFavorite, onToggleCart, onToggleFavorite }) {
  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageBox}>
        <span className={styles.tryBadge}>Можно примерить</span>
        <img src={product.image} alt={product.title} />
      </Link>
      <button
        className={`${styles.cardFavorite} ${isFavorite ? styles.cardFavoriteActive : ''}`}
        type="button"
        onClick={() => onToggleFavorite(product.id)}
        aria-label="Добавить в избранное"
      >
        <Heart size={20} fill={isFavorite ? '#ef3b73' : 'none'} />
      </button>
      <div className={styles.cardBody}>
        <h2>{product.title}</h2>
        <p className={styles.designer}>
          Дизайнер: <b>{product.brand}</b>
        </p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.buyRow}>
          <button className={inCart ? styles.inCart : ''} type="button" onClick={() => onToggleCart(product.id)}>
            {inCart ? 'В корзине' : 'В корзину'}
          </button>
          <strong>{formatPrice(product.price)}</strong>
          <span>{formatPrice(product.oldPrice)}</span>
        </div>
      </div>
    </article>
  );
}

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParams.get('search')?.trim() || '';
  const initialState = useMemo(() => readCatalogState(), []);
  const [searchValue, setSearchValue] = useState(search);
  const [city, setCity] = useState(initialState.city);
  const [citySearch, setCitySearch] = useState('');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [customizable, setCustomizable] = useState(initialState.customizable);
  const [filters, setFilters] = useState(initialState.filters);
  const [priceFrom, setPriceFrom] = useState(initialState.priceFrom);
  const [priceTo, setPriceTo] = useState(initialState.priceTo);
  const [selectedBoutiques, setSelectedBoutiques] = useState(initialState.selectedBoutiques);
  const [selectedTrends, setSelectedTrends] = useState(initialState.selectedTrends);
  const [selectedSizes, setSelectedSizes] = useState(initialState.selectedSizes);
  const [gender, setGender] = useState(initialState.gender);
  const [sort, setSort] = useState(initialState.sort);
  const [cartItems, setCartItems] = useState(() => readStoredItems(CART_STORAGE_KEY, initialCartItems).map((item) => item.id));
  const [favoriteItems, setFavoriteItems] = useState(() => readStoredItems(FAVORITES_STORAGE_KEY, initialFavoriteItems).map((item) => item.id));
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCities = cities.filter((item) => item.toLowerCase().includes(citySearch.toLowerCase()));

  useEffect(() => {
    localStorage.setItem(
      CATALOG_FILTERS_KEY,
      JSON.stringify({
        city,
        customizable,
        filters,
        priceFrom,
        priceTo,
        selectedBoutiques,
        selectedTrends,
        selectedSizes,
        gender,
        sort,
      }),
    );
  }, [city, customizable, filters, gender, priceFrom, priceTo, selectedBoutiques, selectedSizes, selectedTrends, sort]);

  const toggleArrayValue = (value, setter) => {
    setCurrentPage(1);
    setter((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  };

  const updateFilter = (key, value) => {
    setCurrentPage(1);
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => {
    setSearchValue('');
    setCustomizable([]);
    setFilters({ brand: '', collection: '', style: '', color: '', season: '' });
    setPriceFrom('');
    setPriceTo('');
    setSelectedBoutiques([]);
    setSelectedTrends([]);
    setSelectedSizes([]);
    setGender('');
    setSort('popular');
    setCurrentPage(1);
    localStorage.removeItem(CATALOG_FILTERS_KEY);
    navigate('/catalog');
  };

  const toggleCart = (productId) => {
    const product = catalogProducts.find((item) => item.id === productId);
    if (!product) return;

    const stored = readStoredItems(CART_STORAGE_KEY, initialCartItems);
    const exists = stored.some((item) => item.id === productId);
    const next = exists
      ? stored.filter((item) => item.id !== productId)
      : [...stored, { ...product, designer: product.brand, size: 'M', qty: 1 }];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('trendsetter-shop-update'));
    setCartItems(next.map((item) => item.id));
  };

  const toggleFavorite = (productId) => {
    const product = catalogProducts.find((item) => item.id === productId);
    if (!product) return;

    const stored = readStoredItems(FAVORITES_STORAGE_KEY, initialFavoriteItems);
    const exists = stored.some((item) => item.id === productId);
    const next = exists
      ? stored.filter((item) => item.id !== productId)
      : [...stored, { id: product.id, title: product.title, designer: product.brand, price: product.price, image: product.image }];

    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('trendsetter-shop-update'));
    setFavoriteItems(next.map((item) => item.id));
  };

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    const minPrice = Number(priceFrom) || 0;
    const maxPrice = Number(priceTo) || Infinity;

    return catalogProducts
      .filter((product) => {
        const matchesSearch = normalizedSearch
          ? [product.title, product.brand, product.description, product.boutique].some((value) =>
              value.toLowerCase().includes(normalizedSearch),
            )
          : true;
        const matchesCustom =
          customizable.length === 0 ||
          customizable.includes('Неважно') ||
          customizable.some((value) => (value === 'Да' ? product.customizable : !product.customizable));
        const matchesFilters = Object.entries(filters).every(([key, value]) => !value || product[key] === value);
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchesBoutique = selectedBoutiques.length === 0 || selectedBoutiques.includes(product.boutique);
        const matchesTrend = selectedTrends.length === 0 || selectedTrends.includes(product.trend);
        const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size);
        const matchesGender = !gender || product.gender === gender;

        return (
          matchesSearch &&
          matchesCustom &&
          matchesFilters &&
          matchesPrice &&
          matchesBoutique &&
          matchesTrend &&
          matchesSize &&
          matchesGender
        );
      })
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'new') return b.id.localeCompare(a.id);
        return 0;
      });
  }, [customizable, filters, gender, priceFrom, priceTo, search, selectedBoutiques, selectedSizes, selectedTrends, sort]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchValue.trim();

    setCurrentPage(1);
    navigate(query ? `/catalog?search=${encodeURIComponent(query)}` : '/catalog');
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      () => {
        setCity('Москва');
        setIsCityModalOpen(false);
      },
      () => {
        setCity('Москва');
      },
    );
  };

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice((safePage - 1) * PRODUCTS_PER_PAGE, safePage * PRODUCTS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <main className={styles.catalog}>
        <aside className={styles.sidebar}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <Link to="/">Главная</Link>
            <span> - Каталог</span>
          </nav>

          <FilterGroup title="Где искать">
            <button className={styles.locationButton} type="button" onClick={() => setIsCityModalOpen(true)}>
              <MapPin size={18} />
              {city}
            </button>
          </FilterGroup>

          <button className={styles.resetButton} type="button" onClick={resetFilters}>
            Сбросить фильтры
          </button>

          <FilterGroup title="Можно кастомизировать">
            {['Да', 'Нет', 'Неважно'].map((item) => (
              <CheckOption
                key={item}
                label={item}
                checked={customizable.includes(item)}
                onChange={() => toggleArrayValue(item, setCustomizable)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Характеристики">
            <div className={styles.selectList}>
              {Object.entries(filterOptions).map(([key, options]) => (
                <label key={key} className={styles.selectControl}>
                  <select value={filters[key]} onChange={(event) => updateFilter(key, event.target.value)}>
                    <option value="">{filterLabels[key]}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Цена от и до">
            <div className={styles.priceInputs}>
              <input
                inputMode="numeric"
                placeholder="От"
                value={priceFrom}
                onChange={(event) => {
                  setCurrentPage(1);
                  setPriceFrom(event.target.value.replace(/\D/g, ''));
                }}
              />
              <input
                inputMode="numeric"
                placeholder="До"
                value={priceTo}
                onChange={(event) => {
                  setCurrentPage(1);
                  setPriceTo(event.target.value.replace(/\D/g, ''));
                }}
              />
            </div>
          </FilterGroup>

          <FilterGroup title="Выберите бутик">
            <div className={styles.chips}>
              {boutiques.map((chip) => (
                <button
                  key={chip}
                  className={selectedBoutiques.includes(chip) ? styles.activeChip : ''}
                  type="button"
                  onClick={() => toggleArrayValue(chip, setSelectedBoutiques)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Треды">
            {trends.map((trend) => (
              <CheckOption
                key={trend}
                label={trend}
                checked={selectedTrends.includes(trend)}
                onChange={() => toggleArrayValue(trend, setSelectedTrends)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Размер">
            {sizes.map((size) => (
              <CheckOption
                key={size}
                label={size}
                checked={selectedSizes.includes(size)}
                onChange={() => toggleArrayValue(size, setSelectedSizes)}
              />
            ))}
          </FilterGroup>
        </aside>

        <section className={styles.results}>
          <section className={styles.saleBanner}>
            <div>
              <h1>Зимние скидосы</h1>
              <p>Зимние скидки на товары в магазине Marvel</p>
            </div>
            <Percent className={styles.percentLeft} size={76} />
            <Percent className={styles.percentRight} size={52} />
            <img src={jacketCream} alt="Зимняя куртка" />
          </section>

          <form className={styles.searchPanel} onSubmit={handleSearch}>
            <label className={styles.topSelect}>
              <select
                value={gender}
                onChange={(event) => {
                  setCurrentPage(1);
                  setGender(event.target.value);
                }}
              >
                <option value="">Все</option>
                <option value="Женское">Женское</option>
                <option value="Мужское">Мужское</option>
                <option value="Унисекс">Унисекс</option>
              </select>
            </label>
            <label className={styles.topSelect}>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="popular">Упорядочить</option>
                <option value="new">Новинки</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
              </select>
            </label>
            <label className={styles.searchInput}>
              <Search size={18} />
              <input value={searchValue} placeholder="Бренд, Дизайнер, Бутик" onChange={(event) => setSearchValue(event.target.value)} />
            </label>
            <button className={styles.searchButton} type="submit">
              Найти
            </button>
          </form>

          <div className={styles.resultMeta}>
            <span>Найдено: {filteredProducts.length}</span>
          </div>

          {paginatedProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {paginatedProducts.map((product) => (
                <CatalogProductCard
                  key={product.id}
                  product={product}
                  inCart={cartItems.includes(product.id)}
                  isFavorite={favoriteItems.includes(product.id)}
                  onToggleCart={toggleCart}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <section className={styles.empty}>
              <h2>Ничего не найдено</h2>
              <p>Попробуйте другой запрос или измените фильтры.</p>
            </section>
          )}

          <nav className={styles.pagination} aria-label="Пагинация каталога">
            <button type="button" aria-label="Предыдущая страница" disabled={safePage === 1} onClick={() => goToPage(safePage - 1)}>
              <ArrowLeft size={18} />
            </button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              return (
                <button key={page} className={page === safePage ? styles.activePage : ''} type="button" onClick={() => goToPage(page)}>
                  {page}
                </button>
              );
            })}
            {totalPages < 4 && <span>...</span>}
            <button type="button" aria-label="Следующая страница" disabled={safePage === totalPages} onClick={() => goToPage(safePage + 1)}>
              <ArrowRight size={18} />
            </button>
          </nav>
        </section>
      </main>

      {isCityModalOpen && (
        <div className={styles.modalOverlay} role="presentation" onMouseDown={() => setIsCityModalOpen(false)}>
          <section className={styles.cityModal} role="dialog" aria-modal="true" aria-labelledby="city-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className={styles.closeModal} type="button" aria-label="Закрыть" onClick={() => setIsCityModalOpen(false)}>
              <X size={20} />
            </button>
            <h2 id="city-title">Выберите город</h2>
            <label className={styles.citySearch}>
              <Search size={18} />
              <input value={citySearch} placeholder="Найти город" onChange={(event) => setCitySearch(event.target.value)} />
            </label>
            <button className={styles.detectButton} type="button" onClick={handleDetectLocation}>
              <LocateFixed size={18} />
              Определить местоположение
            </button>
            <div className={styles.cityList}>
              {filteredCities.map((item) => (
                <button
                  key={item}
                  className={item === city ? styles.activeCity : ''}
                  type="button"
                  onClick={() => {
                    setCity(item);
                    setIsCityModalOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
