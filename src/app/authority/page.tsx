"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";
import {
  CalendarIcon,
  CashIcon,
  GroupIcon,
} from "@/utils/svgicons";
import {
  Chart,
  ArcElement,
  Tooltip as ChartTooltip,
  DoughnutController,
} from "chart.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DonutGauge from "./components/SubscriptionRevenueChart";
import { useState } from "react";
import StatCard from "./components/StatCard";

Chart.register(ArcElement, DoughnutController, ChartTooltip);

interface DataItem {
  [key: string]: number;
}

const data = [
  { date: "Jul 10", total: 20000, sold: 10000 },
  { date: "Jul 11", total: 30000, sold: 15000 },
  { date: "Jul 12", total: 40000, sold: 20000 },
  { date: "Jul 13", total: 50000, sold: 30000 },
  { date: "Jul 14", total: 80000, sold: 40000 },
  { date: "Jul 15", total: 60000, sold: 35000 },
];

const subscriptionData: DataItem[] = [
  { Freemium: 50000 },
  { VIP: 650000 },
  { Elite: 100000 },
];

const engagementData: DataItem[] = [
  { "Event Ratings": 58000 },
  { Reviews: 5000 },
  { Interactions: 12000 },
];

export default function Page() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");

  return (
    <div className="min-h-screen text-white font-sans ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="bg-[#1b1538] text-sm px-4 py-2 rounded-lg flex items-center gap-2">
          <Calendar size={16} />
          Jan 20, 2024 - Feb 09, 2024
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1">
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <StatCard
              title="Total Users"
              value="80,825"
              change="-2.5%"
              color="red"
              icon={<GroupIcon />}
            />
            <StatCard
              title="Total Events"
              value="200,914"
              change="+3.2%"
              color="green"
              icon={<CalendarIcon />}
            />
            <StatCard
              title="Ticket Sales"
              value="$500,000"
              change="+1.5%"
              color="green"
              icon={<CashIcon />}
            />
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-8">
            {/* New Users */}
            <div className="bg-[#1b1538] rounded-2xl p-5">
              <h2 className="text-lg font-medium mb-4">New Users</h2>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex justify-between flex-wrap items-center py-3 border-b border-white/10 last:border-0"
                >
                  <div className="flex items-center gap-3">

                    <Image
                      src={"/images/portrait-person-playing-music-saxophone 2.png"}
                      alt="avatar"
                      height={40}
                      width={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">Cody Fisher</p>
                      <p className="text-sm text-white/70">
                        codyfisher@email.com
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 m-auto">+62028392954</p>
                </div>
              ))}
            </div>

            {/* User Engagement */}
            <div className="bg-[#1b1538] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium">User Engagement</h2>
                <button className="text-xs bg-[#2d2552] px-3 py-1 rounded">
                  {selectedPeriod}
                </button>
              </div>
              <DonutGauge
                title="Engagements"
                data={engagementData}
                layout="inline"
              />
            </div>
          </div>

          {/* Ticket Sales Chart */}
          <div className="bg-[#1b1538] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Ticket Sales & Revenue</h2>
              <button className="text-xs bg-[#2d2552] px-3 py-1 rounded">
                {selectedPeriod}
              </button>
            </div>
            <div className="w-full ">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d2552" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#7b61ff" strokeWidth={2} />
                  <Line type="monotone" dataKey="sold" stroke="#ff4ecd" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 w-full lg:w-[35%]">
          {/* Subscription Revenue */}
          <div className="bg-[#1b1538] rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-3">Subscription Revenue</h2>
            <DonutGauge
              title="Total subscription"
              data={subscriptionData}
              valuePrefix="$"
              layout="list"
            />
          </div>

          {/* Upcoming Events */}
          <div className="bg-[#1b1538] rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Upcoming Events</h2>
              <button className="text-xs text-[#7b61ff]">See all</button>
            </div>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex gap-3 mb-4">
                <Image
                  src={"/images/portrait-person-playing-music-saxophone 2.png"}
                  alt="event"
                  width={70}
                  height={70}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">The Weekend Night</p>
                  <p className="text-xs text-white/70">Mar 2, 2026 - 6:00 PM</p>
                  <p className="text-xs text-white/50">L&apos;Acc Paris</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
