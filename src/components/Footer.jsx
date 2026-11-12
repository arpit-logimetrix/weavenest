import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/catalog';
import { storeService } from '../services/storeService';
import {
  ArrowRightIcon,
  TruckIcon,
  SocialInstagramIcon,
  SocialYouTubeIcon,
  SocialPinterestIcon,
  SocialFacebookIcon,
  SocialLinkedInIcon,
} from './Icons';

export default function Footer({ onNavigate, onNotify }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      onNotify('Please enter a valid email address.');
      return;
    }
    storeService.subscribeNewsletter(trimmed);
    setSubscribed(true);
    setEmail('');
    onNotify('Welcome to The Weavenest family! You are subscribed.');
  };

  return (
    <footer className="site-footer">
      <div className="container footer-top-grid">
        <div className="footer-brand-col">
          <a
            href="#/"
            aria-label="The Weavenest Home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
          >
            <img
              src={BRAND_ASSETS.logoFooter}
              alt="WeaveNest — The tradition of threads"
              className="footer-logo-img"
            />
          </a>
          <span className="footer-brand-divider" aria-hidden="true" />
          <p className="footer-brand-tagline">
            Timeless Indian wear,
            <br />
            crafted for today&rsquo;s you.
          </p>
        </div>

        <div className="footer-links-pair">
          <div className="footer-links-col">
            <h3 className="footer-col-heading">Customer Care</h3>
            <ul className="footer-link-list">
              {[
                { label: 'Shipping & Delivery', route: '/shipping' },
                { label: 'Returns & Exchange', route: '/returns' },
                { label: 'FAQs', route: '/faqs' },
                { label: 'Contact Us', route: '/contact' },
              ].map((item) => (
                <li key={item.route}>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => onNavigate(item.route)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-col">
            <h3 className="footer-col-heading">About Us</h3>
            <ul className="footer-link-list">
              {[
                { label: 'Our Story', route: '/our-story' },
                { label: 'Our Craft', route: '/our-craft' },
                { label: 'Blog', route: '/blog' },
              ].map((item) => (
                <li key={item.route}>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => onNavigate(item.route)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-newsletter-col">
          <h3 className="footer-col-heading">Join our family</h3>
          <form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              className="newsletter-input"
              placeholder={subscribed ? 'Thank you for joining us' : 'Enter your email address'}
              value={email}
              onChange={(e) => {
                setSubscribed(false);
                setEmail(e.target.value);
              }}
            />
            <button
              type="submit"
              className="newsletter-submit-btn"
              aria-label="Subscribe to newsletter"
            >
              <ArrowRightIcon size={16} />
            </button>
          </form>
          <p className="footer-shipping-note">
            <TruckIcon size={16} />
            <span>Free shipping on orders over &#8377;1,999</span>
          </p>
        </div>
      </div>

      <div className="container footer-bottom-bar">
        <div className="footer-socials" aria-label="Social media">
          <a href="#instagram" aria-label="Instagram" onClick={(e) => { e.preventDefault(); onNotify('Follow @theweavenest on Instagram'); }}>
            <SocialInstagramIcon />
          </a>
          <a href="#youtube" aria-label="YouTube" onClick={(e) => { e.preventDefault(); onNotify('Watch our craft stories on YouTube'); }}>
            <SocialYouTubeIcon />
          </a>
          <a href="#pinterest" aria-label="Pinterest" onClick={(e) => { e.preventDefault(); onNotify('Explore festive lookbooks on Pinterest'); }}>
            <SocialPinterestIcon />
          </a>
          <a href="#facebook" aria-label="Facebook" onClick={(e) => { e.preventDefault(); onNotify('Connect with The Weavenest on Facebook'); }}>
            <SocialFacebookIcon />
          </a>
          <a href="#linkedin" aria-label="LinkedIn" onClick={(e) => { e.preventDefault(); onNotify('The Weavenest on LinkedIn'); }}>
            <SocialLinkedInIcon />
          </a>
          <span className="footer-social-sep" aria-hidden="true" />
        </div>

        <p className="footer-copyright">&copy; 2026 The Weavenest. All rights reserved.</p>

        <div className="footer-legal-links">
          <button type="button" onClick={() => onNavigate('/privacy-policy')}>
            Privacy Policy
          </button>
          <span aria-hidden="true">|</span>
          <button type="button" onClick={() => onNavigate('/terms')}>
            Terms &amp; Conditions
          </button>
        </div>
      </div>
    </footer>
  );
}
