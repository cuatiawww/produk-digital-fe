"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { products } from "@/data/products";

type DownloadFile = {
  id: string;
  title: string;
  format: string;
  size: string;
  url: string;
};

type ProductDetail = {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  date: string;
  downloads: number;
  views: number;
  slug: string;
  cover: string;
  description: string;
  downloadFiles: DownloadFile[];
};

const baseProduct = products[0];

const mockProduct: ProductDetail = {
  id: baseProduct.id,
  title: baseProduct.title,
  category: baseProduct.category,
  subcategory: baseProduct.subcategory,
  date: baseProduct.date,
  downloads: baseProduct.downloads,
  views: 18500,
  slug: baseProduct.slug,
  cover: baseProduct.cover,
  description:
    "Panduan komprehensif mengenai 10 hal penting yang wajib diketahui oleh setiap ibu hamil. Mulai dari nutrisi, aktivitas fisik, pemeriksaan rutin, hingga persiapan persalinan yang aman dan nyaman.",
  downloadFiles: [
    { id: "f1", title: "Panduan 10T Ibu Hamil (PDF)", format: "PDF", size: "3.2 MB", url: "#" },
    { id: "f2", title: "Infografis 10T Ibu Hamil (PNG)", format: "PNG", size: "1.8 MB", url: "#" },
  ],
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
        <Link href="/download" className="hover:text-[#2D85E3]">
          Produk Digital
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

function DownloadFileRow({
  file,
  isLoggedIn,
  onNeedLogin,
}: {
  file: DownloadFile;
  isLoggedIn: boolean;
  onNeedLogin: () => void;
}) {
  const colorMap: Record<string, string> = {
    PDF: "bg-red-500",
    PNG: "bg-blue-500",
    JPG: "bg-orange-500",
    ZIP: "bg-purple-500",
  };
  const iconColor = colorMap[file.format.toUpperCase()] ?? "bg-[#2D85E3]";

  return (
    <div className="flex items-center justify-between rounded-xl border border-[#CFE1F6] bg-white p-5 transition-all hover:border-[#2D85E3] hover:shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${iconColor}`}>
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{file.title}</p>
          <p className="mt-0.5 text-xs text-gray-500">
            {file.format} · {file.size}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          if (!isLoggedIn) {
            onNeedLogin();
            return;
          }
          alert(`Mengunduh: ${file.title}`);
        }}
        className="flex items-center gap-2 rounded-lg bg-[#2D85E3] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#2D85E3]"
      >
        <Download className="h-4 w-4" />
        Unduh
      </button>
    </div>
  );
}

function LoginModal({
  open,
  onClose,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mb-4 text-4xl">Login</div>
        <h2 className="mb-2 text-lg font-bold text-[#173A60]">Login untuk Mengunduh</h2>
        <p className="mb-6 text-sm leading-relaxed text-[#5F7FA4]">
          Masuk ke akun kamu untuk mendapatkan akses ke file digital ini.
        </p>
        <button
          onClick={onLogin}
          className="mb-3 w-full rounded-xl bg-[#2D85E3] py-3 text-sm font-semibold text-white transition hover:bg-[#2D85E3]"
        >
          Masuk ke Akun
        </button>
        <button
          onClick={onLogin}
          className="mb-4 w-full rounded-xl border-2 border-[#2D85E3] py-3 text-sm font-semibold text-[#2D85E3] transition hover:bg-[#EAF3FF]"
        >
          Daftar Gratis
        </button>
        <button onClick={onClose} className="text-xs text-[#7D9FC3] hover:text-[#5F7FA4]">
          Tutup
        </button>
      </div>
    </div>
  );
}

