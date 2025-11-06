"use client";

import { H1, images, P_DARK } from "@/styles/assets";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface SignUpModalsProps {
  type: number;
  open: boolean;
  onClose?: () => void;
}

const SignUpModals: React.FC<SignUpModalsProps> = ({ type, open, onClose }) => {
  const router = useRouter();

  if (!open) return null; // <-- don’t render if modal is closed

  const data =
    type === 1
      ? {
          image: images.password_reset,
          title: "Password Updated",
          subTitle: "Your password has been updated successfully!",
          btnText: "Login",
          link: "/",
        }
      : {
          image: images.account_create,
          title: "Account Created",
          subTitle: "Your account has been created. Login to continue..",
          btnText: "Login",
          link: "/",
        };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-white rounded-[30px] shadow-lg w-[100%] max-w-md p-7 z-10 flex flex-col items-center gap-4">
        {/* Image */}
        <Image
          src={data.image}
          alt="Modal Icon"
          width={80}
          height={80}
          className="mb-2"
        />

        {/* Title */}
        <div className="flex flex-col gap-3 mt-2 mb-2">
          <h1 className={`${H1} text-center`}>{data.title}</h1>

          {/* Subtitle */}
          <p className={`${P_DARK} text-center`}>{data.subTitle}</p>
        </div>

        {/* Button */}
        <Button text={data.btnText} onClick={() => router.push(data.link)} />

        {/* Optional Close (top-right) */}
        {/* {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        )} */}
      </div>
    </div>
  );
};

export default SignUpModals;
