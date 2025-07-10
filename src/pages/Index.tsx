import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Practice from "@/components/Practice";
import Cases from "@/components/Cases";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Practice />
      <Cases />
      <Blog />
      <Contacts />
      <Footer />
    </div>
  );
};

export default Index;
