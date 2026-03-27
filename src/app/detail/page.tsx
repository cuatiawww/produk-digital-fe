"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DetailRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const envBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");\n    const apiRoot = envBase !== "" ? envBase : "http://localhost/produk-digital";
    const endpoint = `${apiRoot}/api-katalog-download`;

    const controller = new AbortController();
    const go = async () => {
      try {
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) throw new Error("bad");
        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : [];
        const firstId = data[0]?.id ? String(data[0].id) : "1";
        router.replace(`/detail/${firstId}`);
      } catch (_) {
        router.replace("/detail/1");
      }
    };

    go();
    return () => controller.abort();
  }, [router]);

  return null;
}

