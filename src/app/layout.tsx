import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Produk Digital - Pusat Download",
  description: "Frontend statis untuk produk digital bergaya Ayosehat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${roboto.variable} bg-site-surface-soft antialiased`}>
        <Header />
        {children}
        <footer className="bg-site-surface-soft border-t border-[#D4E5F8]">
          <div className="container-custom py-5 text-center">
            <p className="text-sm font-medium text-[#4D6F96]">
              © Media Cipta Informasi. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
