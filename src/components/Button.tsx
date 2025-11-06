import { colors } from "@/styles/assets";
import Image from "next/image";
import React from "react";

interface ButtonProps {
  text: string;
  icon?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean; // new prop
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  className,
  disabled = false, // default value
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ background: disabled ? "#ccc" : colors.red }} // gray background if disabled
      className={`${className} flex gap-[10px] h-11 w-[100%] rounded-[29.68px] items-center justify-center text-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {text}
      {icon && <Image src={icon} alt="icon" width={15} height={15} />}
    </button>
  );
};

export default Button;
