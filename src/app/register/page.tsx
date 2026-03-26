const yiiBase =
  process.env.NEXT_PUBLIC_YII_BASE_URL ?? "http://localhost/produk-digital";

export default function RegisterPage() {
  const registerImage =
    "https://images.unsplash.com/photo-1551076805-e1869033e561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

  const selectClass =
    "w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm text-gray-700 focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2218%22%20height=%2218%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%231f3b3a%22%20stroke-width=%222.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpolyline%20points=%226%209%2012%2015%2018%209%22/%3E%3C/svg%3E')] bg-no-repeat bg-[length:18px_18px] bg-[position:right_0.85rem_center]";

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative border-b border-white/20 bg-[linear-gradient(135deg,#0F2E52_0%,#2D85E3_45%,#1F76D1_100%)] bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D85E3]/95 via-[#2D85E3]/90 to-[#1F76D1]/85" />
        <div className="container-custom relative py-12 lg:py-16">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl font-semibold md:text-4xl">Daftar Akun Baru</h1>
            <p className="mt-3 text-sm text-white/85 leading-relaxed">
              Buat akun untuk mengunduh konten dan menyimpan favorit kamu.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-site-surface-soft relative section-padding-lg">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
            <div className="max-w-xl lg:max-w-none">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
                <h2 className="text-lg font-semibold text-[#173A60]">
                  Registrasi Akun
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Buat akun baru untuk mengunduh konten dan menyimpan favorit.
                </p>

                <form className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        placeholder="Nama lengkap"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="Username"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tanggal Lahir
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <select className={selectClass}>
                        <option>Tanggal</option>
                      </select>
                      <select className={selectClass}>
                        <option>Bulan</option>
                      </select>
                      <select className={selectClass}>
                        <option>Tahun</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Jenis Kelamin
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm">
                        <input type="radio" name="gender" />
                        Perempuan
                      </label>
                      <label className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm">
                        <input type="radio" name="gender" />
                        Laki-laki
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white"
                  >
                    Lanjutkan
                  </button>
                </form>

                <p className="mt-5 text-center text-xs text-gray-500">
                  Sudah punya akun?{" "}
                  <a
                    href={`${yiiBase}/site/login`}
                    className="font-semibold text-[var(--brand)]"
                  >
                    Masuk di sini
                  </a>
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={registerImage}
                  alt="Registrasi Produk Digital"
                  className="h-[520px] w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
