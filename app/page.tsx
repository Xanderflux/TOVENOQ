"use client";

import { type ComponentProps, useEffect, useMemo, useState } from "react";

function Link({ href, children, ...props }: { href: string } & Omit<ComponentProps<"a">, "href">) {
  return <a href={href} {...props}>{children}</a>;
}

type Product = {
  name: string;
  descriptor: string;
  price: string;
  color: string;
  colorHex: string;
  image: string;
  alternateImage: string;
  number: string;
};

const products: Product[] = [
  {
    name: "Axis 01",
    descriptor: "Bone / Carbon",
    price: "$245",
    color: "Bone",
    colorHex: "#e3d8c7",
    image: "/images/axis-01-hero.png",
    alternateImage:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=90",
    number: "01",
  },
  {
    name: "Frame 02",
    descriptor: "Stone / Ink",
    price: "$265",
    color: "Stone",
    colorHex: "#aaa394",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=90",
    alternateImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90",
    number: "02",
  },
  {
    name: "Field 03",
    descriptor: "Umber / Chalk",
    price: "$235",
    color: "Umber",
    colorHex: "#755a43",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=90",
    alternateImage:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=90",
    number: "03",
  },
  {
    name: "Line 04",
    descriptor: "Black / Clay",
    price: "$255",
    color: "Black",
    colorHex: "#242321",
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1200&q=90",
    alternateImage:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=90",
    number: "04",
  },
];

function BagGlyph() {
  return <span aria-hidden="true" className="bag-glyph" />;
}

function SearchGlyph() {
  return <span aria-hidden="true" className="search-glyph" />;
}

function AccountGlyph() {
  return <span aria-hidden="true" className="account-glyph" />;
}

