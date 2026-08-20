import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { MenuItem } from "@/types/sidebar";
import { items } from "@/data/menu";
import { MobileThemeToggle } from "@/components/MobileThemeToggle";

const MobileNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <div className="block md:hidden z-50">
      <div className="flex items-center justify-between p-2 bg-transparent backdrop-blur-md">
        <div className="flex space-x-6 justify-center flex-1">
          {items.map((item: MenuItem) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex flex-col items-center ${
                location.pathname === item.url
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.title}</span>
            </Link>
          ))}
          <MobileThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
