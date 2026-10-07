import { getProduct } from "../../../lib/catalog";
import { ProductDetail } from "../../../components/product-detail";
import { createPageMetadata } from "../../../lib/site-metadata";
export const metadata = createPageMetadata("Field 03", "/products/field-03");
export default function ProductPage() {
  return <ProductDetail product={getProduct("field-03")!} />;
}
