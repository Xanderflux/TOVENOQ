"use client";

import { formatPrice, getProduct } from "../lib/catalog";
import { useStore } from "./store-provider";

export function CartDrawer() {
  const { cart, cartCount, setQuantity, closeOverlay } = useStore();
  const total = cart.reduce(
    (sum, line) =>
      sum + (getProduct(line.productSlug)?.priceCents ?? 0) * line.quantity,
    0,
  );

  return (
    <div className="cart-drawer">
      <div className="drawer-header">
        <h2>
          Bag <span>({cartCount})</span>
        </h2>
      </div>
      {cart.length === 0 ? (
        <div className="empty-bag">
          <p>Your bag is waiting for a point of view.</p>
          <a
            className="button button--outline"
            href="/shop"
            onClick={closeOverlay}
          >
            Explore footwear <span aria-hidden="true">↗</span>
          </a>
        </div>
      ) : (
        <>
          <div className="cart-lines">
            {cart.map((line) => {
              const product = getProduct(line.productSlug);
              const colour = product?.colours.find(
                (item) => item.id === line.colourId,
              );
              if (!product || !colour) return null;
              return (
                <div
                  className="cart-line"
                  key={`${line.productSlug}-${line.colourId}-${line.size}`}
                >
                  <a href={`/products/${product.slug}`} onClick={closeOverlay}>
                    <img
                      loading="lazy"
                      src={colour.gallery[0].src}
                      alt={product.name}
                    />
                  </a>
                  <div>
                    <a
                      className="cart-line-name"
                      href={`/products/${product.slug}`}
                      onClick={closeOverlay}
                    >
                      {product.name}
                    </a>
                    <span>
                      {colour.name} · EU {line.size}
                    </span>
                    <div className="quantity-control">
                      <button
                        aria-label={`Decrease ${product.name} quantity`}
                        onClick={() => setQuantity(line, line.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        aria-label={`Increase ${product.name} quantity`}
                        disabled={line.quantity >= 10}
                        onClick={() => setQuantity(line, line.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-line"
                      onClick={() => setQuantity(line, 0)}
                    >
                      Remove
                    </button>
                  </div>
                  <strong>
                    {formatPrice(product.priceCents * line.quantity)}
                  </strong>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <p>
              <span>Subtotal</span>
              <strong>{formatPrice(total)}</strong>
            </p>
            <small>
              Demo funds can be used at checkout. No real payment or shipment occurs.
            </small>
            <a
              className="button button--dark button--full"
              href="/checkout"
              onClick={closeOverlay}
            >
              Demo checkout <span aria-hidden="true">↗</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
