import React from 'react';
import { BRAND_ASSETS } from '../data/catalog';
import { ArrowRightIcon, CraftedSealBadge } from './Icons';

export default function HeroSection({ onExploreCollection, onDiscoverStory }) {
  return (
    <section className="hero-section" id="top">
      <div className="hero-media-layer">
        <img
          src={BRAND_ASSETS.heroSareeImg}
          alt="Woman draped in a deep maroon Banarasi silk saree with gold zari motifs in a sunlit palace courtyard"
          className="hero-bg-img"
        />
        <div className="hero-gradient-overlay" aria-hidden="true" />
      </div>

      <div className="container hero-content-container">
        <div className="hero-copy">
          <div className="hero-eyebrow-row">
            <span className="hero-eyebrow">THE FESTIVE COLLECTION</span>
            <span className="hero-eyebrow-line" aria-hidden="true" />
          </div>

          <h1 className="hero-title">
            Tradition,
            <br />
            woven for today.
          </h1>

          <p className="hero-subtitle">
            Discover beautiful sarees and timeless silhouettes made for moments worth keeping.
          </p>

          <div className="hero-cta-row">
            <button
              type="button"
              className="btn-primary-espresso"
              onClick={onExploreCollection}
            >
              <span>Explore the Collection</span>
              <ArrowRightIcon size={15} />
            </button>

            <button
              type="button"
              className="btn-link-underline"
              onClick={onDiscoverStory}
            >
              Discover our story
            </button>
          </div>
        </div>

        <div className="hero-badge-slot">
          <CraftedSealBadge />
        </div>
      </div>
    </section>
  );
}

