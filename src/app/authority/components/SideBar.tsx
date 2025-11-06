"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { colors, images } from "@/styles/assets";
import { useAuth } from "@/utils/Auth";
import { X } from "lucide-react";

type SideBarProps = {
  isMobile: boolean;
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onOpen: () => void;
  onRequestToggleCollapse?: (next: boolean) => void;
};

export default function SideBar({
  isMobile,
  isOpen,
  isCollapsed,
  onClose,
  onOpen,
  onRequestToggleCollapse,
}: SideBarProps) {
  const { setUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // keep parent's collapse state in sync if resize happens inside sidebar
    onRequestToggleCollapse?.(isCollapsed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed]);

  const menuItems = [
    { name: "Dashboard", icon: "/icons/dashboard-line.svg", activeIcon: "/icons/dashboard-fill.svg", path: "/authority" },
    { name: "Users", icon: "/icons/group-line.svg", activeIcon: "/icons/group-fill.svg", path: "/authority/users" },
    { name: "Event & Ticketing", icon: "/icons/calendar-schedule-line.svg", activeIcon: "/icons/calendar-schedule-line.svg", path: "/authority/events" },
    { name: "Revenue & Financial", icon: "/icons/cash-line.svg", path: "/authority/revenue", activeIcon: "/icons/cash-fill.svg" },
    { name: "Referrals", icon: "/icons/gift-2-line.svg", path: "/authority/referrals", activeIcon: "/icons/gift-2-fill.svg" },
    { name: "Marketing&Promotions", icon: "/icons/megaphone-line.svg", path: "/authority/marketing", activeIcon: "/icons/megaphone-fill.svg" },
    { name: "Security&Compliance", icon: "/icons/lock-line.svg", path: "/authority/security", activeIcon: "/icons/Vector.svg" },
    { name: "Customer Support", icon: "/icons/customer-service-2-line.svg", path: "/authority/support", activeIcon: "/images/customer-service-2-line.svg" },
    { name: "Loyalty & Gamification", icon: "/icons/medal-line.svg", path: "/authority/loyalty", activeIcon: "/icons/medal-fill.svg" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  // css widths must match TopBar calculation (full vs collapsed)
  const containerClass = isMobile
    ? // mobile: slide-in overlay style when open
      `fixed z-50 top-0 left-0 h-screen w-64 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`
    : // desktop: permanent sidebar (collapsed / full) - position fixed so topbar margin works
      `fixed z-50 top-0 left-0 h-screen transition-all duration-300 ${isCollapsed ? "w-[100px]" : "w-[260px]"}`;

  return (
    <>
      {/* mobile overlay background */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}

      <aside style={{ background: colors.bg1 }} className={containerClass}>
        <div className="flex flex-col justify-between h-full text-white">
          {/* header */}
          <div className="p-5 pb-4 flex items-center justify-between">
            <div className={`flex items-center ${isCollapsed ? "gap-2" : "gap-3"}`}>
              <Image src={images.raffle_logo} width={30} height={30} alt="Logo" />
              {!isCollapsed && <div className="text-xl font-bold leading-8 bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient( #2E1988, #351C91, #4725AB, #6432D4, #6834D9, #8A2CF4, #5F09AF, #170023)" }}>Baccvs</div>}
            </div>

            {/* close X on mobile */}
            {isMobile && (
              <button onClick={onClose} className="p-1">
                <X size={20} />
              </button>
            )}
          </div>

          {/* nav */}
          <div className="flex-1 overflow-y-auto scrollbar-hide px-3">
            <nav className="flex flex-col gap-1 mt-4 mb-1">
              {menuItems.map((item, idx) => {
                const isActive = pathname === item.path;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      router.push(item.path);
                      if (isMobile) onClose();
                    }}
                    className={`flex items-center rounded-md transition-colors cursor-pointer ${isCollapsed ? "justify-center py-4" : "gap-3 p-4"} ${isActive ? "bg-[#7039AC] text-white" : "hover:bg-[#7039AC]"}`}
                  >
                    <Image src={isActive ? item.activeIcon : item.icon} alt={item.name} width={20} height={20} className="w-5 h-5" />
                    {!isCollapsed && <span className="text-base font-medium">{item.name}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* footer (actions) */}
          <div className="p-4 pt-2 border-t border-[#5b2d96]/40">
            <button onClick={handleLogout} className={`flex items-center cursor-pointer w-full rounded-md transition-colors ${isCollapsed ? "justify-center py-3" : "gap-3 px-4 py-3"} hover:bg-[#7039AC]`}>
              <Image src="/icons/group-3-line.svg" alt="staffs" width={25} height={25} />
              {!isCollapsed && <span className="text-Color-Grey-400">Staffs</span>}
            </button>

            <button onClick={handleLogout} className={`mt-2 flex cursor-pointer items-center w-full rounded-md transition-colors ${isCollapsed ? "justify-center py-3" : "gap-3 px-4 py-3"} hover:bg-[#7039AC]`}>
              <Image src="/icons/settings-3-line.svg" alt="settings" width={25} height={25} />
              {!isCollapsed && <span className="text-Color-Grey-400">Settings</span>}
            </button>

            <button onClick={handleLogout} className={`mt-2 cursor-pointer flex items-center w-full rounded-md transition-colors ${isCollapsed ? "justify-center py-3" : "gap-3 px-4 py-3"} hover:bg-[#f50927]`}>
              <Image src="/icons/logout-circle-line.svg" alt="logout" width={25} height={25} />
              {!isCollapsed && <span className="text-Color-Grey-400">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
