import React, { useState, useEffect } from 'react';
import { CATALOG_PRODUCTS } from '../data/catalog';
import { storeService } from '../services/storeService';
import {
  CloseIcon,
  HeartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ReturnIcon,
  ArrowRightIcon,
} from './Icons';

export function ProductDetailContent({
  product,
  wishlistIds,
  onToggleWishlist,
  onAddToBag,
  onBuyNow,
  onSelectProduct,
  onOpenFullPage,
  isModal = false,
}) {
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.swatches?.[0]?.name || product.color
  );
  const [selectedOption, setSelectedOption] = useState(product.options?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [giftNote, setGiftNote] = useState('');

  useEffect(() => {
    const nextGallery = product.gallery?.length ? product.gallery : [product.image];
    setActiveImage(nextGallery[0]);
    setSelectedColor(product.swatches?.[0]?.name || product.color);
    setSelectedOption(product.options?.[0] || 'Standard');
    setQuantity(1);
    setActiveTab('Description');
    setPincodeResult(null);
    setGiftNote('');
  }, [product]);

  const isWishlisted = wishlistIds.includes(product.id);
  const hasFallPicoExtra = selectedOption.includes('+₹150');
  const effectiveUnitPrice = product.price + (hasFallPicoExtra ? 150 : 0);

  const relatedProducts = CATALOG_PRODUCTS.filter((item) => item.id !== product.id).slice(0, 4);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    setPincodeResult(storeService.checkPincodeDelivery(pincode));
  };

  const buildCartPayload = () => ({
    ...product,
    price: effectiveUnitPrice,
    formattedPrice: `₹${effectiveUnitPrice.toLocaleString('en-IN')}`,
    selectedColor,
    selectedOption,
    giftNote: giftNote.trim(),
  });

  return (
    <div className={`pdp-wrapper ${isModal ? 'is-modal-view' : ''}`}>
      <div className="pdp-main-grid">
        {/* Left: Thumbnail rail + Hero Portrait */}
        <div className="pdp-gallery-col">
          <div className="pdp-thumbs-rail" role="tablist" aria-label="Product angles">
            {gallery.map((imgSrc, idx) => (
              <button
                key={`${product.id}-thumb-${idx}`}
                type="button"
                className={`pdp-thumb-btn ${activeImage === imgSrc ? 'is-active' : ''}`}
                onClick={() => setActiveImage(imgSrc)}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={imgSrc} alt={`${product.title} preview ${idx + 1}`} />
              </button>
            ))}
          </div>

          <div className="pdp-hero-frame">
            <img src={activeImage} alt={product.alt} className="pdp-hero-img" />
            {product.badge && <span className="pdp-badge">{product.badge}</span>}
          </div>
        </div>

        {/* Right: Buy Box */}
        <div className="pdp-info-col">
          <div className="pdp-breadcrumb-row">
            <span>{product.collectionGroup}</span>
            <span>/</span>
            <span>{product.category}</span>
            {isModal && onOpenFullPage && (
              <button
                type="button"
                className="pdp-fullpage-link"
                onClick={() => onOpenFullPage(product)}
              >
                Full details &rarr;
              </button>
            )}
          </div>

          <h2 className="pdp-title">{product.title}</h2>

          <div className="pdp-price-rating-row">
            <span className="pdp-price">
              &#8377;{effectiveUnitPrice.toLocaleString('en-IN')}
            </span>
            <div className="pdp-rating-group" aria-label={`Rated ${product.rating} out of 5`}>
              <div className="pdp-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <StarIcon key={n} size={13} filled />
                ))}
              </div>
              <span className="pdp-review-count">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <p className="pdp-short-summary">{product.description}</p>

          {/* Swatches */}
          {product.swatches?.length > 0 && (
            <div className="pdp-option-block">
              <div className="pdp-option-header">
                <span>Colour:</span>
                <strong>{selectedColor}</strong>
              </div>
              <div className="pdp-swatch-row">
                {product.swatches.map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    className={`pdp-swatch-dot ${selectedColor === swatch.name ? 'is-selected' : ''}`}
                    style={{ backgroundColor: swatch.hex }}
                    aria-label={`Select colour ${swatch.name}`}
                    title={swatch.name}
                    onClick={() => setSelectedColor(swatch.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Size / Finish Options */}
          {product.options?.length > 0 && (
            <div className="pdp-option-block">
              <div className="pdp-option-header">
                <span>{product.optionsLabel || 'Option'}:</span>
                <strong>{selectedOption}</strong>
              </div>
              <div className="pdp-pill-row">
                {product.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`pdp-option-pill ${selectedOption === opt ? 'is-selected' : ''}`}
                    onClick={() => setSelectedOption(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.productType === 'gift' && (
            <div className="pdp-option-block">
              <label htmlFor={`gift-note-${product.id}`} className="pdp-option-header">
                <span>Complimentary Gift Note (Optional)</span>
              </label>
              <input
                id={`gift-note-${product.id}`}
                type="text"
                className="pdp-gift-input"
                placeholder="Write a message for your keepsake card..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
              />
            </div>
          )}

          {/* Quantity */}
          <div className="pdp-qty-row">
            <span className="pdp-qty-label">Quantity:</span>
            <div className="qty-stepper">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                &minus;
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="pdp-cta-grid">
            <button
              type="button"
              className="btn-primary-espresso pdp-add-btn"
              onClick={() => onAddToBag(buildCartPayload(), quantity)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className={`pdp-wishlist-btn ${isWishlisted ? 'is-wishlisted' : ''}`}
              onClick={() => onToggleWishlist(product.id)}
            >
              <HeartIcon size={17} filled={isWishlisted} />
              <span>{isWishlisted ? 'Saved' : 'Add to Wishlist'}</span>
            </button>
          </div>

          <button
            type="button"
            className="pdp-buy-now-btn"
            onClick={() => onBuyNow(buildCartPayload(), quantity)}
          >
            <span>Buy Now</span>
            <ArrowRightIcon size={15} />
          </button>

          {/* Pincode Checker */}
          <form className="pdp-pincode-box" onSubmit={handlePincodeCheck}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter pincode for delivery date"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            />
            <button type="submit">Check</button>
          </form>
          {pincodeResult && (
            <p className={`pdp-pincode-msg ${pincodeResult.valid ? 'is-ok' : 'is-err'}`}>
              {pincodeResult.message}
            </p>
          )}
        </div>
      </div>

      {/* 3-Column Trust Row */}
      <div className="pdp-trust-strip">
        <div className="pdp-trust-item">
          <TruckIcon size={20} />
          <div>
            <strong>Free Shipping</strong>
            <span>on orders over &#8377;1,999</span>
          </div>
        </div>
        <div className="pdp-trust-item">
          <ShieldCheckIcon size={20} />
          <div>
            <strong>Secure Checkout</strong>
            <span>Your data is safe</span>
          </div>
        </div>
        <div className="pdp-trust-item">
          <ReturnIcon size={20} />
          <div>
            <strong>Easy Returns</strong>
            <span>Within 7 days</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pdp-tabs-section">
        <div className="pdp-tab-headers" role="tablist">
          {['Description', 'Details', 'Shipping & Returns'].map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={`pdp-tab-btn ${activeTab === tab ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="pdp-tab-panel" role="tabpanel">
          {activeTab === 'Description' && <p>{product.description}</p>}
          {activeTab === 'Details' && (
            <dl className="quickview-specs">
              <div>
                <dt>Fabric</dt>
                <dd>{product.fabric}</dd>
              </div>
              <div>
                <dt>Craft &amp; Weave</dt>
                <dd>{product.weave}</dd>
              </div>
              <div>
                <dt>Dimensions</dt>
                <dd>{product.length}</dd>
              </div>
              <div>
                <dt>Care</dt>
                <dd>{product.care}</dd>
              </div>
            </dl>
          )}
          {activeTab === 'Shipping & Returns' && (
            <p>
              Complimentary delivery across India on orders above &#8377;1,999. Dispatches within
              24&ndash;48 business hours in protective muslin wrapping, backed by our 7-day easy
              return &amp; exchange promise.
            </p>
          )}
        </div>
      </div>

      {/* You may also like */}
      <div className="pdp-related-section">
        <h3 className="pdp-related-heading">You may also like</h3>
        <div className="pdp-related-grid">
          {relatedProducts.map((item) => {
            const wished = wishlistIds.includes(item.id);
            return (
              <article key={item.id} className="product-card">
                <div className="product-media-box">
                  <button
                    type="button"
                    className="product-image-trigger"
                    onClick={() => onSelectProduct(item)}
                  >
                    <img src={item.image} alt={item.alt} className="product-card-img" loading="lazy" />
                  </button>
                  <button
                    type="button"
                    className={`wishlist-heart-btn ${wished ? 'is-wishlisted' : ''}`}
                    aria-label="Toggle wishlist"
                    onClick={() => onToggleWishlist(item.id)}
                  >
                    <HeartIcon size={17} filled={wished} />
                  </button>
                </div>
                <div className="product-meta">
                  <h4 className="product-title">
                    <button
                      type="button"
                      className="product-title-btn"
                      onClick={() => onSelectProduct(item)}
                    >
                      {item.title}
                    </button>
                  </h4>
                  <p className="product-price">{item.formattedPrice}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ProductModal({
  product,
  wishlistIds,
  onClose,
  onToggleWishlist,
  onAddToBag,
  onBuyNow,
  onSelectProduct,
  onOpenFullPage,
}) {
  useEffect(() => {
    if (!product) return undefined;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="modal-backdrop pdp-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
      onClick={onClose}
    >
      <div className="modal-card pdp-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn pdp-modal-close"
          aria-label="Close product details"
          onClick={onClose}
        >
          <CloseIcon size={20} />
        </button>
        <div className="pdp-modal-scroll">
          <ProductDetailContent
            product={product}
            wishlistIds={wishlistIds}
            onToggleWishlist={onToggleWishlist}
            onAddToBag={(payload, qty) => {
              onAddToBag(payload, qty);
            }}
            onBuyNow={(payload, qty) => {
              onBuyNow(payload, qty);
              onClose();
            }}
            onSelectProduct={onSelectProduct}
            onOpenFullPage={(prod) => {
              onClose();
              onOpenFullPage(prod);
            }}
            isModal
          />
        </div>
      </div>
    </div>
  );
}

