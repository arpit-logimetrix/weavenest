import React, { useState, useMemo, useEffect } from 'react';
import {
  BRAND_ASSETS,
  CATALOG_PRODUCTS,
  COLOR_SWATCHES,
} from '../data/catalog';
import { ProductDetailContent } from './ProductModal';
import {
  HeartIcon,
  ArrowRightIcon,
  TrashIcon,
  LockIcon,
  FilterIcon,
  CloseIcon,
  ShieldCheckIcon,
} from './Icons';

const ITEMS_PER_PAGE = 6;

export function CollectionPage({
  collectionConfig,
  searchQuery,
  wishlistIds,
  onToggleWishlist,
  onOpenProduct,
  onAddToBag,
  onClearSearch,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    collectionConfig?.category || 'All'
  );
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedFabrics, setSelectedFabrics] = useState(
    collectionConfig?.fabric ? [collectionConfig.fabric] : []
  );
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState(
    collectionConfig?.occasion || ''
  );
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(collectionConfig?.category || 'All');
    setSelectedFabrics(collectionConfig?.fabric ? [collectionConfig.fabric] : []);
    setSelectedOccasion(collectionConfig?.occasion || '');
    setSelectedPrice('all');
    setSelectedColor('');
    setCurrentPage(1);
  }, [collectionConfig]);

  const categoryCounts = useMemo(() => {
    const counts = { All: CATALOG_PRODUCTS.length };
    CATALOG_PRODUCTS.forEach((p) => {
      counts[p.collectionGroup] = (counts[p.collectionGroup] || 0) + 1;
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();

    const list = CATALOG_PRODUCTS.filter((p) => {
      if (q) {
        const hay = `${p.title} ${p.subtitle} ${p.fabric} ${p.category} ${p.color}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (selectedCategory && selectedCategory !== 'All') {
        if (p.category !== selectedCategory && p.collectionGroup !== selectedCategory) {
          return false;
        }
      }

      if (selectedOccasion && !p.occasions.includes(selectedOccasion)) {
        return false;
      }

      if (selectedFabrics.length > 0 && !selectedFabrics.includes(p.fabric)) {
        return false;
      }

      if (selectedColor && p.color !== selectedColor) {
        return false;
      }

      if (selectedPrice === '0-2000' && p.price > 2000) return false;
      if (selectedPrice === '2000-4000' && (p.price < 2000 || p.price > 4000)) return false;
      if (selectedPrice === '4000+' && p.price < 4000) return false;

      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return [...list].sort((a, b) => a.featuredOrder - b.featuredOrder);
  }, [
    searchQuery,
    selectedCategory,
    selectedOccasion,
    selectedFabrics,
    selectedColor,
    selectedPrice,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const toggleFabric = (fabric) => {
    setCurrentPage(1);
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedPrice('all');
    setSelectedFabrics([]);
    setSelectedColor('');
    setSelectedOccasion('');
    setCurrentPage(1);
    onClearSearch();
  };

  const bannerTitle = searchQuery
    ? `Search: "${searchQuery}"`
    : collectionConfig?.title || 'The Collection';
  const bannerSubtitle = searchQuery
    ? `${filteredProducts.length} handcrafted pieces found`
    : collectionConfig?.subtitle || 'Grace in every weave';

  const filterSidebarBody = (
    <div className="filter-sidebar-inner">
      <div className="filter-sidebar-head">
        <h3>Filter By</h3>
        <button type="button" className="filter-clear-link" onClick={resetAllFilters}>
          Reset
        </button>
      </div>

      <div className="filter-group">
        <h4>Category</h4>
        {[
          { label: 'All Pieces', value: 'All', count: categoryCounts.All || 0 },
          { label: 'Sarees', value: 'Sarees', count: categoryCounts.Sarees || 0 },
          { label: 'Silk Sarees', value: 'Silk Sarees', count: categoryCounts['Silk Sarees'] || 0 },
          { label: 'Suits & Sets', value: 'Suits & Sets', count: categoryCounts['Suits & Sets'] || 0 },
          { label: 'Cotton', value: 'Cotton', count: categoryCounts.Cotton || 0 },
        ].map((cat) => (
          <label key={cat.value} className="filter-radio-row">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === cat.value}
              onChange={() => {
                setSelectedCategory(cat.value);
                setCurrentPage(1);
              }}
            />
            <span>
              {cat.label} ({cat.count})
            </span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Price</h4>
        {[
          { label: 'All Prices', value: 'all' },
          { label: '₹0 – ₹2,000', value: '0-2000' },
          { label: '₹2,000 – ₹4,000', value: '2000-4000' },
          { label: '₹4,000+', value: '4000+' },
        ].map((p) => (
          <label key={p.value} className="filter-radio-row">
            <input
              type="radio"
              name="price"
              checked={selectedPrice === p.value}
              onChange={() => {
                setSelectedPrice(p.value);
                setCurrentPage(1);
              }}
            />
            <span>{p.label}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Fabric</h4>
        {['Silk', 'Banarasi', 'Cotton', 'Chanderi', 'Georgette'].map((fab) => (
          <label key={fab} className="filter-check-row">
            <input
              type="checkbox"
              checked={selectedFabrics.includes(fab)}
              onChange={() => toggleFabric(fab)}
            />
            <span>{fab}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Colour</h4>
        <div className="filter-swatch-grid">
          {COLOR_SWATCHES.map((sw) => (
            <button
              key={sw.name}
              type="button"
              className={`filter-swatch-dot ${selectedColor === sw.name ? 'is-selected' : ''}`}
              style={{ backgroundColor: sw.hex }}
              title={sw.name}
              aria-label={`Filter by ${sw.name}`}
              onClick={() => {
                setSelectedColor((prev) => (prev === sw.name ? '' : sw.name));
                setCurrentPage(1);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-view">
      {/* Collection Hero Banner */}
      <section className="collection-hero">
        <img
          src={BRAND_ASSETS.heritageFabricBannerImg}
          alt="Crimson gold Banarasi silk texture"
          className="collection-hero-img"
        />
        <div className="collection-hero-overlay" aria-hidden="true" />
        <div className="container collection-hero-content">
          <h1>{bannerTitle}</h1>
          <p>{bannerSubtitle}</p>
        </div>
      </section>

      <div className="container collection-layout">
        {/* Desktop Sidebar */}
        <aside className="collection-sidebar" aria-label="Product filters">
          {filterSidebarBody}
        </aside>

        {/* Main Product Area */}
        <div className="collection-main">
          <div className="collection-toolbar">
            <button
              type="button"
              className="mobile-filter-trigger"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FilterIcon size={16} />
              <span>Filter By</span>
            </button>

            <span className="collection-count">
              Showing {paginatedProducts.length} of {filteredProducts.length} pieces
            </span>

            <label className="collection-sort-label">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="collection-sort-select"
              >
                <option value="featured">Latest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="empty-collection-state">
              <p>No weaves match your selected filters.</p>
              <button type="button" className="btn-primary-espresso" onClick={resetAllFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="collection-product-grid">
              {paginatedProducts.map((product) => {
                const isWishlisted = wishlistIds.includes(product.id);
                return (
                  <article key={product.id} className="product-card">
                    <div className="product-media-box">
                      <button
                        type="button"
                        className="product-image-trigger"
                        onClick={() => onOpenProduct(product)}
                        aria-label={`View ${product.title}`}
                      >
                        <img
                          src={product.image}
                          alt={product.alt}
                          className="product-card-img"
                          loading="lazy"
                        />
                      </button>

                      <button
                        type="button"
                        className={`wishlist-heart-btn ${isWishlisted ? 'is-wishlisted' : ''}`}
                        aria-label="Toggle wishlist"
                        onClick={() => onToggleWishlist(product.id)}
                      >
                        <HeartIcon size={18} filled={isWishlisted} />
                      </button>

                      <div className="product-hover-bar">
                        <button
                          type="button"
                          className="product-hover-btn"
                          onClick={() => onOpenProduct(product)}
                        >
                          Quick View
                        </button>
                        <button
                          type="button"
                          className="product-hover-btn product-hover-btn-dark"
                          onClick={() => onAddToBag(product)}
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>

                    <div className="product-meta">
                      <h3 className="product-title">
                        <button
                          type="button"
                          className="product-title-btn"
                          onClick={() => onOpenProduct(product)}
                        >
                          {product.title}
                        </button>
                      </h3>
                      <p className="product-price">{product.formattedPrice}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="pagination-bar" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`page-num-btn ${safePage === pageNum ? 'is-active' : ''}`}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                >
                  {pageNum}
                </button>
              ))}
              {safePage < totalPages && (
                <button
                  type="button"
                  className="page-num-btn"
                  aria-label="Next page"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ArrowRightIcon size={14} />
                </button>
              )}
            </nav>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div
          className="drawer-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Filter products"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <aside className="side-drawer filter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2 className="drawer-title">Refine Collection</h2>
              <button
                type="button"
                className="drawer-close-btn"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <CloseIcon size={20} />
              </button>
            </div>
            <div className="drawer-body">{filterSidebarBody}</div>
            <div className="drawer-footer">
              <button
                type="button"
                className="btn-primary-espresso drawer-checkout-btn"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show {filteredProducts.length} Pieces
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export function ProductDetailPage({
  product,
  wishlistIds,
  onToggleWishlist,
  onAddToBag,
  onBuyNow,
  onSelectProduct,
}) {
  return (
    <div className="page-view pdp-page-shell">
      <div className="container">
        <ProductDetailContent
          product={product}
          wishlistIds={wishlistIds}
          onToggleWishlist={onToggleWishlist}
          onAddToBag={onAddToBag}
          onBuyNow={onBuyNow}
          onSelectProduct={onSelectProduct}
        />
      </div>
    </div>
  );
}

export function CartPage({
  items,
  onUpdateQty,
  onRemoveItem,
  onClearAll,
  onProceedCheckout,
  onContinueShopping,
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = items.length === 0 || subtotal >= 1999 ? 0 : 120;
  const total = subtotal + shipping;
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="page-view cart-page-shell">
      <div className="container">
        <div className="cart-page-header">
          <h1 className="page-heading-serif">Your Cart ({totalCount})</h1>
          {items.length > 0 && (
            <button type="button" className="cart-clear-all-btn" onClick={onClearAll}>
              <TrashIcon size={15} />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="empty-collection-state">
            <p>Your shopping bag is currently empty.</p>
            <button type="button" className="btn-primary-espresso" onClick={onContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-page-grid">
            <div className="cart-items-col">
              {items.map((item) => (
                <div key={item.cartKey || item.id} className="cart-line-row">
                  <div className="cart-line-thumb-wrap">
                    <img src={item.image} alt={item.title} className="cart-line-img" />
                  </div>

                  <div className="cart-line-info">
                    <div className="cart-line-top">
                      <div>
                        <h3>{item.title}</h3>
                        <p className="cart-line-variant">
                          {item.selectedColor || item.color}
                          {item.selectedOption ? ` • ${item.selectedOption}` : ''}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="cart-trash-btn"
                        aria-label={`Remove ${item.title}`}
                        onClick={() => onRemoveItem(item.cartKey || item.id)}
                      >
                        <TrashIcon size={17} />
                      </button>
                    </div>

                    <div className="cart-line-bottom">
                      <span className="cart-line-unit">
                        &#8377;{item.price.toLocaleString('en-IN')}
                      </span>

                      <div className="qty-stepper">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => onUpdateQty(item.cartKey || item.id, item.qty - 1)}
                        >
                          &minus;
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => onUpdateQty(item.cartKey || item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>

                      <strong className="cart-line-subtotal">
                        &#8377;{(item.price * item.qty).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="cart-summary-card">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>&#8377;{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="summary-row summary-total-row">
                <span>Total</span>
                <strong>&#8377;{total.toLocaleString('en-IN')}</strong>
              </div>

              <button
                type="button"
                className="btn-primary-espresso summary-cta-btn"
                onClick={onProceedCheckout}
              >
                <span>Proceed to Checkout</span>
                <ArrowRightIcon size={15} />
              </button>

              <button
                type="button"
                className="summary-secondary-btn"
                onClick={onContinueShopping}
              >
                Continue Shopping
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export function CheckoutPage({
  items,
  addresses,
  onSaveAddresses,
  onPlaceOrder,
  onBackToShop,
}) {
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || '');
  const [addingAddress, setAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: '',
    line1: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI / QR');
  const [placedOrder, setPlacedOrder] = useState(null);
  const [formError, setFormError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = items.length === 0 || subtotal >= 1999 ? 0 : 120;
  const total = subtotal + shipping;

  const activeAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddr.name.trim() || !newAddr.line1.trim() || !newAddr.city.trim() || !/^\d{6}$/.test(newAddr.pincode.trim())) {
      setFormError('Please enter name, street address, city, and a valid 6-digit pincode.');
      return;
    }
    setFormError('');
    const created = {
      id: `addr-${Date.now()}`,
      name: newAddr.name.trim(),
      line1: newAddr.line1.trim(),
      city: newAddr.city.trim(),
      state: newAddr.state.trim() || 'India',
      pincode: newAddr.pincode.trim(),
      country: 'India',
      phone: newAddr.phone.trim() || '+91',
    };
    const updated = [created, ...addresses];
    onSaveAddresses(updated);
    setSelectedAddressId(created.id);
    setAddingAddress(false);
    setNewAddr({ name: '', line1: '', city: '', state: '', pincode: '', phone: '' });
  };

  const handleOrderSubmit = () => {
    if (!activeAddress || items.length === 0) return;
    const order = onPlaceOrder({
      items,
      address: activeAddress,
      paymentMethod,
      subtotal,
      shipping,
      total,
    });
    setPlacedOrder(order);
  };

  if (placedOrder) {
    return (
      <div className="page-view checkout-page-shell">
        <div className="container checkout-confirm-wrap">
          <div className="checkout-confirm-card">
            <ShieldCheckIcon size={34} />
            <span className="modal-eyebrow">ORDER CONFIRMED</span>
            <h1 className="page-heading-serif">Thank you, {placedOrder.address.name}</h1>
            <p>
              Your order <strong>{placedOrder.id}</strong> has been recorded for{' '}
              <strong>&#8377;{placedOrder.total.toLocaleString('en-IN')}</strong> via{' '}
              {placedOrder.paymentMethod}.
            </p>
            <p className="checkout-confirm-sub">
              Delivering to: {placedOrder.address.line1}, {placedOrder.address.city} &ndash;{' '}
              {placedOrder.address.pincode}
            </p>
            <button type="button" className="btn-primary-espresso" onClick={onBackToShop}>
              <span>Continue Exploring</span>
              <ArrowRightIcon size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page-view checkout-page-shell">
        <div className="container">
          <div className="empty-collection-state">
            <p>Add a weave to your bag before checking out.</p>
            <button type="button" className="btn-primary-espresso" onClick={onBackToShop}>
              Browse Collection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-view checkout-page-shell">
      <div className="container">
        <h1 className="page-heading-serif checkout-heading">Checkout</h1>

        <div className="checkout-grid">
          {/* Left Column */}
          <div className="checkout-left-col">
            <section className="checkout-step-box">
              <div className="checkout-step-head">
                <div className="checkout-step-title">
                  <span className="step-num">1</span>
                  <h2>Shipping Address</h2>
                </div>
                <button
                  type="button"
                  className="checkout-link-action"
                  onClick={() => setAddingAddress((prev) => !prev)}
                >
                  {addingAddress ? 'Cancel' : 'Add New Address'}
                </button>
              </div>

              {addingAddress && (
                <form className="address-form-grid" onSubmit={handleSaveNewAddress}>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={newAddr.name}
                    onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  />
                  <input
                    type="text"
                    className="full-span"
                    placeholder="House / Street / Locality *"
                    value={newAddr.line1}
                    onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="City *"
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Pincode (6 digits) *"
                    value={newAddr.pincode}
                    onChange={(e) =>
                      setNewAddr({ ...newAddr, pincode: e.target.value.replace(/\D/g, '') })
                    }
                  />
                  {formError && <p className="form-error-msg full-span">{formError}</p>}
                  <button type="submit" className="btn-primary-espresso full-span">
                    Save Address
                  </button>
                </form>
              )}

              <div className="address-cards-stack">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`address-radio-card ${
                      activeAddress?.id === addr.id ? 'is-selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping-address"
                      checked={activeAddress?.id === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                    />
                    <div className="address-radio-body">
                      <strong>{addr.name}</strong>
                      <span>
                        {addr.line1}, {addr.city} &ndash; {addr.pincode}
                      </span>
                      <span>
                        {addr.state}, {addr.country}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <section className="checkout-step-box">
              <div className="checkout-step-head">
                <div className="checkout-step-title">
                  <span className="step-num">2</span>
                  <h2>Payment Method</h2>
                </div>
              </div>

              <div className="payment-methods-list">
                {['UPI / QR', 'Cards (Credit / Debit)', 'Net Banking', 'Cash on Delivery'].map(
                  (method) => (
                    <label key={method} className="payment-radio-row">
                      <input
                        type="radio"
                        name="payment-method"
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                      />
                      <span>{method}</span>
                    </label>
                  )
                )}
              </div>
            </section>

            <button
              type="button"
              className="btn-primary-espresso checkout-place-btn"
              onClick={handleOrderSubmit}
            >
              <span>Place Order</span>
              <ArrowRightIcon size={15} />
            </button>

            <p className="checkout-secure-note">
              <LockIcon size={14} />
              <span>100% Secure Payments</span>
            </p>
          </div>

          {/* Right Column */}
          <aside className="checkout-summary-box">
            <h2>Order Summary</h2>
            <div className="checkout-items-list">
              {items.map((item) => (
                <div key={item.cartKey || item.id} className="checkout-summary-item">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>
                      Qty {item.qty} &bull; &#8377;{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>&#8377;{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="summary-row summary-total-row">
                <span>Total</span>
                <strong>&#8377;{total.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export function WishlistPage({
  products,
  onToggleWishlist,
  onMoveToBag,
  onOpenProduct,
  onContinueShopping,
}) {
  return (
    <div className="page-view wishlist-page-shell">
      <div className="container">
        <div className="wishlist-page-header">
          <div>
            <h1 className="page-heading-serif">My Wishlist</h1>
            <p className="wishlist-count-sub">
              You have {products.length} {products.length === 1 ? 'item' : 'items'} in your wishlist.
            </p>
          </div>
          <button type="button" className="view-all-link" onClick={onContinueShopping}>
            <span>Continue Shopping</span>
            <ArrowRightIcon size={15} />
          </button>
        </div>

        {products.length === 0 ? (
          <div className="empty-collection-state">
            <p>Tap the heart icon on any saree or suit set to save it here.</p>
            <button type="button" className="btn-primary-espresso" onClick={onContinueShopping}>
              Explore Weaves
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-media-box">
                  <button
                    type="button"
                    className="product-image-trigger"
                    onClick={() => onOpenProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="product-card-img"
                      loading="lazy"
                    />
                  </button>
                  <button
                    type="button"
                    className="wishlist-heart-btn is-wishlisted"
                    aria-label="Remove from wishlist"
                    onClick={() => onToggleWishlist(product.id)}
                  >
                    <HeartIcon size={18} filled />
                  </button>
                </div>

                <div className="product-meta">
                  <h3 className="product-title">
                    <button
                      type="button"
                      className="product-title-btn"
                      onClick={() => onOpenProduct(product)}
                    >
                      {product.title}
                    </button>
                  </h3>
                  <p className="product-price">{product.formattedPrice}</p>
                  <button
                    type="button"
                    className="wishlist-move-btn"
                    onClick={() => onMoveToBag(product)}
                  >
                    Move to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

