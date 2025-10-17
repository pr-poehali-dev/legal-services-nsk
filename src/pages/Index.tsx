import Hero from "@/components/Hero";
import ServicesMain from "@/components/ServicesMain";
import Cases from "@/components/Cases";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ContactForm from "@/components/ContactForm";

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
        <ServicesMain />
        <Cases />
        <Blog />
        <div className="py-20 bg-gradient-to-b from-secondary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Получите бесплатную консультацию
                </h2>
                <p className="text-lg text-muted-foreground">
                  Заполните форму и мы свяжемся с вами в течение 15 минут
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
        <Contacts />
        <Footer />
      </div>
    </>
  );
};

export default Index;