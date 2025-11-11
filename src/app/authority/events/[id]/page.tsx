"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { BackIcon } from "@/utils/svgicons";
import { useRouter } from "next/navigation";
import DonutGauge from "../../components/SubscriptionRevenueChart";
import GenderPieChart from "../../components/GenderPieChart";
import { Heart, MessageCircle } from 'lucide-react';
import PromotionModal from "../../components/Events/PriorityPlacementModal";

interface DataItem {
  [key: string]: number;
}
const lineData = [
  { name: "Jul 1", tickets: 5000, revenue: 20000 },
  { name: "Jul 7", tickets: 8000, revenue: 30000 },
  { name: "Jul 14", tickets: 10000, revenue: 50000 },
  { name: "Jul 21", tickets: 7000, revenue: 40000 },
  { name: "Jul 28", tickets: 9500, revenue: 55000 },
];

const engagementData: DataItem[] = [
  { Views: 4000000 },
  { Clicks: 1000000 },
  { Comments: 300000 },
];



const reports = [
  { name: "Cody Fisher", issue: "Fake events", description: "This event appears to be fraudulent or does not exist." },
  { name: "Cody Fisher", issue: "Misleading pricing", description: "This event appears to be fraudulent or does not exist." },
  { name: "Cody Fisher", issue: "Fake events", description: "This event appears to be fraudulent or does not exist." },
  { name: "Cody Fisher", issue: "Misleading pricing", description: "This event appears to be fraudulent or does not exist." },
];

const attendees = [
  {
    name: "Cody Fisher",
    image: "/images/portrait-person-playing-music-saxophone 2.png",
    comments: 120,
    tickets: 32,
  },
  {
    name: "Guy Hawkins",
    image: "/images/portrait-person-playing-music-saxophone 2.png",
    comments: 84,
    tickets: 20,
  },
];

