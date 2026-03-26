export type CategoryItem = {
  name: string;
  count: number;
};

export type ProductCard = {
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  cta: string;
  downloads: number;
  dateLabel: string;
};

export type PriceBucket = {
  label: string;
  min: number;
  max: number;
};

export const categories: CategoryItem[] = [
  { name: "Semua Kategori", count: 35 },
  { name: "Kamera", count: 1 },
  { name: "Teknologi", count: 0 },
  { name: "Bisnis", count: 1 },
  { name: "Kesehatan", count: 31 },
];

export const priceRanges = [
  "Di bawah Rp 100.000",
  "Rp 100.000 - Rp 500.000",
  "Rp 500.000 - Rp 1.000.000",
  "Rp 1.000.000 - Rp 2.000.000",
  "Rp 2.000.000 - Rp 5.000.000",
  "Di atas Rp 5.000.000",
];

export const ratings = ["4* & above", "3* & above", "2* & above", "1* & above"];

export const priceBuckets: PriceBucket[] = [
  { label: "Di bawah Rp 100.000", min: 0, max: 100000 },
  { label: "Rp 100.000 - Rp 500.000", min: 100000, max: 500000 },
  { label: "Rp 500.000 - Rp 1.000.000", min: 500000, max: 1000000 },
  { label: "Rp 1.000.000 - Rp 2.000.000", min: 1000000, max: 2000000 },
  { label: "Rp 2.000.000 - Rp 5.000.000", min: 2000000, max: 5000000 },
  { label: "Di atas Rp 5.000.000", min: 5000000, max: Infinity },
];

export const cards: ProductCard[] = [
  {
    title: "10T Ibu Hamil",
    category: "Kesehatan",
    price: 150000,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1200&auto=format&fit=crop",
    cta: "Login untuk Download",
    downloads: 485,
    dateLabel: "23 Januari 2026",
  },
  {
    title: "Rahasia MP-ASI Kaya Protein",
    category: "Kesehatan",
    price: 350000,
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
    cta: "Login untuk Download",
    downloads: 312,
    dateLabel: "14 Februari 2026",
  },
  {
    title: "Panduan Gizi Seimbang",
    category: "Kesehatan",
    price: 2500000,
    rating: 3.5,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    cta: "Login untuk Download",
    downloads: 120,
    dateLabel: "02 Maret 2026",
  },
];
