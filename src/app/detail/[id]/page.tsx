"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Facebook,
  FileText,
  ImageIcon,
  Link2,
  Share2,
  Twitter,
} from "lucide-react";

type ProductDetail = {
  id: number;
  title: string;
  category: string;
  jenis: string;
  date: string;
  downloads: number;
  views: number;
  slug: string;
  cover: string;
  description: string;
  images?: string[];
  pdfUrl?: string;
  sourceUrl?: string;
  canvaUrl?: string;
};

const mockProduct: ProductDetail = {
  id: 1,
  title: "Produk Digital",
  category: "Kesehatan",
  jenis: "Ibu & Anak",
  date: new Date().toISOString(),
  downloads: 0,
  views: 0,
  slug: "1",
  cover: "/app_asset/images/image.png",
  description:
    "Deskripsi singkat produk digital akan tampil di sini setelah data dari API berhasil dimuat.",
  pdfUrl: null,
  sourceUrl: null,
  canvaUrl: null,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav className="border-b border-gray-100 bg-white py-3">
      <div className="container-custom flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#2D85E3]">
          Beranda
        </Link>
        <span>/</span>
        <span className="line-clamp-1 text-gray-800">{title}</span>
      </div>
    </nav>
  );
}

function ShareButtons({ title }: { title: string }) {
  const handleShare = (platform: string) => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
      return;
    }

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
      return;
    }

    if (platform === "copy") {
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    }
  };

  return (
    <div className="flex gap-2">
      {[
        { key: "facebook", icon: <Facebook size={14} />, label: "Share ke Facebook" },
        { key: "twitter", icon: <Twitter size={14} />, label: "Share ke Twitter" },
        { key: "copy", icon: <Link2 size={14} />, label: "Salin Link" },
        { key: "share", icon: <Share2 size={14} />, label: "Bagikan" },
      ].map((button) => (
        <button
          key={button.key}
          onClick={() => handleShare(button.key)}
          aria-label={button.label}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2D85E3] text-white shadow-sm transition hover:bg-[#2D85E3]"
        >
          {button.icon}
        </button>
      ))}
    </div>
  );
}

