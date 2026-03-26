import { ArrowRight, BadgeCheck, Download, Search } from "lucide-react";

type HeroSectionProps = {
  popularTopics: string[];
  stats: {
    label: string;
    value: string;
  }[];
};

export default function HeroSection({ popularTopics, stats }: HeroSectionProps) {
  return (
    <section className="bg-site-surface relative overflow-hidden border-b border-[#D1E4F8]">
      <div className="absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#C8DEF7]/60 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#A9CCF3]/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#E9F3FF]/70 blur-3xl" />
      </div>

      <div className="container-custom relative py-10 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold leading-[1.08] text-[#0F2E52] md:text-5xl xl:text-6xl">
                Produk digital Media Cipta untuk bantu kerja lebih rapi, cepat, dan siap pakai.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#4F6F97] md:text-lg">
                Jelajahi koleksi e-book, template, worksheet, dan materi pilihan dari Media
                Cipta yang dibuat untuk kebutuhan kesehatan, teknologi, dan bisnis dalam satu
                etalase yang nyaman dilihat.
              </p>
            </div>

            <div className="relative mt-8 max-w-2xl rounded-[28px] border border-white/80 bg-white/85 p-3">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7391B5]" />
                  <input
                    className="w-full rounded-2xl border border-[#CFE1F6] bg-[#F5F9FF] py-4 pl-11 pr-4 text-sm text-[#0F2E52] placeholder:text-[#7391B5] focus:border-[#2D85E3] focus:outline-none focus:ring-4 focus:ring-[#2D85E3]/10"
                    placeholder="Cari e-book, template, worksheet, atau panduan..."
                  />
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2D85E3] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#2D85E3]">
                  Eksplor Produk
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-medium text-[#55759B]">Pencarian populer:</span>
              {popularTopics.map((tag) => (
                <button
                  key={tag}
                  className="rounded-full border border-[#C8DCF4] bg-white/80 px-4 py-2 text-[#355F90] transition hover:border-[#2D85E3] hover:text-[#2D85E3]"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[22px] border border-white/80 bg-white/75 p-4"
                >
                  <p className="text-2xl font-semibold text-[#0F2E52]">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#6C89AE]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[36px] border border-white/80 bg-white/70 p-4">
              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[30px] bg-[linear-gradient(180deg,#0F2E52_0%,#2D85E3_100%)] p-6 text-white">
                  <h2 className="text-2xl font-semibold leading-tight">
                    Koleksi produk digital Media Cipta yang enak dilihat dan mudah dipilih.
                  </h2>
                  <div className="mt-8 grid gap-3">
                    {[
                      "Cover produk tampil lebih rapi dan konsisten",
                      "Kategori lebih gampang dicari sesuai kebutuhan",
                      "Cocok untuk e-book, template, worksheet, dan panduan",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/90"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[28px] border border-[#D0E3F7] bg-[#F5F9FF] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#6C89AE]">
                          Trending sekarang
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[#15395E]">
                          Produk yang paling banyak diminati
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#E3F0FF] p-3 text-[#2D85E3]">
                        <Download className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-5 space-y-3">
                      {popularTopics.slice(0, 3).map((topic, index) => (
                        <div
                          key={topic}
                          className="flex items-center justify-between rounded-2xl border border-[#DEEAF9] bg-white px-4 py-3 text-sm"
                        >
                          <span className="font-medium text-[#2E5078]">
                            {String(index + 1).padStart(2, "0")} {topic}
                          </span>
                          <span className="rounded-full bg-[#EDF4FF] px-3 py-1 text-xs text-[#6C89AE]">
                            populer
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-[#D0E3F7] bg-white p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#6C89AE]">
                      Kenapa pilih di sini
                    </p>
                    <div className="mt-4 space-y-3">
                      {[
                        "Tampilan produk lebih konsisten untuk semua format cover",
                        "Kesan etalase lebih profesional untuk memperkuat kepercayaan",
                        "Pencarian dan tombol aksi dibuat lebih jelas supaya mudah dipilih",
                      ].map((point) => (
                        <div key={point} className="flex items-start gap-3 text-sm text-[#355F90]">
                          <span className="mt-0.5 rounded-full bg-[#E3F0FF] p-1 text-[#2D85E3]">
                            <BadgeCheck className="h-3.5 w-3.5" />
                          </span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
