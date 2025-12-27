import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Archive from "./pages/Archive";
import CustomCursor from "./components/CustomCursor";
import CyberBackground from "./components/scene/CyberBackground";
import Preloader from "./components/Preloader";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/works/:id" element={<ProjectDetail />} />
              <Route path="/archive" element={<Archive />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
