"use client";

import { type ComponentProps, useEffect, useState } from "react";

function Link({ href, children, ...props }: { href: string } & Omit<ComponentProps<"a">, "href">) {
  return <a href={href} {...props}>{children}</a>;
}

const gallery = [
  { label: "Side profile", src: "/images/axis-01-hero.png" },
  { label: "Front view", src: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1500&q=90" },
  { label: "Rear view", src: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1500&q=90" },
  { label: "Top view", src: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1500&q=90" },
  { label: "Material detail", src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1500&q=90" },
  { label: "In motion", src: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1500&q=90" },
];

const accordions = [
  ["Materials", "Supple Italian nappa leather, recycled open mesh and hand-brushed suede sit over a lightweight recycled EVA midsole."],
  ["Fit", "Axis 01 fits true to size with a softly structured heel. Between sizes? We recommend choosing the larger size."],
  ["Care", "Remove surface dust with a soft brush. Use a neutral suede eraser only on dry suede. Avoid direct heat and machine washing."],
  ["Delivery", "Complimentary standard delivery on all orders. Orders leave our studio within one business day. Returns are accepted within 30 days."],
];

export default function AxisProductPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>("42");
  const [quantity, setQuantity] = useState(1);
  const [selectedColour, setSelectedColour] = useState("Bone / Carbon");
  const [openAccordion, setOpenAccordion] = useState("Materials");
  const [wishlisted, setWishlisted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const locked = cartOpen || sizeGuideOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, sizeGuideOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setSizeGuideOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <main className="pdp-page">
      <header className="product-nav">
        <Link className="wordmark" href="/" aria-label="ALTO home">
          ALTO<span>®</span>
        </Link>
        <p>AXIS 01 / BONE</p>
        <Link href="/" className="back-link">Shop all <span aria-hidden="true">↗</span></Link>
      </header>

      <div className="pdp-layout">
        <section className="product-gallery" aria-label="Axis 01 image gallery">
          <div className="gallery-thumbnails">
            {gallery.map((image, index) => (
              <button
                className={index === activeImage ? "is-active" : ""}
                key={image.label}
                onClick={() => setActiveImage(index)}
                aria-label={`Show ${image.label}`}
              >
                <img src={image.src} alt="" />
              </button>
            ))}
          </div>
          <button
            className={`gallery-main ${zoomed ? "is-zoomed" : ""}`}
            onClick={() => setZoomed((value) => !value)}
            aria-label="Toggle image zoom"
          >
            <img src={gallery[activeImage].src} alt={`Axis 01 — ${gallery[activeImage].label}`} />
            <span>{zoomed ? "− Zoom out" : "+ Inspect"}</span>
          </button>
          <p className="gallery-counter">{String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</p>
        </section>

        <section className="product-purchase">
          <div className="purchase-heading">
            <p className="eyebrow">FOUNDATIONAL SERIES / 01</p>
            <div className="product-title-row">
              <h1>Axis 01</h1>
              <button
                className={`wishlist-button ${wishlisted ? "is-active" : ""}`}
                onClick={() => setWishlisted((value) => !value)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                ♡
              </button>
            </div>
            <p className="pdp-price">$245</p>
            <p className="pdp-description">A light-footed daily runner engineered with restraint. Responsive underfoot, unhurried in profile.</p>
          </div>

          <div className="purchase-options">
            <div className="option-group">
              <div className="option-label"><span>Colour</span><strong>{selectedColour}</strong></div>
              <div className="swatches">
                <button className={selectedColour === "Bone / Carbon" ? "is-selected bone" : "bone"} onClick={() => setSelectedColour("Bone / Carbon")} aria-label="Select Bone and Carbon"><span /></button>
                <button className={selectedColour === "Espresso / Clay" ? "is-selected espresso" : "espresso"} onClick={() => setSelectedColour("Espresso / Clay")} aria-label="Select Espresso and Clay"><span /></button>
              </div>
            </div>
            <div className="option-group">
              <div className="option-label"><span>EU size</span><button onClick={() => setSizeGuideOpen(true)}>Size guide <span aria-hidden="true">↗</span></button></div>
              <div className="size-grid">
                {["38", "39", "40", "41", "42", "43", "44", "45"].map((size) => (
                  <button key={size} className={selectedSize === size ? "is-selected" : ""} onClick={() => setSelectedSize(size)}>{size}</button>
                ))}
              </div>
            </div>
            <div className="quantity-row">
              <span>Quantity</span>
              <div className="quantity-control">
                <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">+</button>
              </div>
            </div>
            <button className="button button--dark button--full pdp-add" onClick={() => setCartOpen(true)}>
              Add to bag <span>${(245 * quantity).toFixed(0)}</span>
            </button>
            <p className="shipping-note">Complimentary delivery &amp; 30-day returns.</p>
          </div>

          <div className="pdp-accordions">
            {accordions.map(([title, content]) => (
              <div className="pdp-accordion" key={title}>
                <button onClick={() => setOpenAccordion(openAccordion === title ? "" : title)} aria-expanded={openAccordion === title}>
                  {title}<span aria-hidden="true">{openAccordion === title ? "−" : "+"}</span>
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
        <Link href="/" className="underlined-link">Back to collection <span aria-hidden="true">↗</span></Link>
      </section>

      {sizeGuideOpen && (
        <div className="overlay" role="presentation">
          <button className="overlay-dismiss" onClick={() => setSizeGuideOpen(false)} aria-label="Close size guide" />
          <section className="size-guide-modal" role="dialog" aria-modal="true" aria-label="Size guide">
            <button className="close-button" onClick={() => setSizeGuideOpen(false)} aria-label="Close size guide">×</button>
            <p className="eyebrow">AXIS 01</p>
            <h2>Size guide</h2>
            <div className="size-table">
              <span>EU 40</span><span>US 7</span><span>25.5 cm</span><span>UK 6.5</span>
              <span>EU 42</span><span>US 9</span><span>27 cm</span><span>UK 8.5</span>
              <span>EU 44</span><span>US 11</span><span>28.5 cm</span><span>UK 10.5</span>
            </div>
          </section>
        </div>
      )}

      {cartOpen && (
        <div className="overlay overlay--drawer" role="presentation">
          <button className="overlay-dismiss" onClick={() => setCartOpen(false)} aria-label="Close shopping bag" />
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
            <div className="drawer-header"><h2>Bag <span>({quantity})</span></h2><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button></div>
            <div className="cart-line">
              <img src="/images/axis-01-hero.png" alt="Axis 01 in Bone" />
              <div><p>Axis 01</p><span>{selectedColour} · EU {selectedSize}</span><div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease Axis 01 quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase Axis 01 quantity">+</button></div></div>
              <strong>${(245 * quantity).toFixed(0)}</strong>
            </div>
            <div className="cart-summary"><p><span>Subtotal</span><strong>${(245 * quantity).toFixed(0)}</strong></p><small>Shipping and taxes calculated at checkout.</small><button className="button button--dark button--full">Secure checkout <span aria-hidden="true">↗</span></button></div>
          </aside>
        </div>
      )}
    </main>
  );
}
