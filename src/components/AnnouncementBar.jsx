import React from 'react';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar" role="region" aria-label="Brand announcement">
      <div className="announcement-inner">
        <span className="announcement-rule" aria-hidden="true" />
        <p className="announcement-text">Timeless weaves &bull; Thoughtfully chosen</p>
        <span className="announcement-rule" aria-hidden="true" />
      </div>
    </div>
  );
}

