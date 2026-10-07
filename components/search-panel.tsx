"use client";

import { useState } from "react";
import { formatPrice, searchProducts } from "../lib/catalog";

export function SearchPanel({ onNavigate }: { onNavigate: () => void }) {
  const [query, setQuery] = useState("");
  const matches = searchProducts(query);

  return (
    <section className="search-panel">
      <p className="eyebrow">FIND YOUR PAIR</p>
      <label htmlFor="product-search">Search footwear</label>
      <input
        id="product-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Style or colour"
      />
      <p className="search-count" role="status" aria-live="polite">
        {matches.length} {matches.length === 1 ? "style" : "styles"}
      </p>
      <div className="search-results">
        {matches.map((product) => (
          <a
            key={product.slug}
            href={`/products/${product.slug}`}
            onClick={onNavigate}
          >
            <img
              loading="lazy"
              src={product.colours[0].gallery[0].src}
              alt=""
            />
            <span>
              <strong>{product.name}</strong>
              <small>{product.descriptor}</small>
            </span>
            <em>{formatPrice(product.priceCents)}</em>
          </a>
        ))}
        {matches.length === 0 && (
          <p>No styles match “{query}”. Try a colour or model name.</p>
        )}
      </div>
    </section>
  );
}
