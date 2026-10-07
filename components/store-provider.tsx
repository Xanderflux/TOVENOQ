"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getProduct, type Product } from "../lib/catalog";
import { createDemoId } from "../lib/demo-id";
import {
  addDemoFunds,
  advanceDemoTracking,
  emptyDemoAccount,
  placeDemoPurchase,
  readDemoAccount,
  type DemoAccount,
  type DemoOrder,
  type DemoOrderLine,
  type DemoResult,
} from "../lib/demo-commerce";
import { Dialog } from "./dialog";
import { CartDrawer } from "./cart-drawer";
import { QuickView } from "./quick-view";
import { SearchPanel } from "./search-panel";

export type CartLine = {
  productSlug: string;
  colourId: string;
  size: string;
  quantity: number;
};

type Overlay =
  | { kind: "cart" }
  | { kind: "search" }
  | { kind: "quick"; slug: string }
  | null;

type StoreContextValue = {
  hydrated: boolean;
  storageAvailable: boolean;
  cart: CartLine[];
  cartCount: number;
  addToCart: (line: CartLine) => void;
  setQuantity: (line: CartLine, quantity: number) => void;
  openCart: () => void;
  openSearch: () => void;
  openQuickView: (slug: string) => void;
  closeOverlay: () => void;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  demoAccount: DemoAccount;
  addFunds: (amountCents: number) => DemoResult<DemoAccount>;
  placeOrder: () => DemoResult<DemoOrder>;
  advanceTracking: (orderId: string) => DemoResult<DemoAccount>;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const CART_KEY = "tovenoq-cart-v1";
const WISHLIST_KEY = "tovenoq-wishlist-v1";
const ACCOUNT_KEY = "tovenoq-demo-account-v1";
// Read the previous concept's keys once so a local rebrand does not erase selections.
const LEGACY_CART_KEY = "alto-cart-v1";
const LEGACY_WISHLIST_KEY = "alto-wishlist-v1";

function validLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Partial<CartLine>;
  const product =
    typeof line.productSlug === "string"
      ? getProduct(line.productSlug)
      : undefined;
  return Boolean(
    product &&
    product.colours.some((colour) => colour.id === line.colourId) &&
    typeof line.size === "string" &&
    /^(38|39|40|41|42|43|44|45)$/.test(line.size) &&
    Number.isInteger(line.quantity) &&
    (line.quantity ?? 0) > 0 &&
    (line.quantity ?? 0) <= 10,
  );
}

function sameLine(a: CartLine, b: CartLine): boolean {
  return (
    a.productSlug === b.productSlug &&
    a.colourId === b.colourId &&
    a.size === b.size
  );
}

