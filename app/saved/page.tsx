"use client";
import { products } from "../../lib/catalog";
import { ProductCard } from "../../components/product-card";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { useStore } from "../../components/store-provider";
export default function Saved() {
  const { hydrated, wishlist } = useStore(),
    saved = products.filter((p) => wishlist.includes(p.slug));
  return (
    <main>
      <SiteHeader />
      <div className="page-spacer" />
      <section className="content-hero shell">
        <p className="eyebrow">YOUR TOVENOQ</p>
        <h1>Saved styles.</h1>
        <p>Styles saved on this device. No account or cloud sync is active.</p>
      </section>
      <section className="shop-content shell">
        {!hydrated ? (
          <p className="empty-state" role="status">Loading saved styles…</p>
        ) : saved.length ? (
          <div className="product-grid">
            {saved.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="empty-state">
            Nothing saved yet.{" "}
            <a className="underlined-link" href="/shop">
              Explore the collection ↗
            </a>
          </p>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
