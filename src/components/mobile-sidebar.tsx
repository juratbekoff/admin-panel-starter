import React from "react";
import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { useMenuModal } from "@/hooks/useZustand";
import { menuItems } from "./sidebar";

const MobileSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const { onClose } = useMenuModal();

  // This will be the content of your custom modal/sheet
  return (
    <div className="flex flex-col gap-3 h-full  w-full">
      {/* Header */}
      <div className="flex items-center justify-between h-16 border-b">
        <h1 className="text-lg font-semibold text-[#242E41]">GatePass</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              onClick={onClose}
              className={cn(
                "flex items-center rounded-md px-3 py-3 text-sm font-medium transition-colors",
                isActive(item.url)
                  ? "bg-accent text-[#242E41]"
                  : "transparent hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 mr-3",
                  isActive(item.url)
                    ? "text-[#242E41]"
                    : "text-muted-foreground"
                )}
              />
              {item.title}
            </Link>
          ))}
        </div>
      </nav>

      {/* User Profile and Logout */}
      <div className="mt-auto">
        {/* User Profile */}
        <div className="p-3 rounded-lg bg-slate-50 flex items-center gap-3 mb-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            {"U"}
          </div>
          <div className="flex-1">
            <div className="font-medium">Admin</div>
            <div className="text-xs text-slate-500">admin</div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center rounded-lg px-3 py-3 text-sm font-medium transition-colors bg-red-50 text-red-600 hover:bg-red-100"
        >
          <LogOut className="w-5 h-5 mr-2 rotate-180" />
          Chiqish
        </button>
      </div>
    </div>
  );
};

export default MobileSidebar;
