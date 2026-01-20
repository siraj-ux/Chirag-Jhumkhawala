import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Code2, Bot, Sigma, Table, NotebookPen, Sparkles } from "lucide-react";
import coachPng from "@/assets/CoachBg.png";

interface HeroSectionProps {
  onCTAClick: () => void;
}

type Tool = {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const tools: Tool[] = [
  { label: "Python", Icon: Code2 },
  { label: "ChatGPT", Icon: Bot },
  { label: "NumPy", Icon: Sigma },
  { label: "Pandas", Icon: Table },
  { label: "Jupyter", Icon: NotebookPen },
  { label: "Gemini", Icon: Sparkles },
];

/** Reusable animated highlight that degrades gracefully when motion is reduced */
function Highlight({
  children,
  emphasis = "pulse-slow", // "pulse-slow" | "pulse-medium"
  as: As = motion.span,
}: {
  children: React.ReactNode;
  emphasis?: "pulse-slow" | "pulse-medium";
  as?: any;
}) {
  const reduce = useReducedMotion();
  const dur = emphasis === "pulse-medium" ? 2.2 : 3.2;

  return (
    <As
      className="
        relative inline-block rounded-md
        px-1.5 py-0.5
        bg-gradient-to-r from-white/15 via-white/20 to-white/15
        ring-1 ring-white/25 shadow-[0_0_0_2px_rgba(255,255,255,0.06)_inset]
      "
      initial={reduce ? false : { opacity: 0.95, scale: 1 }}
      animate={
        reduce
          ? undefined
          : { opacity: [0.95, 1, 0.95], scale: [1, 1.02, 1] }
      }
      transition={reduce ? undefined : { duration: dur, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="relative z-[1]">{children}</span>
      {/* soft outer glow */}
      <span className="absolute inset-0 -z-0 rounded-md blur-md bg-white/10" aria-hidden />
    </As>
  );
}

const MarqueeIcon = ({ tool, delay = 0 }: { tool: Tool; delay: number }) => {
  const { Icon } = tool;
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/12 border border-white/15 backdrop-blur-md"
      initial={{ scale: 1, opacity: 0.85 }}
      animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon className="text-white" width={18} height={18} />
      <span className="text-white/95 text-[10px] sm:text-xs font-semibold">{tool.label}</span>
    </motion.div>
  );
};

/** Tunable, lightweight network background (unchanged logic) */
function NetworkBackground({
  className = "",
  density = 1,
  intensity = 1,
  speed = 1,
  maxAlpha = 0.4,
  nodeColor = "rgba(255,212,59,0.7)",
  parallax = 1,
}: {
  className?: string;
  density?: number;
  intensity?: number;
  speed?: number;
  maxAlpha?: number;
  nodeColor?: string;
  parallax?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;
    let running = true;

    const pr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    type Node = { x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const baseCountForWidth = () => {
      const w = window.innerWidth;
      if (w < 480) return 14;
      if (w < 768) return 22;
      if (w < 1280) return 32;
      return 42;
    };

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      canvas.width = Math.floor(width * pr);
      canvas.height = Math.floor(height * pr);
      ctx.setTransform(pr, 0, 0, pr, 0, 0);

      const count = Math.round(baseCountForWidth() * density);
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: (rand(-0.35, 0.35) * speed) / parallax,
        vy: (rand(-0.35, 0.35) * speed) / parallax,
      }));
    };

    resize();
    let last = performance.now();

    const onVis = () => {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const maxDist = 150;
    const maxDist2 = maxDist * maxDist;

    function tick(now: number) {
      if (!running) return;
      const dt = Math.min((now - last) / 16.67, 2);
      last = now;

      if (now % 2 > 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -16) n.x = width + 16;
        if (n.x > width + 16) n.x = -16;
        if (n.y < -16) n.y = height + 16;
        if (n.y > height + 16) n.y = -16;
      }

      ctx.lineWidth = 1.15;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 <= maxDist2) {
            const t = 1 - d2 / maxDist2;
            const alpha = Math.min(maxAlpha * intensity, 0.15 + t * maxAlpha * intensity);
            ctx.strokeStyle = `rgba(255,212,59,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = nodeColor;
        ctx.shadowColor = "rgba(255,212,59,0.28)";
        ctx.shadowBlur = 10 * intensity;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    }

    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density, intensity, speed, maxAlpha, nodeColor, parallax]);

  return <canvas ref={canvasRef} className={`block w-full h-full ${className}`} aria-hidden />;
}

export const HeroSection = ({ onCTAClick }: HeroSectionProps) => {
  return (
    <section
      className="
        relative bg-[#0F1A29]
        min-h-[100svh] flex items-center
        overflow-visible
        py-6 md:py-14
      "
    >
      {/* Background layers */}
      <NetworkBackground
        className="absolute inset-0 z-0 opacity-[0.32] pointer-events-none"
        density={1.6}
        intensity={1.2}
        speed={1.1}
        parallax={1.6}
        maxAlpha={0.46}
      />
      <NetworkBackground
        className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none"
        density={1.1}
        intensity={1.0}
        speed={0.8}
        parallax={2}
        maxAlpha={0.36}
        nodeColor="rgba(255,212,59,0.6)"
      />

      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-[46rem] h-[46rem] bg-highlight rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="origin-top scale-[0.96] sm:scale-[0.94] md:scale-[0.92] lg:scale-[0.98] xl:scale-100 transition-transform">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT: More spacing + responsive leading */}
            <div className="lg:col-span-6 text-white text-center lg:text-left max-w-3xl
                            space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 xl:space-y-12">
              {/* Top badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-semibold text-white/90 mx-auto lg:mx-0">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                2-DAY MASTERCLASS FOR BUSINESS OWNERS &amp; FREELANCERS
          
              </div>

              {/* Main Headline with animated highlights */}
              <h1
                className="
                  font-serif font-bold tracking-tight
                  text-3xl sm:text-5xl lg:text-[44px]
                  leading-[1.25] sm:leading-[1.22] lg:leading-[1.18]
                "
              >
                Build an AI Workforce That Works 24/7 and{" "}
                <Highlight emphasis="pulse-medium">Scales</Highlight>{" "}
                <Highlight>Your Business Beyond ₹1Cr+</Highlight>{" "}
                Without Hiring a Single Unreliable Employee
              </h1>

              {/* Supporting paragraph with extra breathing room */}
              <p
                className="
                  text-base sm:text-lg md:text-xl lg:text-2xl
                  text-gray-200/95 font-medium max-w-2xl
                  leading-relaxed sm:leading-[1.7] text-[#FFE873]
                "
              >
                Join 1,000+ Indian entrepreneurs using AI to{" "}
                <span className="font-semibold">automate</span>, scale, and reclaim their freedom — without
                hiring or burnout.
              </p>
            </div>

            {/* RIGHT: unchanged layout, minor spacing tweaks to align visually */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="relative w-full max-w-[560px]">
                <div className="absolute inset-0 -z-10">
                  <div
                    className="
                      absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[580px] h-[580px] rounded-full blur-3xl
                    "
                  />
                </div>

                <motion.img
                  src={coachPng}
                  alt="Chirag Jhumkhawala - AI & Automation"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 w-full max-w-[560px] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
                />

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                  className="
                    absolute
                    bottom-56 sm:bottom-20 md:bottom-36 lg:bottom-60 left-1/6 -translate-x-1/2
                    md:left-[16%] md:-translate-x-0
                    bg-white/16 backdrop-blur-xl
                    border border-white/20
                    rounded-2xl
                    px-14 py-5
                    w-[100%] sm:w-[340px] md:w-[400px] lg:w-[440px]
                    text-white z-[50] shadow-[0_14px_36px_rgba(0,0,0,0.35)]
                  "
                >
                  <h3 className="text-lg md:text-2xl font-bold text-[#FFD43B] leading-tight">
                    Chirag Jhumkhawala
                  </h3>
                  <p className="text-xs md:text-base text-gray-200">Business Automation &amp; AI Expert</p>
                  <p className="text-sm md:text-base text-gray-300 mb-2">Mentored 1000+ Professionals</p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFD43B] text-[#FFD43B]" />
                    ))}
                    <Star className="w-4 h-4 fill-[#FFD43B]/50 text-[#FFD43B]" />
                    <span className="text-xs md:text-base font-semibold">4.6 • 455 Reviews</span>
                  </div>
                </motion.div>

                {/* marquee */}
                <div className="relative z-[30] mt-24 md:mt-32">
                  <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />
                  <div className="overflow-hidden">
                    <motion.div
                      className="flex items-center gap-4 sm:gap-6"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ duration: 16, ease: "linear", repeat: Infinity }}
                    >
                      {[...Array(2)].map((_, dup) => (
                        <div key={dup} className="flex items-center gap-4 sm:gap-6">
                          {tools.map((t, i) => (
                            <MarqueeIcon key={`${t.label}-${dup}-${i}`} tool={t} delay={(i % tools.length) * 0.25} />
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* CTA */}
                <div className="relative z-[30] mt-7 flex flex-col items-center gap-3">
                  <button
                    onClick={() => {
                      window.open("https://rzp.io/rzp/dB0hIqM", "_self");
                    }}
                    className="
                      inline-flex items-center justify-center
                      h-12 px-12 text-base font-bold tracking-wide
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

                  <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 text-[13px] sm:text-sm">
  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white">
    <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
    Only <b className="mx-1">2</b> Seats Left!
  </span>
  <span className="text-white/80">Seats are filling fast, hurry up!</span>
</div>

                </div>
              </div>
            </div>
            {/* /RIGHT */}
          </div>
        </div>
      </div>
    </section>
  );
};
