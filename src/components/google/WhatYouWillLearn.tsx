import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock3,
  BadgeIndianRupee,
  UserCog,
  Workflow,
  Eye,
} from "lucide-react";

interface WhatYouWillLearnProps {
  onCTAClick: () => void;
}

type Benefit = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: React.ReactNode;
};

const leftCol: Benefit[] = [
  {
    icon: AlertTriangle,
    text: (
      <>
        Are <b>tired of depending</b> on unreliable employees who drain your time and
        profit.
      </>
    ),
  },
  {
    icon: UserCog,
    text: (
      <>
        Are a <b>CEO or founder</b> whose <b>growth is limited</b> by hiring, training, or
        team bottlenecks.
      </>
    ),
  },
  {
    icon: Workflow,
    text: (
      <>
        <b>Want to build a business that runs without you</b>, so you can focus on
        strategy and expansion.
      </>
    ),
  },
];

const rightCol: Benefit[] = [
  {
    icon: Clock3,
    text: (
      <>
        <b>Spend 60+ hours a week</b> firefighting instead of growing your business.
      </>
    ),
  },
  {
    icon: BadgeIndianRupee,
    text: (
      <>
        <b>Pay ₹3–8L per month in salaries</b>, but struggle to get consistent results.
      </>
    ),
  },
  {
    icon: Eye,
    text: (
      <>
        Are a <b>visionary</b> ready to embrace AI before your competitors do and{" "}
        <b>future-proof</b> your business.
      </>
    ),
  },
];

export const WhatYouWillLearn = ({ onCTAClick }: WhatYouWillLearnProps) => {
  return (
    <section className="bg-white py-10 sm:py-12 md:py-14 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-serif font-extrabold text-[22px] sm:text-3xl md:text-[34px] leading-tight text-[#0F1A29]">
            Is This <span className="text-[#1E66F5]">Masterclass</span> Right for You?
          </h2>
          <p className="mt-3 text-[13.5px] sm:text-base md:text-lg text-[#3C4A5B] max-w-3xl mx-auto">
            This 2-Day Masterclass is designed for <b>business owners, entrepreneurs,
            and freelancers</b> who are ready to scale smarter, automate faster, and
            reclaim their time.
          </p>

          <div className="mx-auto mt-4 h-[3px] w-24 rounded-full bg-[#1E66F5]/60" />
        </motion.div>

        {/* Subheading */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-[#0F1A29] font-extrabold text-base sm:text-lg">
            You’ll benefit the most if you:
          </p>
        </div>

        {/* Two-column responsive grid */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {[leftCol, rightCol].map((col, colIdx) => (
            <div key={colIdx} className="space-y-3 sm:space-y-4">
              {col.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="
                      rounded-xl bg-white
                      ring-1 ring-[#D9E6FF]
                      shadow-[0_2px_0_rgba(0,0,0,0.04)]
                      px-3.5 py-3 sm:px-4 sm:py-4
                      flex items-start gap-3 sm:gap-3.5
                    "
                  >
                    <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md bg-[#0B5ED7] text-white flex-shrink-0">
                      <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </span>
                    <p className="text-[13.5px] sm:text-sm md:text-base text-[#29384F] leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Soft italic line */}
        <p className="text-center mt-7 sm:mt-9 text-[13.5px] sm:text-base text-[#3C4A5B] italic">
          If this <span className="underline">sounds like you</span>, then this masterclass is just for you!
        </p>

        {/* ✅ Unified CTA (Yellow Gradient - same as Hero Section) */}
        <div className="mt-5 sm:mt-8 flex flex-col items-center gap-3">
          <button
            onClick={() =>{
            window.open("https://rzp.io/rzp/dB0hIqM", "_self")
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
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-black">
              <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              Only <b className="mx-1">2</b> Seats Left!
            </span>
            <span className="text-[#A3B0BF] select-none">
              Seats are filling fast, hurry up!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
