import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { FloatingNav } from "@/components/nav/FloatingNav";
import { MobileDock } from "@/components/nav/MobileDock";
import TerminalWindow from "@/components/TerminalWindow";
import PortfolioCanvas from "@/components/PortfolioCanvas";
import { SmoothScroll } from "@/components/SmoothScroll";

const App: React.FC = () => {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [, setIsSplit] = useState(false);
  const [, setSplitDirectory] = useState("");

  return (
  <Router>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SmoothScroll>
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
        <main className="relative z-10 w-full pb-[calc(4rem+env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] md:pb-[calc(5rem+env(safe-area-inset-bottom))] md:pt-[env(safe-area-inset-top)]">
          <PortfolioCanvas />
        </main>
        <Toaster />
      </div>
      </SmoothScroll>
    </ThemeProvider>
  </Router>
  );
};

export default App;
