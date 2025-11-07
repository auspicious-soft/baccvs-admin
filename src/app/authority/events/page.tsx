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
import StatCard from "../components/StatCard";
import { CalendarIcon, CashIcon, GroupIcon } from "@/utils/svgicons";
import { Calendar } from "lucide-react";

const data = [
    { name: "Jul 1", tickets: 5000, revenue: 20000 },
    { name: "Jul 7", tickets: 8000, revenue: 30000 },
    { name: "Jul 14", tickets: 10000, revenue: 50000 },
    { name: "Jul 21", tickets: 7000, revenue: 40000 },
    { name: "Jul 28", tickets: 9500, revenue: 55000 },
];

const events = [
    {
        title: "The Weekend Night",
        date: "May 2, 2025 • 6:00 PM",
        location: "City Castle Tamburg",
        price: "From $100",
        tickets: 1200,
        image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
        title: "Speed Dating & Trivia Night",
        date: "May 5, 2025 • 8:00 PM",
        location: "Mickey Club Tamburg",
        price: "From $80",
        tickets: 64,
        image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
        title: "Sunset Wine & Jazz Night",
        date: "May 6, 2025 • 9:00 PM",
        location: "Mickey Club • Tamburg",
        price: "From $90",
        tickets: 472,
        image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
        title: "The Weekend Night",
        date: "May 2, 2025 • 6:00 PM",
        location: "City Castle Tamburg",
        price: "From $100",
        tickets: 1200,
        image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
        title: "Speed Dating & Trivia Night",
        date: "May 5, 2025 • 8:00 PM",
        location: "Mickey Club Tamburg",
        price: "From $80",
        tickets: 64,
        image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
        title: "Sunset Wine & Jazz Night",
        date: "May 6, 2025 • 9:00 PM",
        location: "Mickey Club • Tamburg",
        price: "From $90",
        tickets: 472,
        image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
   
    {
        title: "Speed Dating & Trivia Night",
        date: "May 5, 2025 • 8:00 PM",
        location: "Mickey Club Tamburg",
        price: "From $80",
        tickets: 64,
        image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
        title: "Sunset Wine & Jazz Night",
        date: "May 6, 2025 • 9:00 PM",
        location: "Mickey Club • Tamburg",
        price: "From $90",
        tickets: 472,
        image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
];

export default function EventDashboard() {
    const [selectedRange, setSelectedRange] = useState("This Week");

    return (
        <div className="min-h-screen w-full bg-[#0b081a] text-white font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold">
                        Event & Ticketing
                    </h1>
                    <p className="text-sm text-gray-400">
                        Overview of ticket sales and events
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-[#1a1535] rounded-lg px-3 py-2 text-sm cursor-pointer">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Jan 20, 2024 - Feb 09, 2024</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="w-full">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <StatCard
                            title="Total events"
                            value="80,825"
                            change="-2.5%"
                            color="red"
                            icon={<GroupIcon />}
                        />
                        <StatCard
                            title="Ticket sales"
                            value="200,914"
                            change="+3.2%"
                            color="green"
                            icon={<CalendarIcon />}
                        />
                        <StatCard
                            title="Available tickets"
                            value="$500,000"
                            change="+1.5%"
                            color="green"
                            icon={<CashIcon />}
                        />
                    </div>

                    {/* Chart & Top Events */}
                    <div className="flex flex-col  gap-6 mb-8">
                        {/* Chart Section */}
                        <div className="bg-[#1a1535] p-6 rounded-2xl col-span-2">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                                <h3 className="text-lg font-semibold">Ticket Sales & Revenue</h3>
                                <div className="flex gap-2 text-sm">
                                    <button
                                        className={`px-3 py-1 rounded-md ${selectedRange === "This Week"
                                            ? "bg-[#2b2258]"
                                            : "bg-transparent hover:bg-[#2b2258]"
                                            }`}
                                        onClick={() => setSelectedRange("This Week")}
                                    >
                                        This Week
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded-md ${selectedRange === "This Month"
                                            ? "bg-[#2b2258]"
                                            : "bg-transparent hover:bg-[#2b2258]"
                                            }`}
                                        onClick={() => setSelectedRange("This Month")}
                                    >
                                        This Month
                                    </button>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2b2258" />
                                    <XAxis dataKey="name" stroke="#aaa" />
                                    <YAxis stroke="#aaa" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#1a1535",
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
                        {/* Events Table */}
                        <div className="bg-[#1a1535] p-6 rounded-2xl">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                                <h3 className="text-lg font-semibold">Events</h3>
                                <input
                                    placeholder="Search events"
                                    className="bg-[#2b2258] rounded-lg px-3 py-2 text-sm outline-none w-full sm:w-64"
                                />
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="text-gray-400 text-left border-b border-[#2b2258]">
                                        <tr>
                                            <th className="pb-3">Event details</th>
                                            <th className="pb-3">Ticket price</th>
                                            <th className="pb-3">Tickets sold</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.map((e, i) => (
                                            <tr
                                                key={i}
                                                className="border-b border-[#2b2258] hover:bg-[#2b2258]/50 transition"
                                            >
                                                <td className="py-4 flex items-center gap-3 min-w-[200px]">
                                                    <Image
                                                        src={e.image}
                                                        alt={e.title}
                                                        width={60}
                                                        height={60}
                                                        className="rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium">{e.title}</p>
                                                        <p className="text-xs text-gray-400">{e.location}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4">{e.price}</td>
                                                <td className="py-4">{e.tickets}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Top Events */}
                <div className="bg-[#1a1535] p-4 rounded-2xl h-fit w-full md:w-[40%]">
                    <h3 className="text-lg font-semibold mb-6">Top Events</h3>
                    <div className="">
                        {events.map((e, i) => (
                            <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-500/20">
                                <Image
                                    src={"/images/portrait-person-playing-music-saxophone 2.png"}
                                    alt={e.title}
                                    width={90}
                                    height={90}
                                    className="rounded-lg object-cover w-[90px] h-[90px]"
                                />
                                <div className="space-x-1">
                                    <p className="text-white text-base font-bold">{e.title}</p>
                                    <p className="text-gray-400 text-xs font-medium leading-4">{e.date}</p>
                                    <p className="text-xs text-gray-400">{e.location}</p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
