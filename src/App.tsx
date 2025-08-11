import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalProvider } from "@/hooks/useModal";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Index";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contacts from "@/pages/Contacts";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
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
    } else if (user.role === 'lawyer') {
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
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <ModalProvider>
          <Router>
            <AppContent />
          </Router>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;