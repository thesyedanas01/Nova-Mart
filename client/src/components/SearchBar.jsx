import { useState, useRef, useEffect } from 'react';
import {
  HiOutlineMagnifyingGlass,
  HiXMark,
  HiOutlineSquares2X2,
  HiOutlineBookOpen,
  HiOutlineSparkles,
  HiOutlineShoppingBag,
  HiOutlineTag,
  HiOutlineHeart,
  HiOutlineArrowsUpDown,
  HiOutlineFunnel,
  HiChevronDown,
} from 'react-icons/hi2';

const gourmetIcon = () => (
  <img src="/icons/food-dinner-lunch-knife-fork-svgrepo-com.svg" alt="Gourmet" width="20" height="20" />
);

const CATEGORIES = [
  { name: 'All', Icon: HiOutlineSquares2X2 },
  { name: 'Ethnic Wear', Icon: HiOutlineShoppingBag },
  { name: 'Handicrafts', Icon: HiOutlineSparkles },
  { name: 'Wellness', Icon: HiOutlineHeart },
  { name: 'Gourmet', Icon: gourmetIcon },
  { name: 'Art & Books', Icon: HiOutlineBookOpen },
];

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  minPrice,
  maxPrice,
  onPriceChange,
  onClearAll,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  // Close filter dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0);

  return (
    <div className="catalog-filters" id="catalog-filters">
      {/* Row: Search + Filter Btn + Sort Btn */}
      <div className="catalog-search-row">
        {/* Search Input */}
        <div className="catalog-search">
          <HiOutlineMagnifyingGlass className="catalog-search__icon" />
          <input
            type="text"
            className="catalog-search__input"
            placeholder="Search Indian sarees, handicrafts, tea, artwork..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            id="search-input"
          />
          {searchTerm && (
            <button
              className="catalog-search__clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <HiXMark />
            </button>
          )}
        </div>

        {/* Filter Dropdown Popover Trigger */}
        <div className="filter-dropdown-wrapper" ref={filterRef}>
          <button
            className={`catalog-control-btn ${isFilterOpen || activeFilterCount > 0 ? 'catalog-control-btn--active' : ''}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            id="filter-toggle-btn"
          >
            <HiOutlineFunnel className="control-btn__icon" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="control-btn__badge">{activeFilterCount}</span>
            )}
            <HiChevronDown className={`control-btn__chevron ${isFilterOpen ? 'control-btn__chevron--open' : ''}`} />
          </button>

          {/* Floating Filter Panel */}
          {isFilterOpen && (
            <div className="filter-popover" id="filter-popover">
              <div className="popover-header">
                <h4 className="popover-title">Filter Products</h4>
                <button className="popover-close" onClick={() => setIsFilterOpen(false)}>
                  <HiXMark />
                </button>
              </div>

              {/* Category Select */}
              <div className="popover-section">
                <label className="popover-label">Category</label>
                <select
                  className="popover-select"
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  id="popover-category-select"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Slider (step 100) */}
              <div className="popover-section">
                <div className="popover-label-row">
                  <label className="popover-label">Max Price</label>
                  <span className="popover-value-badge">
                    {maxPrice ? `₹${Number(maxPrice).toLocaleString('en-IN')}` : 'Any'}
                  </span>
                </div>
                <input
                  type="range"
                  className="popover-range-slider"
                  min="0"
                  max="5000"
                  step="100"
                  value={maxPrice || 5000}
                  onChange={(e) =>
                    onPriceChange('max', e.target.value === '5000' ? '' : e.target.value)
                  }
                  id="price-range-slider"
                />
                <div className="range-ticks">
                  <span>₹0</span>
                  <span>₹1,500</span>
                  <span>₹3,000</span>
                  <span>₹5,000+</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="popover-footer">
                <button className="btn btn--secondary btn--sm" onClick={onClearAll} id="popover-reset-btn">
                  Reset
                </button>
                <button className="btn btn--primary btn--sm" onClick={() => setIsFilterOpen(false)} id="popover-apply-btn">
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sort Dropdown (custom styled, no native arrow) */}
        <div className="custom-sort-wrapper">
          <HiOutlineArrowsUpDown className="custom-sort__left-icon" />
          <select
            className="custom-sort__select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            id="sort-select"
          >
            <option value="newest">Featured & Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <HiChevronDown className="custom-sort__right-icon" />
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="category-pills-row">
        <span className="category-pills-label">Categories:</span>
        <div className="category-pills">
          {CATEGORIES.map(({ name, Icon }) => (
            <button
              key={name}
              className={`category-pill ${selectedCategory === name ? 'category-pill--active' : ''}`}
              onClick={() => onCategoryChange(name)}
              id={`filter-category-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <Icon className="category-pill__svg" />
              <span className="category-pill__name">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
