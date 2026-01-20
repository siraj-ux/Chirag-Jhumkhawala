import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { WorkshopDetails } from "@/components/WorkshopDetails";
import { ProgramRoadmap } from "@/components/ProgramRoadmap";
import { Testimonials } from "@/components/Testimonials";
import { WorkshopBenefits } from "@/components/WorkshopBenefits";
import { WhoIsThisFor } from "@/components/WhoIsThisFor";
import { MeetYourCoach } from "@/components/MeetYourCoach";
import { PopupForm } from "@/components/PopupForm";
import { WhatYouWillLearn } from "@/components/WhatYouWillLearn";
import { FAQ } from "@/components/Faq";
import { StickyEnrollBar } from "@/components/StickyEnrollBar";
import { useFacebookPixel } from "@/hooks/useFacebookPixelHome";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

useFacebookPixel();

  const handleCTAClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onCTAClick={handleCTAClick} />
      <WorkshopDetails onCTAClick={handleCTAClick} />
      <ProgramRoadmap onCTAClick={handleCTAClick} />
      <WhatYouWillLearn onCTAClick={handleCTAClick} />
      <Testimonials onCTAClick={handleCTAClick} />
      <WorkshopBenefits onCTAClick={handleCTAClick} />
      <WhoIsThisFor onCTAClick={handleCTAClick} />
      <MeetYourCoach onCTAClick={handleCTAClick} />
      <FAQ/>
      <StickyEnrollBar onCTAClick={handleCTAClick} />
      <PopupForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </div>
  );
};

export default Index;
