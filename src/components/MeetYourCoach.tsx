import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  Code2,
  Database,
  CheckCircle2,
  Trophy,
  Target,
  Lightbulb,
} from "lucide-react";
import coachImage from "@/assets/Chirag3.jpg";

interface MeetYourCoachProps {
  onCTAClick: () => void;
}

export const MeetYourCoach = ({ onCTAClick }: MeetYourCoachProps) => {

      const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };

  
  return (
    <section
      className="
        bg-gradient-hero relative overflow-hidden
        py-12 sm:py-16 md:py-20
        px-4 sm:px-6
      "
    >
      {/* Floating Motifs */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-10 sm:top-14 right-3 sm:right-8 opacity-15"
      >
        <Cpu className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, 18, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
        className="pointer-events-none absolute bottom-16 sm:bottom-20 left-3 sm:left-10 opacity-15"
      >
        <Database className="w-14 h-14 sm:w-20 sm:h-20 text-highlight" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-1 opacity-15 hidden md:block"
      >
        <Code2 className="w-10 h-10 text-primary" />
      </motion.div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="font-serif font-bold text-white text-2xl sm:text-4xl md:text-5xl leading-tight">
            Meet Your Mentor:{" "}
            <span className="text-[#FFD43B]">Chirag Jhumkhawala</span>
          </h2>
        </motion.div>

        {/* Coach + Bio */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 items-center
            gap-8 sm:gap-10 lg:gap-12
            mb-6 sm:mb-8 md:mb-10
          "
        >
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              <img
                src={coachImage}
                alt="Chirag Jhumkhawala"
                className="w-full rounded-2xl sm:rounded-3xl shadow-glow object-cover"
                loading="lazy"
              />
              <motion.div
                animate={{ rotate: [0, 6, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 -right-3 bg-primary text-secondary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-glow"
              >
                AI Expert
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -6, 0] }}
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-3 -left-3 bg-[#FFD43B] text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-glow"
              >
                1000+ Mentored
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Bio + Details */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white space-y-4 sm:space-y-5 md:space-y-6 max-w-2xl mx-auto lg:mx-0"
          >
            <p className="text-sm sm:text-base md:text-lg text-gray-200">
              Chirag Jhumkhawala is{" "}
              <b>India’s leading AI business transformation expert</b>, Founder
              of Black Elephant, and has mentored{" "}
              <b>1000+ business owners</b> and professionals. He has partnered
              with prestigious institutions including{" "}
              <b>BSE (Bombay Stock Exchange)</b>, <b>HDFC</b>,{" "}
              <b>BML Munjal</b>, and <b>Thomas Cook</b>.
            </p>

            {/* Partner Logos (Text placeholders) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/80 text-xs sm:text-sm">
              <span className="font-semibold">VIACOM18</span>
              <span className="font-semibold">HDFC BANK</span>
              <span className="font-semibold">BML</span>
              <span className="font-semibold">Thomas Cook</span>
              <span className="font-semibold">BSE</span>
            </div>

            {/* Track Record */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-[#FFD43B]" />
                <h4 className="text-white font-extrabold text-sm sm:text-base">
                  His Track Record
                </h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Helped 1000+ business owners master AI implementation",
                  "Average client rating: 4.95/5",
                  "Average revenue increase: 200%+ within 90 days",
                  "Trusted advisor to Fortune 500 companies",
                  "Featured speaker at leading business conferences",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 w-4 h-4 text-[#FFD43B]" />
                    <span className="text-sm sm:text-base text-gray-200 leading-relaxed">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mission */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-[#FFD43B]" />
                <h4 className="text-white font-extrabold text-sm sm:text-base">
                  His Mission
                </h4>
              </div>
              <p className="text-sm sm:text-base text-gray-200">
                To help Indian entrepreneurs build businesses that generate
                wealth without being dependent on unreliable human resources. He
                believes every business owner deserves the freedom to work{" "}
                <b>ON</b> their business,{" "}
                <u>not IN it</u>.
              </p>
            </div>

            {/* Unique Approach */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-[#FFD43B]" />
                <h4 className="text-white font-extrabold text-sm sm:text-base">
                  His Unique Approach
                </h4>
              </div>
              <p className="text-sm sm:text-base text-gray-200">
                Unlike generic AI courses that focus on tools, Chirag teaches{" "}
                <b>business transformation</b>.{" "}
                <b>His methods are tailored to Indian market conditions</b> and
                tested across diverse industries—from manufacturing to
                services. His goal is to show entrepreneurs{" "}
                <b>
                  how AI can unlock the freedom and growth they originally
                  dreamed of.
                </b>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tool Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 sm:mb-10"
        >
          <div className="text-center mb-3">
            <p className="text-white/80 text-xs sm:text-sm">
              Learn with an industry-standard AI stack
            </p>
          </div>

          <div
            className="
              -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-x-auto snap-x snap-mandatory
              flex items-stretch gap-3 sm:gap-4 md:gap-5 pb-1
              [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              justify-center md:justify-center
            "
          >
            {[
              "ChatGPT",
              "Google Gemini",
              "Anthropic Claude",
              "Meta Llama",
              "Cohere",
            ].map((name) => (
              <div
                key={name}
                className="
                  snap-start flex items-center gap-2 bg-white/10 backdrop-blur-md
                  border border-white/10 rounded-full px-3.5 sm:px-4 py-1.5
                  shadow-[0_2px_10px_rgba(0,0,0,0.25)] text-white text-xs sm:text-sm font-semibold
                  whitespace-nowrap
                "
              >
                <span>{name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4"
        >
          <Button
            variant="cta"
            size="xl"
            onClick={() => {
  //             if (window.fbq) {
  //   window.fbq("track", "AddToCart", {
  //     value: 99,
  //     currency: "INR",
  //   });
  // }
              scrollToRegister();
            }}
            className="mx-auto w-full sm:w-auto whitespace-normal leading-snug"
          >
            Become a Data Scientist using AI Tools Now!
          </Button>
          <p className="text-white text-sm sm:text-lg">
            Get FREE Bonuses{" "}
            <span className="text-primary font-bold">Worth ₹29,997</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
