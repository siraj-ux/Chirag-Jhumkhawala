import { motion } from "framer-motion";
import {
  Clock,
  Frown,
  TrendingDown,
  Lock,
  Bot,
  Target,
  TrendingUp,
  Plane,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface WhoIsThisForProps {
  onCTAClick: () => void;
}

const beforePoints = [
  { icon: Clock, text: "Spending 60+ hours/week firefighting instead of growing" },
  { icon: Frown, text: "Stressed over unreliable employees and missed deadlines" },
  { icon: TrendingDown, text: "Paying high salaries with inconsistent results" },
  { icon: Lock, text: "Feeling trapped in the business with no time off" },
  { icon: Target, text: "Manual marketing, sales, and operations slowing growth" },
];

const afterPoints = [
  { icon: Bot, text: "AI teams working 24/7 for marketing, sales, and operations" },
  { icon: Target, text: "Focused on strategy while your business grows automatically" },
  { icon: TrendingUp, text: "Cut costs, boost profits, and scale faster than ever" },
  { icon: Plane, text: "Freedom to travel, relax, and actually enjoy being a business owner" },
  { icon: ShieldCheck, text: "Predictable growth with a systemized business that runs without you" },
];

export const WhoIsThisFor = ({ onCTAClick }: WhoIsThisForProps) => {

    const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };

  return (
    <section className="bg-white py-12 sm:py-14 md:py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="font-serif font-extrabold text-[#0F1A29] text-[22px] sm:text-3xl md:text-[34px] leading-tight">
            How Your Business &amp; Life Could <span className="text-[#1E66F5]">Transform in Just 2 Days</span>
          </h2>
        </motion.div>

        {/* Before vs After – compact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-xl ring-1 ring-[#D9E6FF] bg-white"
          >
            <div className="px-4 py-3 border-b border-[#E7EDF9]">
              <p className="font-extrabold text-[#0F1A29]">Before the Masterclass</p>
            </div>
            <ul className="p-4 sm:p-5 space-y-3">
              {beforePoints.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#FFE08A] text-[#0F1A29] flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[13.5px] sm:text-sm md:text-base text-[#2E3B52] leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-xl ring-1 ring-[#D9E6FF] bg-white"
          >
            <div className="px-4 py-3 border-b border-[#E7EDF9]">
              <p className="font-extrabold text-[#0F1A29]">After the Masterclass</p>
            </div>
            <ul className="p-4 sm:p-5 space-y-3">
              {afterPoints.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#1E66F5] text-white flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[13.5px] sm:text-sm md:text-base text-[#2E3B52] leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Pricing – slim, high-signal card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-6 sm:mt-8"
        >
          <div className="mx-auto max-w-3xl rounded-xl ring-1 ring-[#D9E6FF] bg-white p-4 sm:p-6">
            <p className="text-center text-[#E53935] font-extrabold text-base sm:text-lg">
              Last Chance to Join the Masterclass and Learn How to Automate
            </p>

            <p className="text-center mt-2 text-[#0F1A29] text-sm sm:text-base">
              <span className="text-[#1E66F5] font-semibold">Scale Your Business Using AI</span> and Reclaim Your
              Freedom • Unlock Exclusive Bonuses <span className="font-extrabold">WORTH ₹15,000!</span>
            </p>

            {/* Tiers (compact) */}
            <div className="mt-4 grid grid-cols-1 gap-2">
              <div className="rounded-lg ring-1 ring-[#0F1A29]/10 px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/10 border border-[#0F1A29]/10 text-[#0F1A29]">
                    <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
                    Only <b className="mx-1">2</b> Seats Left!
                  </span>
                  <span className="font-semibold">First 100 Seats</span>
                </div>
                <div className="text-[#16A34A] font-extrabold">₹99/-</div>
              </div>

              <div className="rounded-lg ring-1 ring-[#0F1A29]/10 px-3 py-2 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold">100-500 Seats</span>
                <span className="font-bold text-[#0F1A29]">₹1,999/-</span>
              </div>

              <div className="rounded-lg ring-1 ring-[#0F1A29]/10 px-3 py-2 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold">After this masterclass</span>
                <span className="font-bold text-[#0F1A29]">₹5,999/-</span>
              </div>
            </div>

            {/* Today price */}
            <div className="text-center mt-5">
              <p className="text-xs sm:text-sm text-[#2E3B52]">Price Today:</p>
              <p className="text-[22px] sm:text-3xl font-extrabold text-[#0F1A29]">
                <span className="line-through mr-2 opacity-60">₹1,999/-</span>
                ₹99/-
              </p>
              <p className="mt-1 text-[12px] sm:text-sm text-[#2E3B52]">
                First 100 registrations get exclusive access to my AI Tools Toolkit (Worth ₹15,000)
              </p>
            </div>

            {/* Unified CTA */}
            <div className="mt-4 flex flex-col items-center gap-3">
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
                  h-12 sm:h-14 px-8 sm:px-12
                  text-base sm:text-lg font-bold tracking-wide
                  text-black
                  bg-gradient-to-r from-[#FFD43B] to-[#FACC15]
                  rounded-md shadow-sm hover:shadow-lg
                  hover:from-[#FFE873] hover:to-[#FACC15]
                  active:scale-[0.98]
                  transition-all duration-200
                "
              >
                RESERVE MY SPOT &amp; GET MY BONUSES
              </button>

              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-black/5 border border-black/10 text-[#0F1A29]">
                  <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                  Only <b className="mx-1">2</b> Seats Left!
                </span>
                <span className="text-[#A3B0BF] select-none">Almost Full</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
  