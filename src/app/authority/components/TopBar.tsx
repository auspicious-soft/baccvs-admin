"use client";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function TopBar({ children }: { children: React.ReactNode }) {
  // state owned by parent/layout so we can compute children width reliably
  const [isMobile, setIsMobile] = useState(false);      // width <= 535
  const [isCollapsed, setIsCollapsed] = useState(false); // 536..999 collapsed
  const [sidebarOpen, setSidebarOpen] = useState(true); // visible (or mobile open)

  // widths (tweak to match your tailwind sizes)
  const FULL_WIDTH = 260;     // full sidebar width (px)
  const COLLAPSED_WIDTH = 100; // collapsed width (px)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      if (w <= 535) {
        // mobile: hide sidebar by default, show hamburger
        setIsMobile(true);
        setIsCollapsed(false);
        setSidebarOpen(false);
      } else if (w < 1000) {
        // collapsed for widths 536..999 (note: <1000, not <=)
        setIsMobile(false);
        setIsCollapsed(true);
        setSidebarOpen(true);
      } else {
        // full for >= 1000
        setIsMobile(false);
        setIsCollapsed(false);
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // compute main content margin-left
  const sideWidth = isMobile || !sidebarOpen ? 0 : isCollapsed ? COLLAPSED_WIDTH : FULL_WIDTH;

  return (
    <div className="flex min-h-screen w-full bg-[#0F0817] text-white relative">
      {/* SideBar - controlled by parent */}
      <SideBar
        isMobile={isMobile}
        isOpen={sidebarOpen}
        isCollapsed={isCollapsed}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
        onRequestToggleCollapse={(next) => setIsCollapsed(next)}
      />

      {/* Top bar + content */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sideWidth }}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-[#2D1B4E] bg-[#170023]/50 backdrop-blur-md">
          <div className="flex items-center gap-4 w-full">
            {/* hamburger only on mobile */}
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                <Menu size={26} className="text-white" />
              </button>
            )}

            <input
              type="text"
              placeholder="Search..."
              className="bg-[#1E0E33] w-[30%] text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8A2CF4] max-sm:w-[60%]"
            />

            <div className="ml-auto flex gap-4 items-center">
              <Image src="/icons/bellSimple.svg" alt="bell" width={24} height={24} className="cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-[#8A2CF4] flex items-center justify-center font-bold text-sm">B</div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide p-6 bg-[#0D001D] transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