function RelatedProductCard({
  id,
  title,
  category,
  cover,
}: {
  id: number;
  title: string;
  category: string;
  cover: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/detail/${id}`}
      className="group flex gap-3 rounded-2xl border border-[#D8E8FA] bg-transparent p-3 transition hover:border-[#2D85E3]/40"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-[#EEF3FB]">
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center bg-[#F3F6FC]">
            <ImageIcon className="h-6 w-6 text-[#B2C5DE]" />
          </div>
        ) : (
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="112px"
            unoptimized
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2D85E3]">
          {category}
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-[#1A365A]">
          {title}
        </p>
      </div>
    </Link>
  );
}

export default function DetailPage() {
  const params = useParams();
  const idParam = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const id = idParam ? String(idParam) : "1";
  const [imgError, setImgError] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(0);
  const relatedCarouselRef = useRef<HTMLDivElement | null>(null);

  const [product, setProduct] = useState<ProductDetail>(mockProduct);
  const [relatedProducts, setRelatedProducts] = useState<
    { id: number; title: string; category: string; cover: string }[]
  >([]);
  const apiRoot = useMemo(() => {
    const envBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
    return envBase !== "" ? envBase : "http://localhost/produk-digital";
  }, []);

  useEffect(() => {
    const base = `${apiRoot}/api-katalog-download`;

    const controller = new AbortController();

    const fetchDetail = async () => {
      try {
        const detailRes = await fetch(`${base}/view?id=${encodeURIComponent(id)}`, {
          signal: controller.signal,
        });
        if (detailRes.ok) {
          const detailJson = await detailRes.json();
          const item = detailJson?.data ?? null;
          if (item) {
            setProduct({
              id: Number(item.id),
              title: String(item.judul ?? ""),
              category: String(item.kategori ?? ""),
              jenis: String(item.jenis ?? ""),
              date: String(item.created_at ?? new Date().toISOString()),
              downloads: Number(item.total_download ?? 0),
              views: Number(item.total_view ?? 0),
              slug: String(item.id ?? ""),
              cover: String(item.cover_url ?? ""),
              description: String(item.deskripsi_singkat ?? ""),
              images: Array.isArray(item.images) ? item.images : [],
              pdfUrl: item.pdf_url ?? null,
              sourceUrl: item.source_url ?? null,
              canvaUrl: item.canva_link ?? null,
            });
          }
        }

        const listRes = await fetch(base, { signal: controller.signal });
        if (!listRes.ok) return;
        const listJson = await listRes.json();
        const data = Array.isArray(listJson?.data) ? listJson.data : [];
        const related = data
          .filter((row: any) => String(row.id) !== String(id))
          .slice(0, 8)
          .map((row: any) => ({
            id: Number(row.id),
            title: String(row.judul ?? ""),
            category: String(row.kategori ?? ""),
            cover: String(row.cover_url ?? ""),
          }));
        setRelatedProducts(related);
      } catch (_) {
        // ignore fetch errors
      }
    };

    fetchDetail();
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const base = `${apiRoot}/api-katalog-download`;
    fetch(`${base}/hit-view?id=${encodeURIComponent(id)}`, { method: "POST" }).catch(() => {});
  }, [id]);

  const productGallery = useMemo(() => {
    const base = product.images && product.images.length > 0 ? product.images : [product.cover];
    return base.filter(Boolean);
  }, [product.cover, product.images]);

  const renderedDescription = useMemo(() => {
    if (!product.description) return "";
    if (typeof window === "undefined") return product.description;
    const textarea = document.createElement("textarea");
    textarea.innerHTML = product.description;
    return textarea.value;
  }, [product.description]);

  useEffect(() => {
    setSelectedPreview(0);
  }, [product.id, productGallery.length]);

  useEffect(() => {
    if (productGallery.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setSelectedPreview((prev) => (prev + 1) % productGallery.length);
      setImgError(false);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [productGallery.length]);

  const scrollRelatedProducts = (direction: "left" | "right") => {
    const carousel = relatedCarouselRef.current;
    if (!carousel) return;

    const scrollAmount = carousel.clientWidth;
    carousel.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-xl font-bold text-gray-800">Produk Tidak Ditemukan</h1>
          <Link href="/" className="text-[#2D85E3] hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb title={product.title} />

      <section className="bg-site-surface-soft py-8 lg:py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="mb-4">
                <span className="inline-flex rounded-full bg-[#2D85E3] px-3 py-1 text-xs font-semibold text-white">
                  {product.category}
                </span>
              </div>

              <h1 className="mb-4 text-2xl font-bold text-[#2D85E3] md:text-3xl">
                {product.title}
              </h1>

              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(product.date)}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {product.views.toLocaleString("id-ID")} kali dilihat
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {product.downloads.toLocaleString("id-ID")} kali diunduh
                  </span>
                </div>
                <ShareButtons title={product.title} />
              </div>

              <div className="mb-8">
                <div className="grid items-start gap-4 md:grid-cols-[96px_minmax(0,1fr)]">
                  <div className="order-2 grid gap-3 md:order-1 md:h-[420px] md:grid-rows-4">
                    {productGallery.map((imageSrc, index) => (
                      <button
                        key={`${imageSrc}-${index}`}
                        type="button"
                        onClick={() => {
                          setSelectedPreview(index);
                          setImgError(false);
                        }}
                        className={`relative h-full w-24 overflow-hidden rounded-2xl border-2 transition ${
                          selectedPreview === index
                            ? "border-[#2D85E3]"
                            : "border-[#CFE1F6] hover:border-[#A3C1E5]"
                        }`}
                      >
                        <Image
                          src={imageSrc}
                          alt={`${product.title} preview ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="96px"
                          unoptimized
                        />
                      </button>
                    ))}
                  </div>

                  <div className="order-1 relative h-[420px] w-full overflow-hidden bg-transparent md:order-2">
                    {imgError ? (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <ImageIcon className="h-20 w-20 text-gray-300" />
                      </div>
                    ) : (
                      <Image
                        src={productGallery[selectedPreview] ?? product.cover}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 760px"
                        unoptimized
                        onError={() => setImgError(true)}
                        priority
                      />
                    )}
                  </div>
                </div>
              </div>

              {renderedDescription && (
                <div
                  className="mb-8 text-base leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: renderedDescription }}
                />
              )}

              <div className="border-t border-gray-200 pt-8">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#2D85E3]">Produk Terkait</h3>
                    <p className="mt-1 text-xs text-[#7893B6]">4 item per slide</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => scrollRelatedProducts("left")}
                      aria-label="Produk terkait sebelumnya"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#CFE1F6] bg-white text-[#355F90] transition hover:border-[#2D85E3] hover:text-[#2D85E3]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollRelatedProducts("right")}
                      aria-label="Produk terkait berikutnya"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#CFE1F6] bg-white text-[#355F90] transition hover:border-[#2D85E3] hover:text-[#2D85E3]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div
                  ref={relatedCarouselRef}
                  className="overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <div className="grid grid-flow-col auto-cols-[100%] gap-4">
                    {[relatedProducts.slice(0, 4), relatedProducts.slice(4, 8)].map((group, groupIndex) => (
                      <div key={groupIndex} className="space-y-3">
                        {group.map((item, itemIndex) => (
                          <RelatedProductCard
                            key={`${groupIndex}-${item.id}-${itemIndex}`}
                            id={item.id}
                            title={item.title}
                            category={item.category}
                            cover={item.cover}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-5 self-start lg:sticky lg:top-6">
              <div className="rounded-2xl border border-[#D8E8FA] bg-white p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#173A60]">Unduh Konten</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Pilih file di bawah untuk mulai mengunduh.
                </p>

                <div className="mt-5 space-y-3">
                  {product.pdfUrl && (
                    <a
                      href={`${apiRoot}/download/file?id=${encodeURIComponent(id)}`}
                      onClick={() => {
                        const base = apiRoot ? `${apiRoot}/api-katalog-download` : "/produk-digital/api-katalog-download";
                        fetch(`${base}/hit-download?id=${encodeURIComponent(id)}`, { method: "POST" }).catch(() => {});
                      }}
                      className="flex w-full items-center justify-between rounded-xl bg-[#EAF3FF] px-4 py-3 text-sm font-semibold text-[#2D85E3] transition hover:bg-[#2D85E3] hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        PDF
                      </span>
                      <span className="flex items-center gap-1 text-xs opacity-75">
                        <Download className="h-3 w-3" />
                        Unduh
                      </span>
                    </a>
                  )}
                  {product.sourceUrl && (
                    <a
                      href={product.sourceUrl}
                      onClick={() => {
                        const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
                        const base = apiBase ? `${apiBase}/api-katalog-download` : "/produk-digital/api-katalog-download";
                        fetch(`${base}/hit-download?id=${encodeURIComponent(id)}`, { method: "POST" }).catch(() => {});
                      }}
                      className="flex w-full items-center justify-between rounded-xl bg-[#EAF3FF] px-4 py-3 text-sm font-semibold text-[#2D85E3] transition hover:bg-[#2D85E3] hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Source (ZIP/RAR)
                      </span>
                      <span className="flex items-center gap-1 text-xs opacity-75">
                        <Download className="h-3 w-3" />
                        Unduh
                      </span>
                    </a>
                  )}
                  {product.canvaUrl && (
                    <a
                      href={product.canvaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-between rounded-xl bg-[#EAF3FF] px-4 py-3 text-sm font-semibold text-[#2D85E3] transition hover:bg-[#2D85E3] hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <Link2 className="h-4 w-4" />
                        Link Canva
                      </span>
                      <span className="text-xs opacity-75">Buka</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-[#D8E8FA] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-bold text-[#173A60]">Info Produk</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Kategori", value: product.category },
                    { label: "Jenis", value: product.jenis },
                    { label: "Publikasi", value: formatDate(product.date) },
                    { label: "Diunduh", value: `${product.downloads.toLocaleString("id-ID")} kali` },
                    { label: "Dilihat", value: `${product.views.toLocaleString("id-ID")} kali` },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4">
                      <span className="text-gray-400">{row.label}</span>
                      <span className="text-right font-semibold text-gray-700">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-500 transition hover:border-[#2D85E3] hover:text-[#2D85E3]"
              >
                ← Kembali ke Beranda
              </Link>
            </aside>
          </div>
        </div>
      </section>

    </div>
  );
}
