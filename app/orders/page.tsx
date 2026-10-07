"use client";

import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { useStore } from "../../components/store-provider";
import { formatDemoMoney, trackingSteps } from "../../lib/demo-commerce";

function displayDate(value: string): string {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

export default function DemoOrdersPage() {
  const { hydrated, storageAvailable, demoAccount, advanceTracking } = useStore();
  const [selectedId] = useState(() =>
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("ref"),
  );
  const [message, setMessage] = useState("");
  const trackingHeadingRef = useRef<HTMLHeadingElement>(null);
  const focusTrackingAfterUpdate = useRef(false);

  const order = selectedId
    ? demoAccount.orders.find((item) => item.id === selectedId)
    : undefined;

  useEffect(() => {
    if (!focusTrackingAfterUpdate.current) return;
    focusTrackingAfterUpdate.current = false;
    trackingHeadingRef.current?.focus();
  }, [order?.trackingStep]);

  function updateTracking() {
    if (!order) return;
    const result = advanceTracking(order.id);
    if (result.ok && order.trackingStep === trackingSteps.length - 2) {
      focusTrackingAfterUpdate.current = true;
    }
    setMessage(result.ok ? "Demo tracking moved to the next stage. No parcel exists." : result.error);
  }

  return (
    <main>
      <SiteHeader />
      <div className="page-spacer" />
      <section className="content-hero shell no-print">
        <p className="eyebrow">DEVICE-LOCAL ORDER HISTORY</p>
        <h1>{order ? "Your demo receipt." : "Your demo orders."}</h1>
        <p>
          These are simulated purchases and tracking updates. Nothing was
          charged, fulfilled, or sent to a carrier.
        </p>
      </section>
      <div className="demo-page shell">
        <p className="demo-notice">DEMO ONLY · NOT PROOF OF PURCHASE · NO REAL PARCEL</p>
        {!hydrated ? (
          <p role="status">Loading your demo orders…</p>
        ) : !storageAvailable ? (
          <p role="alert">Browser storage is unavailable. Demo orders cannot be loaded on this device.</p>
        ) : selectedId && !order ? (
          <div className="demo-empty">
            <h2>That demo order is not on this device.</h2>
            <p>Order history lives only in the browser where it was created.</p>
            <a className="button button--outline" href="/orders">View all demo orders</a>
          </div>
        ) : order ? (
          <article className="demo-receipt" aria-label={`Demo receipt ${order.id}`}>
            <div className="demo-receipt-top">
              <div>
                <p className="eyebrow">TOVENOQ / SIMULATED RECEIPT</p>
                <h2>{order.id}</h2>
                <p>Recorded {displayDate(order.createdAt)}</p>
              </div>
              <div className="demo-receipt-actions no-print">
                <a className="underlined-link" href="/orders">All demo orders ↗</a>
                <button className="button button--outline" type="button" onClick={() => window.print()}>
                  Print / Save demo receipt
                </button>
              </div>
            </div>
            <p className="demo-receipt-watermark">SIMULATION · NO REAL TRANSACTION</p>
            <div className="demo-receipt-lines">
              {order.lines.map((line, index) => (
                <div className="checkout-line" key={`${line.productSlug}-${line.colourName}-${line.size}-${index}`}>
                  <img src={line.imageSrc} alt="" />
                  <div>
                    <strong>{line.productName}</strong>
                    <p>{line.colourName} · EU {line.size} · Qty {line.quantity}</p>
                    <small>{formatDemoMoney(line.unitPriceCents)} each</small>
                  </div>
                  <strong>{formatDemoMoney(line.unitPriceCents * line.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="demo-receipt-total">
              <span>Total deducted from demo funds</span>
              <strong>{formatDemoMoney(order.totalCents)}</strong>
            </div>
            <p className="demo-helper">
              No payment method was used. Shipping is not applicable and taxes
              were not calculated. This receipt is for interface demonstration only.
            </p>
            <section className="demo-tracking" aria-label="Simulated tracking">
              <p className="eyebrow">SIMULATED TRACKING</p>
              <h3 key={order.trackingStep} ref={trackingHeadingRef} tabIndex={-1}>{trackingSteps[order.trackingStep]}</h3>
              <ol>
                {trackingSteps.map((step, index) => (
                  <li key={step} className={index <= order.trackingStep ? "is-complete" : ""} aria-current={index === order.trackingStep ? "step" : undefined}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                    <small>{index <= order.trackingStep ? "Simulated" : "Not reached"}</small>
                  </li>
                ))}
              </ol>
              <p>No carrier or parcel is connected. Advance the timeline to preview each state.</p>
              <button
                className="button button--dark no-print"
                type="button"
                disabled={order.trackingStep >= trackingSteps.length - 1}
                onClick={updateTracking}
              >
                Advance demo tracking <span aria-hidden="true">↗</span>
              </button>
              <p role="status" aria-live="polite" className="demo-feedback no-print">{message}</p>
            </section>
          </article>
        ) : demoAccount.orders.length === 0 ? (
          <div className="demo-empty">
            <h2>No demo orders yet.</h2>
            <p>Use simulated funds to try the full shopping flow.</p>
            <a className="button button--dark" href="/shop">Explore footwear</a>
          </div>
        ) : (
          <div className="demo-order-list">
            {demoAccount.orders.map((item) => (
              <a key={item.id} href={`/orders?ref=${encodeURIComponent(item.id)}`}>
                <div>
                  <span className="eyebrow">{displayDate(item.createdAt)}</span>
                  <h2>{item.id}</h2>
                  <p>{item.lines.reduce((count, line) => count + line.quantity, 0)} items · {trackingSteps[item.trackingStep]} (simulated)</p>
                </div>
                <strong>{formatDemoMoney(item.totalCents)} <span aria-hidden="true">↗</span></strong>
              </a>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
