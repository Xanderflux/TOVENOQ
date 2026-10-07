import { getProduct } from "../../../lib/catalog";
import { ProductDetail } from "../../../components/product-detail";
import { createPageMetadata } from "../../../lib/site-metadata";
export const metadata = createPageMetadata("Line 04", "/products/line-04");
export default function ProductPage() {
  return <ProductDetail product={getProduct("line-04")!} />;
}
