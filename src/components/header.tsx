'use client';
import Link from 'next/link';
import Image from 'next/image'
import styles from './header.module.css';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Image
        src="/header_banner.png"
        alt="Makena's List of Not Gross Recipes"
        width={0}
        height={0}
        sizes="100vw"
        className={styles.banner}
      />
      <button
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={open ? styles.open : ''}>
          <path
            d="M4 7 C8 5, 12 9, 14 7 C16 5, 20 9, 24 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={styles.line1}
          />
          <path
            d="M4 14 C8 12, 12 16, 14 14 C16 12, 20 16, 24 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={styles.line2}
          />
          <path
            d="M4 21 C8 19, 12 23, 14 21 C16 19, 20 23, 24 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={styles.line3}
          />
        </svg>
      </button>
      <nav className={`${styles.nav} ${open ? styles.show : ''}`}>
        <Link href="/" onClick={() => setOpen(false)}>All Recipes</Link>
        <Link href="/add" onClick={() => setOpen(false)}>Add Recipe</Link>
      </nav>
    </header>
  );
}