"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputProps {
  icon1?: string;
  icon2?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (v: string) => void;
  className?: string;
  error?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // ✅ FIXED TYPE
}

const Input: React.FC<InputProps> = ({
  icon1,
  icon2,
  placeholder = "",
  type = "text",
  value: controlledValue,
  disabled = false,
  error = false,
  onChange,
  className = "",
  onKeyDown,
}) => {
  const [eye, setEye] = useState(false);
  const [value, setValue] = useState(controlledValue ?? "");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (controlledValue) {
      setValue(controlledValue);
      setSelectedDate(new Date(controlledValue));
    }
  }, [controlledValue]);

  const isPassword = type === "password";
  const isDate = type === "date";

  const handleChange = (v: string) => {
    setValue(v);
    onChange?.(v);
  };

  return (
    <div
      className={`flex w-full h-11 relative items-center border-2 rounded-[99px] 
        ${error ? "border-red-500" : "border-[#888888]"} ${className}`}
    >
      {/* left icon */}
      {icon1 && (
        <Image
          src={icon1}
          width={18}
          height={18}
          alt="icon"
          className="absolute top-1/2 -translate-y-1/2 left-[14px]"
        />
      )}

      {/* Date picker input */}
      {isDate ? (
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) {
              // format to yyyy-MM-dd in local timezone
              const formatted = date.toLocaleDateString("en-CA"); // en-CA gives yyyy-MM-dd
              setSelectedDate(date);
              handleChange(formatted);
            } else {
              setSelectedDate(null);
              handleChange("");
            }
          }}
          placeholderText={placeholder}
          dateFormat="yyyy-MM-dd"
          className={`relative py-2 rounded-[99px] w-full outline-none border-none bg-transparent
            ${icon1 ? "pl-11 pr-5" : "px-5"} text-black`}
          disabled={disabled}
          shouldCloseOnSelect
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      ) : (
        <input
          type={isPassword ? (eye ? "text" : "password") : "text"}
          value={value}
          onKeyDown={onKeyDown}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          className={`relative py-2 rounded-[99px] w-full outline-none border-none bg-transparent
            ${icon1 ? "pl-11 pr-5" : "px-5"} text-black`}
          placeholder={placeholder}
        />
      )}

      {/* right icon / eye toggle */}
      {icon2 && (
        <Image
          src={isPassword ? (!eye ? "icons/eye_close.svg" : icon2) : icon2}
          width={18}
          height={18}
          alt="icon"
          className="absolute top-1/2 -translate-y-1/2 right-[14px] cursor-pointer"
          onClick={() => {
            if (isPassword) setEye(!eye);
          }}
        />
      )}
    </div>
  );
};

export default Input;
