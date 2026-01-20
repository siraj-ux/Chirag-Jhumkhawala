import { motion } from "framer-motion";
import { AlertTriangle, XCircle } from "lucide-react";

interface WorkshopBenefitsProps {
  onCTAClick: () => void;
}

export const WorkshopBenefits = ({ onCTAClick }: WorkshopBenefitsProps) => {

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };

  return (
    <section className="bg-[#0F1A29] py-10 sm:py-12 md:py-16 px-4">
      <div className="mx-auto w-full max-w-6xl">
        {/* Red banner */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-5 sm:mb-6 max-w-5xl"
        >
          <div className="rounded-md bg-[#E74C3C] text-white font-extrabold text-base sm:text-lg md:text-xl px-4 sm:px-6 py-2 sm:py-3">
            Warning: Read This Before You Join the Masterclass
          </div>
        </motion.div>

        {/* White content card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl rounded-xl bg-white ring-1 ring-black/5 shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8">
            {/* Left: large warning icon */}
            <div className="md:col-span-2 flex items-start justify-center md:justify-start">
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-yellow-300/30 rounded-full -z-10" />
                <AlertTriangle className="w-40 h-40 sm:w-48 sm:h-48 text-[#0F1A29]" />
                <div className="absolute inset-2 rounded-[18%] bg-yellow-300/90 -z-20" />
              </div>
            </div>

            {/* Right: copy + bullets */}
            <div className="md:col-span-3 text-[#0F1A29]">
              <p className="font-extrabold text-base sm:text-lg mb-2">
                This masterclass isn’t for everyone.
              </p>
              <p className="text-sm sm:text-base text-[#243447]">
                If you join without the right mindset, you could end up wasting your time and
                money. <span className="font-semibold">You should NOT join if you:</span>
              </p>

              <ul className="mt-4 space-y-3 sm:space-y-4">
                {[
                  "Are completely satisfied with your current team performance and aren’t looking to scale.",
                  "Are happy being tied to your business 24/7 and don’t want freedom or automation.",
                  "Are looking for a quick-fix “AI tool” without learning the strategy and systems behind it.",
                  "Don’t have the motivation to implement what you’ll learn — this program requires action.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="mt-0.5 w-5 h-5 text-[#E74C3C] flex-shrink-0" />
                    <span className="text-sm sm:text-base leading-relaxed text-[#2E3B52]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Italic line */}
        <p className="text-center mt-6 sm:mt-7 text-white/90 italic text-sm sm:text-base">
          If you don’t fall into any of these categories,{" "}
          <span className="underline underline-offset-2">you’re in the right place!</span>
        </p>

        {/* CTA (unified with Hero) */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3">
          <button
           onClick={() =>{
  //                        if (window.fbq) {
  //   window.fbq("track", "AddToCart", {
  //     value: 99,
  //     currency: "INR",
  //   });
  // }
            scrollToRegister();
          }}
            className="
              inline-flex items-center justify-center
              h-12 sm:h-14 px-10 sm:px-14
              text-base sm:text-lg font-bold tracking-wide
              text-black
              bg-gradient-to-r from-[#FFD43B] to-[#FACC15]
              rounded-md shadow-sm hover:shadow-lg
              hover:from-[#FFE873] hover:to-[#FACC15]
              active:scale-[0.98]
              transition-all duration-200
            "
          >
            JOIN NOW JUST FOR ₹99!
          </button>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-white">
              <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              Only <b className="mx-1">2</b> Seats Left!
            </span>
            <span className="text-white/70 select-none">Seats Are Filling Fast, Hurry Up!</span>
          </div>
        </div>
      </div>
    </section>
  );
};
