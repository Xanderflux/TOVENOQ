import { createPageMetadata } from "../../lib/site-metadata";
export const metadata = createPageMetadata("Policies", "/policies");
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
export default function Policies() {
  return (
    <main>
      <SiteHeader />
      <div className="page-spacer" />
      <section className="content-hero shell">
        <p className="eyebrow">POLICIES</p>
        <h1>Demo status.</h1>
        <p>
          TOVENOQ is a non-transactional concept demo. Funding, purchases,
          receipts and tracking are simulated in this browser. No real order is
          placed, and no email addresses are collected.
        </p>
      </section>
      <section className="help-grid shell">
        <div id="privacy">
          <p className="eyebrow">PRIVACY</p>
          <h2>Current data handling.</h2>
          <p>
            Your bag, saved styles, demo balance, funding history and simulated
            orders are kept in this browser’s local storage only. They are not
            synced to an account. Clearing site data removes them. This demo
            does not collect card details, addresses or newsletter emails.
          </p>
        </div>
        <div id="terms">
          <p className="eyebrow">TERMS</p>
          <h2>No sales terms.</h2>
          <p>
            Prices and product details illustrate the interface. A simulated
            purchase deducts only demo funds and creates a local receipt and
            tracking timeline. No real payment, shipment or return occurs.
            This page is not a set of sales terms.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
