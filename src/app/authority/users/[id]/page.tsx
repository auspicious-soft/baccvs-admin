"use client";
import React from "react";
import Image from "next/image";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { BackIcon } from "@/utils/svgicons";
import { useRouter } from "next/navigation";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function UserDetails() {
  const router = useRouter();

  const data = {
    labels: ["Jul 10", "Jul 11", "Jul 12", "Jul 13", "Jul 14", "Jul 15"],
    datasets: [
      {
        label: "Profile Views",
        data: [1500, 2100, 3450, 3000, 4200, 4700],
        borderColor: "#8A2CF4",
        backgroundColor: "#8A2CF4",
        pointBackgroundColor: "#8A2CF4",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#aaa" } },
      y: { grid: { color: "#2D1B4E" }, ticks: { color: "#aaa" } },
    },
  };

  const reports = [
    { name: "Cody Fisher", reason: "Harassment or Bullying" },
    { name: "Cody Fisher", reason: "Inappropriate Content" },
    { name: "Cody Fisher", reason: "Impersonation" },
    { name: "Cody Fisher", reason: "Harassment or Bullying" },
  ];

  return (
    <div className="w-full min-h-screen text-white font-sans ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <button className="p-2 cursor-pointer" onClick={() => router.back()}>
            <BackIcon />
          </button>
          <h1 className="text-2xl md:text-3xl font-semibold">User Details</h1>
        </div>
        <button className="bg-[#8A2CF4] hover:bg-[#9b45ff] px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto">
          Offer VIP Incentives
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Profile Views */}
          <div className="bg-[#1E0E33] p-4 sm:p-5 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="text-lg font-medium">Profile views</h2>
              <button className="text-sm bg-[#2D1B4E] px-3 py-1 rounded-lg">
                This Week
              </button>
            </div>
            <div className="w-full overflow-x-auto">
              <Line data={data} options={options}  />
            </div>
          </div>

          {/* Reports */}
          <div className="bg-[#1E0E33] rounded-2xl p-4 sm:p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Reports</h2>
              <button className="text-sm text-[#8A2CF4] hover:underline">
                See all
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {reports.map((report, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#150A24] hover:bg-[#1A0C2D] p-3 rounded-xl gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/portrait-person-playing-music-saxophone 2.png"
                      alt={report.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">{report.name}</p>
                      <p className="text-xs text-gray-400">{report.reason}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-left sm:text-right">
                    This post includes threats, hateful harassment, or harmful
                    comments.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#1E0E33] rounded-2xl p-4 sm:p-5 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold">Wilson James</h2>
            <div className="px-2 py-0.5 bg-emerald-900/25 rounded-2xl inline-flex items-center">
              <p className="text-sm text-[#32D583]">Active</p>
            </div>
          </div>

          {/* Profile Pic */}
          <div className="flex justify-center mb-4">
            <Image
              src="/images/Frame 1321314235.svg"
              alt="user"
              width={100}
              height={100}
              className="w-full border-4 border-[#1E0E33]"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4 mb-5 text-center">
            {[
              { label: "Following", value: "80" },
              { label: "Followers", value: "2,556" },
              { label: "Events", value: "100" },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-400/10 rounded-lg p-3">
                <p className="text-base font-semibold">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* User Info */}
          <div className="text-sm space-y-2 mb-5">
            <p>🎂 30 years old</p>
            <p>📍 Jakarta, Indonesia</p>
            <p>📞 +62302839254</p>
            <p>✉️ wilsonjamesr@mail.com</p>
            <p className="text-gray-400">Freemium</p>
          </div>

          {/* About */}
          <div className="mb-4">
            <h3 className="text-sm text-gray-400 mb-1">About</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              I&apos;m all about connecting with good people, finding hidden gems in
              the city, and making every moment count. Swipe right if you’re
              down for good vibes and great convos!
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["Art Exhibits", "Live Music", "Wine Tasting"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#2D1B4E] rounded-full text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* History */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Events attended</span>
              <span className="font-medium">4,745</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Tickets purchased</span>
              <span className="font-medium">$10k</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Reports</span>
              <span className="font-medium">100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
