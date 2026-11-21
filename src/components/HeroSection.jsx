import React, { useState, useRef } from 'react';
import { BRAND_ASSETS } from '../data/catalog';
import { ArrowRightIcon } from './Icons';

export default function HeroSection({ onExploreCollection, onDiscoverStory }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="hero-section" id="top">
      {/* Full-Page Background Video Layer */}
      <div className="hero-media-layer">
        <video
          ref={videoRef}
          className="hero-bg-video"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={BRAND_ASSETS.heroSareeImg}
        >
          <source src={BRAND_ASSETS.heroVideo} type="video/mp4" />
          <img
            src={BRAND_ASSETS.heroSareeImg}
            alt="Woman draped in a deep maroon Banarasi silk saree with gold zari motifs"
            className="hero-bg-video"
          />
        </video>
        <div className="hero-gradient-overlay" aria-hidden="true" />
        <div className="hero-vignette-overlay" aria-hidden="true" />
      </div>

      {/* Top Advertisement Campaign Header */}
      <div className="container hero-top-ad-bar">
        <div className="hero-ad-live-pill">
          <span className="hero-ad-pulsing-dot" />
          <span>CAMPAIGN FILM &bull; FESTIVE &apos;26</span>
        </div>

        <button
          type="button"
          className="hero-sound-pill"
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          title={isMuted ? 'Click to Unmute' : 'Click to Mute'}
        >
          {isMuted ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
              <span>Sound Off</span>
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              <span>Sound On</span>
            </>
          )}
        </button>
      </div>

      {/* Main Hero Copy Container */}
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
              className="btn-primary-espresso hero-cta-btn"
              onClick={onExploreCollection}
            >
              <span>Explore the Collection</span>
              <ArrowRightIcon size={15} />
            </button>

            <button
              type="button"
              className="btn-link-underline hero-link-btn"
              onClick={onDiscoverStory}
            >
              Discover our story
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Shoppable Commercial Bar */}
      <div className="hero-bottom-ad-bar">
        <div className="container hero-bottom-ad-inner">
          <div className="hero-bottom-ad-left">
            <span className="hero-bottom-ad-icon">✦</span>
            <div className="hero-bottom-ad-text">
              <strong>Featured in Film:</strong> Deep Maroon Banarasi Brocade Silk Saree
            </div>
          </div>

          <div className="hero-bottom-ad-center">
            <span>Pure Handwoven Zari</span>
            <span className="hero-bottom-ad-sep">&bull;</span>
            <span>Varanasi Heritage Weave</span>
          </div>

          <button
            type="button"
            className="hero-bottom-ad-btn"
            onClick={onExploreCollection}
          >
            <span>Shop The Look</span>
            <ArrowRightIcon size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}

