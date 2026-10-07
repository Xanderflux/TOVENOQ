"use client";
import { formatPrice, type Product } from "../lib/catalog";
import { useStore } from "./store-provider";
export function ProductCard({ product }: { product: Product }) {
  const { openQuickView } = useStore(),
    main = product.colours[0].gallery[0].src,
    alt =
      product.colours[0].gallery[1]?.src ?? product.colours[1]?.gallery[0]?.src;
  return (
    <article className="product-card">
      <div className="product-media">
        <a
          href={"/products/" + product.slug}
          className="product-image-link"
          aria-label={"View " + product.name}
        >
          <img
            loading="lazy"
            className="product-image product-image--primary"
            src={main}
            alt={product.name + " in " + product.colours[0].name}
          />
          {alt && (
            <img
              loading="lazy"
              className="product-image product-image--alternate"
              src={alt}
              alt=""
            />
          )}
        </a>
        <button
          className="quick-view"
          onClick={() => openQuickView(product.slug)}
        >
          Quick view
        </button>
        <span className="product-number">{product.number}</span>
      </div>
      <div className="product-meta">
        <div>
          <a href={"/products/" + product.slug}>{product.name}</a>
          <p>{product.descriptor}</p>
        </div>
        <div className="product-price">
          <span>{formatPrice(product.priceCents)}</span>
          <span
            className="colour-dot"
            style={{ backgroundColor: product.colours[0].swatch }}
            aria-label={product.colours[0].name}
          />
        </div>
      </div>
    </article>
  );
}
