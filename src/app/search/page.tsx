"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ImageIcon, Search } from "lucide-react";

type Product = {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  date: string;
  downloads: number;
  slug: string;
  cover: string;
};

const popularTopics = ["Ibu Hamil", "MP-ASI", "Diabetes", "Template Kerja", "UMKM"];

function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex h-[320px] w-full flex-col overflow-hidden rounded-[24px] border border-[#D4E5F8] bg-white transition-all duration-300 hover:-translate-y-1">
      <Link
        href={`/detail/${product.id}`}
        className="relative block flex-[7] w-full overflow-hidden bg-[#EEF3FB]"
      >
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center bg-[#F3F6FC]">
            <ImageIcon className="h-10 w-10 text-[#B2C5DE]" />
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
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2D85E3]">
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

        <div className="mt-auto text-[10px] font-medium text-[#7D9FC3]">
          {product.downloads.toLocaleString("id-ID")} unduhan
        </div>
      </div>
    </article>
  );
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qParam = (searchParams.get("q") ?? "").trim();

  const [query, setQuery] = useState(qParam);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  useEffect(() => {
    const envBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
    const apiRoot = envBase !== "" ? envBase : "http://localhost/produk-digital";
    const endpointBase = `${apiRoot}/api-katalog-download`;

    const controller = new AbortController();
    const fetchData = async () => {
      if (qParam === "") {
        setResults([]);
        setLoading(false);
        setError("");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const endpoint = `${endpointBase}?per_page=1000&page=1&q=${encodeURIComponent(qParam)}`;
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Gagal mengambil data.");
        }
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
        }));
        setResults(mapped);
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          setError("Tidak bisa memuat data. Coba lagi.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [qParam]);

  const headingText = useMemo(() => {
    if (qParam === "") return "Cari produk digital";
    return `Hasil pencarian: "${qParam}"`;
  }, [qParam]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed === "") {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="bg-site-surface-soft min-h-screen">
      <div className="container-custom py-10">
        <div className="rounded-[28px] border border-[#D4E5F8] bg-white p-6">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-semibold text-[#0F2E52] md:text-3xl">{headingText}</h1>
            <p className="mt-2 text-sm text-[#6C89AE]">
              Masukkan kata kunci supaya hasilnya lebih tepat dan konsisten.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7391B5]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full rounded-2xl border border-[#CFE1F6] bg-[#F5F9FF] py-4 pl-11 pr-4 text-sm text-[#0F2E52] placeholder:text-[#7391B5] focus:border-[#2D85E3] focus:outline-none focus:ring-4 focus:ring-[#2D85E3]/10"
                  placeholder="Cari e-book, template, worksheet, atau panduan..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2D85E3] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#2D85E3]"
              >
                Cari Produk
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-medium text-[#55759B]">Pencarian populer:</span>
            {popularTopics.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => router.push(`/search?q=${encodeURIComponent(tag)}`)}
                className="rounded-full border border-[#C8DCF4] bg-white px-4 py-2 text-[#355F90] transition hover:border-[#2D85E3] hover:text-[#2D85E3]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {qParam === "" && (
            <div className="rounded-2xl border border-[#DDE9F8] bg-white px-6 py-10 text-center text-sm text-[#6C89AE]">
              Ketik kata kunci di atas untuk mulai mencari produk.
            </div>
          )}

          {qParam !== "" && loading && (
            <div className="rounded-2xl border border-[#DDE9F8] bg-white px-6 py-10 text-center text-sm text-[#6C89AE]">
              Memuat hasil pencarian...
            </div>
          )}

          {qParam !== "" && !loading && error && (
            <div className="rounded-2xl border border-[#F6D4D4] bg-[#FFF5F5] px-6 py-10 text-center text-sm text-[#B65858]">
              {error}
            </div>
          )}

          {qParam !== "" && !loading && !error && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-[#7893B6]">{results.length} hasil ditemukan</p>
                <Link href="/" className="text-sm font-semibold text-[#2D85E3] hover:text-[#2D85E3]">
                  Kembali ke Beranda
                </Link>
              </div>

              {results.length === 0 ? (
                <div className="rounded-2xl border border-[#DDE9F8] bg-white px-6 py-10 text-center text-sm text-[#6C89AE]">
                  Tidak ada produk yang cocok dengan kata kunci tersebut.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
