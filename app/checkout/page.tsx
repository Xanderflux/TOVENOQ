"use client";
import { useState } from "react";
import { formatPrice, getProduct } from "../../lib/catalog";
import { formatDemoMoney } from "../../lib/demo-commerce";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { useStore } from "../../components/store-provider";
export default function Checkout() {
  const { hydrated, storageAvailable, demoAccount, cart, setQuantity, placeOrder } = useStore();
  const [message, setMessage] = useState("");
  const total = cart.reduce(
      (sum, line) =>
        sum + (getProduct(line.productSlug)?.priceCents ?? 0) * line.quantity,
      0,
    );

  function submitDemoOrder() {
    const result = placeOrder();
    if (!result.ok) {
      setMessage(result.error);
      return;
    }
    window.location.assign(`/orders?ref=${encodeURIComponent(result.value.id)}`);
  }

  return (
    <main>
      <SiteHeader />
      <div className="page-spacer" />
      <section className="content-hero shell">
        <p className="eyebrow">YOUR BAG</p>
        <h1>Demo checkout.</h1>
        <p>
          Complete a simulated purchase using your device-local demo balance.
          No money is charged and no products are shipped.
        </p>
      </section>
      <section className="checkout-list shell">
        <p className="demo-notice">DEMO ONLY · NO REAL PAYMENT · NO SHIPMENT</p>
        {!hydrated ? (
          <p className="empty-state" role="status">Loading your bag…</p>
        ) : cart.length ? (
          <>
            {cart.map((line) => {
              const p = getProduct(line.productSlug),
                c = p?.colours.find((x) => x.id === line.colourId);
              if (!p || !c) return null;
              return (
                <div
                  className="checkout-line"
                  key={p.slug + line.colourId + line.size}
                >
                  <img src={c.gallery[0].src} alt="" />
                  <div>
                    <a href={"/products/" + p.slug}>{p.name}</a>
                    <p>
                      {c.name} · EU {line.size} · Qty {line.quantity}
                    </p>
                    <button onClick={() => setQuantity(line, 0)}>Remove</button>
                  </div>
                  <strong>{formatPrice(p.priceCents * line.quantity)}</strong>
                </div>
              );
            })}
            <div className="checkout-total">
              <span>Subtotal</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <div className="demo-checkout-balance">
              <div>
                <p className="eyebrow">AVAILABLE DEMO FUNDS</p>
                <strong>{formatDemoMoney(demoAccount.balanceCents)}</strong>
              </div>
              <a className="underlined-link" href="/account">Add demo funds ↗</a>
            </div>
            {!storageAvailable && (
              <p role="alert">Browser storage is unavailable, so a demo order cannot be saved.</p>
            )}
            {storageAvailable && demoAccount.balanceCents < total && (
              <p role="status">Add {formatDemoMoney(total - demoAccount.balanceCents)} in demo funds to continue.</p>
            )}
            <button
              className="button button--dark demo-place-order"
              type="button"
              disabled={!storageAvailable || demoAccount.balanceCents < total}
              onClick={submitDemoOrder}
            >
              Place demo order <span aria-hidden="true">↗</span>
            </button>
            <p className="demo-helper">
              This action deducts simulated funds and creates a receipt and
              tracking timeline on this device only. No payment details or
              delivery address are requested. Shipping and taxes are not calculated.
            </p>
            <p role="status" aria-live="polite" className="demo-feedback">{message}</p>
          </>
        ) : (
          <p className="empty-state">
            Your bag is empty.{" "}
            <a className="underlined-link" href="/shop">
              Explore footwear ↗
            </a>
          </p>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
