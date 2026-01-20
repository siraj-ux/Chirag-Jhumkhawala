import { useState, useEffect } from "react";
import { HeroSection } from "@/components/google/HeroSection";
import { WorkshopDetails } from "@/components/google/WorkshopDetails";
import { ProgramRoadmap } from "@/components/google/ProgramRoadmap";
import { Testimonials } from "@/components/google/Testimonials";
import { WorkshopBenefits } from "@/components/google/WorkshopBenefits";
import { WhoIsThisFor } from "@/components/google/WhoIsThisFor";
import { MeetYourCoach } from "@/components/google/MeetYourCoach";
import { PopupForm } from "@/components/google/PopupForm";
import { WhatYouWillLearn } from "@/components/google/WhatYouWillLearn";
import { FAQ } from "@/components/google/Faq";
import { StickyEnrollBar } from "@/components/google/StickyEnrollBar";
import { useFacebookPixel } from "@/hooks/useFacebookPixelHome";

const IndexGa = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);



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

export default IndexGa;
