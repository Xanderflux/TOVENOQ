"use client";
import { BrandMark } from "./brand-mark";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top shell">
        <div className="footer-brand">
          <a className="wordmark" href="/" aria-label="TOVENOQ home">
            <BrandMark />
            TOVENOQ
          </a>
          <p>Form follows motion.</p>
        </div>
        <div className="newsletter">
          <p className="eyebrow">STUDIO NOTES</p>
          <h3>A concept in motion.</h3>
          <p className="newsletter-success">
            This is a footwear demo. No email addresses are collected.
          </p>
        </div>
      </div>
      <div className="footer-links shell">
        <div>
          <p className="footer-label">Shop</p>
          <a href="/shop?category=new">New arrivals</a>
          <a href="/shop?category=men">Men</a>
          <a href="/shop?category=women">Women</a>
          <a href="/shop">All footwear</a>
        </div>
        <div>
          <p className="footer-label">Customer care</p>
          <a href="/account">Demo account</a>
          <a href="/orders">Demo orders &amp; tracking</a>
          <a href="/help">Contact &amp; FAQs</a>
          <a href="/help#delivery">Shipping &amp; returns</a>
          <a href="/help#sizing">Size guide</a>
          <a href="/help#care">Care</a>
        </div>
        <div>
          <p className="footer-label">About TOVENOQ</p>
          <a href="/about">Our story</a>
          <a href="/about#principles">Our principles</a>
          <a href="/policies#privacy">Privacy</a>
          <a href="/policies#terms">Terms</a>
        </div>
        <div>
          <p className="footer-label">Follow</p>
          <span>Instagram · Pinterest · TikTok</span>
          <span>No social channels are connected to this demo.</span>
          <a href="/saved">Saved styles</a>
        </div>
      </div>
      <div className="footer-bottom shell">
        <p>© 2026 TOVENOQ concept. All rights reserved.</p>
        <div>
          <details className="region-details">
            <summary>United States / USD ↓</summary>
            <p>
              USD is displayed for this concept only. All funds and orders are simulated.
            </p>
          </details>
        </div>
      </div>
    </footer>
  );
}
