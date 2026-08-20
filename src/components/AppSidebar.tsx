import React, { useCallback, useEffect, useRef, useState } from "react";
import { DesktopSidebar } from "@/components/sidebar/DesktopSidebar";
import TerminalWindow from "@/components/TerminalWindow";

interface AppSidebarProps {
  setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
  setSplitDirectory: React.Dispatch<React.SetStateAction<string>>;
}

export function AppSidebar({ setIsSplit, setSplitDirectory }: AppSidebarProps) {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const toggleTerminal = useCallback(() => setIsTerminalVisible((visible) => !visible), []);

  useEffect(() => {
    if (!isTerminalVisible) return;
    const handleKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setIsTerminalVisible(false);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTerminalVisible]);

  return (
    <>
      <DesktopSidebar isTerminalVisible={isTerminalVisible} toggleTerminal={toggleTerminal} />
      {isTerminalVisible && <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-md" onClick={() => setIsTerminalVisible(false)}><div ref={terminalRef} onClick={(event) => event.stopPropagation()}><TerminalWindow setIsTerminalVisible={setIsTerminalVisible} setIsSplit={setIsSplit} setSplitDirectory={setSplitDirectory} /></div></div>}
    </>
  );
}
