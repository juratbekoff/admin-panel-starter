import React, { useState } from "react";
import { Menu, LogOut, LayoutDashboard } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  allowedRoles?: string[];
};

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const isActive = (url: string): boolean => {
    if (url === "/" && location.pathname === "/") {
      return true;
    }
    return url !== "/" && location.pathname.startsWith(url);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
    return;
  };

  return (
    <div
      className="h-screen max-lg:hidden sticky top-0 transition-all duration-300 ease-in-out bg-background border-r overflow-hidden flex flex-col"
      style={{ minWidth: collapsed ? "64px" : "200px" }}
    >
      <div className="flex items-center h-16 px-4 border-b justify-between">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            collapsed ? "w-0" : "w-36"
          )}
        >
          <h1 className="text-lg font-semibold text-[#242E41] whitespace-nowrap">
            ADMIN
          </h1>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "h-8 w-8 flex-shrink-0 inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-transform duration-300",
            collapsed ? "rotate-180" : ""
          )}
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <nav className="py-4 px-2 w-full flex-grow">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.url)
                  ? "bg-accent text-[#242E41]"
                  : "transparent hover:bg-accent hover:text-accent-foreground",
                collapsed ? "justify-center pr-0" : ""
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isActive(item.url)
                    ? "text-[#242E41]"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span
                className={cn(
                  "ml-3 whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden",
                  collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                )}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-auto border-t pt-3">
        <div
          className={cn(
            "mx-2 p-3 rounded-lg bg-slate-50 transition-all duration-300",
            collapsed
              ? "flex justify-center items-center"
              : "flex items-center gap-3"
          )}
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            {"A"}
          </div>

          <div
            className={cn(
              "transition-all duration-300 overflow-hidden",
              collapsed ? "w-0 opacity-0" : "flex-1 opacity-100"
            )}
          >
            <div className="truncate font-medium text-sm">Admin</div>
            <div className="text-xs text-slate-500 truncate">admin</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className={cn(
            "mx-2 mt-3 mb-2 flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            "bg-red-50 text-red-600 hover:bg-red-100",
            collapsed ? "justify-center w-10 h-10 mx-auto" : "w-full"
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0 rotate-180" />

          <span
            className={cn(
              "ml-2 whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            Chiqish
          </span>
        </button>
      </div>
    </div>
  );
}
