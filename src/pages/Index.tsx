import Hero from "@/components/Hero";
import ServicesMain from "@/components/ServicesMain";
import Cases from "@/components/Cases";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceQuiz from "@/components/ServiceQuiz";

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
        
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Не знаете, какая услуга вам нужна?
              </h2>
              <p className="text-lg text-muted-foreground">
                Ответьте на 3 вопроса — подберем решение за 30 секунд
              </p>
            </div>
            <ServiceQuiz />
          </div>
        </section>

        <ServicesMain />
        <Cases />
        <Blog />
        <Contacts />
        <Footer />
      </div>
    </>
  );
};

export default Index;