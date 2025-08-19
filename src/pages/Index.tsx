import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Practice from "@/components/Practice";
import Cases from "@/components/Cases";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ContactForm from "@/components/ContactForm";
import QuickLinks from "@/components/QuickLinks";

const Index = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <Hero />
        <Services />
        <Practice />
        <Cases />
        <div className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </div>
        <Blog />
        <QuickLinks />
        <Contacts />
        <Footer />
      </div>
    </>
  );
};

export default Index;