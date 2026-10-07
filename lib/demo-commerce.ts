export const MAX_TOP_UP_CENTS = 10_000_000; // $100,000 per demo action.
export const MAX_BALANCE_CENTS = 100_000_000; // Keep local demo data bounded.

export const trackingSteps = [
  "Order recorded",
  "Preparing",
  "In transit",
  "Delivered",
] as const;

export type DemoOrderLine = {
  productSlug: string;
  productName: string;
  colourName: string;
  size: string;
  quantity: number;
  unitPriceCents: number;
  imageSrc: string;
};

export type DemoOrder = {
  id: string;
  createdAt: string;
  lines: DemoOrderLine[];
  totalCents: number;
  trackingStep: number;
};

export type DemoFunding = {
  id: string;
  createdAt: string;
  amountCents: number;
};

export type DemoAccount = {
  balanceCents: number;
  funding: DemoFunding[];
  orders: DemoOrder[];
};

export type DemoResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export function emptyDemoAccount(): DemoAccount {
  return { balanceCents: 0, funding: [], orders: [] };
}

export function formatDemoMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function parseDemoAmount(input: string): number | null {
  const value = input.trim().replaceAll(",", "");
  if (!/^\d{1,6}(?:\.\d{1,2})?$/.test(value)) return null;
  const [dollars, cents = ""] = value.split(".");
  const amount = Number(dollars) * 100 + Number(cents.padEnd(2, "0"));
  return amount > 0 && amount <= MAX_TOP_UP_CENTS ? amount : null;
}

export function addDemoFunds(
  account: DemoAccount,
  amountCents: number,
  id: string,
  createdAt: string,
): DemoResult<DemoAccount> {
  if (!Number.isSafeInteger(amountCents) || amountCents <= 0 || amountCents > MAX_TOP_UP_CENTS) {
    return { ok: false, error: "Enter a demo amount from $0.01 to $100,000." };
  }
  if (account.balanceCents + amountCents > MAX_BALANCE_CENTS) {
    return { ok: false, error: "The demo balance is limited to $1,000,000." };
  }
  return {
    ok: true,
    value: {
      ...account,
      balanceCents: account.balanceCents + amountCents,
      funding: [{ id, createdAt, amountCents }, ...account.funding],
    },
  };
}

export function placeDemoPurchase(
  account: DemoAccount,
  lines: DemoOrderLine[],
  id: string,
  createdAt: string,
): DemoResult<{ account: DemoAccount; order: DemoOrder }> {
  if (
    lines.length === 0 ||
    lines.length > 100 ||
    lines.some(
      (line) =>
        !Number.isSafeInteger(line.unitPriceCents) ||
        line.unitPriceCents <= 0 ||
        !Number.isSafeInteger(line.quantity) ||
        line.quantity < 1 ||
        line.quantity > 10,
    )
  ) {
    return { ok: false, error: "Your demo bag contains no valid items." };
  }
  const totalCents = lines.reduce(
    (total, line) => total + line.unitPriceCents * line.quantity,
    0,
  );
  if (!Number.isSafeInteger(totalCents) || totalCents > MAX_BALANCE_CENTS) {
    return { ok: false, error: "This demo bag exceeds the supported total." };
  }
  if (account.balanceCents < totalCents) {
    return { ok: false, error: "Not enough demo funds. Add funds to continue." };
  }
  const order: DemoOrder = {
    id,
    createdAt,
    lines: lines.map((line) => ({ ...line })),
    totalCents,
    trackingStep: 0,
  };
  return {
    ok: true,
    value: {
      order,
      account: {
        ...account,
        balanceCents: account.balanceCents - totalCents,
        orders: [order, ...account.orders],
      },
    },
  };
}

export function advanceDemoTracking(
  account: DemoAccount,
  orderId: string,
): DemoAccount {
  return {
    ...account,
    orders: account.orders.map((order) =>
      order.id === orderId
        ? { ...order, trackingStep: Math.min(trackingSteps.length - 1, order.trackingStep + 1) }
        : order,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function validOrderLine(value: unknown): value is DemoOrderLine {
  if (!isRecord(value)) return false;
  return (
    typeof value.productSlug === "string" &&
    typeof value.productName === "string" &&
    typeof value.colourName === "string" &&
    typeof value.size === "string" &&
    typeof value.imageSrc === "string" &&
    value.imageSrc.startsWith("/images/") &&
    Number.isSafeInteger(value.quantity) &&
    (value.quantity as number) >= 1 &&
    (value.quantity as number) <= 10 &&
    Number.isSafeInteger(value.unitPriceCents) &&
    (value.unitPriceCents as number) > 0 &&
    (value.unitPriceCents as number) <= MAX_BALANCE_CENTS
  );
}

function validOrder(value: unknown): value is DemoOrder {
  if (!isRecord(value) || !Array.isArray(value.lines)) return false;
  if (value.lines.length === 0 || value.lines.length > 100 || !value.lines.every(validOrderLine)) return false;
  const calculated = (value.lines as DemoOrderLine[]).reduce(
    (total, line) => total + line.unitPriceCents * line.quantity,
    0,
  );
  return (
    typeof value.id === "string" &&
    value.id.startsWith("TVQ-") &&
    validDate(value.createdAt) &&
    Number.isInteger(value.trackingStep) &&
    (value.trackingStep as number) >= 0 &&
    (value.trackingStep as number) < trackingSteps.length &&
    value.totalCents === calculated &&
    calculated <= MAX_BALANCE_CENTS
  );
}

function validFunding(value: unknown): value is DemoFunding {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    value.id.startsWith("TOP-") &&
    validDate(value.createdAt) &&
    Number.isSafeInteger(value.amountCents) &&
    (value.amountCents as number) > 0 &&
    (value.amountCents as number) <= MAX_TOP_UP_CENTS
  );
}

export function readDemoAccount(value: unknown): DemoAccount {
  if (!isRecord(value) || !Array.isArray(value.funding) || !Array.isArray(value.orders)) {
    return emptyDemoAccount();
  }
  if (value.funding.length > 5000 || value.orders.length > 5000) return emptyDemoAccount();
  const funding = value.funding.filter(validFunding);
  const orders = value.orders.filter(validOrder);
  const credited = funding.reduce((sum, item) => sum + item.amountCents, 0);
  const spent = orders.reduce((sum, item) => sum + item.totalCents, 0);
  const balanceCents = credited - spent;
  if (!Number.isSafeInteger(balanceCents) || balanceCents < 0 || balanceCents > MAX_BALANCE_CENTS) {
    return emptyDemoAccount();
  }
  return { balanceCents, funding, orders };
}
