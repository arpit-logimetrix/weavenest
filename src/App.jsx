import React, { useState, useMemo, useEffect, useCallback } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import OccasionSection from './components/OccasionSection';
import ProductSection from './components/ProductSection';
import HeritageBanner from './components/HeritageBanner';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import { BagDrawer } from './components/Modals';
import {
  CollectionPage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  WishlistPage,
} from './components/ShopPages';
import {
  AboutPage,
  BlogPage,
  CareAndLegalPage,
  NotFoundPage,
} from './components/EditorialPages';
import { CATALOG_PRODUCTS, FEATURED_PRODUCTS } from './data/catalog';
import { storeService } from './services/storeService';

function getRouteFromHash() {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw || raw === '') return '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

export default function App() {
  const [route, setRoute] = useState(getRouteFromHash);
  const [collectionConfig, setCollectionConfig] = useState({
    category: 'All',
    title: 'The Collection',
    subtitle: 'Grace in every weave',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistIds, setWishlistIds] = useState(() => storeService.getWishlist());
  const [bagItems, setBagItems] = useState(() => storeService.getCart());
  const [addresses, setAddresses] = useState(() => storeService.getAddresses());
  const [orders, setOrders] = useState(() => storeService.getOrders());
  const [modalProduct, setModalProduct] = useState(null);
  const [bagDrawerOpen, setBagDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(''), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const navigate = useCallback((targetRoute) => {
    const clean = targetRoute.startsWith('/') ? targetRoute : `/${targetRoute}`;
    window.location.hash = `#${clean}`;
    setRoute(clean);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateCollection = useCallback(
    (config) => {
      setSearchQuery('');
      setCollectionConfig(config || { category: 'All', title: 'The Collection', subtitle: 'Grace in every weave' });
      navigate('/collections');
    },
    [navigate]
  );

  const showToast = (msg) => setToastMessage(msg);

  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      storeService.saveWishlist(next);
      showToast(exists ? 'Removed from wishlist.' : 'Added to your wishlist.');
      return next;
    });
  };

  const handleAddToBag = (product, qty = 1) => {
    const cartKey = `${product.id}__${product.selectedColor || product.color}__${
      product.selectedOption || 'standard'
    }`;
    setBagItems((prev) => {
      const existing = prev.find((item) => (item.cartKey || item.id) === cartKey);
      const next = existing
        ? prev.map((item) =>
            (item.cartKey || item.id) === cartKey
              ? { ...item, qty: item.qty + qty }
              : item
          )
        : [...prev, { ...product, cartKey, qty }];
      storeService.saveCart(next);
      return next;
    });
    showToast(`${product.title} added to your cart.`);
  };

  const handleBuyNow = (product, qty = 1) => {
    handleAddToBag(product, qty);
    setBagDrawerOpen(false);
    navigate('/checkout');
  };

  const handleUpdateBagQty = (cartKey, nextQty) => {
    setBagItems((prev) => {
      const next =
        nextQty <= 0
          ? prev.filter((item) => (item.cartKey || item.id) !== cartKey)
          : prev.map((item) =>
              (item.cartKey || item.id) === cartKey ? { ...item, qty: nextQty } : item
            );
      storeService.saveCart(next);
      return next;
    });
  };

  const handleRemoveBagItem = (cartKey) => {
    setBagItems((prev) => {
      const next = prev.filter((item) => (item.cartKey || item.id) !== cartKey);
      storeService.saveCart(next);
      return next;
    });
  };

  const handleClearBag = () => {
    setBagItems([]);
    storeService.saveCart([]);
    showToast('Your cart has been cleared.');
  };

  const handleSaveAddresses = (updated) => {
    setAddresses(updated);
    storeService.saveAddresses(updated);
  };

  const handlePlaceOrder = (orderPayload) => {
    const order = storeService.placeOrder(orderPayload);
    setOrders(storeService.getOrders());
    setBagItems([]);
    showToast(`Order ${order.id} placed successfully!`);
    return order;
  };

  const totalBagCount = useMemo(
    () => bagItems.reduce((sum, item) => sum + item.qty, 0),
    [bagItems]
  );

  const wishlistProducts = useMemo(
    () => CATALOG_PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  const renderPage = () => {
    if (route === '/') {
      return (
        <>
          <HeroSection
            onExploreCollection={() =>
              navigateCollection({
                category: 'All',
                title: 'The Festive Collection',
                subtitle: 'Timeless silhouettes crafted for moments worth keeping',
              })
            }
            onDiscoverStory={() => navigate('/our-story')}
          />
          <OccasionSection onSelectOccasion={navigateCollection} />
          <ProductSection
            products={FEATURED_PRODUCTS}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onOpenProduct={setModalProduct}
            onAddToBag={(prod) => handleAddToBag(prod, 1)}
            onViewAll={() =>
              navigateCollection({
                category: 'All',
                title: 'All Curated Pieces',
                subtitle: 'Grace in every weave',
              })
            }
          />
          <HeritageBanner />
        </>
      );
    }

    if (route === '/collections') {
      return (
        <CollectionPage
          collectionConfig={collectionConfig}
          searchQuery={searchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onOpenProduct={setModalProduct}
          onAddToBag={(prod) => handleAddToBag(prod, 1)}
          onClearSearch={() => setSearchQuery('')}
        />
      );
    }

    if (route.startsWith('/product/')) {
      const slug = route.replace('/product/', '');
      const found = CATALOG_PRODUCTS.find((p) => p.id === slug);
      if (!found) {
        return <NotFoundPage onGoHome={() => navigate('/')} />;
      }
      return (
        <ProductDetailPage
          product={found}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToBag={handleAddToBag}
          onBuyNow={handleBuyNow}
          onSelectProduct={(prod) => navigate(`/product/${prod.id}`)}
        />
      );
    }

    if (route === '/cart') {
      return (
        <CartPage
          items={bagItems}
          onUpdateQty={handleUpdateBagQty}
          onRemoveItem={handleRemoveBagItem}
          onClearAll={handleClearBag}
          onProceedCheckout={() => navigate('/checkout')}
          onContinueShopping={() =>
            navigateCollection({
              category: 'All',
              title: 'The Collection',
              subtitle: 'Grace in every weave',
            })
          }
        />
      );
    }

    if (route === '/checkout') {
      return (
        <CheckoutPage
          items={bagItems}
          addresses={addresses}
          onSaveAddresses={handleSaveAddresses}
          onPlaceOrder={handlePlaceOrder}
          onBackToShop={() => navigate('/')}
        />
      );
    }

    if (route === '/wishlist') {
      return (
        <WishlistPage
          products={wishlistProducts}
          onToggleWishlist={handleToggleWishlist}
          onMoveToBag={(prod) => {
            handleAddToBag(prod, 1);
            handleToggleWishlist(prod.id);
          }}
          onOpenProduct={setModalProduct}
          onContinueShopping={() =>
            navigateCollection({
              category: 'All',
              title: 'The Collection',
              subtitle: 'Grace in every weave',
            })
          }
        />
      );
    }

    if (route === '/our-story') {
      return <AboutPage mode="story" onNavigate={navigate} />;
    }

    if (route === '/our-craft') {
      return <AboutPage mode="craft" onNavigate={navigate} />;
    }

    if (route === '/blog') {
      return <BlogPage onNotify={showToast} />;
    }

    const staticRoutes = {
      '/shipping': 'shipping',
      '/returns': 'returns',
      '/faqs': 'faqs',
      '/contact': 'contact',
      '/account': 'account',
      '/privacy-policy': 'privacy',
      '/terms': 'terms',
    };

    if (staticRoutes[route]) {
      return (
        <CareAndLegalPage
          pageKey={staticRoutes[route]}
          orders={orders}
          addresses={addresses}
          onNavigate={navigate}
          onNotify={showToast}
        />
      );
    }

    return <NotFoundPage onGoHome={() => navigate('/')} />;
  };

  return (
    <div className="page-shell">
      <AnnouncementBar />

      <Header
        currentRoute={route}
        wishlistCount={wishlistIds.length}
        bagCount={totalBagCount}
        searchQuery={searchQuery}
        onSearchSubmit={(query) => {
          setSearchQuery(query);
          navigate('/collections');
        }}
        onNavigate={navigate}
        onNavigateCollection={navigateCollection}
        onOpenBagDrawer={() => setBagDrawerOpen(true)}
      />

      <main className="main-content">{renderPage()}</main>

      <Footer onNavigate={navigate} onNotify={showToast} />

      <ProductModal
        product={modalProduct}
        wishlistIds={wishlistIds}
        onClose={() => setModalProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToBag={handleAddToBag}
        onBuyNow={handleBuyNow}
        onSelectProduct={setModalProduct}
        onOpenFullPage={(prod) => navigate(`/product/${prod.id}`)}
      />

      <BagDrawer
        open={bagDrawerOpen}
        items={bagItems}
        onClose={() => setBagDrawerOpen(false)}
        onUpdateQty={handleUpdateBagQty}
        onRemoveItem={handleRemoveBagItem}
        onViewCart={() => {
          setBagDrawerOpen(false);
          navigate('/cart');
        }}
        onCheckout={() => {
          setBagDrawerOpen(false);
          navigate('/checkout');
        }}
      />

      {toastMessage && (
        <div className="toast-banner" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
