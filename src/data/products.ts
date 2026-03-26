export type CoverOrientation = "portrait" | "landscape";

export type Product = {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  date: string;
  downloads: number;
  slug: string;
  cover: string;
  orientation: CoverOrientation;
};

import rawProducts from "./products.json";

export const products: Product[] = rawProducts as Product[];
