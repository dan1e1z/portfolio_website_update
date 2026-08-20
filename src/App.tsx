import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { FloatingNav } from "@/components/nav/FloatingNav";
import { MobileDock } from "@/components/nav/MobileDock";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const Skills = lazy(() => import("@/pages/Skills"));

const App: React.FC = () => (
  <Router>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grain relative min-h-svh w-full overflow-hidden bg-[#1c1915]">
        <FloatingNav />
        <MobileDock />
        <main className="relative z-10 min-h-svh w-full">
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

export default App;
