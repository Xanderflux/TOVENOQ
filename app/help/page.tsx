import { createPageMetadata } from "../../lib/site-metadata";
export const metadata = createPageMetadata("Customer Care", "/help");
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
export default function Help() {
  return (
    <main>
      <SiteHeader />
      <div className="page-spacer" />
      <section className="content-hero shell">
        <p className="eyebrow">CUSTOMER CARE</p>
        <h1>Good to know.</h1>
        <p>
          This is a concept demo. Wallet funding, orders and tracking are
          simulations only. Real payments, shipping and customer support are not
          available.
        </p>
      </section>
      <section className="help-grid shell">
        <div id="sizing">
          <p className="eyebrow">01 / SIZING</p>
          <h2>Find your fit.</h2>
          <p>
            Styles are labelled in EU sizes 38–45. Product pages describe the
            intended fit. An exact conversion chart and measured dimensions have
            not been verified, so please do not rely on an assumed US or UK
            equivalent.
          </p>
        </div>
        <div id="care">
          <p className="eyebrow">02 / CARE</p>
          <h2>Keep the finish.</h2>
          <p>
            Brush suede gently when dry. Spot-clean leather with a soft cloth.
            Avoid machine washing and direct heat. See each product page for
            material-specific notes.
          </p>
        </div>
        <div id="delivery">
          <p className="eyebrow">03 / DELIVERY &amp; RETURNS</p>
          <h2>Demo only.</h2>
          <p>
            Demo orders can be placed with simulated funds and moved through a
            tracking timeline, but no products are shipped and no returns are
            processed. Prices and options demonstrate the interface only.
          </p>
        </div>
        <div>
          <p className="eyebrow">04 / CONTACT</p>
          <h2>Stay in touch.</h2>
          <p>
            There is no support address for this demo. Do not send payment or
            personal information through unofficial channels.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
