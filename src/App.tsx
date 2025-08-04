import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalProvider } from "@/hooks/useModal";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Home from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import PopupModal from "@/components/PopupModal";
import ConsultationModal from "@/components/ConsultationModal";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ModalProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
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
    </ThemeProvider>
  );
}

export default App;