"user client";
import { CARD_TITLE, colors } from "@/styles/assets";
import Image from "next/image";
import React from "react";

interface HomeCardInterace {
  title?: string;
  icon: string;
  count?: string;
  subTitle?: string;
}

const HomeCard: React.FC<HomeCardInterace> = ({
  title,
  icon,
  count,
  subTitle,
}) => {
  return (
    <div
      style={{ background: colors.bg2 }}
      className="px-5 py-6 rounded-[10px] flex-1 gap-2"
    >
      <div className="flex justify-between pb-3">
        <h1 className={CARD_TITLE}>{title}</h1>
        <Image src={icon} alt="icon" width={40} height={40} />
      </div>
      <h1
        style={{ color: colors.red }}
        className="text-2xl font-bold font-['Plus_Jakarta_Sans'] pb-2"
      >
        {count}
      </h1>
      <p className="text-[#464646] text-xs font-['Plus_Jakarta_Sans']">
        {subTitle}
      </p>
    </div>
  );
};

export default HomeCard;