function RelatedProductCard({
  title,
  category,
  cover,
}: {
  title: string;
  category: string;
  cover: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href="/detail"
      className="group flex gap-3 rounded-2xl border border-[#D8E8FA] bg-white p-3 transition hover:border-[#2D85E3]/40 hover:shadow-sm"
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

export default function DetailPage({ slug }: { slug?: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(0);
  const relatedCarouselRef = useRef<HTMLDivElement | null>(null);

  const product = mockProduct;

  const relatedProducts = useMemo(
    () => {
      const sameCategory = products.filter(
        (item) => item.id !== product.id && item.category === product.category
      );
      const otherProducts = products.filter(
        (item) => item.id !== product.id && item.category !== product.category
      );
      const combined = [...sameCategory, ...otherProducts];

      if (combined.length === 0) return [];

      return Array.from({ length: 8 }, (_, index) => combined[index % combined.length]);
    },
    [product.id, product.category]
  );

  const productGallery = useMemo(
    () => [product.cover, ...relatedProducts.slice(0, 3).map((item) => item.cover)],
    [product.cover, relatedProducts]
  );

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
          <Link href="/download" className="text-[#2D85E3] hover:underline">
            Kembali ke Produk Digital
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setShowLoginModal(false);
        }}
      />

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
                  <div className="order-2 flex gap-3 md:order-1 md:flex-col">
                    {productGallery.map((imageSrc, index) => (
                      <button
                        key={`${imageSrc}-${index}`}
                        type="button"
                        onClick={() => {
                          setSelectedPreview(index);
                          setImgError(false);
                        }}
                        className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                          selectedPreview === index
                            ? "border-[#2D85E3]"
                            : "border-[#CFE1F6] hover:border-[#A3C1E5]"
                        }`}
                      >
                        <Image
                          src={imageSrc}
                          alt={`${product.title} preview ${index + 1}`}
                          fill
                          className="object-contain p-1.5"
                          sizes="96px"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="order-1 relative aspect-[16/9] w-full overflow-hidden bg-transparent md:order-2">
                    {imgError ? (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <ImageIcon className="h-20 w-20 text-gray-300" />
                      </div>
                    ) : (
                      <Image
                        src={productGallery[selectedPreview] ?? product.cover}
                        alt={product.title}
                        fill
                        className="object-contain transition-transform duration-700 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 760px"
                        onError={() => setImgError(true)}
                        priority
                      />
                    )}
                  </div>
                </div>
              </div>

              {product.description && (
                <p className="mb-8 text-base leading-relaxed text-gray-600">{product.description}</p>
              )}

              {product.downloadFiles.length > 0 && (
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="mb-5 text-lg font-bold text-[#2D85E3]">Unduh Media</h3>
                  <div className="space-y-4">
                    {product.downloadFiles.map((file) => (
                      <DownloadFileRow
                        key={file.id}
                        file={file}
                        isLoggedIn={isLoggedIn}
                        onNeedLogin={() => setShowLoginModal(true)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-5 self-start lg:sticky lg:top-6">
              <div className="rounded-2xl border border-[#D8E8FA] bg-white p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#173A60]">Unduh Konten</h2>
                <p className="mt-2 text-sm text-gray-500">
                  {isLoggedIn
                    ? "Pilih file di bawah untuk mulai mengunduh."
                    : "Login terlebih dahulu untuk mengunduh file ini."}
                </p>

                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#2D85E3] py-3 text-sm font-semibold text-[#2D85E3] transition hover:bg-[#2D85E3] hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                      Login untuk Download
                    </button>
                    <button
                      onClick={() => setIsLoggedIn(true)}
                      className="mt-3 w-full rounded-xl bg-[#2D85E3] py-3 text-sm font-semibold text-white transition hover:bg-[#2D85E3]"
                    >
                      Daftar Gratis
                    </button>
                  </>
                ) : (
                  <div className="mt-5 space-y-3">
                    {product.downloadFiles.map((file) => (
                      <button
                        key={file.id}
                        onClick={() => alert(`Mengunduh: ${file.title}`)}
                        className="flex w-full items-center justify-between rounded-xl bg-[#EAF3FF] px-4 py-3 text-sm font-semibold text-[#2D85E3] transition hover:bg-[#2D85E3] hover:text-white"
                      >
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {file.format}
                        </span>
                        <span className="flex items-center gap-1 text-xs opacity-75">
                          <Download className="h-3 w-3" />
                          {file.size}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-[#D8E8FA] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-bold text-[#173A60]">Info Produk</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Kategori", value: product.category },
                    { label: "Subkategori", value: product.subcategory },
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

              <div className="rounded-2xl border border-[#D8E8FA] bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#173A60]">Produk Terkait</h3>
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

              <Link
                href="/download"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-500 transition hover:border-[#2D85E3] hover:text-[#2D85E3]"
              >
                ← Kembali ke Produk Digital
              </Link>
            </aside>
          </div>
        </div>
      </section>

    </div>
  );
}
