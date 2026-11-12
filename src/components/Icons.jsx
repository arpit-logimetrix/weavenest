import React from 'react';

export function SearchIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7.2" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  );
}

export function UserIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 19.5c.9-3.3 3.7-5 7-5s6.1 1.7 7 5" />
    </svg>
  );
}

export function HeartIcon({ size = 20, filled = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.2s-7.4-4.7-9.2-9C1.6 8.3 3.4 5 6.8 5c2 0 3.7 1.1 5.2 2.9C13.5 6.1 15.2 5 17.2 5c3.4 0 5.2 3.3 4 6.2-1.8 4.3-9.2 9-9.2 9Z" />
    </svg>
  );
}

export function BagIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.2 8.2h11.6l1 11.3a1 1 0 0 1-1 1.1H6.2a1 1 0 0 1-1-1.1l1-11.3Z" />
      <path d="M8.8 8.2V6.8a3.2 3.2 0 1 1 6.4 0v1.4" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
    </svg>
  );
}

export function TruckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 6.5h11.5v9.5H2.5z" />
      <path d="M14 9.5h4.2l2.8 3.1V16H14z" />
      <circle cx="7" cy="17.5" r="1.7" />
      <circle cx="17.2" cy="17.5" r="1.7" />
    </svg>
  );
}

export function ShieldCheckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4.5 6.2v5.4c0 4.6 3.2 8.7 7.5 9.9 4.3-1.2 7.5-5.3 7.5-9.9V6.2L12 3Z" />
      <path d="m9 12.2 2 2 4-4.2" />
    </svg>
  );
}

export function ReturnIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5h12.5a4.5 4.5 0 1 1 0 9H10" />
      <path d="m6.5 7-3.5 3.5L6.5 14" />
    </svg>
  );
}

export function StarIcon({ size = 14, filled = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4">
      <path d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8Z" />
    </svg>
  );
}

export function TrashIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6.5h16M9.5 6.5V4.8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.7M6.5 6.5l.8 13a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-13" />
    </svg>
  );
}

export function LockIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function FilterIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

export function SparkleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6-5.6-1.9 5.6-1.9L12 3Z" />
    </svg>
  );
}

export function CloseIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MenuIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function SocialInstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function SocialYouTubeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.2 28.4 28.4 0 0 0 2 12a28.4 28.4 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28.4 28.4 0 0 0 22 12a28.4 28.4 0 0 0-.4-4.8ZM10 15.1V8.9l5.4 3.1-5.4 3.1Z" />
    </svg>
  );
}

export function SocialPinterestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.2 2.5C6.9 2.5 4 6.1 4 9.7c0 1.9 1 4.2 2.6 4.9.2.1.4 0 .4-.2l.3-1.2c0-.2 0-.3-.1-.5-.5-.6-.9-1.6-.9-2.8 0-2.7 2-5.3 5.5-5.3 3 0 5.1 2 5.1 4.8 0 3.2-1.6 5.5-3.8 5.5-1.2 0-2.1-1-1.8-2.2.3-1.4 1-2.9 1-3.9 0-.9-.5-1.7-1.5-1.7-1.2 0-2.2 1.2-2.2 2.9 0 1 .4 1.8.4 1.8l-1.4 6c-.4 1.7-.1 3.8 0 4 .1.1.2.1.3 0 .1-.2 1.7-2.2 2.2-4l.6-2.4c.5.9 1.7 1.6 3.1 1.6 4 0 6.8-3.6 6.8-8.2 0-4.2-3.6-7.4-8.4-7.4Z" />
    </svg>
  );
}

export function SocialFacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.5 13.5h2.7l.5-3.4h-3.2V7.9c0-.9.4-1.8 1.9-1.8h1.5V3.2S16.5 3 15.2 3c-2.7 0-4.4 1.6-4.4 4.5v2.6H7.8v3.4h3V22h3.7v-8.5Z" />
    </svg>
  );
}

export function SocialLinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.5 8.5A2 2 0 1 1 6.5 4.5a2 2 0 0 1 0 4ZM4.8 10.2h3.4V20H4.8v-9.8Zm5.4 0h3.3v1.3h.1c.5-.9 1.6-1.6 3.2-1.6 3.4 0 4 2.2 4 5.1V20h-3.4v-4.4c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V20h-3.4v-9.8Z" />
    </svg>
  );
}

export function CraftedSealBadge() {
  return (
    <div className="crafted-seal" aria-hidden="true">
      <svg className="crafted-seal-ring" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="54" stroke="rgba(250, 244, 235, 0.72)" strokeWidth="1" strokeDasharray="2 3" />
        <path
          d="M24 85c-9-11-12-28-6-43 5-13 17-24 31-27"
          stroke="rgba(250, 244, 235, 0.85)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M96 85c9-11 12-28 6-43-5-13-17-24-31-27"
          stroke="rgba(250, 244, 235, 0.85)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path d="M18 65c3-2 5-1 6 1-3 1-5 1-6-1ZM19 52c3-2 5 0 6 2-3 1-5 0-6-2ZM24 39c3-1 5 1 5 3-3 1-5-1-5-3ZM33 28c3-1 5 1 5 3-3 0-4-1-5-3Z" fill="rgba(250, 244, 235, 0.78)" />
        <path d="M102 65c-3-2-5-1-6 1 3 1 5 1 6-1ZM101 52c-3-2-5 0-6 2 3 1 5 0 6-2ZM96 39c-3-1-5 1-5 3 3 1 5-1 5-3ZM87 28c-3-1-5 1-5 3 3 0 4-1 5-3Z" fill="rgba(250, 244, 235, 0.78)" />
        <path
          d="M46 95c5 2 9 0 14-4 5 4 9 6 14 4"
          stroke="rgba(250, 244, 235, 0.85)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="60" cy="96" r="1.5" fill="rgba(250, 244, 235, 0.85)" />
      </svg>
      <div className="crafted-seal-text">
        <span>Crafted</span>
        <span>to be</span>
        <span>cherished</span>
      </div>
    </div>
  );
}
