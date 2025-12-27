import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectModal from "./components/ProjectModal";
import Archive from "./pages/Archive";
import CustomCursor from "./components/CustomCursor";
import CyberBackground from "./components/scene/CyberBackground";
import Preloader from "./components/Preloader";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function AppContent() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Main Routes - Render background location if modal is open, otherwise normal location */}
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="/works/:id" element={<ProjectDetail />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </AnimatePresence>

      {/* Modal Routes */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/works/:id" element={<ProjectModal />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden selection:bg-primary selection:text-primary-foreground transition-colors duration-500">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <div className="bg-grid" />
            <div className="bg-noise" />
            <CyberBackground />
            <CustomCursor />
            <Header />
            <AppContent />
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
