import React, { useEffect } from 'react';
import { CloseIcon, ArrowRightIcon } from './Icons';

export function BagDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onViewCart,
  onCheckout,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeShippingRemaining = Math.max(0, 1999 - subtotal);
  const totalCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div
      className="drawer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
      onClick={onClose}
    >
      <aside className="side-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2 className="drawer-title">Your Bag ({totalCount})</h2>
          <button type="button" className="drawer-close-btn" aria-label="Close bag" onClick={onClose}>
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="drawer-shipping-banner">
          {freeShippingRemaining === 0
            ? 'You have unlocked complimentary shipping across India.'
            : `Add ₹${freeShippingRemaining.toLocaleString('en-IN')} more for complimentary shipping.`}
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <p>Your bag is currently empty.</p>
              <button type="button" className="btn-primary-espresso" onClick={onClose}>
                Explore Collection
              </button>
            </div>
          ) : (
            <ul className="drawer-item-list">
              {items.map((item) => {
                const key = item.cartKey || item.id;
                return (
                  <li key={key} className="drawer-item">
                    <img src={item.image} alt={item.title} className="drawer-item-img" />
                    <div className="drawer-item-info">
                      <div className="drawer-item-top">
                        <h3>{item.title}</h3>
                        <button
                          type="button"
                          className="drawer-remove-btn"
                          onClick={() => onRemoveItem(key)}
                        >
                          Remove
                        </button>
                      </div>
                      <p className="drawer-item-sub">
                        {item.selectedColor || item.color}
                        {item.selectedOption ? ` • ${item.selectedOption}` : ''}
                      </p>
                      <div className="drawer-item-bottom">
                        <div className="qty-stepper">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => onUpdateQty(key, item.qty - 1)}
                          >
                            &minus;
                          </button>
                          <span>{item.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => onUpdateQty(key, item.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="drawer-item-price">
                          &#8377;{(item.price * item.qty).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-subtotal-row">
              <span>Subtotal</span>
              <strong>&#8377;{subtotal.toLocaleString('en-IN')}</strong>
            </div>
            <button
              type="button"
              className="btn-primary-espresso drawer-checkout-btn"
              onClick={onCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRightIcon size={15} />
            </button>
            <button
              type="button"
              className="drawer-view-cart-link"
              onClick={onViewCart}
            >
              View Full Cart
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
