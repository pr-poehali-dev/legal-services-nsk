import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalProvider } from "@/hooks/useModal";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

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
        </div>
      </Router>
    </ModalProvider>
  );
}

export default App;
