"use client";
import { useState } from "react";
import { formatPrice, sizes, type Product } from "../lib/catalog";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ProductCard } from "./product-card";
import { useStore } from "./store-provider";
import { products } from "../lib/catalog";
export function ProductDetail({ product }: { product: Product }) {
  const [colourId, setColourId] = useState(product.colours[0].id),
    [activeImage, setActiveImage] = useState(0),
    [selectedSize, setSelectedSize] = useState("42"),
    [quantity, setQuantity] = useState(1),
    [zoomed, setZoomed] = useState(false),
    [openAccordion, setOpenAccordion] = useState("Materials");
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const colour =
      product.colours.find((c) => c.id === colourId) ?? product.colours[0],
    gallery = colour.gallery,
    image = gallery[Math.min(activeImage, gallery.length - 1)],
    related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const accordions = [
    ["Materials", product.details.materials],
    ["Fit", product.details.fit],
    ["Care", product.details.care],
    ["Delivery", product.details.delivery],
  ];
  return (
    <main className="pdp-page">
      <SiteHeader />
      <div className="page-spacer" />
      <div className="pdp-layout">
        <section
          className="product-gallery"
          aria-label={product.name + " image gallery"}
        >
          <div className="gallery-thumbnails">
            {gallery.map((entry, index) => (
              <button
                className={activeImage === index ? "is-active" : ""}
                key={entry.src}
                onClick={() => {
                  setActiveImage(index);
                  setZoomed(false);
                }}
                aria-label={"Show " + entry.label}
                aria-pressed={activeImage === index}
              >
                <img src={entry.src} alt="" />
              </button>
            ))}
          </div>
          <button
            className={"gallery-main " + (zoomed ? "is-zoomed" : "")}
            onClick={() => setZoomed(!zoomed)}
            aria-label={zoomed ? "Zoom out image" : "Inspect image"}
          >
            <img
              key={image.src}
              src={image.src}
              alt={product.name + " in " + colour.name + ": " + image.label}
            />
            <span>{zoomed ? "− Zoom out" : "+ Inspect"}</span>
          </button>
          <p className="gallery-counter">
            {String(activeImage + 1).padStart(2, "0")} /{" "}
            {String(gallery.length).padStart(2, "0")}
          </p>
        </section>
        <section className="product-purchase">
          <div className="purchase-heading">
            <p className="eyebrow">FOUNDATIONAL SERIES / {product.number}</p>
            <div className="product-title-row">
              <h1>{product.name}</h1>
              <button
                className={
                  "wishlist-button " +
                  (wishlist.includes(product.slug) ? "is-active" : "")
                }
                onClick={() => toggleWishlist(product.slug)}
                aria-label={
                  wishlist.includes(product.slug)
                    ? "Remove from saved styles"
                    : "Save this style"
                }
                aria-pressed={wishlist.includes(product.slug)}
              >
                ♡
              </button>
            </div>
            <p className="pdp-price">{formatPrice(product.priceCents)}</p>
            <p className="pdp-description">{product.description}</p>
          </div>
          <div className="purchase-options">
            <div className="option-group">
              <div className="option-label">
                <span>Colour</span>
                <strong>{colour.name}</strong>
              </div>
              <div className="swatches">
                {product.colours.map((c) => (
                  <button
                    className={colourId === c.id ? "is-selected" : ""}
                    key={c.id}
                    onClick={() => {
                      setColourId(c.id);
                      setActiveImage(0);
                      setZoomed(false);
                    }}
                    aria-label={"Select " + c.name}
                    aria-pressed={colourId === c.id}
                  >
                    <span style={{ backgroundColor: c.swatch }} />
                  </button>
                ))}
              </div>
            </div>
            <div className="option-group">
              <div className="option-label">
                <span>EU size</span>
                <a href="/help#sizing">Size guide ↗</a>
              </div>
              <div className="size-grid">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={selectedSize === size ? "is-selected" : ""}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="quantity-row">
              <span>Quantity</span>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="button button--dark button--full pdp-add"
              onClick={() =>
                addToCart({
                  productSlug: product.slug,
                  colourId,
                  size: selectedSize,
                  quantity,
                })
              }
            >
              Add to bag{" "}
              <span>{formatPrice(product.priceCents * quantity)}</span>
            </button>
            <p className="shipping-note">
              You can place a simulated order with demo funds. No real payment or shipment occurs.
            </p>
          </div>
          <div className="pdp-accordions">
            {accordions.map(([title, content]) => (
              <div className="pdp-accordion" key={title}>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === title ? "" : title)
                  }
                  aria-expanded={openAccordion === title}
                >
                  {title}
                  <span aria-hidden="true">
                    {openAccordion === title ? "−" : "+"}
                  </span>
                </button>
                {openAccordion === title && <p>{content}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="pdp-related shell">
        <p className="eyebrow">PAIRED WITH PURPOSE</p>
        <h2>Explore the system.</h2>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <a className="underlined-link" href="/shop">
          Back to collection <span aria-hidden="true">↗</span>
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
