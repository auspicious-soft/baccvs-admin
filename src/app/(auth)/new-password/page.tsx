"use client";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import SignUpModals from "@/components/SignUpModals";
import { colors, H1, images, P_DARK } from "@/styles/assets";
import { useAuth } from "@/utils/Auth";
import api from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { setUser } = useAuth();
  const [payload, setPayload] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });
  const [validPassword, setValidPassword] = useState(false);

  const token = useSearchParams();

  const { mutate: submitPassword, isPending: submitPending } = useMutation({
    mutationFn: async (payloadData: { token: string; password: string }) => {
      const data = await api.post("reset-password", payloadData);
      return data;
    },
    onSuccess: async () => {
      setOpenModal(true);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      alert(err?.response?.data?.message || "Something went wrong");
    },
  });

  useEffect(() => {
    if (!payload.password && !payload.confirmPassword) {
      setValidPassword(false);
      return;
    }
    if (payload.password === payload.confirmPassword) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }, [payload.password, payload.confirmPassword]);

  const handleClick = () => {
    // Open Modal
    submitPassword({
      token: token.get("token") || "",
      password: payload.password,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && validPassword && !submitPending) {
      submitPassword({
        token: token.get("token") || "",
        password: payload.password,
      });
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
        <h1 className={H1}>Create New Password</h1>
        <p className={P_DARK}>
          Create a strong new password and confirm it to secure access.
        </p>
        <div className="flex gap-[18px] flex-col">
          <Input
            icon1="icons/lock.svg"
            icon2="icons/eye_open.svg"
            placeholder="New Password"
            type="password"
            onChange={(e) => setPayload({ ...payload, password: e })}
          />
          <Input
            icon1="icons/lock.svg"
            icon2="icons/eye_open.svg"
            placeholder="Confirm Password"
            type="password"
            onKeyDown={handleKeyPress}
            onChange={(e) => setPayload({ ...payload, confirmPassword: e })}
          />
          <Button
            text="Continue"
            icon={"icons/right_arrow_white.svg"}
            onClick={handleClick}
            disabled={!validPassword || submitPending}
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

      {/* Modal code */}
      <SignUpModals
        type={1}
        open={openModal}
        onClose={() => console.log("working")}
      />
      {/* Modal code */}
    </div>
  );
}