export default function Home() {
  const [solidNavigation, setSolidNavigation] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [quickViewSize, setQuickViewSize] = useState("42");
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartProduct, setCartProduct] = useState<Product | null>(null);
  const [cartSize, setCartSize] = useState("42");
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const updateNavigation = () => setSolidNavigation(window.scrollY > 52);
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    return () => window.removeEventListener("scroll", updateNavigation);
  }, []);

  useEffect(() => {
    const locked = Boolean(quickView || cartOpen || menuOpen);
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [quickView, cartOpen, menuOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setQuickView(null);
        setCartOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const cartLabel = useMemo(
    () =>
      cartQuantity === 0
        ? "Bag"
        : `Bag, ${cartQuantity} item${cartQuantity > 1 ? "s" : ""}`,
    [cartQuantity],
  );

  const addToBag = (product: Product) => {
    setCartProduct(product);
    setCartSize(quickViewSize);
    setCartQuantity((quantity) => quantity + 1);
    setQuickView(null);
    setCartOpen(true);
  };

  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  const openQuickView = (product: Product) => {
    setQuickView(product);
    setQuickViewSize("42");
  };

  const cartUnitPrice = Number(cartProduct?.price.replace(/[^0-9]/g, "") ?? 0);
  const cartTotal = cartUnitPrice * cartQuantity;

  return (
    <main>
      <header
        className={`site-nav ${solidNavigation ? "site-nav--solid" : ""}`}
      >
        <Link className="wordmark" href="#top" aria-label="ALTO home">
          ALTO<span>®</span>
        </Link>
        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#collection">Shop</a>
          <a href="#collection">Men</a>
          <a href="#collection">Women</a>
          <a href="#collection">New arrivals</a>
          <a href="#collection">Collections</a>
          <a href="#story">About</a>
        </nav>
        <div className="nav-actions">
          <button
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <button className="icon-button" aria-label="Search">
            <SearchGlyph />
          </button>
          <button className="icon-button account-button" aria-label="Account">
            <AccountGlyph />
          </button>
          <button
            className="icon-button bag-button"
            aria-label={cartLabel}
            onClick={() => setCartOpen(true)}
          >
            <BagGlyph />
            {cartQuantity > 0 && <span className="bag-count">{cartQuantity}</span>}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Men</a>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Women</a>
          <a href="#collection" onClick={() => setMenuOpen(false)}>New arrivals</a>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collections</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
      )}

      <section className="hero" id="top">
        <div className="hero-image-wrap" aria-hidden="true">
          <img src="/images/axis-01-hero.png" alt="" className="hero-image" />
        </div>
        <div className="hero-content shell">
          <p className="eyebrow hero-eyebrow">AUTUMN / WINTER 2026</p>
          <h1>
            Form follows<br />
            <em>motion.</em>
          </h1>
          <p className="hero-copy">
            A considered running silhouette for the pace of the city.
          </p>
          <div className="hero-actions">
            <button className="button button--dark" onClick={scrollToCollection}>
              Shop collection <span aria-hidden="true">↗</span>
            </button>
            <a className="text-link" href="#story">
              Explore the story <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-index">
          <span>01</span>
          <span>AXIS / FOUNDATION</span>
        </div>
      </section>

      <section className="collection shell" id="collection">
        <div className="section-heading collection-heading">
          <div>
            <p className="eyebrow">THE NEW STANDARD</p>
            <h2>Made for the in-between.</h2>
          </div>
          <p className="section-intro">
            Essential forms, engineered with a light hand. Our first collection
            is built around the everyday movement that matters.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-media">
                <Link
                  href="/products/axis-01"
                  className="product-image-link"
                  aria-label={`View ${product.name}`}
                >
                  <img
                    className="product-image product-image--primary"
                    src={product.image}
                    alt={product.name}
                  />
                  <img
                    className="product-image product-image--alternate"
                    src={product.alternateImage}
                    alt=""
                  />
                </Link>
                <button className="quick-view" onClick={() => openQuickView(product)}>
                  Quick view
                </button>
                <span className="product-number">{product.number}</span>
              </div>
              <div className="product-meta">
                <div>
                  <Link href="/products/axis-01">{product.name}</Link>
                  <p>{product.descriptor}</p>
                </div>
                <div className="product-price">
                  <span>{product.price}</span>
                  <span
                    className="colour-dot"
                    style={{ backgroundColor: product.colorHex }}
                    aria-label={`${product.color} colour`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="collection-footer">
          <p>Four silhouettes. One point of view.</p>
          <a className="underlined-link" href="#collection">
            View all footwear <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="editorial" id="story">
        <div className="editorial-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1800&q=90"
            alt="A dark athletic shoe worn on an urban pavement"
            className="editorial-image"
          />
          <p className="image-caption">A study in quiet utility — Lagos, 06:20</p>
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">BUILT FOR THE EVERYDAY</p>
          <h2>
            Movement is<br />
            <em>personal.</em>
          </h2>
          <p>
            We design from the ground up: drawing equal inspiration from rigorous
            sport, raw architecture and the unscripted rhythm of a walk home.
          </p>
          <a className="button button--outline" href="#collection">
            Discover the collection <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="manifesto shell">
        <p className="eyebrow">THE ALTO PRINCIPLE</p>
        <h2>Less noise. More distance.</h2>
        <div className="manifesto-grid">
          <p>
            Every material earns its place. Every line is tested in movement.
            Nothing is added just to be seen.
          </p>
          <dl>
            <div>
              <dt>01</dt>
              <dd>Italian leather with a softer hand</dd>
            </div>
            <div>
              <dt>02</dt>
              <dd>Precision-knit support where it matters</dd>
            </div>
            <div>
              <dt>03</dt>
              <dd>Responsibly made in limited runs</dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top shell">
          <div className="footer-brand">
            <p className="wordmark">
              ALTO<span>®</span>
            </p>
            <p>Form follows motion.</p>
          </div>
          <div className="newsletter">
            <p className="eyebrow">FIELD NOTES</p>
            <h3>News from the studio.</h3>
            {subscribed ? (
              <p className="newsletter-success">You&apos;re on the list. Keep moving.</p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (newsletterEmail.trim()) setSubscribed(true);
                }}
              >
                <label className="sr-only" htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  placeholder="Email address"
                  required
                />
                <button aria-label="Subscribe to the newsletter" type="submit">↗</button>
              </form>
            )}
          </div>
        </div>
        <div className="footer-links shell">
          <div>
            <p className="footer-label">Shop</p>
            <a href="#collection">New arrivals</a>
            <a href="#collection">Men</a>
            <a href="#collection">Women</a>
            <a href="#collection">Gift cards</a>
          </div>
          <div>
            <p className="footer-label">Customer care</p>
            <a href="#top">Contact</a>
            <a href="#top">Shipping &amp; returns</a>
            <a href="#top">Size guide</a>
            <a href="#top">Care</a>
          </div>
          <div>
            <p className="footer-label">About ALTO</p>
            <a href="#story">Our story</a>
            <a href="#story">Journal</a>
            <a href="#top">Stockists</a>
            <a href="#top">Careers</a>
          </div>
          <div>
            <p className="footer-label">Follow</p>
            <a href="#top">Instagram</a>
            <a href="#top">Pinterest</a>
            <a href="#top">TikTok</a>
          </div>
        </div>
        <div className="footer-bottom shell">
          <p>© 2026 ALTO. All rights reserved.</p>
          <div>
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
            <button>
              United States / USD <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </footer>

      {quickView && (
        <div className="overlay" role="presentation">
          <button className="overlay-dismiss" onClick={() => setQuickView(null)} aria-label="Close quick view" />
          <section
            className="quick-view-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${quickView.name} quick view`}
          >
            <button className="close-button" onClick={() => setQuickView(null)} aria-label="Close quick view">×</button>
            <div className="quick-view-image-wrap">
              <img src={quickView.image} alt={quickView.name} />
            </div>
            <div className="quick-view-details">
              <p className="eyebrow">ALTO / {quickView.number}</p>
              <h2>{quickView.name}</h2>
              <p className="quick-view-price">{quickView.price}</p>
              <p className="quick-view-copy">A tuned everyday runner with a balanced, close-to-ground ride.</p>
              <div className="quick-view-sizes" aria-label="Available sizes">
                {["38", "39", "40", "41", "42", "43", "44"].map((size) => (
                  <button
                    key={size}
                    className={quickViewSize === size ? "is-selected" : ""}
                    onClick={() => setQuickViewSize(size)}
                    aria-pressed={quickViewSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="button button--dark button--full" onClick={() => addToBag(quickView)}>Add to bag</button>
              <Link className="underlined-link" href="/products/axis-01">View full details <span aria-hidden="true">↗</span></Link>
            </div>
          </section>
        </div>
      )}

      {cartOpen && (
        <div className="overlay overlay--drawer" role="presentation">
          <button className="overlay-dismiss" onClick={() => setCartOpen(false)} aria-label="Close shopping bag" />
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
            <div className="drawer-header">
              <h2>Bag <span>({cartQuantity})</span></h2>
              <button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button>
            </div>
            {cartQuantity > 0 ? (
              <>
                <div className="cart-line">
                  <img src={cartProduct?.image} alt={`${cartProduct?.name} in ${cartProduct?.color}`} />
                  <div>
                    <p>{cartProduct?.name}</p>
                    <span>{cartProduct?.descriptor} · EU {cartSize}</span>
                    <div className="quantity-control">
                      <button onClick={() => setCartQuantity((quantity) => Math.max(0, quantity - 1))} aria-label="Remove one Axis 01">−</button>
                      <span>{cartQuantity}</span>
                      <button onClick={() => setCartQuantity((quantity) => quantity + 1)} aria-label="Add one Axis 01">+</button>
                    </div>
                  </div>
                  <strong>${cartTotal.toFixed(0)}</strong>
                </div>
                <div className="cart-summary">
                  <p><span>Subtotal</span><strong>${cartTotal.toFixed(0)}</strong></p>
                  <small>Shipping and taxes calculated at checkout.</small>
                  <button className="button button--dark button--full">Secure checkout <span aria-hidden="true">↗</span></button>
                </div>
              </>
            ) : (
              <div className="empty-bag">
                <p>Your bag is waiting for a point of view.</p>
                <button className="button button--outline" onClick={() => setCartOpen(false)}>Shop collection</button>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
