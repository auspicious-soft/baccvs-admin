"use client";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, X, Download } from "lucide-react";

const COLORS = ["#8B5CF6", "#22D3EE", "#FBBF24", "#34D399", "#F87171"];

export default function FinancialReportModal() {
  const [showModal, setShowModal] = useState(true);

useEffect(() => {
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return () => {
    document.body.style.overflow = "auto";
  };
}, [showModal]);

  const data = [
    { name: "Subscriptions", value: 800000 },
    { name: "Tickets", value: 2000000 },
    { name: "Unlimited Likes", value: 500000 },
    { name: "Super Likes", value: 200000 },
    { name: "Boost", value: 100000 },
  ];

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-[#120a1f] text-white rounded-2xl p-6 w-[95%] max-w-6xl shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="text-xl font-semibold">Financial Report</h2>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#1b1130] border border-gray-700 text-sm px-3 py-2 rounded-lg hover:bg-[#2b1e45]">
              <Calendar size={16} /> Jan 20, 2024 - Feb 09, 2024
            </button>

            <button className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-sm px-4 py-2 rounded-lg">
              <Download size={16} /> Download
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Revenue Breakdown */}
          <div className="bg-[#1b1130] rounded-2xl p-6 col-span-2">
            <h3 className="text-sm text-gray-300 mb-4">Revenue Breakdown</h3>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-full md:w-1/2 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 text-sm text-gray-300 w-full md:w-1/2">
                {data.map((d, i) => (
                  <p key={i}>
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    ></span>
                    {d.name}:{" "}
                    <span className="text-white font-medium">
                      ${d.value.toLocaleString()}
                    </span>
                  </p>
                ))}
                <p className="text-lg mt-4">
                  <span className="text-3xl font-bold text-white">4M+</span>{" "}
                  <span className="text-gray-400 text-sm">Total revenue</span>
                </p>
              </div>
            </div>
          </div>

          {/* Subscriptions */}
          <div className="bg-[#1b1130] rounded-2xl p-6">
            <h3 className="text-sm text-gray-300 mb-4">Subscriptions</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { value: 675000 },
                        { value: 125000 },
                        { value: 200000 },
                      ]}
                      startAngle={180}
                      endAngle={0}
                      innerRadius={40}
                      outerRadius={60}
                      dataKey="value"
                    >
                      <Cell fill="#8B5CF6" />
                      <Cell fill="#22D3EE" />
                      <Cell fill="#34D399" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                  $800K
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2">Total subscriptions</p>
            </div>
            <div className="flex justify-between text-sm pt-4">
              <div>
                <p className="text-gray-400">Premium</p>
                <p>$0</p>
              </div>
              <div>
                <p className="text-gray-400">VIP</p>
                <p>$675K</p>
              </div>
              <div>
                <p className="text-gray-400">Elite</p>
                <p>$125K</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            {
              title: "Unlimited Likes",
              value: "$500,000",
              breakdown: [
                { label: "Basic", value: "$200,000" },
                { label: "Popular", value: "$150,000" },
                { label: "Gem", value: "$150,000" },
              ],
            },
            {
              title: "Super Likes",
              value: "$200,000",
              breakdown: [
                { label: "Basic", value: "$100,000" },
                { label: "Popular", value: "$50,000" },
                { label: "Gem", value: "$50,000" },
              ],
            },
            {
              title: "Boost",
              value: "$100,000",
              breakdown: [
                { label: "Basic", value: "$50,000" },
                { label: "Gem", value: "$25,000" },
              ],
            },
            {
              title: "Ticket Commission",
              value: "$500,000",
              breakdown: [
                { label: "Basic", value: "$25,000" },
                { label: "Ticket sellers", value: "$475,000" },
              ],
            },
          ].map((card, i) => (
            <div key={i} className="bg-[#1b1130] rounded-2xl p-6">
              <h4 className="text-sm text-gray-300">{card.title}</h4>
              <p className="text-lg font-semibold mt-2">{card.value}</p>
              <div className="mt-3 space-y-1 text-sm text-gray-400">
                {card.breakdown.map((b, j) => (
                  <p key={j} className="flex justify-between">
                    <span>{b.label}</span>
                    <span>{b.value}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Refunds */}
          <div className="bg-[#1b1130] rounded-2xl p-6">
            <h4 className="text-sm text-gray-300 mb-3">Refunds</h4>
            <p className="text-gray-400 text-sm mb-1">
              Total amount of refunds issued
            </p>
            <p className="text-lg font-semibold mb-3">150,000</p>
            <p className="text-gray-400 text-sm mb-1">
              Total amount of chargebacks received
            </p>
            <p className="text-lg font-semibold">50,000</p>
          </div>

          {/* Gross Profit */}
          <div className="bg-[#1b1130] rounded-2xl p-6">
            <h4 className="text-sm text-gray-300 mb-4">Gross Profit</h4>
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-[#2b1e45] p-3 rounded-lg text-sm">
                <p className="text-gray-400">Revenue</p>
                <p className="text-white font-semibold">$4,000,500</p>
              </div>
              <div className="text-2xl font-bold">-</div>
              <div className="bg-[#2b1e45] p-3 rounded-lg text-sm">
                <p className="text-gray-400">Commission</p>
                <p className="text-white font-semibold">3.800475</p>
              </div>
              <div className="text-2xl font-bold">=</div>
              <div className="bg-[#34D399]/20 p-3 rounded-lg text-sm">
                <p className="text-gray-400">Gross Profit</p>
                <p className="text-[#34D399] font-semibold">$200,025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
