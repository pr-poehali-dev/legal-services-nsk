import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalProvider } from "@/hooks/useModal";
import Header from "@/components/Header";
import Home from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import PopupModal from "@/components/PopupModal";

function App() {
  return (
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
        </div>
      </Router>
    </ModalProvider>
  );
}

export default App;
