// import { useState, useEffect, useCallback, useRef } from "react";
// import { Terminal, Instagram, Linkedin, Github } from "lucide-react";
// import { useLocation, Link } from "react-router-dom";
//
// import {
//   SidebarTrigger,
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarSeparator,
// } from "@/components/ui/sidebar";
// // import { useSidebar } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
// import TerminalWindow from "@/components/TerminalWindow";
// import { ModeToggle } from "@/components/ModeToggle";
// import { items } from "@/data/menu";
//
// interface AppSidebarProps {
//   setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
//   setSplitDirectory: React.Dispatch<React.SetStateAction<string>>;
// }
//
// export function AppSidebar({ setIsSplit, setSplitDirectory }: AppSidebarProps) {
//   const [isTerminalVisible, setIsTerminalVisible] = useState(false);
//   const terminalRef = useRef<HTMLDivElement>(null);
//   const location = useLocation();
//
//   const toggleTerminal = useCallback(() => {
//     setIsTerminalVisible((prev) => !prev);
//   }, []);
//
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape" && isTerminalVisible) {
//         setIsTerminalVisible(false);
//       }
//     };
//
//     window.addEventListener("keydown", handleKeyDown);
//
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isTerminalVisible]);
//
//   // const {
//   // state,
//   // open,
//   // setOpen,
//   // openMobile,
//   // setOpenMobile,
//   // isMobile,
//   // toggleSidebar,
//   // } = useSidebar();
//
//   // console.log("state", state);
//   // console.log("open", open);
//   // console.log("setOpen", setOpen);
//   // console.log("openMobile", openMobile);
//   // console.log("setOpenMobile", setOpenMobile);
//   // console.log("isMobile", isMobile);
//   // console.log("toggleSidebar", toggleSidebar);
//
//   return (
//     <>
//       <Sidebar
//         collapsible="icon"
//         variant="inset"
//         className="flex flex-row"
//         side="left"
//       >
//         <SidebarTrigger className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2" />
//
//         <SidebarContent>
//           <SidebarGroup>
//             <SidebarGroupLabel>Contact Me</SidebarGroupLabel>
//
//             <div className="flex justify-center items-center gap-6 py-4">
//               <a
//                 href="https://www.instagram.com/daniel_lindsayshad/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   className="rounded-ss bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600"
//                 >
//                   <Instagram className="h-5 w-5 text-white" />
//                 </Button>
//               </a>
//               <a
//                 href="https://www.linkedin.com/in/daniel-lindsay-shad-148073224/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   className="rounded-ss bg-blue-600 text-white hover:bg-blue-700"
//                 >
//                   <Linkedin className="h-5 w-5 text-white" />
//                 </Button>
//               </a>
//               <a
//                 href="https://github.com/dan1e1z"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   className="rounded-ss bg-gray-700 text-white hover:bg-gray-800"
//                 >
//                   <Github className="h-5 w-5 text-white" />
//                 </Button>
//               </a>
//             </div>
//
//             <SidebarSeparator />
//
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {items.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       asChild
//                       isActive={location.pathname === item.url}
//                     >
//                       <Link to={item.url} className="flex items-center gap-2">
//                         <item.icon className="h-4 w-4" />
//                         <span>{item.title}</span>
//                         <span className="ml-auto text-xs tracking-widest text-muted-foreground w-5 h-6 flex items-center justify-center">
//                           {item.keyShortcut}
//                         </span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//
//                 <SidebarSeparator />
//
//                 <SidebarMenuItem>
//                   <SidebarMenuButton
//                     onClick={toggleTerminal}
//                     data-state={isTerminalVisible ? "active" : "inactive"}
//                     className="relative"
//                   >
//                     <Terminal className="h-4 w-4" />
//                     <span>Terminal</span>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//
//                 <ModeToggle />
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>
//       </Sidebar>
//
//       {isTerminalVisible && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div ref={terminalRef}>
//             <TerminalWindow
//               setIsTerminalVisible={setIsTerminalVisible}
//               setIsSplit={setIsSplit}
//               setSplitDirectory={setSplitDirectory}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// TEST1
// import { useState, useEffect, useCallback, useRef } from "react";
// import { Terminal, Instagram, Linkedin, Github } from "lucide-react";
// import { useLocation, Link } from "react-router-dom";
//
// import {
//   SidebarTrigger,
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarSeparator,
// } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
// import TerminalWindow from "@/components/TerminalWindow";
// import { ModeToggle } from "@/components/ModeToggle";
// import { items } from "@/data/menu";
//
// interface AppSidebarProps {
//   setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
//   setSplitDirectory: React.Dispatch<React.SetStateAction<string>>;
// }
//
// export function AppSidebar({ setIsSplit, setSplitDirectory }: AppSidebarProps) {
//   const [isTerminalVisible, setIsTerminalVisible] = useState(false);
//   const terminalRef = useRef<HTMLDivElement>(null);
//   const location = useLocation();
//
//   const toggleTerminal = useCallback(() => {
//     setIsTerminalVisible((prev) => !prev);
//   }, []);
//
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape" && isTerminalVisible) {
//         setIsTerminalVisible(false);
//       }
//     };
//
//     window.addEventListener("keydown", handleKeyDown);
//
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isTerminalVisible]);
//
//   const renderSocialButtons = () => (
//     <div className="flex justify-center items-center gap-6 py-4">
//       <a
//         href="https://www.instagram.com/daniel_lindsayshad/"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <Button
//           size="icon"
//           variant="ghost"
//           className="rounded-ss bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600"
//         >
//           <Instagram className="h-5 w-5 text-white" />
//         </Button>
//       </a>
//       <a
//         href="https://www.linkedin.com/in/daniel-lindsay-shad-148073224/"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <Button
//           size="icon"
//           variant="ghost"
//           className="rounded-ss bg-blue-600 text-white hover:bg-blue-700"
//         >
//           <Linkedin className="h-5 w-5 text-white" />
//         </Button>
//       </a>
//       <a
//         href="https://github.com/dan1e1z"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <Button
//           size="icon"
//           variant="ghost"
//           className="rounded-ss bg-gray-700 text-white hover:bg-gray-800"
//         >
//           <Github className="h-5 w-5 text-white" />
//         </Button>
//       </a>
//     </div>
//   );
//
//   const renderSidebarContent = () => (
//     <SidebarContent>
//       <SidebarGroup>
//         <SidebarGroupLabel>Contact Me</SidebarGroupLabel>
//         {renderSocialButtons()}
//         <SidebarSeparator />
//         <SidebarGroupContent>
//           <SidebarMenu>
//             {items.map((item) => (
//               <SidebarMenuItem key={item.title}>
//                 <SidebarMenuButton
//                   asChild
//                   isActive={location.pathname === item.url}
//                 >
//                   <Link to={item.url} className="flex items-center gap-2">
//                     <item.icon className="h-4 w-4" />
//                     <span>{item.title}</span>
//                     <span className="ml-auto text-xs tracking-widest text-muted-foreground w-5 h-6 flex items-center justify-center">
//                       {item.keyShortcut}
//                     </span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//             <SidebarSeparator />
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 onClick={toggleTerminal}
//                 data-state={isTerminalVisible ? "active" : "inactive"}
//                 className="relative"
//               >
//                 <Terminal className="h-4 w-4" />
//                 <span>Terminal</span>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//             <ModeToggle />
//           </SidebarMenu>
//         </SidebarGroupContent>
//       </SidebarGroup>
//     </SidebarContent>
//   );
//
//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <Sidebar
//         collapsible="icon"
//         variant="inset"
//         className="hidden md:flex flex-row"
//         side="left"
//       >
//         <SidebarTrigger className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2" />
//         {renderSidebarContent()}
//       </Sidebar>
//
//       {/* Mobile Navigation */}
//       <div className="md:hidden">
//         <div className="fixed bottom-0 left-0 right-0 z-40">
//           <div className="relative">
//             {/* Background with opacity */}
//             <div className="absolute inset-0 bg-sidebar opacity-80" />
//             {/* Content with backdrop blur */}
//             <div className="relative backdrop-blur-2xl border-t">
//               <div className="flex items-center justify-between px-4 py-2">
//                 <div className="flex-1" />
//                 <div className="flex space-x-6 justify-center flex-1">
//                   {items.map((item) => (
//                     <Link
//                       key={item.title}
//                       to={item.url}
//                       className={`flex flex-col items-center ${
//                         location.pathname === item.url
//                           ? "text-primary"
//                           : "text-muted-foreground"
//                       }`}
//                     >
//                       <item.icon className="h-5 w-5" />
//                       <span className="text-xs mt-1">{item.title}</span>
//                     </Link>
//                   ))}
//                 </div>
//                 <div className="flex-1 flex justify-end">
//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     onClick={toggleTerminal}
//                     className="text-foreground"
//                   >
//                     <Terminal className="h-5 w-5" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//
//       {/* Terminal Window */}
//       {isTerminalVisible && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div ref={terminalRef}>
//             <TerminalWindow
//               setIsTerminalVisible={setIsTerminalVisible}
//               setIsSplit={setIsSplit}
//               setSplitDirectory={setSplitDirectory}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// TEST2 - WORKING

import { useState, useEffect, useCallback, useRef } from "react";
import { DesktopSidebar } from "@/components/sidebar/DesktopSidebar";
import TerminalWindow from "@/components/TerminalWindow";
import type { AppSidebarProps } from "@/types/sidebar";

export function AppSidebar({ setIsSplit, setSplitDirectory }: AppSidebarProps) {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const toggleTerminal = useCallback(() => {
    setIsTerminalVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isTerminalVisible) {
        setIsTerminalVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTerminalVisible]);

  return (
    <>
      <DesktopSidebar
        isTerminalVisible={isTerminalVisible}
        toggleTerminal={toggleTerminal}
      />

      {isTerminalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={terminalRef}>
            <TerminalWindow
              setIsTerminalVisible={setIsTerminalVisible}
              setIsSplit={setIsSplit}
              setSplitDirectory={setSplitDirectory}
            />
          </div>
        </div>
      )}
    </>
  );
}
