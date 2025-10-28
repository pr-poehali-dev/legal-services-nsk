import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ModalProvider } from "@/hooks/useModal";
import { ThemeProvider } from "next-themes";
import { BlogProvider } from "@/contexts/BlogContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Index";
import PopupModal from "@/components/PopupModal";
import ConsultationModal from "@/components/ConsultationModal";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";
import StructuredData from "@/components/StructuredData";
import SoloGPTWidget from "@/components/SoloGPTWidget";

const Services = lazy(() => import("@/pages/Services"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const About = lazy(() => import("@/pages/About"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const DTPLawyer = lazy(() => import("@/components/DTPLawyer"));
const DTPLawyerChoice = lazy(() => import("@/pages/DTPLawyerChoice"));
const InsuranceDispute = lazy(() => import("@/pages/InsuranceDispute"));
const DamageClaim = lazy(() => import("@/pages/DamageClaim"));
const LicenseAlcohol = lazy(() => import("@/pages/LicenseAlcohol"));
const IllegalFine = lazy(() => import("@/pages/IllegalFine"));
const BadRepair = lazy(() => import("@/pages/BadRepair"));
const AdminPanel = lazy(() => import("@/pages/AdminPanel"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const LawyerDashboard = lazy(() => import("@/pages/LawyerDashboard"));
const ClientLogin = lazy(() => import("@/pages/ClientLogin"));
const ClientDashboard = lazy(() => import("@/pages/ClientDashboard"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));

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
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      </div>
                    }>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/dtp-lawyer" element={<DTPLawyerChoice />} />
                        <Route path="/dtp-lawyer/insurance-dispute" element={<InsuranceDispute />} />
                        <Route path="/dtp-lawyer/damage-claim" element={<DamageClaim />} />
                        <Route path="/dtp-lawyer/license-alcohol" element={<LicenseAlcohol />} />
                        <Route path="/dtp-lawyer/illegal-fine" element={<IllegalFine />} />
                        <Route path="/dtp-lawyer/bad-repair" element={<BadRepair />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogPost />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/lawyer" element={<LawyerDashboard />} />
                        <Route path="/client/login" element={<ClientLogin />} />
                        <Route path="/client/cabinet" element={<ClientDashboard />} />
                        <Route path="/sitemap.xml" element={<Sitemap />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <PopupModal />
                  <ConsultationModal />
                  <ScrollToTop />
                  <SmoothScroll />
                  <StructuredData />
                  <SoloGPTWidget />
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