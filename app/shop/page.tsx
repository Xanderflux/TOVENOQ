import { ShopCollection } from "../../components/shop-collection";

import { createPageMetadata } from "../../lib/site-metadata";
export const metadata = createPageMetadata("The Collection", "/shop");

export default function Shop() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `if (new URLSearchParams(location.search).has("category")) { document.documentElement.setAttribute("data-shop-filter-pending", ""); setTimeout(() => document.documentElement.removeAttribute("data-shop-filter-pending"), 1200); }`,
        }}
      />
      <ShopCollection />
    </>
  );
}
