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
import { useState } from "react";
import StatCard from "../components/StatCard";
import DonutGauge from "../components/SubscriptionRevenueChart";
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
        <h1 className="text-Color-White text-3xl font-bold mb-6" >Users</h1>
      {/* Main Layout */}
        <div className="flex-1">
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
              title="Ticket Sales"
              value="$500,000"
              change="+1.5%"
              color="green"
              icon={<CashIcon />}
            />
          </div>
          <UsersPage />
        </div>

    </div>
  );
}
