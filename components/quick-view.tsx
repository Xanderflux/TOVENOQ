"use client";

import { useState } from "react";
import { formatPrice, sizes, type Product } from "../lib/catalog";
import { useStore } from "./store-provider";

export function QuickView({ product }: { product: Product }) {
  const [colourId, setColourId] = useState(product.colours[0].id);
  const [size, setSize] = useState<string>("42");
  const colour =
    product.colours.find((item) => item.id === colourId) ?? product.colours[0];
  const { addToCart, closeOverlay } = useStore();

  return (
    <section className="quick-view-panel">
      <div className="quick-view-image-wrap">
        <img
          src={colour.gallery[0].src}
          alt={`${product.name} in ${colour.name}`}
        />
      </div>
      <div className="quick-view-details">
        <p className="eyebrow">TOVENOQ / {product.number}</p>
        <h2>{product.name}</h2>
        <p className="quick-view-price">{formatPrice(product.priceCents)}</p>
        <p className="quick-view-copy">{product.description}</p>
        <p className="option-label">
          Colour <strong>{colour.name}</strong>
        </p>
        <div className="swatches">
          {product.colours.map((option) => (
            <button
              key={option.id}
              className={colourId === option.id ? "is-selected" : ""}
              aria-label={option.name}
              aria-pressed={colourId === option.id}
              onClick={() => setColourId(option.id)}
            >
              <span style={{ backgroundColor: option.swatch }} />
            </button>
          ))}
        </div>
        <p className="option-label">
          EU size <strong>{size}</strong>
        </p>
        <div className="quick-view-sizes" aria-label="Choose EU size">
          {sizes.map((option) => (
            <button
              key={option}
              className={size === option ? "is-selected" : ""}
              aria-pressed={size === option}
              onClick={() => setSize(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          className="button button--dark button--full"
          onClick={() =>
            addToCart({
              productSlug: product.slug,
              colourId,
              size,
              quantity: 1,
            })
          }
        >
          Add to bag <span aria-hidden="true">↗</span>
        </button>
        <a
          className="underlined-link"
          href={`/products/${product.slug}`}
          onClick={closeOverlay}
        >
          View full details <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
