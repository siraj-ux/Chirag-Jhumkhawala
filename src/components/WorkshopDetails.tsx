import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, Languages } from "lucide-react";

interface WorkshopDetailsProps {
  onCTAClick: () => void;
}

// Published sheet (HTML)
const PUB_HTML =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBEUzUQQ_karr8w7rEIXcrHK9Gei6cz8medP-8vct1T48Lzx1l3Jg0kJGTLL6myJyR9EaevuPKlp1s/pubhtml#gid=393232430";

// Use the actual gid from your link
const SHEET_GID = "393232430";

// CSV endpoints to try (prefer explicit gid first)
const CSV_URLS = [
  PUB_HTML.replace("pubhtml", `pub?gid=${SHEET_GID}&single=true&output=csv`),
  PUB_HTML.replace("pubhtml", "pub?output=csv"), // first sheet fallback
  PUB_HTML.replace("pubhtml", "pub?gid=0&single=true&output=csv"), // legacy fallback
];

// Remove emojis/invisible chars
function cleanText(text: string): string {
  return text
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2600-\u26FF]|\u200D|\uFE0F|\u2069|\u2066|\u2068|\u2067)/g,
      ""
    )
    .replace(/\s{2,}/g, " ")
    .trim();
}

// Tiny CSV parser (with quoted fields)
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let i = 0,
    field = "",
    row: string[] = [],
    inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    field += c;
    i++;
  }
  row.push(field);
  rows.push(row);
  return rows.filter((r) => r.length && !(r.length === 1 && r[0] === ""));
}

// Find column indices for date/time with tolerant header matching
function findColumnIndices(headers: string[]) {
  const H = headers.map((h) => h.trim().toLowerCase());
  const dateIdx =
    H.findIndex((h) =>
      /(date|dates|day|schedule)/i.test(h)
    );
  const timeIdx =
    H.findIndex((h) =>
      /(time|timing|hours)/i.test(h)
    );
  return { dateIdx, timeIdx };
}

export const WorkshopDetails = ({ onCTAClick }: WorkshopDetailsProps) => {
  const [dateText, setDateText] = useState("—");
  const [timeText, setTimeText] = useState("—");
  const [loading, setLoading] = useState(true);

    const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      for (const url of CSV_URLS) {
        try {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) continue;

          const csv = await res.text();
          const rows = parseCSV(csv);
          if (rows.length < 2) continue;

          const headers = rows[0];
          const { dateIdx, timeIdx } = findColumnIndices(headers);

          // if headers not found, try next URL
          if (dateIdx < 0 && timeIdx < 0) continue;

          // First meaningful data row under headers
          const dataRow =
            rows.slice(1).find((r) =>
              r.some((v) => v && v.trim() !== "")
            ) || rows[1];

          const newDate =
            dateIdx >= 0 ? cleanText(dataRow[dateIdx] || "") : "";
          const newTime =
            timeIdx >= 0 ? cleanText(dataRow[timeIdx] || "") : "";

          if (!cancelled) {
            if (newDate) setDateText(newDate);
            if (newTime) setTimeText(newTime);
            setLoading(false);
          }
          return; // success
        } catch {
          // try next URL
        }
      }
      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const details = [
    { icon: Calendar, label: "Date", value: loading ? "Loading…" : dateText },
    { icon: Clock, label: "Time", value: loading ? "Loading…" : timeText },
    { icon: Video, label: "Live", value: "2 Hours • 2 Days" },
    { icon: Languages, label: "Language", value: "English" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#1b2e4a] py-12 sm:py-14 md:py-16 px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
          Workshop Details
        </h2>
        <div className="mt-3 flex justify-center">
          <div className="h-1 w-20 bg-[#FFD43B] rounded-full" />
        </div>
      </motion.div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-10">
        {details.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#0F1A29] text-white rounded-xl py-6 px-4 shadow-md hover:shadow-lg flex flex-col items-center text-center transition-all duration-200 hover:scale-[1.03]"
          >
            <div className="mb-3 w-12 h-12 bg-[#FFD43B]/20 rounded-full flex items-center justify-center">
              <detail.icon className="w-6 h-6 text-[#FFD43B]" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-white">
              {detail.label}
            </h3>
            <p className="text-sm sm:text-base font-medium text-gray-300">
              {detail.value || "—"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3 mb-12"
      >
        <button
          type="button"
          onClick={() => {
            // if ((window as any).fbq) {
            //   (window as any).fbq("track", "AddToCart", { value: 99, currency: "INR" });
            // }
            scrollToRegister();
          }}
          className="inline-flex items-center justify-center h-12 px-8 sm:px-10 bg-gradient-to-r from-[#FFD43B] to-[#FACC15] text-black font-bold tracking-wide rounded-md shadow-sm hover:shadow-md hover:from-[#FFE873] hover:to-[#FACC15] active:scale-[0.98] transition-all duration-200"
        >
          JOIN NOW JUST FOR ₹99!
        </button>

        <p className="text-white text-base sm:text-lg">
          Get FREE Bonuses <span className="text-[#FFD43B] font-bold">Worth ₹15,000</span>
        </p>
      </motion.div>

      {/* Urgency Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 sm:mt-12 bg-[#0F1A29] rounded-xl p-5 sm:p-6 max-w-md mx-auto text-center text-white shadow-lg border border-[#FFD43B]/40"
      >
        <motion.p
          className="text-xl sm:text-2xl font-bold mb-1 text-[#FFD43B]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Almost Full!
        </motion.p>
        <p className="text-sm sm:text-base font-medium text-gray-300">
          Enrollment closes soon
        </p>
      </motion.div>
    </section>
  );
};
