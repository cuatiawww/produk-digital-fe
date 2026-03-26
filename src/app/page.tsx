import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Produk Digital Media Cipta",
  description:
    "Temukan produk digital Media Cipta untuk kebutuhan kesehatan, teknologi, dan bisnis.",
};

const popularTopics = ["Ibu Hamil", "MP-ASI", "Diabetes", "Template Kerja", "UMKM"];

export default function Home() {
  const stats = [
    { label: "Produk", value: `${products.length}+` },
    {
      label: "Kategori",
      value: `${new Set(products.map((product) => product.category)).size}`,
    },
    {
      label: "Unduhan",
      value: `${Math.round(
        products.reduce((total, product) => total + product.downloads, 0) / 1000
      )}K+`,
    },
    { label: "Update", value: "Mingguan" },
  ];

  return (
    <>
      <HeroSection popularTopics={popularTopics} stats={stats} />

      <section className="border-b border-[#D4E5F8] bg-white">
        <div className="container-custom py-6 lg:py-7">
          <div className="grid gap-5 xl:grid-cols-[1.45fr_0.65fr]">
            <article className="bg-site-surface-soft overflow-hidden rounded-[28px] border border-[#D4E5F8]">
              <div className="grid h-full md:grid-cols-[1.1fr_0.9fr]">
                <div className="flex items-center p-6 md:p-7 lg:p-8">
                  <div className="max-w-xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2D85E3]">
                      Sorotan Minggu Ini
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#15395E] lg:text-[2rem]">
                      Koleksi pilihan yang paling sering dicari pengunjung Media Cipta.
                    </h2>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-[#58759A]">
                      Tempat yang pas untuk menaruh highlight produk unggulan, promo tematik,
                      atau koleksi yang ingin langsung ditonjolkan dari awal landing page.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href="/download"
                        className="inline-flex items-center gap-2 rounded-full bg-[#2D85E3] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2D85E3]"
                      >
                        Lihat Koleksi Pilihan
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[210px]">
                  <Image
                    src={products[1]?.cover ?? products[0].cover}
                    alt="Koleksi pilihan Media Cipta"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[28px] border border-[#D4E5F8] bg-[#0B2A49]">
              <Image
                src={products[3]?.cover ?? products[0].cover}
                alt="Produk unggulan lainnya"
                fill
                className="object-cover opacity-55"
                sizes="(max-width: 1280px) 100vw, 24vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,46,82,0.1)_0%,rgba(15,46,82,0.82)_100%)]" />
              <div className="relative flex min-h-[210px] flex-col justify-end p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Rekomendasi Cepat
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">
                  Jelajahi cover dan panduan yang sedang banyak dilihat.
                </h3>
                <Link
                  href="/download"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#94C3F4]"
                >
                  Masuk ke etalase
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
      <ProductsSection products={products} />
    </>
  );
}
