"use client";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { colors, H1, images, P_DARK } from "@/styles/assets";
import api from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const { mutate: submitForgetPassword, isPending: submitPending } =
    useMutation({
      mutationFn: async (payloadData: { email: string }) => {
        const res = await api.post("forget-password", payloadData);
        return res.data;
      },
      onSuccess: () => {
        router.push(`/otp?email=${email}&type=forget`);
      },
      onError: (error) => {
        const err = error as AxiosError<{ message: string }>;
        alert(err?.response?.data?.message || "Something went wrong");
      },
    });

  const handleClick = () => {
    submitForgetPassword({ email });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && validEmail && !submitPending) {
      submitForgetPassword({ email });
    }
  };

  useEffect(() => {
    if (email.trim() === "") {
      setValidEmail(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);
  return (
    <div
      className={`bg-[${colors.bg1}] min-h-full flex items-center justify-center flex-col gap-6`}
      style={{ backgroundImage: `url('${images.bg_auth}')` }}
    >
      <Image
        src={images.raffle_logo}
        alt="Raffle Logo"
        width={220}
        height={220}
      />
      <AuthCard className="gap-2">
        <h1 className={H1}>Forgot Password?</h1>
        <p className={P_DARK}>
          Reset your password by email link and set a new one securely
        </p>
        <div className="flex gap-[18px] flex-col">
          <Input
            icon1="icons/email.svg"
            placeholder="Email Address"
            type="text"
            onKeyDown={handleKeyPress}
            onChange={(e) => setEmail(e)}
          />
          <Button
            text="Verify Email"
            icon={"icons/right_arrow_white.svg"}
            onClick={handleClick}
            disabled={!validEmail || submitPending}
          />
        </div>
        <span className="my-2">
          Remember Password?{" "}
          <span
            className="border-b-[1px] cursor-pointer"
            onClick={() => router.push("/")}
          >
            Login
          </span>
        </span>
      </AuthCard>
    </div>
  );
}
