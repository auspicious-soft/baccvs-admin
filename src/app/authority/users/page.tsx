"use client";

import { useState } from "react";
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
import StatCard from "../components/StatCard";
import UsersPage from "../components/ExampleTable";

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


export default function Page() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");

  return (
    <div className="min-h-screen  text-white font-sans">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-Color-White">
          Users
        </h1>
        {/* Optional future filters */}
        <div className="flex items-center gap-3">
          {/* Placeholder for future dropdowns/filters */}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

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
          <StatCard
            title="Revenue"
            value="$1.2M"
            change="+4.1%"
            color="green"
            icon={<CashIcon />}
          />
        </div>

        {/* Users Table Section */}
        <div className="bg-[#1E0E33] rounded-2xl shadow-md overflow-x-auto">
          <div className="min-w-[600px] sm:min-w-full">
            <UsersPage />
          </div>
        </div>
      </div>
    </div>
  );
}
