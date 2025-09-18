import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ModalProvider } from "@/hooks/useModal";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { BlogProvider } from "@/contexts/BlogContext";
import { ClientProvider } from "@/contexts/ClientContext";
import { AdminProvider } from "@/contexts/AdminContext";
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
import PopupModal from "@/components/PopupModal";
import ConsultationModal from "@/components/ConsultationModal";
import AuthModal from "@/components/auth/AuthModal";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import LawyerDashboard from "@/components/dashboard/LawyerDashboard";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";

const AppContent = () => {
  const { user, isAuthenticated, login, register } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Если пользователь авторизован, показываем соответствующий дашборд
  if (isAuthenticated && user) {
    if (user.role === 'client') {
      return <ClientDashboard />;
    } else if (user.role === 'lawyer' || user.role === 'admin') {
      return <LawyerDashboard />;
    }
  }

  // Обычный сайт для неавторизованных пользователей
  return (
    <div className="min-h-screen bg-background">
      <Navigation onLoginClick={() => setShowAuthModal(true)} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <PopupModal />
      <ConsultationModal />
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={login}
        onRegister={register}
      />
      <ScrollToTop />
      <SmoothScroll />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <ClientProvider>
            <AdminProvider>
              <BlogProvider>
                <ModalProvider>
                  <Router>
                    <AppContent />
                  </Router>
                </ModalProvider>
              </BlogProvider>
            </AdminProvider>
          </ClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;