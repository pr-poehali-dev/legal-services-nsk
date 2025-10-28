import Hero from "@/components/Hero";
import ProblemsSection from "@/components/ProblemsSection";
import UrgencySection from "@/components/UrgencySection";
import ServicesMain from "@/components/ServicesMain";
import RealStoriesSection from "@/components/RealStoriesSection";
import GuaranteesSection from "@/components/GuaranteesSection";
import Cases from "@/components/Cases";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

import StructuredData from "@/components/StructuredData";
import YandexQuickLinks from "@/components/YandexQuickLinks";
import { getSEOConfig } from "@/utils/seoConfig";

const Index = () => {
  const seo = getSEOConfig('home');
  
  return (
    <>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <StructuredData />
      <YandexQuickLinks />
      <div className="min-h-screen">
        <Hero />
        <ProblemsSection />
        <UrgencySection />
        <ServicesMain />
        <RealStoriesSection />
        <GuaranteesSection />
        <Cases />
        <Blog />
        <Contacts />
        <Footer />
      </div>
    </>
  );
};

export default Index;