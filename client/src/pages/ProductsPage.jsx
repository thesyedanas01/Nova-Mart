import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import useDebounce from '../hooks/useDebounce';

const ProductsPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || 'All'
  );
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 300);
  const debouncedMinPrice = useDebounce(minPrice, 300);
  const debouncedMaxPrice = useDebounce(maxPrice, 300);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: currentPage, limit: 8 };
      if (debouncedSearch) params.search = debouncedSearch;
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (sortBy && sortBy !== 'newest') params.sort = sortBy;
      if (debouncedMinPrice) params.minPrice = debouncedMinPrice;
      if (debouncedMaxPrice) params.maxPrice = debouncedMaxPrice;

      const { data } = await API.get('/products', { params });
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, selectedCategory, sortBy, debouncedMinPrice, debouncedMaxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset to page 1 when any search/filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, sortBy, debouncedMinPrice, debouncedMaxPrice]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePriceChange = (type, val) => {
    if (type === 'min') setMinPrice(val);
    if (type === 'max') setMaxPrice(val);
  };

  const handleClearAll = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('newest');
    setMinPrice('');
    setMaxPrice('');
  };

  const startItem = pagination ? (pagination.currentPage - 1) * 8 + 1 : 0;
  const endItem = pagination ? Math.min(pagination.currentPage * 8, pagination.totalProducts) : 0;

  return (
    <main className="container" id="products-page">
      <div className="page-header">
        <h1 className="page-header__title">Discover Indian Treasures</h1>
        <p className="page-header__subtitle">
          Handcrafted sarees, authentic handicrafts, organic wellness, & artisanal gourmet
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={handlePriceChange}
        onClearAll={handleClearAll}
      />

      {/* Results Meta Bar */}
      {!loading && pagination && (
        <div className="results-meta">
          <span className="results-meta__count">
            {pagination.totalProducts > 0
              ? `Showing ${startItem}–${endItem} of ${pagination.totalProducts} items`
              : '0 items found'}
          </span>
          <div className="results-meta__active-tags">
            {selectedCategory !== 'All' && (
              <span className="results-meta__filter-badge">
                Category: {selectedCategory}
              </span>
            )}
            {sortBy !== 'newest' && (
              <span className="results-meta__filter-badge">
                Sort: {sortBy === 'price_asc' ? 'Price Low to High' : 'Price High to Low'}
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="results-meta__filter-badge">
                Price: ₹{minPrice || '0'} – ₹{maxPrice || '∞'}
              </span>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton count={8} />
      ) : products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <h2 className="empty-state__title">No products found</h2>
          <p className="empty-state__text">
            Try adjusting your search, category, or price filters to find what you&apos;re looking for
          </p>
          <button
            className="btn btn--secondary"
            onClick={handleClearAll}
            id="clear-filters"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}
    </main>
  );
};

export default ProductsPage;
