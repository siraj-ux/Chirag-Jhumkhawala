import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialsProps {
  onCTAClick: () => void;
}

type Testimonial = {
  title: string;
  body: string;
  author: string;
};

const testimonials: Testimonial[] = [
  {
    title: "Reduced my team costs by 80% while doubling revenue",
    body:
      "I was spending ₹6L per month on salaries alone. After implementing Chirag's AI workforce system, I'm spending less than ₹1.2L and getting better results. My stress levels have completely disappeared.",
    author: "Priya Sharma, Digital Marketing Agency, Mumbai",
  },
  {
    title: "Finally sleeping peacefully after 8 years",
    body:
      "For 8 years, I couldn't take a single day off. Every vacation was ruined by work calls. Now my AI team handles everything while I focus on strategy. Last month, I took a 15-day Europe trip and came back to record revenue numbers.",
    author: "Vikram Patel, E-commerce Business, Delhi",
  },
  {
    title: "Wish I had learned this 5 years ago",
    body:
      "The amount of drama, excuses, and disappointment I dealt with from employees was killing my passion for business. Chirag's system gave me back my enthusiasm. My business now runs like a well-oiled machine.",
    author: "Anita Desai, Consulting Firm, Bangalore",
  },
  {
    title: "From chaos to complete control",
    body:
      "I went from managing 15 unpredictable employees to running everything with AI systems. My profit margins increased by 300% and I actually enjoy being a business owner again.",
    author: "Rohit Gupta, Manufacturing Business, Pune",
  },
  {
    title: "My competitors can't figure out how we're scaling so fast",
    body:
      "While my competitors are struggling with hiring and training, I'm scaling faster than ever. The competitive advantage is incredible — they're playing checkers while I'm playing chess.",
    author: "Meera Krishnan, SaaS Startup, Hyderabad",
  },
];

export const Testimonials = ({ onCTAClick }: TestimonialsProps) => {

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;
    const speedPxPerSec = isMobile ? 480 : 320;

    let rafId = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!paused) {
        el.scrollLeft += speedPxPerSec * dt;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const pause = () => setPaused(true);
    const resume = () => setPaused(false);

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("mousedown", pause);
    el.addEventListener("mouseup", resume);
    el.addEventListener("mouseleave", resume);

    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("mousedown", pause);
      el.removeEventListener("mouseup", resume);
      el.removeEventListener("mouseleave", resume);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [paused]);

  return (
    <section className="bg-[#1b2e4a] py-10 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="font-serif font-bold text-[#FFD43B] text-xl sm:text-2xl md:text-3xl leading-tight">
            What Our Students Are Saying
          </h2>
        </motion.div>

        {/* Auto-scrolling testimonials */}
        <div className="relative -mx-4 sm:-mx-6 px-4 sm:px-6">
          <div
            ref={scrollerRef}
            className="
              flex gap-4 sm:gap-5 md:gap-6
              overflow-x-auto
              scroll-smooth
              pb-2
              [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
          >
            {[...Array(2)].map((_, copyIdx) =>
              testimonials.map((t, i) => (
                <article
                  key={`${copyIdx}-${i}-${t.title}`}
                  className="
                    flex-shrink-0
                    min-w-[280px] sm:min-w-[340px] md:min-w-[420px]
                    max-w-[85%] sm:max-w-none
                    rounded-2xl bg-[#0F1A29] text-white
                    p-5 sm:p-6
                    shadow-[0_6px_20px_rgba(0,0,0,0.35)]
                    border border-white/5
                    transition-transform duration-300 hover:scale-[1.02]
                  "
                >
                  <div className="w-full">
                    {/* 5-star row */}
                    <div className="flex gap-1 mb-3 text-[#FFD43B]">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-[#FFD43B] text-[#FFD43B]" />
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg sm:text-xl leading-snug mb-2 text-white">
                      {t.title}
                    </h3>

                    {/* Body */}
                    <p className="text-[13.5px] sm:text-sm md:text-base text-white/85 leading-relaxed">
                      {t.body}
                    </p>

                    {/* Author */}
                    <p className="mt-4 font-semibold text-sm sm:text-base text-[#FFD43B]">
                      {t.author}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mt-8 sm:mt-10 space-y-3 sm:space-y-4"
        >
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
        </motion.div>
      </div>
    </section>
  );
};
