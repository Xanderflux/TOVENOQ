import { products } from "../lib/catalog";
import { ProductCard } from "../components/product-card";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { Reveal } from "../components/reveal";
import { createPageMetadata, siteTitle } from "../lib/site-metadata";
export const metadata = createPageMetadata(siteTitle, "/");
export default function Home() {
  return (
    <main>
      <SiteHeader transparent />
      <section className="hero" id="top">
        <div className="hero-image-wrap" aria-hidden="true">
          <img src="/images/axis-01-hero.png" alt="" className="hero-image" />
        </div>
        <div className="hero-content shell">
          <p className="eyebrow hero-eyebrow">AUTUMN / WINTER 2026</p>
          <h1>
            Form follows
            <br />
            <em>motion.</em>
          </h1>
          <p className="hero-copy">
            A considered running silhouette for the pace of the city.
          </p>
          <div className="hero-actions">
            <a className="button button--dark" href="/shop">
              Shop collection <span aria-hidden="true">↗</span>
            </a>
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
        <Reveal className="section-heading collection-heading">
          <div>
            <p className="eyebrow">THE NEW STANDARD</p>
            <h2>Made for the in-between.</h2>
          </div>
          <p className="section-intro">
            Essential forms, designed with a light hand. Our first collection is
            built around everyday movement.
          </p>
        </Reveal>
        <div className="product-grid">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 65}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <div className="collection-footer">
          <p>Four silhouettes. One point of view.</p>
          <a className="underlined-link" href="/shop">
            View all footwear <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section className="editorial" id="story">
        <Reveal className="editorial-image-wrap">
          <img
            src="/images/axis-01-lifestyle.webp"
            alt="Low-profile footwear in motion on a stone city walkway"
            className="editorial-image"
          />
          <p className="image-caption">A study in quiet utility</p>
        </Reveal>
        <Reveal className="editorial-copy" delay={90}>
          <p className="eyebrow">BUILT FOR THE EVERYDAY</p>
          <h2>
            Movement is
            <br />
            <em>personal.</em>
          </h2>
          <p>
            From the ground up, every proportion is considered for the
            unscripted rhythm of a day in motion.
          </p>
          <a className="button button--outline" href="/about">
            Discover the story <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </section>
      <section className="manifesto shell">
        <p className="eyebrow">THE TOVENOQ PRINCIPLE</p>
        <Reveal><h2>Less noise. More distance.</h2></Reveal>
        <div className="manifesto-grid">
          <p>
            Every material earns its place. Every line is designed to move.
            Nothing is added just to be seen.
          </p>
          <dl>
            <div>
              <dt>01</dt>
              <dd>Layered material contrast</dd>
            </div>
            <div>
              <dt>02</dt>
              <dd>A balanced, low-profile form</dd>
            </div>
            <div>
              <dt>03</dt>
              <dd>Considered detail, without excess</dd>
            </div>
          </dl>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
