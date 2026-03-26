export default function LoginPage() {
  const loginImage =
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative border-b border-white/20 bg-[linear-gradient(135deg,#0F2E52_0%,#2D85E3_45%,#1F76D1_100%)] bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D85E3]/95 via-[#2D85E3]/90 to-[#1F76D1]/85" />
        <div className="container-custom relative py-12 lg:py-16">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl font-semibold md:text-4xl">
              Masuk ke Produk Digital
            </h1>
            <p className="mt-3 text-sm text-white/85 leading-relaxed">
              Gunakan akun kamu untuk mengunduh konten dan mengakses fitur
              lengkap.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-site-surface-soft relative section-padding-lg">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
            <div className="max-w-xl lg:max-w-none">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
                <h2 className="text-lg font-semibold text-[#173A60]">Login</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Masuk untuk mengunduh konten dan menyimpan favorit.
                </p>

                <form className="mt-6 space-y-4">
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

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-gray-600">
                      <input type="checkbox" className="h-4 w-4" />
                      Ingat Saya
                    </label>
                    <a
                      href="#"
                      className="text-xs font-semibold text-[var(--brand)]"
                    >
                      Lupa password?
                    </a>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-xl bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
                  >
                    Masuk
                  </button>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-3 text-xs text-gray-400">
                        atau
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-xl border border-[var(--brand)] px-4 py-2 text-sm font-semibold text-[var(--brand)]"
                  >
                    Masuk dengan Google
                  </button>
                </form>

                <p className="mt-5 text-center text-xs text-gray-500">
                  Belum punya akun?{" "}
                  <a href="/register" className="font-semibold text-[var(--brand)]">
                    Daftar di sini
                  </a>
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={loginImage}
                  alt="Portal Produk Digital"
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
