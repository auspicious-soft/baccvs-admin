"use client";

import { colors } from "@/styles/assets";
import React, { ReactNode } from "react";

interface BlankModelProp {
  children: ReactNode;
  onClose?: () => void;
  userModal?: boolean;
}

const BlankModel: React.FC<BlankModelProp> = ({
  children,
  onClose,
  userModal = false,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose} // ✅ this will now properly trigger
      />

      {/* Modal content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative  bg-white rounded-[30px] shadow-lg max-w-fit p-7 z-10 flex flex-col items-center gap-4"
        style={userModal ? { boxShadow: `20px 20px ${colors.red}` } : {}}
      >
        {children}
      </div>
    </div>
  );
};

export default BlankModel;
