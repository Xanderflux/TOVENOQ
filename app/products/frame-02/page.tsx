import { getProduct } from "../../../lib/catalog";
import { ProductDetail } from "../../../components/product-detail";
import { createPageMetadata } from "../../../lib/site-metadata";
export const metadata = createPageMetadata("Frame 02", "/products/frame-02");
export default function ProductPage() {
  return <ProductDetail product={getProduct("frame-02")!} />;
}
