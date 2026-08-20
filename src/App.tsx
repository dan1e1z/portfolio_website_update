import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Ellipsis } from "lucide-react";

// UI Components
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/AppSidebar";
import MobileNavigation from "@/components/sidebar/MobileNavigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Lazy load page components
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const Skills = lazy(() => import("@/pages/Skills"));

// Types
interface PageComponentMap {
  [key: string]: React.ComponentType;
}

// Update the constant mapping with lazy components
const PAGE_COMPONENTS: PageComponentMap = {
  home: Home,
  about: About,
  projects: Projects,
  contacts: Contacts,
  skills: Skills,
};

const KeyPressNavigation: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "1":
          navigate("/");
          break;
        case "2":
          navigate("/about");
          break;
        case "3":
          navigate("/projects");
          break;
        case "4":
          navigate("/contacts");
          break;
        case "5":
          navigate("/skills");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);

  return null;
};

const App: React.FC = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [splitDirectory, setSplitDirectory] = useState("");

  const renderRoutes = () => (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </Suspense>
  );

  const renderSplitView = () => {
    const SplitComponent = splitDirectory
      ? PAGE_COMPONENTS[splitDirectory]
      : null;

    return (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={50}
          minSize={30}
          className="bg-transparent"
        >
          <div className="h-full w-full bg-transparent">{renderRoutes()}</div>
        </ResizablePanel>
        <ResizableHandle className="w-2.5" />
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full w-full bg-transparent">
            <Suspense fallback={<LoadingSpinner />}>
              {SplitComponent ? <SplitComponent /> : null}
            </Suspense>
          </div>
        </ResizablePanel>
        <button
          className="fixed right-0 top-3 z-[100000] p-0 flex items-center justify-center overflow-hidden h-5 w-3"
          onClick={() => setIsSplit(false)}
        >
          <div className="transform -rotate-90">
            <Ellipsis className="h-5 w-5 block" />
          </div>
        </button>
      </ResizablePanelGroup>
    );
  };

  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <SidebarProvider>
          <div className="bg-sequoia-light dark:bg-sequoia-dark bg-cover h-svh w-svw">
            {/* Add a separate background overlay div */}
            <div className="absolute inset-0 bg-sidebar opacity-80" />
            {/* Move the content into a separate div without opacity */}
            <div className="relative z-10 flex h-svh w-svw backdrop-blur-2xl">
              <KeyPressNavigation />
              <AppSidebar
                setIsSplit={setIsSplit}
                setSplitDirectory={setSplitDirectory}
              />

              <SidebarInset className="flex-1 overflow-hidden">
                <main className="h-full w-full bg-transparent">
                  <>
                    {isSplit ? (
                      renderSplitView()
                    ) : (
                      <div className="flex flex-col h-full w-full bg-transparent">
                        {renderRoutes()}
                        <MobileNavigation />
                      </div>
                    )}
                    <Toaster />
                  </>
                </main>
              </SidebarInset>
            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
