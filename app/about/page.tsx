import { createPageMetadata } from "../../lib/site-metadata";
export const metadata = createPageMetadata("Our Story", "/about");
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { Reveal } from "../../components/reveal";
export default function About() {
  return (
    <main>
      <SiteHeader />
      <div className="page-spacer" />
      <section className="content-hero shell">
        <p className="eyebrow">ABOUT TOVENOQ</p>
        <h1>
          Movement is
          <br />
          <em>personal.</em>
        </h1>
        <p>
          TOVENOQ is a footwear concept built around the quiet utility of a
          well-made everyday silhouette. Form follows motion: materials, colour
          and proportion work together without excess.
        </p>
      </section>
      <section className="editorial">
        <Reveal className="editorial-image-wrap">
          <img
            className="editorial-image"
            src="/images/axis-01-lifestyle.webp"
            alt="TOVENOQ footwear in motion on a city walkway"
          />
        </Reveal>
        <Reveal className="editorial-copy" delay={90}>
          <p className="eyebrow">A CONSIDERED POINT OF VIEW</p>
          <h2>
            Less noise.
            <br />
            <em>More distance.</em>
          </h2>
          <p>
            Our first collection explores everyday movement through four
            distinct forms. Each pairs a grounded shape with tactile contrast.
          </p>
          <a className="button button--outline" href="/shop">
            Explore the collection ↗
          </a>
        </Reveal>
      </section>
      <section className="manifesto shell" id="principles">
        <p className="eyebrow">OUR PRINCIPLES</p>
        <h2>Every detail has a reason.</h2>
        <div className="manifesto-grid">
          <p>
            Designed to feel at home between places, not tied to a single
            destination.
          </p>
          <dl>
            <div>
              <dt>01</dt>
              <dd>Useful form</dd>
            </div>
            <div>
              <dt>02</dt>
              <dd>Material contrast</dd>
            </div>
            <div>
              <dt>03</dt>
              <dd>Quiet character</dd>
            </div>
          </dl>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