export default function EventDetailsDashboard() {
  const router = useRouter()
  return (
    <div className="min-h-screen w-full  text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div className="flex items-center gap-2">
          <button className="p-2 cursor-pointer" onClick={() => router.back()}>
            <BackIcon />
          </button>
          <h1 className="text-3xl font-bold">Event Details</h1>
        </div>
        <PromotionModal /> 
        <button className="bg-[#2b2258] px-4 py-2 rounded-lg text-sm hover:bg-[#3a2d70] transition">
          Priority Reviewer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Chart */}
          <div className="bg-[#190D29] p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Ticket Sales & Revenue</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2b2258" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#190D29",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tickets"
                  stroke="#6c63ff"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff6584"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Engagement & Demographics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#190D29] p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Engagements</h3>
              {/* <div className="flex flex-col items-center">
                <p className="text-3xl font-semibold">5M+</p>
                <p className="text-sm text-gray-400 mb-4">Engagements</p>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={engagementData}
                      innerRadius={50}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {engagementData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div> */}
              <div className="p-2" >
                <DonutGauge
                  title="Total subscription"
                  data={engagementData}
                  valuePrefix="$"
                  layout="list"
                />
              </div>
            </div>

            <div className="bg-[#190D29] p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">RSVP Demography</h3>
              <div className="flex flex-col items-center">
                <GenderPieChart male={76} female={24} averageAge={26} />
              </div>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-[#190D29] py-4 rounded-2xl">
            <div className="flex items-center justify-between mb-4 px-4">
              <h3 className="text-base font-medium ">Reports</h3>
              <button className="text-sm text-bold text-[#A77ED3] cursor-pointer hover:text-white">
                See all
              </button>
            </div>
            <div className="space-y-3">
              {reports.map((r, i) => (
                <div key={i}>
                  <div
                    className="flex items-center justify-between rounded-lg p-4 "
                  >

                    <div className="w-1/3 flex items-center gap-3">
                      <Image
                        src="/images/portrait-person-playing-music-saxophone 2.png"
                        alt={r.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                      <p className="text-sm font-medium">{r.name}</p>
                    </div>
                    <p className=" w-1/3 text-sm font-medium text-gray-400">{r.issue}</p>
                    <p className=" w-1/3 text-xs font-normal text-wrap text-gray-400">{r.description}</p>
                  </div>
                  <div className="w-[96%] ml-3 mx-4  h-0 opacity-10  outline-[0.50px] outline-offset-[-0.25px] outline-grey-500"></div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Event Info Card */}
          <div className="bg-[#190D29] p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">
              Speed Dating & Trivia Night
            </h3>
            <Image
              src="/images/portrait-person-playing-music-saxophone 2.png"
              alt="Speed Dating"
              width={100}
              height={100}
              className=" w-full rounded-xl object-cover mb-4"
            />
            <p className="text-gray-400 text-xs font-medium mb-3">Tickets</p>
            <div className="grid grid-cols-3 gap-1 text-center mb-4">
              <div className="p-4 bg-zinc-400/10 rounded-lg">
                <p className="text-xs font-medium text-gray-400">Regular</p>
                <p className="text-base font-bold ">$100</p>
              </div>
              <div className="p-4 bg-zinc-400/10 rounded-lg">
                <p className="text-xs font-medium text-gray-400">VIP</p>
                <p className="text-base font-bold ">$200</p>
              </div>
              <div className="p-4 bg-zinc-400/10 rounded-lg">
                <p className="text-xs font-medium text-gray-400">VVIP</p>
                <p className="text-base font-bold ">$300</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-white mb-2">
              <Clock className="w-4 h-4" /> 7:00 PM - 10:00 PM
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-white mb-2">
              <Calendar className="w-4 h-4" /> Saturday, February 10, 2025
            </div>
            <div className="flex items-center text-sm font-medium text-white gap-2  mb-4">
              <MapPin className="w-4 h-4" /> Quartz Club, 26 Knowledge Lane,
              Tamburg
            </div>

            <div className="w-full mt-4 h-0 opacity-10  outline-[0.50px] outline-offset-[-0.25px] outline-grey-500" />
            <p className="pt-4 text-xs font-medium text-gray-400 pb-3">Event Preference</p>
            <div className="flex flex-wrap gap-2 ">
              {["Romance", "Trivia", "Lifestyle", "Music"].map((tag, i) => {
                const bgColors = ["#654560", "#265866", "#341A4F"];
                const textColors = ["#F4B7EA", "#7BDBF6", "#A77ED3"];

                return (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: bgColors[i % bgColors.length],
                      color: textColors[i % textColors.length],
                    }}
                  >
                    {tag}
                  </span>
                );
              })}


              <div className="w-full mt-3 h-0 opacity-10  outline-[0.50px] outline-offset-[-0.25px] outline-grey-500" />

              <div className="flex w-full items-center justify-between py-2 text-sm">
                <div className="flex -space-x-2">
                  <Image
                    src="/images/portrait-person-playing-music-saxophone 2.png"
                    alt="user"
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8 border-2 border-[#190D29]"
                  />
                  <Image
                    src="/images/portrait-person-playing-music-saxophone 2.png"
                    alt="user"
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8 border-2 border-[#190D29]"
                  />
                  <Image
                    src="/images/portrait-person-playing-music-saxophone 2.png"
                    alt="user"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-[#190D29]"
                  />
                </div>
                <div className="flex gap-2">
                  <p className="flex items-center gap-1 text-gray-400"><Heart className="w-4 h-4" />2.1k</p>
                  <p className="flex items-center gap-1 text-gray-400"><MessageCircle className="w-4 h-4" />2.1k</p>
                </div>
              </div>
              <div className="w-full h-0 opacity-10  outline-[0.50px] outline-offset-[-0.25px] outline-grey-500" />

            </div>

            {/* About Section */}
            <div className="bg-[#190D29] rounded-2xl text-sm py-3 text-gray-300">
              <h3 className="text-xs font-medium  mb-3 text-gray-400">About</h3>
              <p className="text-sm font-medium ">
                This unique event combines the excitement of speed dating with the
                fun of trivia and lively atmosphere. Meet new people through short
                timed conversations, then team up to tackle several trivia
                challenges.
              </p>
            </div>

            {/* Comments / Activity */}
            <div className="bg-[#190D29] rounded-2xl space-y-4">
              <h3 className="text-xs font-medium  mt-3 text-gray-400">Host</h3>
              {attendees.map((a, i) => (
                <div key={i} >
                  <div
                    className="flex items-center pt-3 justify-between rounded-xl"
                  >
                    <div className="w-2/3 flex flex-col items-center gap-3">
                      <Image
                        src={a.image}
                        alt={a.name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className=" text-base font-bold">{a.name}</p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 text-xs text-gray-400">

                      <div className="p-4 bg-zinc-400/10 rounded-lg">
                        <p className="text-base font-bold ">100</p>
                        <p className="text-xs font-medium text-gray-400">Event hosted</p>
                      </div>
                      <div className="p-4 bg-zinc-400/10 rounded-lg">
                        <p className="text-base font-bold ">20k</p>
                        <p className="text-xs font-medium text-gray-400">Total tickets sold</p>
                      </div>
                      <div className="p-4 bg-zinc-400/10 rounded-lg">
                        <p className="text-base font-bold ">$300</p>
                        <p className="text-xs font-medium text-gray-400">Reviews</p>
                      </div>
                    </div>

                  </div>
                  <div className="w-full h-0 opacity-10 mt-3 outline-[0.50px] outline-offset-[-0.25px] outline-grey-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
