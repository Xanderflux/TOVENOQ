export type GalleryImage = { label: string; src: string };

export type Colourway = {
  id: string;
  name: string;
  swatch: string;
  gallery: GalleryImage[];
};

export type Product = {
  slug: string;
  name: string;
  number: string;
  descriptor: string;
  priceCents: number;
  description: string;
  categories: ("men" | "women" | "new")[];
  colours: Colourway[];
  details: {
    materials: string;
    fit: string;
    care: string;
    delivery: string;
  };
};

const axisGallery: GalleryImage[] = [
  { label: "Side profile", src: "/images/axis-01-side.webp" },
  { label: "Front view", src: "/images/axis-01-front.webp" },
  { label: "Rear view", src: "/images/axis-01-rear.webp" },
  { label: "Top view", src: "/images/axis-01-top.webp" },
  { label: "Material detail", src: "/images/axis-01-detail.webp" },
  { label: "In motion", src: "/images/axis-01-lifestyle.webp" },
];

export const products: Product[] = [
  {
    slug: "axis-01",
    name: "Axis 01",
    number: "01",
    descriptor: "Bone / Carbon",
    priceCents: 24500,
    description:
      "A light-footed daily runner engineered with restraint. Responsive underfoot, unhurried in profile.",
    categories: ["men", "women", "new"],
    colours: [
      {
        id: "bone-carbon",
        name: "Bone / Carbon",
        swatch: "#ded2c0",
        gallery: axisGallery,
      },
      {
        id: "espresso-clay",
        name: "Espresso / Clay",
        swatch: "#67432c",
        gallery: [
          { label: "Side profile", src: "/images/axis-01-espresso-clay-side.webp" },
          { label: "Front view", src: "/images/axis-01-espresso-clay-front.webp" },
          { label: "Rear view", src: "/images/axis-01-espresso-clay-rear.webp" },
          { label: "Top view", src: "/images/axis-01-espresso-clay-top.webp" },
          { label: "Material detail", src: "/images/axis-01-espresso-clay-detail.webp" },
          { label: "In motion", src: "/images/axis-01-espresso-clay-lifestyle.webp" },
        ],
      },
    ],
    details: {
      materials:
        "Supple leather, open technical mesh and brushed suede sit over a lightweight rubber sole.",
      fit: "Fits true to size with a softly structured heel. Between sizes? Choose the larger size.",
      care: "Brush away surface dust when dry. Use a neutral suede eraser on the suede panels. Do not machine wash.",
      delivery:
        "Demo orders and tracking are simulated on this device. No products are shipped or returned.",
    },
  },
  {
    slug: "frame-02",
    name: "Frame 02",
    number: "02",
    descriptor: "Stone / Ink",
    priceCents: 26500,
    description:
      "A pared-back runner balancing a soft upper with a grounded, architectural sole.",
    categories: ["men", "women", "new"],
    colours: [
      {
        id: "stone-ink",
        name: "Stone / Ink",
        swatch: "#a9a59a",
        gallery: [
          { label: "Side profile", src: "/images/frame-02-side.webp" },
          { label: "Front view", src: "/images/frame-02-front.webp" },
          { label: "Rear view", src: "/images/frame-02-rear-straight.webp" },
          { label: "Top view", src: "/images/frame-02-top.webp" },
          { label: "Material detail", src: "/images/frame-02-detail.webp" },
          { label: "In motion", src: "/images/frame-02-lifestyle.webp" },
          { label: "Rear angle", src: "/images/frame-02-rear.webp" },
        ],
      },
    ],
    details: {
      materials:
        "Suede, smooth leather and technical mesh with a sculpted rubber sole.",
      fit: "Fits true to size. Choose your usual EU size.",
      care: "Gently brush dry suede and wipe leather with a soft damp cloth. Air dry naturally.",
      delivery:
        "Demo orders and tracking are simulated on this device. No products are shipped or returned.",
    },
  },
  {
    slug: "field-03",
    name: "Field 03",
    number: "03",
    descriptor: "Umber / Chalk",
    priceCents: 23500,
    description:
      "An everyday silhouette with a textured upper and understated outdoor influence.",
    categories: ["men", "women"],
    colours: [
      {
        id: "umber-chalk",
        name: "Umber / Chalk",
        swatch: "#755a43",
        gallery: [
          { label: "Side profile", src: "/images/field-03-side.webp" },
          { label: "Front view", src: "/images/field-03-front.webp" },
          { label: "Rear view", src: "/images/field-03-rear-straight.webp" },
          { label: "Top view", src: "/images/field-03-top.webp" },
          { label: "Material detail", src: "/images/field-03-detail.webp" },
          { label: "In motion", src: "/images/field-03-lifestyle.webp" },
          { label: "Rear angle", src: "/images/field-03-rear.webp" },
        ],
      },
    ],
    details: {
      materials: "Brushed suede, leather and mesh with a dark gum rubber sole.",
      fit: "Fits true to size. Choose your usual EU size.",
      care: "Brush dry suede and spot clean with a soft cloth. Avoid machine washing and direct heat.",
      delivery:
        "Demo orders and tracking are simulated on this device. No products are shipped or returned.",
    },
  },
  {
    slug: "line-04",
    name: "Line 04",
    number: "04",
    descriptor: "Black / Clay",
    priceCents: 25500,
    description:
      "A dark, precise expression of the collection, cut for movement through the city.",
    categories: ["men", "women"],
    colours: [
      {
        id: "black-clay",
        name: "Black / Clay",
        swatch: "#242321",
        gallery: [
          { label: "Side profile", src: "/images/line-04-side.webp" },
          { label: "Front view", src: "/images/line-04-front.webp" },
          { label: "Rear view", src: "/images/line-04-rear-straight.webp" },
          { label: "Top view", src: "/images/line-04-top.webp" },
          { label: "Material detail", src: "/images/line-04-detail.webp" },
          { label: "In motion", src: "/images/line-04-lifestyle.webp" },
          { label: "Rear angle", src: "/images/line-04-rear.webp" },
        ],
      },
    ],
    details: {
      materials:
        "Matte leather, charcoal technical mesh and suede accents over a smoke rubber sole.",
      fit: "Fits true to size. Choose your usual EU size.",
      care: "Wipe leather with a soft damp cloth and brush dry suede. Air dry away from heat.",
      delivery:
        "Demo orders and tracking are simulated on this device. No products are shipped or returned.",
    },
  },
];

export const sizes = ["38", "39", "40", "41", "42", "43", "44", "45"] as const;

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return products;
  return products.filter((product) =>
    [product.name, product.descriptor, product.description,
      ...product.colours.map((colour) => colour.name)]
      .join(" ").toLowerCase().includes(normalized),
  );
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
