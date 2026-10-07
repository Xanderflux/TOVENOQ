"use client";

import { useState, type FormEvent } from "react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { useStore } from "../../components/store-provider";
import { formatDemoMoney, parseDemoAmount } from "../../lib/demo-commerce";

export default function DemoAccountPage() {
  const { hydrated, storageAvailable, demoAccount, addFunds } = useStore();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [fundingSequence, setFundingSequence] = useState(0);

  function fund(cents: number) {
    const result = addFunds(cents);
    setMessage(
      result.ok
        ? `${formatDemoMoney(cents)} in simulated funds was added. No payment was taken.`
        : result.error,
    );
    if (result.ok) {
      setAmount("");
      setFundingSequence((current) => current + 1);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cents = parseDemoAmount(amount);
    if (cents === null) {
      setMessage("Enter a demo amount from $0.01 to $100,000.");
      return;
    }
    fund(cents);
  }

  const activity = [
    ...demoAccount.funding.map((item) => ({
      id: item.id,
      date: item.createdAt,
      label: "Demo funds added",
      amount: item.amountCents,
      href: null as string | null,
    })),
    ...demoAccount.orders.map((order) => ({
      id: order.id,
      date: order.createdAt,
      label: `Demo purchase · ${order.id}`,
      amount: -order.totalCents,
      href: `/orders?ref=${encodeURIComponent(order.id)}`,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main>
      <SiteHeader />
      <div className="page-spacer" />
      <section className="content-hero shell">
        <p className="eyebrow">YOUR DEMO ACCOUNT</p>
        <h1>Move on your terms.</h1>
        <p>
          Add simulated funds to try the shopping journey. This is not a bank
          account: no card, payment, or real money is involved.
        </p>
      </section>
      <div className="demo-page shell">
        <p className="demo-notice">DEMO ONLY · NO REAL MONEY · STORED ON THIS DEVICE</p>
        {!hydrated ? (
          <p role="status">Loading your demo account…</p>
        ) : !storageAvailable ? (
          <p role="alert">Browser storage is unavailable. Demo funding and orders cannot be saved here.</p>
        ) : (
          <>
            <div className="demo-account-grid">
              <section className="demo-balance-card" aria-label="Demo balance">
                <p className="eyebrow">AVAILABLE DEMO FUNDS</p>
                <strong key={fundingSequence} className={fundingSequence ? "demo-balance-update" : ""}>
                  {formatDemoMoney(demoAccount.balanceCents)}
                </strong>
                <p>Simulated USD. You can change this balance only on this device.</p>
                <a className="underlined-link" href="/orders">View demo orders ↗</a>
              </section>
              <section className="demo-funding-card">
                <p className="eyebrow">ADD DEMO FUNDS</p>
                <h2>Choose an amount.</h2>
                <div className="demo-presets" aria-label="Preset demo amounts">
                  {[10, 100, 1000, 100000].map((dollars) => (
                    <button key={dollars} type="button" onClick={() => fund(dollars * 100)}>
                      {formatDemoMoney(dollars * 100)}
                    </button>
                  ))}
                </div>
                <form onSubmit={submit} className="demo-fund-form">
                  <label htmlFor="demo-fund-amount">Or enter a custom USD amount</label>
                  <div>
                    <span aria-hidden="true">$</span>
                    <input
                      id="demo-fund-amount"
                      inputMode="decimal"
                      autoComplete="off"
                      placeholder="25.00"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                    />
                    <button className="button button--dark" type="submit">Add demo funds</button>
                  </div>
                </form>
                <p className="demo-helper">Maximum $100,000 per action; no financial information is requested.</p>
                <p role="status" aria-live="polite" className="demo-feedback">{message}</p>
              </section>
            </div>
            <section className="demo-activity">
              <div className="demo-section-title">
                <div><p className="eyebrow">DEVICE-LOCAL HISTORY</p><h2>Recent activity.</h2></div>
                <a className="underlined-link" href="/shop">Explore footwear ↗</a>
              </div>
              {activity.length === 0 ? (
                <p>No demo activity yet. Add funds to begin.</p>
              ) : (
                <ul>
                  {activity.map((item) => (
                    <li key={item.id}>
                      <div>
                        {item.href ? <a href={item.href}>{item.label}</a> : <strong>{item.label}</strong>}
                        <span>{new Date(item.date).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</span>
                      </div>
                      <strong className={item.amount > 0 ? "demo-positive" : ""}>
                        {item.amount > 0 ? "+" : "−"}{formatDemoMoney(Math.abs(item.amount))}
                      </strong>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
