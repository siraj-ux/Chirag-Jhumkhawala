import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StickyEnrollBarProps {
  onCTAClick: () => void;
}

// ✅ Helpers to format today's date like "13th Dec 2025"
function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatToday(): string {
  const d = new Date(); // local time
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }); // Dec
  const year = d.getFullYear();
  return `${ordinal(day)} ${month} ${year}`;
}

export const StickyEnrollBar = ({ onCTAClick }: StickyEnrollBarProps) => {
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [today, setToday] = useState<string>(() => formatToday());


      const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };


  // ✅ Keep date correct if user keeps tab open across midnight
  useEffect(() => {
    const id = setInterval(() => {
      setToday(formatToday());
    }, 60 * 1000); // check every minute
    return () => clearInterval(id);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <motion.aside
      role="region"
      aria-label="Enrollment bar"
      initial={{ y: 64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="
        fixed inset-x-0 bottom-0 z-50
        bg-[#0F1A29]/95 backdrop-blur
        border-t border-[#FFD43B]/20
        px-3 sm:px-6
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          py-2.5 sm:py-3
          flex flex-row items-center justify-between
          text-white
        "
      >
        {/* Left: Timer + Date */}
        <div className="flex items-start gap-2 sm:gap-3 flex-col sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFD43B] opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD43B]" />
            </span>

            <p className="font-bold text-xs sm:text-sm leading-tight">
              Offer ends in{" "}
              <span className="tabular-nums text-[#FFD43B]">
                {mm}:{ss}
              </span>
            </p>
          </div>

          <p className="text-[11px] sm:text-xs text-white leading-tight font-semibold">
            Enrollment closes on{" "}
            <span className="font-semibold text-white">{today}</span>
          </p>
        </div>

        {/* Right: Blinking CTA Button */}
        <motion.button
          type="button"
          onClick={() => {
            // if you want to use the prop callback, uncomment next line
            // onCTAClick?.();
            scrollToRegister();
          }}
          animate={{
            opacity: [1, 0.5, 1],
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 0 rgba(0,0,0,0)",
              "0 0 20px rgba(255, 212, 59, 0.8)",
              "0 0 0 rgba(0,0,0,0)",
            ],
          }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="
            inline-flex items-center justify-center
            h-9 sm:h-10 px-4 sm:px-5
            rounded-md
            bg-gradient-to-r from-[#FFD43B] to-[#FACC15]
            text-black font-extrabold tracking-wide
            hover:shadow-lg
            hover:from-[#FFE873] hover:to-[#FACC15]
            active:scale-[0.98]
            transition-all duration-200
            text-[12px] sm:text-sm
            whitespace-nowrap
          "
        >
          Join Now for ₹99
        </motion.button>
      </div>
    </motion.aside>
  );
};
