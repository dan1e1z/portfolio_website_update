import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { FloatingNav } from "@/components/nav/FloatingNav";
import { MobileDock } from "@/components/nav/MobileDock";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import TerminalWindow from "@/components/TerminalWindow";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const Skills = lazy(() => import("@/pages/Skills"));

const App: React.FC = () => {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [, setIsSplit] = useState(false);
  const [, setSplitDirectory] = useState("");

  return (
  <Router>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grain relative min-h-svh w-full overflow-hidden bg-background">
        <FloatingNav onTerminal={() => setIsTerminalVisible(true)} />
        <MobileDock />
        {isTerminalVisible && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-background/75 p-4 backdrop-blur-md" onClick={() => setIsTerminalVisible(false)}>
            <div onClick={(event) => event.stopPropagation()}>
              <TerminalWindow setIsTerminalVisible={setIsTerminalVisible} setIsSplit={setIsSplit} setSplitDirectory={setSplitDirectory} />
            </div>
          </div>
        )}
        <main className="relative z-10 h-svh w-full overflow-hidden md:pt-20">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/skills" element={<Skills />} />
            </Routes>
          </Suspense>
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  </Router>
  );
};

export default App;
