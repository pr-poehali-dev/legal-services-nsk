import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalProvider } from "@/hooks/useModal";
import Header from "@/components/Header";
import Home from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import PopupModal from "@/components/PopupModal";
import ConsultationModal from "@/components/ConsultationModal";

function App() {
  return (
    <ModalProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <PopupModal />
          <ConsultationModal />
        </div>
      </Router>
    </ModalProvider>
  );
}

export default App;
