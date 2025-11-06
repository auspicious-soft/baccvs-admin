"use client";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { colors, H1, images, P_DARK } from "@/styles/assets";
import { useAuth } from "@/utils/Auth";
import api from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: submitLogin, isPending: submitPending } = useMutation({
    mutationFn: async (payloadData: { email: string; password: string }) => {
      const data = await api.post("login", payloadData);
      return data;
    },
    onSuccess: async (data) => {
      setUser(data.data.data);
      if (data.data.data.role === "USER") {
        router.push(`/user`);
      } else {
        router.push(`/admin`);
      }
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      alert(err?.response?.data?.message || "Something went wrong");
    },
  });

  const disabled = !userName || !password;

  const handleLogin = () => {
    if (disabled || submitPending) return;
    submitLogin({ email: userName, password });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled && !submitPending) {
      handleLogin();
    }
  };

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
        <h1 className={H1}>Login To Your Account</h1>
        <p className={P_DARK}>
          Sign in with email and password to securely access your account.
        </p>
        <div className="flex gap-[18px] flex-col">
          <Input
            icon1="icons/email.svg"
            placeholder="Email Address"
            type="text"
            onChange={(e) => setUserName(e)}
            onKeyDown={handleKeyPress}
          />
          <Input
            icon1="icons/lock.svg"
            icon2="icons/eye_open.svg"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <span
          className="mb-2 w-full flex justify-end cursor-pointer"
          onClick={() => router.push("/forget-password")}
        >
          Forget Password?
        </span>
        <Button
          text="Login"
          icon={"icons/right_arrow_white.svg"}
          onClick={handleLogin}
          disabled={disabled || submitPending}
        />
        <span className="my-2">
          Don’t have an account?{" "}
          <span
            className="border-b-[1px] cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Create One.
          </span>
        </span>
      </AuthCard>
    </div>
  );
}
