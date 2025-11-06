"use client";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { colors, H1, images, PHUDU } from "@/styles/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Country, State, ICountry, IState } from "country-state-city";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import api from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/utils/Auth";

interface Option<T> {
  label: string;
  value: string;
  raw: T;
}

export default function Page() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<ICountry | null>(null);
  const [state, setState] = useState<IState | null>(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [stateList, setStateList] = useState<Option<IState>[]>([]);
  const { user, setUser, isLoading } = useAuth() as any;

  const countries: Option<ICountry>[] = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode,
    raw: c,
  }));

  const router = useRouter();

  const { mutate: submitAddress, isPending: submitPending } = useMutation({
    mutationFn: async (payloadData: {
      country: string;
      state: string;
      address: string;
      city: string;
      postalCode: string;
      phoneNumber: string;
    }) => {
      const data = await api.post("user/shipping-details", payloadData);
      return data;
    },
    onSuccess: async () => {
      setUser({ ...user, hasShippingDetails: true, phoneNumber: phone });
      router.push(`/otp-phone`);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      alert(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleClick = () => {
    if (!country || !state) return;
    submitAddress({
      country: country.name,
      state: state.name,
      address: street,
      city,
      postalCode,
      phoneNumber: phone,
    });
  };

  useEffect(() => {
    if (country?.isoCode) {
      const states = State.getStatesOfCountry(country.isoCode).map((s) => ({
        label: s.name,
        value: s.isoCode,
        raw: s,
      }));
      setStateList(states);
      setState(null); // reset state if country changes
    }
  }, [country]);

  // Validation check
  const isFormValid =
    country &&
    state &&
    street.trim() !== "" &&
    city.trim() !== "" &&
    postalCode.trim() !== "";

  return (
    <div
      className={`bg-[${colors.bg1}] font-medium min-h-full flex items-center justify-center flex-col gap-6`}
      style={{ backgroundImage: `url('${images.bg_auth}')` }}
    >
      <Image
        src={images.raffle_logo}
        alt="Raffle Logo"
        width={220}
        height={220}
      />
      <AuthCard className="gap-2">
        <h1 className={H1}>Shipping Address</h1>
        <div className="mt-[4px] mb-[4px]">
          <span
            style={{
              color: colors.red,
              background: colors.bg1,
              padding: "6px 12px",
              borderRadius: "99px",
            }}
            className={PHUDU}
          >
            FOR YOUR FUTURE WINNINGS!
          </span>
        </div>
        <div className="flex gap-[18px] flex-col">
          {/* Country & State */}
          <div className="flex gap-[10px]">
            <Dropdown
              options={countries}
              placeholder="Country"
              onSelect={(option) => setCountry(option.raw ?? null)}
            />
            <Dropdown
              options={stateList}
              placeholder="State"
              onSelect={(option) => setState(option.raw ?? null)}
            />
          </div>

          {/* Street */}
          <Input
            icon1="icons/location.svg"
            placeholder="Street Address"
            type="text"
            value={street}
            onChange={(e) => setStreet(e)}
          />

          {/* City & Postal Code */}
          <div className="flex gap-[10px]">
            <Input
              icon1="icons/city.svg"
              placeholder="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e)}
            />
            <Input
              icon1="icons/postal_code.svg"
              placeholder="Postal Code"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e)}
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border-[#888888] border-2 rounded-[99px] w-full">
            <PhoneInput
              defaultCountry="us"
              value={phone}
              onChange={setPhone}
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <Button
            text="Submit"
            icon={"icons/right_arrow_white.svg"}
            onClick={handleClick}
            disabled={!isFormValid || submitPending}
          />
        </div>
      </AuthCard>
    </div>
  );
}
