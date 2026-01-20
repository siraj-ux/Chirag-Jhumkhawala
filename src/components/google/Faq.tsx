import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "I'm not technical. Can I really implement AI in my business?",
    a: "Absolutely! My system is designed for business owners, not programmers. You don’t need any technical background. I’ll show you user-friendly tools and step-by-step processes that anyone can follow. 80% of my successful clients had zero technical experience when they started.",
  },
  {
    q: "What if AI technology becomes outdated quickly?",
    a: "This masterclass teaches principles and frameworks, not just specific tools. While tools may evolve, the fundamental strategies for building AI workforces remain constant. Plus, I provide lifetime updates to all participants so you’ll always stay current with the latest developments.",
  },
  {
    q: "How much will it cost to implement these AI solutions?",
    a: "Most business owners spend ₹3-8L per month on salaries. My AI workforce solutions typically cost 80-90% less than human employees while delivering superior results. The ROI usually appears within the first 30 days. I’ll show you exact cost breakdowns during the masterclass.",
  },
  {
    q: "Won't my customers prefer human interaction?",
    a: "This is the biggest myth in business today. When implemented correctly, AI provides faster, more accurate, and more consistent service than humans. Many of my clients’ customers actually prefer the AI experience because there are no mood swings, no delays, and no mistakes.",
  },
  {
    q: "What about the legal and ethical implications of replacing employees?",
    a: "I cover this extensively in the masterclass. There are proper, ethical ways to transition your business model that protect both you and your existing team. Many of my clients have actually promoted their best human employees to strategic roles while AI handles the operational work.",
  },
  {
    q: "How quickly can I expect to see results?",
    a: "Most business owners see immediate improvements in efficiency within the first week. Significant cost savings appear within 30 days, and substantial revenue growth typically manifests within 60-90 days. The exact timeline depends on your business complexity and implementation speed.",
  },
   {
    q: "What if this doesn't work for my specific industry?",
    a: "I’ve successfully implemented AI workforces across dozens of industries – manufacturing, consulting, e-commerce, healthcare, education, real estate, and more. During the live Q&A, I’ll address your specific industry challenges and show you relevant case studies.",
  },
   {
    q: "Is this just theory or will I get practical, actionable steps?",
    a: "This masterclass is 100% practical. You’ll leave with a complete implementation roadmap, specific tools and platforms to use, actual templates and workflows, and access to my private resource library. Theory without action is worthless – I focus entirely on what you can implement immediately.",
  },
];

export const FAQ = () => {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-2 sm:px-6" >
      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-4 sm:mb-10 md:mb-12">
          <h2 className="font-serif font-bold text-[#FFD43B] text-2xl sm:text-4xl md:text-5xl leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-3 mx-auto h-1 w-20 rounded-full bg-[#FFD43B]" />
        </div>

        {/* Accordion */}
        <ul className="space-y-3 sm:space-y-4">
          {faqs.map((item, idx) => (
            <li key={idx}>
              <AccordionItem index={idx} item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

function AccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className="
        rounded-xl border border-black/10 bg-white
        shadow-sm hover:shadow-md transition-shadow
      "
    >
      <button
        id={buttonId}
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center gap-3 sm:gap-4
          text-left px-4 sm:px-6 py-4 sm:py-5
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]/60 rounded-xl
        "
      >
        <span className="shrink-0">
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD43B]" />
        </span>
        <span className="flex-1 font-semibold text-sm sm:text-base md:text-lg text-black">
          {item.q}
        </span>
        <span
          className="
            ml-2 grid place-items-center rounded-full
            border border-black/10 bg-black/5
            w-8 h-8
          "
        >
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-black/80" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-5">
              <div className="ml-[2.4rem] sm:ml-[2.9rem] border-l-4 border-[#FFD43B] pl-4">
                <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
