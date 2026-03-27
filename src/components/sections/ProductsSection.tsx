"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Download,
  ImageIcon,
  LayoutGrid,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import type { Product } from "@/data/products";

type ProductsSectionProps = {
  products: Product[];
};

type CategoryItem = { name: string; count: number; icon?: ReactNode };

function Sidebar({
  selected,
  onToggle,
  onClear,
  categoryList,
  totalCount,
}: {
  selected: string[];
  onToggle: (name: string) => void;
  onClear: () => void;
  categoryList: { name: string; icon: ReactNode; count: number }[];
  totalCount: number;
}) {
  return (
    <aside className="self-start lg:sticky lg:top-6">
      <div className="rounded-[28px] border border-[#D4E5F8] bg-white p-6">
        <div className="mb-5">
          <p className="text-lg font-semibold text-[#173A60]">Pencarian Produk Digital</p>
          <p className="mt-1 text-sm text-[#7893B6]">{totalCount} produk tersedia</p>
        </div>

        <div className="mb-2 h-px bg-[#E7F1FF]" />

        <div className="py-3 text-sm font-semibold text-[#173A60]">Kategori</div>

        <div className="space-y-1 pb-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-[#F3F8FF]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#97B9DE] accent-[#2D85E3]"
              checked={selected.length === 0}
              onChange={onClear}
            />
            <LayoutGrid size={16} className="text-[#7D9FC3]" />
            <span className="flex-1 text-sm text-[#3F628C]">Semua Kategori</span>
            <span className="text-xs text-[#7D9FC3]">({totalCount})</span>
          </label>

          <div className="my-2 h-px bg-[#E7F1FF]" />

          {categoryList.map((cat) => (
            <label
              key={cat.name}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 transition ${
                selected.includes(cat.name) ? "bg-[#ECF4FF]" : "hover:bg-[#F3F8FF]"
              }`}
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[#97B9DE] accent-[#2D85E3]"
                checked={selected.includes(cat.name)}
                onChange={() => onToggle(cat.name)}
              />
              <span className={selected.includes(cat.name) ? "text-[#2D85E3]" : "text-[#7D9FC3]"}>
                {cat.icon}
              </span>
              <span className="flex-1 text-sm text-[#3F628C]">{cat.name}</span>
              <span
                className={`text-xs font-medium ${
                  selected.includes(cat.name) ? "text-[#2D85E3]" : "text-[#7D9FC3]"
                }`}
              >
                ({cat.count})
              </span>
            </label>
          ))}
        </div>

        <div className="mt-2 h-px bg-[#E7F1FF]" />
        <button
          onClick={onClear}
          className={`mt-4 w-full rounded-2xl border py-3 text-sm font-semibold transition ${
            selected.length > 0
              ? "border-[#e5c8c8] bg-[#fff7f7] text-[#b65858] hover:bg-[#fff0f0]"
              : "border-[#D4E5F8] bg-[#F5F9FF] text-[#7594B8] hover:border-[#C4D8F2]"
          }`}
        >
          Reset Kategori
        </button>
      </div>
    </aside>
  );
}

function ProductCard({
  product,
  onDownload,
}: {
  product: Product;
  onDownload: (p: Product) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const cardTone = {
    text: "text-[#2D85E3]",
    border: "border-[#CCDEF5]",
    button: "hover:bg-[#2D85E3]",
  };

  return (
    <article className="group flex h-[360px] w-full max-w-[280px] flex-col overflow-hidden rounded-[26px] border border-[#D4E5F8] bg-white transition-all duration-300 hover:-translate-y-1">
      <Link
        href={`/detail/${product.id}`}
        className="relative block flex-[7] w-full overflow-hidden bg-[#EEF3FB]"
      >
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center bg-[#F3F6FC]">
            <ImageIcon className="h-12 w-12 text-[#B2C5DE]" />
          </div>
        ) : (
            <Image
              src={product.cover}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, 280px"
              unoptimized
              onError={() => setImgError(true)}
            />
        )}
      </Link>

      <div className="flex flex-[3] flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${cardTone.text}`}>
            {product.category}
          </p>
          <span className="text-[9px] font-medium text-[#7D9FC3]">{product.subcategory}</span>
        </div>

        <Link
          href={`/detail/${product.id}`}
          className="line-clamp-2 min-h-[40px] text-sm font-semibold leading-snug text-[#1A365A] transition-colors hover:text-[#2D85E3]"
        >
          {product.title}
        </Link>

        <div className="mt-auto flex items-center gap-3 pt-1">
          <button
            onClick={() => onDownload(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2D85E3] px-3 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#1F6FCC]"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
          <span className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-[#7D9FC3]">
            <Download className="h-3 w-3" />
            {product.downloads.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </article>
  );
}

function GalleryCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/detail/${product.id}`}
      className="group block overflow-hidden rounded-[24px] border border-[#D4E5F8] bg-white transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#EEF3FB]">
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center bg-[#F3F6FC]">
            <ImageIcon className="h-10 w-10 text-[#B2C5DE]" />
          </div>
        ) : (
          <Image
            src={product.cover}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            unoptimized
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2D85E3]">
            {product.category}
          </p>
          <span className="text-[9px] font-medium text-[#7D9FC3]">{product.subcategory}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-[#1A365A]">
          {product.title}
        </p>
      </div>
    </Link>
  );
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const [itemsAll, setItemsAll] = useState<Product[]>(products);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sort, setSort] = useState("terbaru");
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const categoryRowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const envBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
    const apiRoot = envBase !== "" ? envBase : "http://localhost/produk-digital";
    const endpoint = `${apiRoot}/api-katalog-download?per_page=1000&page=1`;

    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : [];
        const mapped: Product[] = data.map((item: any) => ({
          id: Number(item.id),
          title: String(item.judul ?? ""),
          category: String(item.kategori ?? ""),
          subcategory: String(item.jenis ?? ""),
          date: String(item.created_at ?? ""),
          downloads: Number(item.total_download ?? 0),
          slug: String(item.id ?? ""),
          cover: String(item.cover_url ?? ""),
          orientation: "portrait",
        }));
        if (mapped.length > 0) setItemsAll(mapped);
      } catch (_) {
        // ignore fetch errors, fallback to initial products
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const envBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
    const apiRoot = envBase !== "" ? envBase : "http://localhost/produk-digital";
    const endpoint = `${apiRoot}/api-kategori-produk`;

    const controller = new AbortController();
    const fetchCategories = async () => {
      try {
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : [];
        const mapped: CategoryItem[] = data.map((item: any) => ({
          name: String(item.name ?? ""),
          count: Number(item.count ?? 0),
        }));
        setCategories(mapped);
      } catch (_) {
        // ignore
      }
    };

    fetchCategories();
    return () => controller.abort();
  }, []);

  const fallbackCategoryList = useMemo(() => {
    const map = new Map<string, number>();
    itemsAll.forEach((p) => {
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [itemsAll]);

  const categoryList = (categories.length > 0 ? categories : fallbackCategoryList).map((cat, idx) => ({
    ...cat,
    icon:
      cat.name === "Kesehatan" ? <Users size={16} /> :
      cat.name === "Teknologi" ? <Cpu size={16} /> :
      cat.name === "Bisnis" ? <Briefcase size={16} /> :
      <LayoutGrid size={16} />,
  }));

  const toggleCategory = (name: string) =>
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );

  const clearCategories = () => setSelectedCategories([]);

  const handleDownload = (product: Product) => {
    alert(`Mengunduh: ${product.title}`);
  };

  const filtered = useMemo(() => {
    let result = [...itemsAll];
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (sort === "terbaru") result.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "terlama") result.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "unduhan") result.sort((a, b) => b.downloads - a.downloads);
    return result;
  }, [itemsAll, selectedCategories, sort]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || filtered.length <= 1) return;

    const intervalId = window.setInterval(() => {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      const nextScrollLeft = carousel.scrollLeft + Math.max(carousel.clientWidth * 0.72, 220);

      carousel.scrollTo({
        left: nextScrollLeft >= maxScrollLeft - 4 ? 0 : nextScrollLeft,
        behavior: "smooth",
      });
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [filtered]);

  const scrollCarousel = (direction: "left" | "right") => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = Math.max(carousel.clientWidth * 0.72, 220);
    carousel.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollGallery = (direction: "left" | "right") => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const scrollAmount = Math.max(gallery.clientWidth * 0.8, 240);
    gallery.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollCategoryRow = (category: string, direction: "left" | "right") => {
    const row = categoryRowRefs.current[category];
    if (!row) return;

    const scrollAmount = Math.max(row.clientWidth * 0.75, 220);
    row.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const categoryShowcase = useMemo(
    () =>
      categoryList.map((category) => {
        const items = itemsAll.filter((product) => product.category === category.name);

        if (items.length === 0) {
          return { ...category, items: [] };
        }

        const filledItems =
          items.length >= 6 ? items : Array.from({ length: 6 }, (_, index) => items[index % items.length]);

        return {
          ...category,
          items: filledItems,
        };
      }),
    [categoryList, itemsAll]
  );

  return (
    <section className="bg-site-surface-soft min-h-screen">
      <div className="container-custom py-7">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          <Sidebar
            selected={selectedCategories}
            onToggle={toggleCategory}
            onClear={clearCategories}
            categoryList={categoryList}
            totalCount={itemsAll.length}
          />

          <div className="min-w-0">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center">
                <p className="text-sm text-gray-500">Tidak ada hasil. Coba ubah filter.</p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-[#1A365A]">Produk Digital</p>
                    <p className="text-sm text-[#7893B6]">
                      Geser ke kiri dan kanan untuk melihat produk lainnya
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-[#7893B6]">{filtered.length} hasil</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => scrollCarousel("left")}
                        aria-label="Geser ke kiri"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CFE1F6] bg-white text-[#355F90] transition hover:border-[#2D85E3] hover:text-[#2D85E3]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollCarousel("right")}
                        aria-label="Geser ke kanan"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CFE1F6] bg-white text-[#355F90] transition hover:border-[#2D85E3] hover:text-[#2D85E3]"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  ref={carouselRef}
                  className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <div className="grid grid-flow-col auto-cols-[minmax(240px,260px)] gap-4">
                    {filtered.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onDownload={handleDownload}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#D4E5F8] bg-white">
        <div className="container-custom py-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-[#1A365A]">Galeri Produk</p>
              <p className="mt-1 text-sm text-[#7893B6]">
                Section terpisah untuk lihat-lihat cover tanpa ikut filter kategori di atas
              </p>
            </div>
            <p className="text-sm text-[#7893B6]">{itemsAll.length} item</p>
          </div>

          <div
            ref={galleryRef}
            className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="grid grid-flow-col auto-cols-[minmax(170px,220px)] gap-4 md:auto-cols-[minmax(200px,240px)]">
              {itemsAll.map((product) => (
                <GalleryCard key={`gallery-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-site-surface-soft border-t border-[#D4E5F8]">
        <div className="container-custom py-10">
          <div className="mb-6 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2D85E3]">
              Koleksi Per Kategori
            </p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#15395E]">
              Lanjut jelajahi produk berdasarkan kategori yang paling relevan.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#58759A]">
              Tiap kategori punya row sendiri supaya pengunjung bisa fokus lihat produk yang sejenis
              tanpa kehilangan ritme scroll halaman.
            </p>
          </div>

          <div className="space-y-8">
            {categoryShowcase.map((category) => (
              <section key={category.name}>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex rounded-2xl bg-[#E3F0FF] p-3 text-[#2D85E3]">
                      {category.icon}
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-[#15395E]">{category.name}</h4>
                      <p className="text-sm text-[#7893B6]">{category.items.length} produk tersedia</p>
                    </div>
                  </div>

                  <Link
                    href="/download"
                    className="text-sm font-semibold text-[#2D85E3] transition hover:text-[#2D85E3]"
                  >
                    Lihat Selengkapnya
                  </Link>
                </div>

                <div
                  ref={(node) => {
                    categoryRowRefs.current[category.name] = node;
                  }}
                  className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <div className="grid grid-flow-col auto-cols-[minmax(220px,260px)] gap-4 md:auto-cols-[minmax(240px,280px)]">
                    {category.items.map((product, index) => (
                      <ProductCard
                        key={`${category.name}-${product.id}-${index}`}
                        product={product}
                        onDownload={handleDownload}
                      />
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
