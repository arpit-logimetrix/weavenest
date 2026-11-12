import React from 'react';
import { ArrowRightIcon, HeartIcon } from './Icons';

export default function ProductSection({
  products,
  wishlistIds,
  onToggleWishlist,
  onOpenProduct,
  onAddToBag,
  onViewAll,
}) {
  return (
    <section className="products-section" id="collection" aria-labelledby="loved-heading">
      <div className="container">
        <div className="section-heading-split">
          <h2 id="loved-heading" className="section-title-serif">
            Loved for the details
          </h2>
          <span className="heading-rule-flex" aria-hidden="true" />
          <div className="section-heading-right">
            <button type="button" className="view-all-link" onClick={onViewAll}>
              <span>View all pieces</span>
              <ArrowRightIcon size={15} />
            </button>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product) => {
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
                    aria-label={
                      isWishlisted
                        ? `Remove ${product.title} from wishlist`
                        : `Add ${product.title} to wishlist`
                    }
                    aria-pressed={isWishlisted}
                    onClick={() => onToggleWishlist(product.id)}
                  >
                    <HeartIcon size={19} filled={isWishlisted} />
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
      </div>
    </section>
  );
}
