import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { Terminal } from "lucide-react";
import {
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { SocialButtons } from "./SocialButtons";
import type { MenuItem } from "@/types/sidebar";
import { items } from "@/data/menu";

interface DesktopSidebarProps {
  isTerminalVisible: boolean;
  toggleTerminal: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isTerminalVisible,
  toggleTerminal,
}) => {
  const location = useLocation();

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      side="left"
      className="h-screen flex flex-col"
    >
      <SidebarTrigger className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2" />
      <SidebarContent className="flex-grow overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>Contact Me</SidebarGroupLabel>
          <SocialButtons />
          <SidebarSeparator />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item: MenuItem) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      <span className="ml-auto text-xs tracking-widest text-muted-foreground w-5 h-6 flex items-center justify-center">
                        {item.keyShortcut}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarSeparator />
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={toggleTerminal}
                  data-state={isTerminalVisible ? "active" : "inactive"}
                  className="relative"
                >
                  <Terminal className="h-4 w-4" />
                  <span>Terminal</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <ModeToggle />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
