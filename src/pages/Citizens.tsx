import Hero from "@/components/Hero";
import ServicesMain from "@/components/ServicesMain";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

import StructuredData from "@/components/StructuredData";
import YandexQuickLinks from "@/components/YandexQuickLinks";
import { getSEOConfig } from "@/utils/seoConfig";

const Citizens = () => {
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
        <ServicesMain />
        <Blog />
        <Contacts />
        <Footer />
      </div>
    </>
  );
};

export default Citizens;
