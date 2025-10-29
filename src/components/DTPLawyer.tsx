import React, { useState } from "react";
import TrustBar from "./dtp/TrustBar";
import HeroSection from "./dtp/HeroSection";
import SocialProofBar from "./dtp/SocialProofBar";
import AchievementsSection from "./dtp/AchievementsSection";
import ProblemSection from "./dtp/ProblemSection";
import UrgencyAutoSection from "./dtp/UrgencyAutoSection";
import ServicesSection from "./dtp/ServicesSection";
import RealAutoStoriesSection from "./dtp/RealAutoStoriesSection";
import GuaranteesAutoSection from "./dtp/GuaranteesAutoSection";
import ProcessSection from "./dtp/ProcessSection";
import TestimonialsSection from "./dtp/TestimonialsSection";
import CTASection from "./dtp/CTASection";
import DTPConsultationModal from "./dtp/DTPConsultationModal";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";

const DTPLawyer = () => {
  const [showForm, setShowForm] = useState(false);
  const seo = getSEOConfig('dtp');

  const handleConsultationClick = () => {
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
  };

  return (
    <>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      <TrustBar />
      <HeroSection onConsultationClick={handleConsultationClick} />
      <SocialProofBar />
      <AchievementsSection />
      <ProblemSection />
      <UrgencyAutoSection />
      <ServicesSection onConsultationClick={handleConsultationClick} />
      <RealAutoStoriesSection />
      <GuaranteesAutoSection onConsultationClick={handleConsultationClick} />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection onConsultationClick={handleConsultationClick} />
      <DTPConsultationModal 
        showForm={showForm} 
        onClose={handleCloseModal} 
      />
    </div>
    </>
  );
};

export default DTPLawyer;