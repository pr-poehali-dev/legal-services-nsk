import React, { useState } from "react";
import TrustBar from "./dtp/TrustBar";
import HeroSection from "./dtp/HeroSection";
import SocialProofBar from "./dtp/SocialProofBar";
import AchievementsSection from "./dtp/AchievementsSection";
import ProblemSection from "./dtp/ProblemSection";
import ServicesSection from "./dtp/ServicesSection";
import ProcessSection from "./dtp/ProcessSection";
import TestimonialsSection from "./dtp/TestimonialsSection";
import CTASection from "./dtp/CTASection";
import DTPConsultationModal from "./dtp/DTPConsultationModal";

const DTPLawyer = () => {
  const [showForm, setShowForm] = useState(false);

  const handleConsultationClick = () => {
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <TrustBar />
      <HeroSection onConsultationClick={handleConsultationClick} />
      <SocialProofBar />
      <AchievementsSection />
      <ProblemSection />
      <ServicesSection onConsultationClick={handleConsultationClick} />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection onConsultationClick={handleConsultationClick} />
      <DTPConsultationModal 
        showForm={showForm} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default DTPLawyer;