function parseStoredJson(raw: string | null, fallback: unknown): unknown {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [demoAccount, setDemoAccount] = useState<DemoAccount>(emptyDemoAccount);
  const [hydrated, setHydrated] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(false);
  const accountRef = useRef<DemoAccount>(emptyDemoAccount());
  const purchaseLockRef = useRef(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const closeOverlay = useCallback(() => setOverlay(null), []);

  const saveDemoAccount = useCallback((next: DemoAccount): boolean => {
    try {
      window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(next));
      accountRef.current = next;
      setDemoAccount(next);
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const storedCart = parseStoredJson(
          window.localStorage.getItem(CART_KEY) ??
            window.localStorage.getItem(LEGACY_CART_KEY),
          [],
        );
        if (Array.isArray(storedCart)) setCart(storedCart.filter(validLine));
        const storedWishlist = parseStoredJson(
          window.localStorage.getItem(WISHLIST_KEY) ??
            window.localStorage.getItem(LEGACY_WISHLIST_KEY),
          [],
        );
        if (Array.isArray(storedWishlist)) {
          setWishlist(
            storedWishlist.filter(
              (slug): slug is string =>
                typeof slug === "string" && Boolean(getProduct(slug)),
            ),
          );
        }
        const storedAccount = readDemoAccount(
          parseStoredJson(window.localStorage.getItem(ACCOUNT_KEY), null),
        );
        accountRef.current = storedAccount;
        setDemoAccount(storedAccount);
        const testKey = "tovenoq-demo-storage-check";
        window.localStorage.setItem(testKey, "ok");
        window.localStorage.removeItem(testKey);
        setStorageAvailable(true);
      } catch {
        // Shopping stays usable in memory, but simulated purchases need local storage.
      }
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    purchaseLockRef.current = false;
  }, [cart]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage) return;
      if (event.key === ACCOUNT_KEY || event.key === null) {
        const next = readDemoAccount(parseStoredJson(event.key === null ? null : event.newValue, null));
        accountRef.current = next;
        setDemoAccount(next);
      }
      if (event.key === CART_KEY || event.key === null) {
        const next = parseStoredJson(event.key === null ? null : event.newValue, []);
        setCart(Array.isArray(next) ? next.filter(validLine) : []);
      }
      if (event.key === WISHLIST_KEY || event.key === null) {
        const next = parseStoredJson(event.key === null ? null : event.newValue, []);
        setWishlist(Array.isArray(next) ? next.filter(
          (slug): slug is string => typeof slug === "string" && Boolean(getProduct(slug)),
        ) : []);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated || !storageAvailable) return;
    try {
      const cartValue = JSON.stringify(cart);
      const wishlistValue = JSON.stringify(wishlist);
      if (window.localStorage.getItem(CART_KEY) !== cartValue) {
        window.localStorage.setItem(CART_KEY, cartValue);
      }
      if (window.localStorage.getItem(WISHLIST_KEY) !== wishlistValue) {
        window.localStorage.setItem(WISHLIST_KEY, wishlistValue);
      }
    } catch {
      // Private browsing can deny storage without preventing shopping in this tab.
    }
  }, [cart, wishlist, hydrated, storageAvailable]);

  const value = useMemo<StoreContextValue>(
    () => ({
      hydrated,
      storageAvailable,
      cart,
      cartCount: cart.reduce((count, line) => count + line.quantity, 0),
      addToCart: (line) => {
        if (!validLine(line)) return;
        setCart((current) => {
          const existing = current.find((item) => sameLine(item, line));
          if (existing) {
            return current.map((item) =>
              sameLine(item, line)
                ? {
                    ...item,
                    quantity: Math.min(10, item.quantity + line.quantity),
                  }
                : item,
            );
          }
          return [...current, line];
        });
        setOverlay({ kind: "cart" });
      },
      setQuantity: (line, quantity) => {
        setCart((current) =>
          current.flatMap((item) => {
            if (!sameLine(item, line)) return [item];
            return quantity <= 0
              ? []
              : [{ ...item, quantity: Math.min(10, quantity) }];
          }),
        );
      },
      openCart: () => setOverlay({ kind: "cart" }),
      openSearch: () => setOverlay({ kind: "search" }),
      openQuickView: (slug) => setOverlay({ kind: "quick", slug }),
      closeOverlay,
      wishlist,
      toggleWishlist: (slug) => {
        if (!getProduct(slug)) return;
        setWishlist((current) =>
          current.includes(slug)
            ? current.filter((item) => item !== slug)
            : [...current, slug],
        );
      },
      demoAccount,
      addFunds: (amountCents) => {
        if (!hydrated || !storageAvailable) {
          return { ok: false, error: "Local storage is required for demo funds." };
        }
        const result = addDemoFunds(
          accountRef.current,
          amountCents,
          `TOP-${createDemoId()}`,
          new Date().toISOString(),
        );
        if (!result.ok) return result;
        return saveDemoAccount(result.value)
          ? result
          : { ok: false, error: "Could not save demo funds on this device." };
      },
      placeOrder: () => {
        if (!hydrated || !storageAvailable) {
          return { ok: false, error: "Local storage is required for demo orders." };
        }
        if (purchaseLockRef.current) {
          return { ok: false, error: "This demo order is already being recorded." };
        }
        purchaseLockRef.current = true;
        const lines: DemoOrderLine[] = cart.flatMap((line) => {
          const product = getProduct(line.productSlug);
          const colour = product?.colours.find((item) => item.id === line.colourId);
          if (!product || !colour || !validLine(line)) return [];
          return [{
            productSlug: product.slug,
            productName: product.name,
            colourName: colour.name,
            size: line.size,
            quantity: line.quantity,
            unitPriceCents: product.priceCents,
            imageSrc: colour.gallery[0].src,
          }];
        });
        if (lines.length !== cart.length) {
          purchaseLockRef.current = false;
          return { ok: false, error: "Your demo bag contains an unavailable item." };
        }
        const now = new Date();
        const id = `TVQ-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${createDemoId()}`;
        const result = placeDemoPurchase(accountRef.current, lines, id, now.toISOString());
        if (!result.ok) {
          purchaseLockRef.current = false;
          return result;
        }
        try {
          const oldAccount = window.localStorage.getItem(ACCOUNT_KEY);
          window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(result.value.account));
          try {
            window.localStorage.setItem(CART_KEY, "[]");
          } catch {
            if (oldAccount === null) window.localStorage.removeItem(ACCOUNT_KEY);
            else window.localStorage.setItem(ACCOUNT_KEY, oldAccount);
            throw new Error("Could not clear the demo bag");
          }
        } catch {
          purchaseLockRef.current = false;
          return { ok: false, error: "Could not save this demo order on this device." };
        }
        accountRef.current = result.value.account;
        setDemoAccount(result.value.account);
        setCart([]);
        return { ok: true, value: result.value.order };
      },
      advanceTracking: (orderId) => {
        if (!hydrated || !storageAvailable) {
          return { ok: false, error: "Local storage is required for demo tracking." };
        }
        if (!accountRef.current.orders.some((order) => order.id === orderId)) {
          return { ok: false, error: "Demo order not found on this device." };
        }
        const next = advanceDemoTracking(accountRef.current, orderId);
        return saveDemoAccount(next)
          ? { ok: true, value: next }
          : { ok: false, error: "Could not save the demo tracking update." };
      },
    }),
    [cart, wishlist, hydrated, storageAvailable, demoAccount, closeOverlay, saveDemoAccount],
  );

  const quickProduct: Product | undefined =
    overlay?.kind === "quick" ? getProduct(overlay.slug) : undefined;

  return (
    <StoreContext.Provider value={value}>
      <div id="site-content">{children}</div>
      {overlay && (
        <Dialog
          key={overlay.kind}
          title={
            overlay.kind === "cart"
              ? "Shopping bag"
              : overlay.kind === "search"
                ? "Search footwear"
                : `${quickProduct?.name ?? "Product"} quick view`
          }
          drawer={overlay.kind === "cart"}
          onClose={closeOverlay}
        >
          {overlay.kind === "cart" && <CartDrawer />}
          {overlay.kind === "search" && (
            <SearchPanel onNavigate={() => setOverlay(null)} />
          )}
          {overlay.kind === "quick" && quickProduct && (
            <QuickView key={quickProduct.slug} product={quickProduct} />
          )}
        </Dialog>
      )}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error("StoreProvider is missing from the page layout");
  return value;
}
