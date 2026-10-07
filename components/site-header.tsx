"use client";
import { useEffect, useRef, useState } from "react";
import { useStore } from "./store-provider";
import { BrandMark } from "./brand-mark";
const links = [
  ["Shop", "/shop"],
  ["Men", "/shop?category=men"],
  ["Women", "/shop?category=women"],
  ["New arrivals", "/shop?category=new"],
  ["Collections", "/shop"],
  ["Demo orders", "/orders"],
  ["About", "/about"],
];
export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false),
    [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { hydrated, cartCount, openCart, openSearch } = useStore();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 52);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", dismissOnEscape);
    return () => document.removeEventListener("keydown", dismissOnEscape);
  }, [menuOpen]);
  return (
    <>
      <header
        className={
          "site-nav " +
          (!transparent || scrolled || menuOpen ? "site-nav--solid" : "")
        }
      >
        <a className="wordmark" href="/" aria-label="TOVENOQ home">
          <BrandMark />
          TOVENOQ
        </a>
        <nav className="primary-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="menu-button"
            ref={menuButtonRef}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <button
            className="icon-button"
            aria-label="Search footwear"
            onClick={openSearch}
          >
            <span className="search-glyph" />
          </button>
          <a
            className="icon-button account-button"
            href="/account"
            aria-label="Demo account"
          >
            <span className="account-glyph" />
          </a>
          <button
            className="icon-button bag-button"
            aria-label={hydrated ? `Bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}` : "Bag loading"}
            disabled={!hydrated}
            onClick={openCart}
          >
            <svg
              className="bag-glyph"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M6.5 8.25h11l.75 12.25H5.75L6.5 8.25Z" />
              <path d="M9 9V6.75a3 3 0 0 1 6 0V9" />
            </svg>
            {hydrated && cartCount > 0 && <span className="bag-count">{cartCount}</span>}
          </button>
        </div>
      </header>
        <nav
          className={`mobile-nav${menuOpen ? " is-open" : ""}`}
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href="/saved">Saved styles</a>
          <a href="/account" onClick={() => setMenuOpen(false)}>Demo account</a>
        </nav>
    </>
  );
}
