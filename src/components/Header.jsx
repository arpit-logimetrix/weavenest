import React, { useState, useRef, useEffect } from 'react';
import { BRAND_ASSETS, NAV_DROPDOWNS } from '../data/catalog';
import {
  SearchIcon,
  UserIcon,
  HeartIcon,
  BagIcon,
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
} from './Icons';

export default function Header({
  currentRoute,
  currentUser,
  wishlistCount,
  bagCount,
  searchQuery,
  onSearchSubmit,
  onNavigate,
  onNavigateCollection,
  onOpenBagDrawer,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const navRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setLocalQuery(searchQuery || '');
  }, [searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleCollectionNav = (filterObj) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigateCollection(filterObj);
  };

  const handleRouteNav = (route) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(localQuery);
    setSearchOpen(false);
  };

  return (
    <header className="site-header" ref={navRef}>
      <div className="container header-inner">
        <div className="header-left-slot">
          <button
            type="button"
            className="mobile-menu-trigger"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>

          <a
            href="#/"
            className="brand-logo-link desktop-logo-link"
            aria-label="The Weavenest Home"
            onClick={(e) => {
              e.preventDefault();
              handleRouteNav('/');
            }}
          >
            <img
              src={BRAND_ASSETS.logoHeader}
              alt="WeaveNest — The tradition of threads"
              className="brand-logo-img"
            />
          </a>
        </div>

        <a
          href="#/"
          className="brand-logo-link mobile-logo-link"
          aria-label="The Weavenest Home"
          onClick={(e) => {
            e.preventDefault();
            handleRouteNav('/');
          }}
        >
          <img
            src={BRAND_ASSETS.logoHeader}
            alt="WeaveNest — The tradition of threads"
            className="brand-logo-img"
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {['Sarees', 'Suits & Sets'].map((menuName) => {
            const isOpen = openDropdown === menuName;
            return (
              <div
                key={menuName}
                className="nav-dropdown-wrapper"
                onMouseEnter={() => setOpenDropdown(menuName)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className={`nav-link nav-dropdown-btn ${isOpen ? 'is-active' : ''}`}
                  aria-expanded={isOpen}
                  onClick={() =>
                    handleCollectionNav(
                      menuName === 'Sarees'
                        ? { category: 'Sarees', title: 'Sarees', subtitle: 'Grace in every weave' }
                        : { category: 'Suits & Sets', title: 'Suits & Sets', subtitle: 'Tailored heritage silhouettes' }
                    )
                  }
                >
                  <span>{menuName}</span>
                  <ChevronDownIcon size={12} />
                </button>
                {isOpen && (
                  <div className="nav-dropdown-panel" role="menu">
                    {NAV_DROPDOWNS[menuName].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        role="menuitem"
                        className="nav-dropdown-item"
                        onClick={() => handleCollectionNav(item.filter)}
                      >
                        <span>{item.label}</span>
                        <span className="nav-dropdown-tag">{item.tag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            className={`nav-link ${currentRoute === '/collections' ? 'is-current' : ''}`}
            onClick={() =>
              handleCollectionNav({
                occasion: 'festive',
                title: 'Festive Edit',
                subtitle: 'Heirloom weaves crafted for celebrations',
              })
            }
          >
            Festive Edit
          </button>

          <span className="nav-divider" aria-hidden="true" />

          <button
            type="button"
            className="nav-link"
            onClick={() =>
              handleCollectionNav({
                category: 'All',
                title: 'New Arrivals',
                subtitle: 'Thoughtfully curated seasonal weaves',
              })
            }
          >
            New Arrivals
          </button>

          <button
            type="button"
            className={`nav-link ${currentRoute === '/our-story' ? 'is-current' : ''}`}
            onClick={() => handleRouteNav('/our-story')}
          >
            Our Story
          </button>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-action-btn"
            aria-label="Search collection"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            <SearchIcon size={20} />
          </button>

          <button
            type="button"
            className="icon-action-btn header-account-btn"
            aria-label={currentUser ? 'Account' : 'Sign In'}
            onClick={() => handleRouteNav(currentUser ? '/account' : '/login')}
          >
            <UserIcon size={20} />
          </button>

          <button
            type="button"
            className="icon-action-btn"
            aria-label={`Wishlist (${wishlistCount} items)`}
            onClick={() => handleRouteNav('/wishlist')}
          >
            <HeartIcon size={20} filled={currentRoute === '/wishlist'} />
            {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
          </button>

          <button
            type="button"
            className="icon-action-btn"
            aria-label={`Shopping bag (${bagCount} items)`}
            onClick={() => {
              if (currentRoute === '/cart') {
                handleRouteNav('/cart');
              } else {
                onOpenBagDrawer();
              }
            }}
          >
            <BagIcon size={20} />
            {bagCount > 0 && <span className="action-badge">{bagCount}</span>}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="header-search-bar">
          <form className="container header-search-inner" onSubmit={handleSearchFormSubmit}>
            <SearchIcon size={17} />
            <input
              ref={searchInputRef}
              type="search"
              className="header-search-input"
              placeholder="Search Banarasi silk, cotton sarees, suit sets..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
            <button type="submit" className="header-search-go">
              Search
            </button>
            <button
              type="button"
              className="header-search-close"
              aria-label="Close search"
              onClick={() => {
                setSearchOpen(false);
                if (localQuery) {
                  setLocalQuery('');
                  onSearchSubmit('');
                }
              }}
            >
              <CloseIcon size={17} />
            </button>
          </form>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-drawer-links">
            <button type="button" onClick={() => handleRouteNav('/')}>
              Home
            </button>

            {['Sarees', 'Suits & Sets'].map((group) => {
              const expanded = mobileAccordion === group;
              return (
                <div key={group} className="mobile-accordion-group">
                  <button
                    type="button"
                    className="mobile-accordion-trigger"
                    aria-expanded={expanded}
                    onClick={() => setMobileAccordion(expanded ? null : group)}
                  >
                    <span>{group}</span>
                    <ChevronDownIcon size={14} />
                  </button>
                  {expanded && (
                    <div className="mobile-accordion-items">
                      {NAV_DROPDOWNS[group].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => handleCollectionNav(item.filter)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              onClick={() =>
                handleCollectionNav({
                  occasion: 'festive',
                  title: 'Festive Edit',
                  subtitle: 'Heirloom weaves crafted for celebrations',
                })
              }
            >
              Festive Edit
            </button>
            <button
              type="button"
              onClick={() =>
                handleCollectionNav({
                  category: 'All',
                  title: 'New Arrivals',
                  subtitle: 'Thoughtfully curated seasonal weaves',
                })
              }
            >
              New Arrivals
            </button>
            <button type="button" onClick={() => handleRouteNav('/our-story')}>
              Our Story
            </button>
            <button type="button" onClick={() => handleRouteNav('/blog')}>
              Our Blog
            </button>

            <div className="mobile-drawer-utility">
              <button
                type="button"
                onClick={() => handleRouteNav(currentUser ? '/account' : '/login')}
              >
                {currentUser ? 'Account' : 'Sign In'}
              </button>
              <button type="button" onClick={() => handleRouteNav('/wishlist')}>
                Wishlist ({wishlistCount})
              </button>
              <button type="button" onClick={() => handleRouteNav('/cart')}>
                Your Cart ({bagCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
