# The Weavenest — Timeless Weaves • Festive Collection

A mobile-first React + Vite e-commerce frontend for **The Weavenest**, crafted with a warm ivory, espresso, and heritage maroon-gold aesthetic. Designed to connect seamlessly to a **Node.js + Express + PostgreSQL** backend.

---

## Tech Stack

- **Frontend**: React 19, Vite 5, CSS3 (mobile-first responsive architecture)
- **Backend Target**: Node.js + Express + PostgreSQL (API client & Vite proxy pre-configured)

---

## Pages & Features

- **Homepage (`#/`)**: Announcement bar, sticky responsive header with category dropdowns, full-bleed editorial hero, *Shop by Occasion*, *Loved for the Details*, heritage brocade banner, and espresso footer.
- **Collections (`#/collections`)**: Collection hero banner, *Filter By* sidebar/drawer (Category, Price, Fabric, Colour swatches), sorting, and pagination.
- **Product Detail Modal & Full Page (`#/product/:id`)**: Multi-angle gallery, star ratings, colour swatches, dynamic Size / Drape Finish / Gift Note options, quantity stepper, pincode delivery checker, trust badges, and *Description / Details / Shipping & Returns* tabs.
- **Shopping Cart (`#/cart`) & Slide-Over Bag Drawer**: Quantity controls, item removal, free shipping threshold (`₹1,999`), and `Clear All`.
- **Checkout (`#/checkout`)**: Shipping address selection & inline new address form, payment method options, order summary, and order confirmation view.
- **Wishlist (`#/wishlist`)**: Saved pieces with one-click *Move to Cart*.
- **Editorial & Customer Care**: *Our Story* (`#/our-story`), *Our Craft* (`#/our-craft`), *Our Blog* (`#/blog`), *Shipping & Delivery* (`#/shipping`), *Returns & Exchange* (`#/returns`), interactive *FAQs* (`#/faqs`), *Contact Us* (`#/contact`), *Account* (`#/account`), *Privacy Policy* (`#/privacy-policy`), *Terms & Conditions* (`#/terms`), and *404 Page Not Found*.

---

## Project Structure

```text
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets/
    │   ├── logo.png
    │   ├── logo-light.png
    │   └── images/
    ├── components/
    │   ├── AnnouncementBar.jsx
    │   ├── Header.jsx
    │   ├── HeroSection.jsx
    │   ├── OccasionSection.jsx
    │   ├── ProductSection.jsx
    │   ├── HeritageBanner.jsx
    │   ├── Footer.jsx
    │   ├── ProductModal.jsx
    │   ├── Modals.jsx
    │   ├── ShopPages.jsx
    │   ├── EditorialPages.jsx
    │   └── Icons.jsx
    ├── data/
    │   └── catalog.js
    └── services/
        ├── apiClient.js
        └── storeService.js
```

---

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment (optional for backend)**
   ```bash
   cp .env.example .env
   ```
   Update `VITE_API_BASE_URL` in `.env` when your Node.js + PostgreSQL API is running (Vite proxies `/api` to `http://localhost:5000` by default).

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

