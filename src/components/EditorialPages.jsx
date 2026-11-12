import React, { useState } from 'react';
import { BRAND_ASSETS, BLOG_POSTS, FAQ_ITEMS } from '../data/catalog';
import { storeService } from '../services/storeService';
import {
  ArrowRightIcon,
  SparkleIcon,
  ShieldCheckIcon,
  HeartIcon,
  CloseIcon,
  ChevronDownIcon,
} from './Icons';

export function AboutPage({ mode = 'story', onNavigate }) {
  return (
    <div className="page-view">
      {/* Banner matching collage About The Weavenest */}
      <section className="about-hero-banner">
        <img
          src={BRAND_ASSETS.aboutBannerImg}
          alt="Deep maroon silk saree with brass urli bowl of rose petals"
          className="about-hero-img"
        />
        <div className="about-hero-overlay" aria-hidden="true" />
        <div className="container about-hero-content">
          <h1>{mode === 'craft' ? 'Our Craft & Looms' : 'About The Weavenest'}</h1>
          <p>
            {mode === 'craft'
              ? 'From heritage pit looms to modern wardrobes.'
              : 'A celebration of Indian heritage and timeless fashion.'}
          </p>
        </div>
      </section>

      <section className="about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-copy">
            <span className="hero-eyebrow">
              {mode === 'craft' ? 'ARTISAN CLUSTERS' : 'OUR STORY'}
            </span>
            <h2 className="page-heading-serif">
              {mode === 'craft' ? 'Woven with patience & precision' : 'Our Story'}
            </h2>
            <p>
              At The Weavenest, we bring together the richness of Indian tradition and contemporary
              elegance. Our collection is a tribute to skilled craftsmanship, handpicked weaves, and
              timeless designs made for moments worth keeping.
            </p>
            <p>
              Working closely with artisan clusters across Varanasi, Chanderi, and Jaipur, every
              saree and suit set is curated for fluid drape, balanced zari lustre, and effortless
              comfort from sunlit ceremonies to evening celebrations.
            </p>
            <button
              type="button"
              className="btn-primary-espresso"
              onClick={() => onNavigate(mode === 'craft' ? '/collections' : '/our-craft')}
            >
              <span>{mode === 'craft' ? 'Explore Collection' : 'Know More'}</span>
              <ArrowRightIcon size={15} />
            </button>
          </div>

          <div className="about-story-media">
            <img
              src={BRAND_ASSETS.aboutStoryBoxImg}
              alt="Hand-folded silk saree inside a carved wooden keepsake box"
            />
          </div>
        </div>
      </section>

      {/* 3-Pillar Trust Bar matching collage */}
      <section className="about-pillars-strip">
        <div className="container about-pillars-grid">
          <div className="about-pillar-item">
            <SparkleIcon size={20} />
            <span>Timeless Designs</span>
          </div>
          <div className="about-pillar-item">
            <ShieldCheckIcon size={20} />
            <span>Premium Quality</span>
          </div>
          <div className="about-pillar-item">
            <HeartIcon size={20} />
            <span>Thoughtfully Curated</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export function BlogPage({ onNotify }) {
  const [activeArticle, setActiveArticle] = useState(null);
  const [email, setEmail] = useState('');

  const handleBlogSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      onNotify('Please enter a valid email address.');
      return;
    }
    storeService.subscribeNewsletter(trimmed);
    setEmail('');
    onNotify('Subscribed to The Weavenest Journal!');
  };

  return (
    <div className="page-view blog-page-shell">
      <div className="container">
        <div className="blog-page-header">
          <h1 className="page-heading-serif">Our Blog</h1>
          <p>Stories, style and inspiration</p>
        </div>

        <div className="blog-grid">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="blog-card">
              <button
                type="button"
                className="blog-card-media"
                onClick={() => setActiveArticle(post)}
              >
                <img src={post.image} alt={post.title} loading="lazy" />
              </button>
              <div className="blog-card-body">
                <span className="blog-card-meta">
                  {post.date} &bull; {post.readTime}
                </span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <button
                  type="button"
                  className="blog-read-more"
                  onClick={() => setActiveArticle(post)}
                >
                  <span>Read More</span>
                  <ArrowRightIcon size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter strip matching collage */}
        <section className="blog-newsletter-banner">
          <div>
            <h2>Subscribe to our newsletter</h2>
            <p>Get the latest trends, offers and more.</p>
          </div>
          <form className="blog-newsletter-form" onSubmit={handleBlogSubscribe} noValidate>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn-primary-espresso">
              Subscribe
            </button>
          </form>
        </section>
      </div>

      {activeArticle && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={activeArticle.title}
          onClick={() => setActiveArticle(null)}
        >
          <div className="modal-card info-modal-card blog-reader-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              aria-label="Close article"
              onClick={() => setActiveArticle(null)}
            >
              <CloseIcon size={20} />
            </button>
            <span className="modal-eyebrow">
              THE WEAVENEST JOURNAL &bull; {activeArticle.readTime}
            </span>
            <h2 className="modal-title-serif">{activeArticle.title}</h2>
            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="blog-reader-cover"
            />
            <div className="info-modal-body">
              {activeArticle.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function CareAndLegalPage({ pageKey, orders = [], addresses = [], onNavigate, onNotify }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.includes('@') || !contactForm.message.trim()) {
      onNotify('Please complete all fields before sending.');
      return;
    }
    storeService.submitContactMessage(contactForm);
    setContactSent(true);
    setContactForm({ name: '', email: '', message: '' });
    onNotify('Thank you! Our studio desk will respond within 24 hours.');
  };

  if (pageKey === 'faqs') {
    return (
      <div className="page-view static-page-shell">
        <div className="container static-page-narrow">
          <span className="hero-eyebrow">CUSTOMER CARE</span>
          <h1 className="page-heading-serif">Frequently Asked Questions</h1>
          <div className="faq-accordion">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="faq-item">
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  >
                    <span>{item.q}</span>
                    <ChevronDownIcon size={16} />
                  </button>
                  {isOpen && <p className="faq-answer">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (pageKey === 'contact') {
    return (
      <div className="page-view static-page-shell">
        <div className="container static-page-narrow">
          <span className="hero-eyebrow">CONNECT WITH US</span>
          <h1 className="page-heading-serif">Contact The Weavenest</h1>
          <p className="static-lead">
            Styling assistance, custom drape queries, or gifting orders: care@theweavenest.in &bull;
            Mon&ndash;Sat, 10:00 AM &ndash; 7:00 PM IST.
          </p>

          <form className="contact-form-card" onSubmit={handleContactSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            />
            <textarea
              rows={4}
              placeholder="How can our stylists assist you?"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
            />
            <button type="submit" className="btn-primary-espresso">
              <span>{contactSent ? 'Message Sent' : 'Send Message'}</span>
              <ArrowRightIcon size={15} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (pageKey === 'account') {
    return (
      <div className="page-view static-page-shell">
        <div className="container static-page-narrow">
          <span className="hero-eyebrow">YOUR PROFILE</span>
          <h1 className="page-heading-serif">My Account</h1>
          <div className="account-cards-grid">
            <div className="account-info-card">
              <h2>Saved Address</h2>
              {addresses[0] && (
                <p>
                  <strong>{addresses[0].name}</strong>
                  <br />
                  {addresses[0].line1}, {addresses[0].city} &ndash; {addresses[0].pincode}
                  <br />
                  {addresses[0].state}, {addresses[0].country}
                </p>
              )}
              <button
                type="button"
                className="btn-link-underline"
                onClick={() => onNavigate('/wishlist')}
              >
                View Saved Wishlist
              </button>
            </div>

            <div className="account-info-card">
              <h2>Recent Orders ({orders.length})</h2>
              {orders.length === 0 ? (
                <p>No orders placed yet. Your checkout orders appear here automatically.</p>
              ) : (
                <ul className="account-orders-list">
                  {orders.map((ord) => (
                    <li key={ord.id}>
                      <strong>{ord.id}</strong> &bull; &#8377;{ord.total.toLocaleString('en-IN')} &bull;{' '}
                      {ord.status}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const contentMap = {
    shipping: {
      eyebrow: 'CUSTOMER CARE',
      title: 'Shipping & Delivery',
      paragraphs: [
        'We offer complimentary standard delivery across India on all orders over ₹1,999. Orders below ₹1,999 carry a flat ₹120 shipping fee.',
        'Ready-to-ship weaves dispatch within 24–48 business hours wrapped in protective unbleached muslin, and typically reach major cities in 3–5 working days.',
      ],
    },
    returns: {
      eyebrow: 'CUSTOMER CARE',
      title: 'Returns & Exchange',
      paragraphs: [
        'Every piece may be returned or exchanged within 7 days of delivery, provided it remains unworn with original tags and packaging intact.',
        'Custom Fall & Pico finished sarees are carefully inspected prior to dispatch; reach out to our care desk for assistance with any transit issue.',
      ],
    },
    privacy: {
      eyebrow: 'LEGAL',
      title: 'Privacy Policy',
      paragraphs: [
        'The Weavenest respects your privacy and collects only the details required to process orders, arrange doorstep delivery, and share curated updates when you opt in.',
        'We never sell or rent customer details to third parties.',
      ],
    },
    terms: {
      eyebrow: 'LEGAL',
      title: 'Terms & Conditions',
      paragraphs: [
        'All displayed prices are in Indian Rupees (INR) inclusive of applicable taxes. Subtle variations in handwoven motifs and natural dye tones celebrate authentic artisan craft.',
        'Backend account authentication and live payment gateway integration will be activated in the upcoming backend phase.',
      ],
    },
  };

  const page = contentMap[pageKey] || contentMap.shipping;

  return (
    <div className="page-view static-page-shell">
      <div className="container static-page-narrow">
        <span className="hero-eyebrow">{page.eyebrow}</span>
        <h1 className="page-heading-serif">{page.title}</h1>
        <div className="static-copy-card">
          {page.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage({ onGoHome }) {
  return (
    <div className="page-view not-found-shell">
      <div className="container not-found-grid">
        <div className="not-found-copy">
          <span className="not-found-code">404</span>
          <h1 className="page-heading-serif">Page Not Found</h1>
          <p>
            The page you are looking for might have been removed, had its name changed or is
            temporarily unavailable.
          </p>
          <button type="button" className="btn-primary-espresso" onClick={onGoHome}>
            <span>Go to Homepage</span>
            <ArrowRightIcon size={15} />
          </button>
        </div>

        <div className="not-found-visual">
          <img
            src={BRAND_ASSETS.notFoundArchImg}
            alt="Sunlit sandstone palace arch with dried flowers"
          />
          <div className="not-found-visual-fade" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

