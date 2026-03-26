"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// ── Menu items — iconPath disamain dari proyek lama ──────────────────────────
const menuItems = [
  { label: "Beranda",  href: "/",         iconPath: "/ICON/info.svg" },
  { label: "Produk",   href: "/produk",   iconPath: "/ICON/paper.svg" },
  { label: "Download", href: "/download", iconPath: "/ICON/paper.svg" },
  { label: "E-Book",   href: "/ebook",    iconPath: "/ICON/paper.svg" },
  { label: "Kategori", href: "/kategori", iconPath: "/ICON/Kampanye.svg" },
  { label: "Tentang",  href: "/tentang",  iconPath: "/ICON/Kemitraan.svg" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";

  return (
    <nav
      className={`border-b border-gray-300 bg-white transition-all duration-300 ${
        isSticky ? "fixed left-0 right-0 top-0 z-50 shadow-md" : ""
      }`}
      aria-label="Navigasi utama"
    >
      <div className="container-custom">
        <div className="relative py-3 lg:py-4">

          {/* ── Desktop (lg+) — kotak icon+label style proyek lama ── */}
          <div className="hidden items-center gap-3 lg:flex xl:gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="block w-[150px] shrink-0 transition-opacity hover:opacity-80 xl:w-[180px]"
              aria-label={isHomePage ? "Beranda" : "Kembali ke beranda"}
            >
              <Image
                src="/logo.webp"
                alt="Logo"
                title="Logo"
                width={180}
                height={60}
                priority
                className="h-auto w-full"
              />
            </Link>

            {/* Nav items — kotak persegi dengan icon + label */}
            <div className="flex flex-1 items-center justify-center gap-2 xl:gap-3 2xl:gap-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex h-[90px] w-[90px] flex-col items-center justify-center gap-2 rounded-xl transition-all duration-300 xl:h-[100px] xl:w-[100px] ${
                      isActive
                        ? "bg-[#2D85E3] shadow-md"
                        : "bg-transparent hover:bg-[#EAF3FF] hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`relative h-8 w-8 transition-all duration-300 ${
                        isActive ? "brightness-0 invert" : "group-hover:scale-110"
                      }`}
                    >
                      <Image
                        src={item.iconPath}
                        alt={`Ikon ${item.label}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span
                      className={`line-clamp-2 px-1 text-center text-[9px] font-bold leading-tight transition-colors duration-300 xl:text-[10px] 2xl:text-[11px] ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-[#2D85E3]"
                      }`}
                    >
                      {item.label.toUpperCase()}
                    </span>
                  </Link>
                );
              })}

            </div>

            {/* CTA */}
            <div className="shrink-0">
              <Link
                href="/login"
                className="rounded-full bg-[#2D85E3] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(45,133,227,0.28)] transition hover:bg-[#2D85E3]"
              >
                Masuk / Daftar
              </Link>
            </div>
          </div>

          {/* ── Tablet (md–lg) ── */}
          <div className="hidden items-center justify-between gap-4 md:flex lg:hidden">
            <Link
              href="/"
              className="block w-[130px] transition-opacity hover:opacity-80"
              aria-label={isHomePage ? "Beranda" : "Kembali ke beranda"}
            >
              <Image src="/logo.webp" alt="Logo" width={130} height={43} priority className="h-auto w-full" />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login" className="rounded-full bg-[#2D85E3] px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-[#2D85E3]">
                Masuk / Daftar
              </Link>
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="shrink-0 rounded-lg p-2 text-[#2D85E3] transition hover:bg-gray-100"
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* ── Mobile (< md) ── */}
          <div className="flex items-center justify-between md:hidden">
            <Link href="/" className="block w-[100px] transition-opacity hover:opacity-80" aria-label={isHomePage ? "Beranda" : "Kembali ke beranda"}>
              <Image src="/logo.webp" alt="Logo" width={100} height={33} priority className="h-auto w-full" />
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-full bg-[#2D85E3] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#2D85E3]">
                Masuk / Daftar
              </Link>
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="rounded-lg p-2 text-[#2D85E3] transition hover:bg-gray-100"
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile dropdown — kotak icon+label, persis proyek lama ── */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white pb-5 pt-4 lg:hidden">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex h-[110px] w-[110px] flex-col items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-[#2D85E3] shadow-md"
                        : "bg-transparent hover:bg-[#EAF3FF]"
                    }`}
                  >
                    <div className={`relative h-[42px] w-[42px] scale-75 ${isActive ? "brightness-0 invert" : ""}`}>
                      <Image src={item.iconPath} alt={`Ikon ${item.label}`} fill className="object-contain" />
                    </div>
                    <span className={`text-center text-[11px] font-semibold leading-tight transition-colors duration-300 ${isActive ? "text-white" : "text-[#2D85E3]"}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
