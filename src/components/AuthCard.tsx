import { colors } from "@/styles/assets";
import React from "react";

export default function AuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col rounded-[30px] p-10 w-[470px] shadow-amber-700 bg-white text-center ${
        className ?? ""
      }`}
      style={{boxShadow:`20px 20px ${colors.red}`}}
    >
      {children}
    </div>
  );
}
