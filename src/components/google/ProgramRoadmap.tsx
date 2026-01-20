import { motion } from "framer-motion";
import {
  Layers,
  Users,
  Rocket,
  Wrench,
  Gift,
  CheckCircle2,
} from "lucide-react";

interface ProgramRoadmapProps {
  onCTAClick: () => void;
}

type Module = {
  title: string;
  subtitle: string;
  color: {
    ring: string;      // border color
    bg: string;        // light background
    badgeBg: string;   // badge bg
    badgeText: string; // badge text
    dot: string;       // bullet dot color
  };
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bullets: Array<string>;
};

const modules: Module[] = [
  {
    title: "Module 1",
    subtitle: "The Great Replacement Strategy",
    icon: Layers,
    color: {
      ring: "ring-[#BBD2FF]",
      bg: "bg-[#F4F8FF]",
      badgeBg: "bg-[#2B6EF3]",
      badgeText: "text-white",
      dot: "text-[#2B6EF3]",
    },
    bullets: [
      "Why Fortune 500 companies are quietly laying off thousands while investing billions in AI",
      "The 3 types of employees you should replace first (and the 1 you should keep)",
      "How to identify which business functions are ready for AI transformation",
    ],
  },
  {
    title: "Module 2",
    subtitle: "The AI Workforce Blueprint",
    icon: Users,
    color: {
      ring: "ring-[#FFD8A8]",
      bg: "bg-[#FFF6EC]",
      badgeBg: "bg-[#FF9800]",
      badgeText: "text-white",
      dot: "text-[#FF9800]",
    },
    bullets: [
      "My proven 5-step system for building AI teams that outperform human employees",
      "How to create AI workers for sales, marketing, customer support, and operations",
      "The tools and platforms I use to manage entire business functions with zero human intervention",
    ],
  },
  {
    title: "Module 3",
    subtitle: "The Freedom Formula",
    icon: Rocket,
    color: {
      ring: "ring-[#C8F7C5]",
      bg: "bg-[#F3FFF2]",
      badgeBg: "bg-[#16A34A]",
      badgeText: "text-white",
      dot: "text-[#16A34A]",
    },
    bullets: [
      "How to transition from Chief Firefighting Officer to true CEO",
      "The exact workflow that lets you travel for weeks while your business grows",
      "Case study: How Rajesh from Mumbai scaled from ₹15L to ₹1Cr revenue while reducing his working hours by 70%",
    ],
  },
  {
    title: "Module 4",
    subtitle: "Implementation Roadmap",
    icon: Wrench,
    color: {
      ring: "ring-[#FFC4C4]",
      bg: "bg-[#FFF4F4]",
      badgeBg: "bg-[#EF4444]",
      badgeText: "text-white",
      dot: "text-[#EF4444]",
    },
    bullets: [
      "Your 90-day action plan to build your first AI workforce",
      "The biggest mistakes that cost business owners ₹lakhs (and how to avoid them)",
      "How to future-proof your business against the coming AI disruption",
    ],
  },
];

export const ProgramRoadmap = ({ onCTAClick }: ProgramRoadmapProps) => {
  return (
    <section className="bg-[#F7F8FA] py-10 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <h2 className="font-serif font-extrabold text-[22px] sm:text-3xl md:text-[34px] leading-tight text-[#0F1A29]">
            What You’ll Learn Inside This{" "}
            <span className="text-[#1E66F5]">2-Day Masterclass</span>
          </h2>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className={`${m.color.bg} ring-1 ${m.color.ring} rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6`}
              >
                {/* Card header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <span
                    className={`inline-flex items-center justify-center ${m.color.badgeBg} ${m.color.badgeText} rounded-lg w-9 h-9 sm:w-10 sm:h-10`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-extrabold text-[#0F1A29]">
                      {m.title}
                    </div>
                    <div className="text-[13px] sm:text-base md:text-lg font-semibold text-[#0F1A29]">
                      {m.subtitle}
                    </div>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 sm:space-y-3">
                  {m.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`mt-[2px] w-4 h-4 sm:w-5 sm:h-5 ${m.color.dot}`} />
                      <span className="text-[13px] sm:text-sm md:text-base text-[#243447] leading-relaxed">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Exclusive Bonus Band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mt-4 sm:mt-6 md:mt-8"
        >
          <div className="rounded-xl sm:rounded-2xl ring-1 ring-[#E8D5FF] bg-[#FAF5FF] p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="inline-flex items-center justify-center bg-[#7C3AED] text-white rounded-lg w-9 h-9 sm:w-10 sm:h-10">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <div className="font-extrabold text-[#0F1A29] text-sm sm:text-base md:text-lg">
                Exclusive Bonus:{" "}
                <span className="text-[#7C3AED]">
                  Live Q&amp;A + AI Tool Vault (Worth ₹15,000)
                </span>
              </div>
            </div>

            <ul className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {[
                "Get your specific business challenges solved in real-time",
                "Personalized advice for your industry and situation",
                "Access to my private AI tools and templates (Worth ₹15,000)",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-[#7C3AED] mt-[2px] w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-[13px] sm:text-sm md:text-base text-[#243447] leading-relaxed">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Promise line + CTA */}
        {/* Promise line + CTA (matching Hero section style) */}
<motion.div
  initial={{ opacity: 0, y: 18 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.5 }}
  className="text-center mt-8 sm:mt-10 md:mt-12 space-y-4"
>
  <p className="text-[13.5px] sm:text-base md:text-lg text-[#3C4A5B] max-w-3xl mx-auto leading-relaxed">
    By the end of this powerful session:{" "}
    <span className="font-semibold text-[#0F1A29]">
      You’ll leave with personalized answers, proven templates, and tools
      ready to implement right away.
    </span>
  </p>

  <div className="flex flex-col items-center gap-3">
    {/* ✅ Unified CTA Button */}
    <button
      onClick={() => {
window.open("https://rzp.io/rzp/dB0hIqM", "_self")}}
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

    {/* ✅ Matching Seats Left Pill */}
    <div className="flex items-center gap-2 text-xs sm:text-sm">
      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-black">
        <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
        Only <b className="mx-1">2</b> Seats Left!
      </span>
      <span className="text-[#A3B0BF] select-none">Seats are filling fast, hurry up!</span>
    </div>
  </div>
</motion.div>

      </div>
    </section>
  );
};
