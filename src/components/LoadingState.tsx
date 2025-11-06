"use client";
import React from "react";

export default function LoadingState() {
  return (
    <div className="flex justify-center items-center w-full h-full p-6">
      <div className="w-10 h-10 border-4 border-[#fffff] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
