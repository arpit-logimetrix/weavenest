import React from 'react';
import { OCCASIONS } from '../data/catalog';
import { ArrowRightIcon } from './Icons';

export default function OccasionSection({ onSelectOccasion }) {
  return (
    <section className="occasion-section" id="occasions" aria-labelledby="occasion-heading">
      <div className="container">
        <div className="section-heading-centered">
          <span className="heading-rule" aria-hidden="true" />
          <h2 id="occasion-heading" className="section-title-serif">
            Shop by occasion
          </h2>
          <span className="heading-rule" aria-hidden="true" />
        </div>

        <div className="occasion-grid">
          {OCCASIONS.map((occasion) => (
            <button
              key={occasion.id}
              type="button"
              className="occasion-card"
              onClick={() =>
                onSelectOccasion({
                  occasion: occasion.filter,
                  title: occasion.title,
                  subtitle: occasion.subtitle,
                })
              }
              aria-label={`Shop ${occasion.title}`}
            >
              <img
                src={occasion.image}
                alt={occasion.alt}
                className="occasion-card-img"
                loading="lazy"
              />
              <div className="occasion-card-scrim" aria-hidden="true" />
              <div className="occasion-card-label">
                <span>{occasion.title}</span>
                <ArrowRightIcon size={15} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
