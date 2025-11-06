"use client";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { colors, H1, images, P_DARK } from "@/styles/assets";
import api from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const [validUserName, setValidUserName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    userName: "",
    confirmPassword: "",
  });

  const [usernameMessage, setUsernameMessage] = useState<string | null>(null);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  // Mutation for username check
  const { mutate: checkUserName, isPending } = useMutation({
    mutationFn: async (payloadData: { userName: string }) => {
      const res = await api.post("check-username", payloadData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.data?.available) {
        setValidUserName(true);
        setUsernameMessage("✅");
      } else {
        setValidUserName(false);
        setUsernameMessage("❌");
      }
    },
    onError: () => {
      setValidUserName(false);
      setUsernameMessage("❌ Error checking username");
    },
  });

  const { mutate: submitRegistration, isPending: submitPending } = useMutation({
    mutationFn: async (payloadData: { userName: string }) => {
      const res = await api.post("register", payloadData);
      return res.data;
    },
    onSuccess: (data) => {
      router.push(`/otp?email=${data.data.email}`);
    },
    onError: () => {
      console.log("error resigtration");
    },
  });

  // Debounce user input for username check
  useEffect(() => {
    if (payload.userName.trim().length > 2) {
      const delayDebounce = setTimeout(() => {
        checkUserName({ userName: payload.userName });
      }, 500);
      return () => clearTimeout(delayDebounce);
    } else {
      setUsernameMessage(null);
      setValidUserName(false);
    }
  }, [payload.userName]);

  // Email validation
  useEffect(() => {
    if (payload.email.trim() === "") {
      setEmailMessage(null);
      setValidEmail(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(payload.email)) {
      setEmailMessage("✅");
      setValidEmail(true);
    } else {
      setEmailMessage("❌");
      setValidEmail(false);
    }
  }, [payload.email]);

  // Password confirmation validation
  useEffect(() => {
    if (!payload.password && !payload.confirmPassword) {
      setPasswordMessage(null);
      setValidPassword(false);
      return;
    }
    if (payload.password === payload.confirmPassword) {
      setPasswordMessage("✅");
      setValidPassword(true);
    } else {
      setPasswordMessage("❌");
      setValidPassword(false);
    }
  }, [payload.password, payload.confirmPassword]);

  const handleSubmit = () => {
    submitRegistration(payload);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isFormValid && !isPending && !submitPending) {
      handleSubmit();
    }
  };

  const isFormValid = validUserName && validEmail && validPassword;

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
        <h1 className={H1}>Join The Raffle Fun!</h1>
        <p className={P_DARK}>
          By continuing, you agree to our{" "}
          <span style={{ color: colors.red }}>Terms</span> &{" "}
          <span style={{ color: colors.red }}>Privacy Policy.</span>
        </p>
        <div className="flex gap-[18px] flex-col">
          {/* Email */}
          <div className="flex flex-col relative">
            <Input
              icon1="icons/email.svg"
              placeholder="Email Address"
              type="email"
              value={payload.email}
              onChange={(data) => setPayload({ ...payload, email: data })}
            />
            {emailMessage && (
              <p
                className={`text-[18px] absolute top-[20%] right-[-25px] ${
                  emailMessage.includes("✅")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {emailMessage}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="flex flex-col relative">
            <Input
              icon1="icons/username.svg"
              placeholder="Select Username"
              type="text"
              value={payload.userName}
              onChange={(data) => setPayload({ ...payload, userName: data })}
            />
            {usernameMessage && (
              <p
                className={`text-[18px] absolute top-[20%] right-[-25px] ${
                  usernameMessage.includes("✅")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {usernameMessage}
              </p>
            )}
          </div>

          {/* Password */}
          <Input
            icon1="icons/lock.svg"
            icon2="icons/eye_open.svg"
            placeholder="Password"
            type="password"
            value={payload.password}
            onChange={(data) => setPayload({ ...payload, password: data })}
          />

          {/* Confirm Password */}
          <div className="flex flex-col relative">
            <Input
              icon1="icons/lock.svg"
              icon2="icons/eye_open.svg"
              placeholder="Confirm Password"
              type="password"
              value={payload.confirmPassword}
              onChange={(data) =>
                setPayload({ ...payload, confirmPassword: data })
              }
              onKeyDown={handleKeyPress}
            />
            {passwordMessage && (
              <p
                className={`text-[18px] absolute top-[20%] right-[-25px] ${
                  passwordMessage.includes("✅")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {passwordMessage}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            text={isPending ? "Checking..." : "Continue"}
            icon={"icons/right_arrow_white.svg"}
            onClick={handleSubmit}
            disabled={!isFormValid || isPending || submitPending}
          />
        </div>

        <span className="my-2">
          Already have an account?{" "}
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
