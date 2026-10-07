import { createPageMetadata } from "../../../lib/site-metadata";
export const metadata = createPageMetadata("Axis 01", "/products/axis-01", "Axis 01 is a considered daily-runner concept by TOVENOQ. Demo purchases only.");
import { getProduct } from "../../../lib/catalog";
import { ProductDetail } from "../../../components/product-detail";
export default function AxisProductPage() {
  return <ProductDetail product={getProduct("axis-01")!} />;
}
