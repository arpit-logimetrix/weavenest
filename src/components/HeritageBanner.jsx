import React from 'react';
import { BRAND_ASSETS } from '../data/catalog';

export default function HeritageBanner() {
  return (
    <section className="heritage-banner" aria-label="Heritage craftsmanship">
      <img
        src={BRAND_ASSETS.heritageFabricBannerImg}
        alt="Rich crimson and gold Banarasi brocade silk fabric folds"
        className="heritage-banner-img"
        loading="lazy"
      />
      <div className="heritage-banner-overlay" aria-hidden="true" />
      <div className="container heritage-banner-content">
        <div className="heritage-quote-block">
          <p className="heritage-quote">A little heritage in every thread.</p>
          <span className="heritage-quote-rule" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

