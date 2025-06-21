import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Practice from "@/components/Practice";
import Cases from "@/components/Cases";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import PopupModal from "@/components/PopupModal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Practice />
      <Cases />
      <Blog />
      <Contacts />
      <Footer />
      <PopupModal />
    </div>
  );
};

export default Index;
