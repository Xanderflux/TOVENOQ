"use client";

import { useEffect, useState } from "react";
import { products } from "../lib/catalog";
import { ProductCard } from "./product-card";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

const categories = ["all", "new", "men", "women"] as const;
type Category = (typeof categories)[number];

function categoryFromUrl(): Category {
  const value = new URLSearchParams(window.location.search).get("category");
  return categories.find((category) => category === value) ?? "all";
}

export function ShopCollection() {
  const [category, setCategory] = useState<Category>("all");

  useEffect(() => {
    const update = () => setCategory(categoryFromUrl());
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  useEffect(() => {
    if (category === categoryFromUrl()) {
      document.documentElement.removeAttribute("data-shop-filter-pending");
    }
  }, [category]);

  const visible = category === "all"
    ? products
    : products.filter((product) => product.categories.includes(category));

  return (
    <main>
      <SiteHeader />
      <div className="page-spacer" />
      <section className="shop-intro shell">
        <p className="eyebrow">THE COLLECTION / 2026</p>
        <h1>
          Footwear for
          <br />
          <em>what moves you.</em>
        </h1>
        <p>
          Four considered silhouettes, a single point of view. Find the pair
          that fits your pace.
        </p>
      </section>
      <section className="shop-content shell">
        <div className="shop-filter">
          <p>{visible.length} STYLES</p>
          <div aria-label="Filter collection">
            {categories.map((name) => (
              <a
                key={name}
                href={name === "all" ? "/shop" : "/shop?category=" + name}
                className={category === name ? "is-active" : ""}
                aria-current={category === name ? "page" : undefined}
              >
                {name === "all"
                  ? "All footwear"
                  : name === "new"
                    ? "New arrivals"
                    : name[0].toUpperCase() + name.slice(1)}
              </a>
            ))}
          </div>
        </div>
        <div className="product-grid shop-grid" key={category}>
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
