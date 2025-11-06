"use client";
import Image from "next/image";
import React from "react";

// Generic Option type
interface Option<T = unknown> {
  value: string | number;
  label?: string;
  name?: string;
  icon?: string;
  raw: T;
}

interface DropdownProps<T> {
  placeholder: string;
  options: Option<T>[];
  onSelect: (value: Option<T>) => void;
  value?: string | number;
  className?: string;
  error?: boolean;
}

function Dropdown<T>({
  placeholder,
  options,
  onSelect,
  value,
  className,
  error = false,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Option<T> | null>(null);
  const [position, setPosition] = React.useState<"left" | "right">("left");
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);

  // 🔹 Sync external value with internal selected
  React.useEffect(() => {
    if (value !== undefined && options?.length) {
      const found = options.find((opt) => opt.value === value) || null;
      setSelected(found);
    }
  }, [value, options]);

  // 🔹 Handle outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Adjust dropdown position when opening
  React.useEffect(() => {
    if (isOpen && dropdownRef.current && optionsRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const dropdownWidth = optionsRef.current.offsetWidth;

      // If dropdown goes out of screen on right side → align right
      if (rect.left + dropdownWidth > screenWidth) {
        setPosition("right");
      } else {
        setPosition("left");
      }
    }
  }, [isOpen]);

  const handleSelect = (option: Option<T>) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full h-11 ${className}`}>
      {/* Dropdown Button */}
      <div
        className={`flex relative items-center border-2 rounded-[99px] px-4 py-2 cursor-pointer select-none 
          ${error ? "border-red-500" : "border-[#888888]"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected?.icon && (
          <Image
            src={selected.icon}
            alt="icon"
            width={18}
            height={18}
            className="mr-2"
          />
        )}
        <span
          className={`flex-1 ${
            !selected ? "text-gray-400 text-start" : "text-black text-start"
          }`}
        >
          {selected ? selected.label || selected.name : placeholder}
        </span>
        <Image
          src="/icons/dropdown_arrow.svg"
          alt="arrow"
          width={18}
          height={18}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          ref={optionsRef}
          className={`absolute mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto min-w-max ${
            position === "right" ? "right-0" : "left-0"
          }`}
        >
          {options?.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option.icon && (
                <Image src={option.icon} alt="icon" width={18} height={18} />
              )}
              <span>{option.label || option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
