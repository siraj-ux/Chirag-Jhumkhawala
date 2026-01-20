// src/pages/ThankYou.tsx
import { useEffect, useState ,useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare } from "lucide-react";

/** 🔗 Your published sheet (same one you shared) */
const PUB_HTML =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBEUzUQQ_karr8w7rEIXcrHK9Gei6cz8medP-8vct1T48Lzx1l3Jg0kJGTLL6myJyR9EaevuPKlp1s/pubhtml#gid=393232430";

/** Prefer CSV endpoint for easy parsing */
const CSV_URLS = [
  PUB_HTML.replace("pubhtml", "pub?output=csv"),
  PUB_HTML.replace("pubhtml", "pub?gid=0&single=true&output=csv"),
];

/** Fallback WA link (used only if sheet fetch fails or cell empty) */
const FALLBACK_WA_LINK = "https://join.blackelephant.in/be-whatsapp";

/** Mini CSV parser (handles quoted fields) */
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let i = 0,
    f = "",
    row: string[] = [],
    q = false;
  while (i < text.length) {
    const c = text[i];
    if (q) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          f += '"';
          i += 2;
          continue;
        }
        q = false;
        i++;
        continue;
      }
      f += c;
      i++;
      continue;
    }
    if (c === '"') {
      q = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(f);
      f = "";
      i++;
      continue;
    }
    if (c === "\n") {
      row.push(f);
      rows.push(row);
      row = [];
      f = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    f += c;
    i++;
  }
  row.push(f);
  rows.push(row);
  return rows.filter((r) => r.length && !(r.length === 1 && r[0] === ""));
}

export default function ThankYouGa() {

  
  const [waLink, setWaLink] = useState<string>(FALLBACK_WA_LINK);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const url of CSV_URLS) {
        try {
          const res = await fetch(url, { mode: "cors", cache: "no-store" });
          if (!res.ok) continue;
          const csv = await res.text();
          const rows = parseCSV(csv);
          if (rows.length < 2) continue;

          const headers = rows[0].map((h) => h.trim().toLowerCase());
          const waIdx = headers.findIndex((h) => h.includes("whatsapp"));
          const firstDataRow =
            rows.slice(1).find((r) => r.some((v) => v.trim() !== "")) ||
            rows[1];

          const linkRaw =
            waIdx >= 0 ? (firstDataRow[waIdx] || "").trim() : "";

          if (!cancelled) {
            if (linkRaw) setWaLink(linkRaw);
            setLoading(false);
          }
          return; // success
        } catch {
          /* try next csv url */
        }
      }
      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="min-h-[100svh] bg-gradient-to-b from-[#0F1A29] via-[#132640] to-[#0F1A29] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        >
          {/* Soft accent glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#FFD43B]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#FACC15]/20 blur-3xl" />

          <div className="relative p-6 sm:p-10 text-center">
            {/* Success icon */}
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#22c55e]/10">
              <CheckCircle2 className="h-8 w-8 text-[#22c55e]" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Thank you for registering!
            </h1>

            <p className="mt-3 text-sm sm:text-base text-white/80">
              <span className="font-semibold text-[#FFD43B]">
                Wait, your registration is incomplete…
              </span>{" "}
              Join the WhatsApp group below to receive updates, reminders, and
              access details.
            </p>

            {/* CTA */}
            <div className="mt-8 flex items-center justify-center">
              <a
                href={waLink}
                target="_self"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#25D366] to-[#1ebe57] px-6 py-3 font-extrabold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
              >
                <MessageSquare className="h-5 w-5" />
                {loading ? "Loading group…" : "Join WhatsApp Group"}
              </a>
            </div>

            {/* Small note */}
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
