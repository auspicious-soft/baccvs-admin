"use client";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/Button";
import { colors, H1, images, P_DARK } from "@/styles/assets";
import { useAuth } from "@/utils/Auth";
import api from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";

export default function Page() {
  const length = 6; // OTP length
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { setUser, user } = useAuth() as any;

  const { mutate: submitOtp, isPending: submitPending } = useMutation({
    mutationFn: async (payloadData: { method: string; code: string }) => {
      const data = await api.post("user/verify-phone", payloadData);
      return data;
    },
    onSuccess: async (data) => {
      setUser({ ...user, isVerifiedPhone: true });
      router.push("/");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      alert(err?.response?.data?.message || "Something went wrong");
    },
  });

  const { mutate: resendOtp, isPending: resendPending } = useMutation({
    mutationFn: async (payloadData: { value: string }) => {
      const res = await api.post("resend-otp", payloadData);
      return res.data;
    },
    onSuccess: () => {
      router.push("/");
      alert("OTP Sent Again");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      alert(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // move to next input if value is entered
      if (value && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // move focus back if current is empty
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("Text")
      .slice(0, length)
      .split("");
    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      if (/^[0-9]$/.test(char)) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
    // focus the next empty box
    const nextIndex =
      pastedData.length >= length ? length - 1 : pastedData.length;
    inputsRef.current[nextIndex]?.focus();
  };

  const handleSubmit = () => {
    const code = otp.join("");
    if (code.length === length) {
      submitOtp({ method: user?.phoneNumber, code: code });
    } else {
      alert("Please enter complete OTP.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center flex-col gap-6`}
      style={{
        backgroundColor: colors.bg1,
        backgroundImage: `url('${images.bg_auth}')`,
      }}
    >
      <Image
        src={images.raffle_logo}
        alt="Raffle Logo"
        width={220}
        height={220}
      />
      <AuthCard className="gap-2">
        <h1 className={H1}>Enter OTP</h1>
        <p className={P_DARK}>
          Enter the one-time code sent to your registered phone number.
        </p>
        <div className="flex gap-[18px] flex-col">
          <div className="flex gap-3 items-center justify-center">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                maxLength={1}
                className="text-center text-xl border font-[#888888] px-4 py-3 w-12 h-12 rounded-[99px] outline-none border-[#888888]"
              />
            ))}
          </div>
          <Button
            text="Continue"
            disabled={otp.every((val) => !val) || submitPending}
            icon={"icons/right_arrow_white.svg"}
            onClick={handleSubmit}
          />
        </div>
        <span className="my-2">
          <span
            className="border-b-[1px] cursor-pointer"
            onClick={() =>
              !resendPending && resendOtp({ value: user.phoneNumber || "" })
            }
          >
            Resent Otp
          </span>
        </span>
      </AuthCard>
    </div>
  );
}
