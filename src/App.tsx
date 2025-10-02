import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ModalProvider } from "@/hooks/useModal";
import { ThemeProvider } from "next-themes";
import { BlogProvider } from "@/contexts/BlogContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Index";
import Services from "@/pages/Services";
import Pricing from "@/pages/Pricing";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Contacts from "@/pages/Contacts";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
import DTPLawyer from "@/components/DTPLawyer";
import AdminPanel from "@/pages/AdminPanel";
import Login from "@/pages/Login";
import ClientDashboard from "@/pages/ClientDashboard";
import LawyerDashboard from "@/pages/LawyerDashboard";
import PopupModal from "@/components/PopupModal";
import ConsultationModal from "@/components/ConsultationModal";

import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <BlogProvider>
            <ModalProvider>
              <Router>
                <div className="min-h-screen bg-background">
                  <Navigation />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/dtp-lawyer" element={<DTPLawyer />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogPost />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contacts" element={<Contacts />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/cabinet" element={<ClientDashboard />} />
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="/lawyer" element={<LawyerDashboard />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <PopupModal />
                  <ConsultationModal />
                  <ScrollToTop />
                  <SmoothScroll />
                  <Toaster />
                </div>
              </Router>
            </ModalProvider>
          </BlogProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;