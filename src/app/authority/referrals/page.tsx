
"use client"
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import StatCard from '../components/StatCard';
import { GiftIcon, PersonReferralIcon, UsedReferralIcon } from '@/utils/svgicons';


function ConversionChart() {
  const data = [
    { date: "Jul 10", signups: 120, clicks: 80 },
    { date: "Jul 11", signups: 300, clicks: 240 },
    { date: "Jul 12", signups: 200, clicks: 130 },
    { date: "Jul 13", signups: 420, clicks: 320 },
    { date: "Jul 14", signups: 350, clicks: 270 },
    { date: "Jul 15", signups: 600, clicks: 420 },
    { date: "Jul 16", signups: 750, clicks: 520 },
  ];

  return (
    <div className="h-56 sm:h-64 md:h-72 lg:h-80 p-3 bg-[#190D29] rounded-2xl border border-[#1e2533]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-base font-medium">Conversion Rates</h3>
        <select className="bg-transparent text-sm text-zinc-400 border border-transparent focus:outline-none">
          <option>This Week</option>
        </select>
      </div>

      <div className="h-[85%]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1126",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ color: "#94a3b8" }} />
            <Line
              type="monotone"
              dataKey="signups"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 3 }}
              fillOpacity={0.2}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 3 }}
              fillOpacity={0.2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

type Referral = {
  holder: string;
  email: string;
  status: 'Available' | 'Used';
  code: string;
  usage: string;
  expiry: string;
};

const sampleReferrals: Referral[] = Array.from({ length: 6 }).map((_, i) => ({
  holder: 'Cody Fisher',
  email: 'codyfisher@mail.com',
  status: i % 4 === 2 ? 'Used' : 'Available',
  code: 'JB4872B5',
  usage: `${i % 4 === 2 ? 20 : 10} of 20`,
  expiry: '16 March, 2024'
}));



function RightSidebar() {
  const topCodes = [
    { code: 'JB4872B5', signups: 50 },
    { code: 'JB4823B5', signups: 30 },
    { code: 'JB4901B5', signups: 20 }
  ];
  const topReferrers = [
    { name: 'Cody Fisher', count: 500 },
    { name: 'Guy Hawkins', count: 200 },
    { name: 'James Miller', count: 100 }
  ];

  return (
    <aside className="w-full flex-shrink-0">
      <div className="space-y-4">
        <div className="rounded-2xl border border-[#1b2331] p-4 bg-[#190D29]">
          <div className='flex w-full justify-between mb-6'>
            <h4 className="text-base font-medium text-white ">New Users Acquired</h4>
            <div className="text-[#A77ED3] text-sm font-bold cursor-pointer"> See all </div>
          </div>
          <ul className="space-y-3 w-full">
            {['Annette Black', 'Devon Lane', 'Leslie Alexander', 'Albert Flores', 'Brooklyn Simmons'].map((n, i) => (
              <li key={i} className="flex w-full items-center justify-between">
                {/* <div className="flex justify-between items-center gap-3 w-full"> */}
                <div className='flex items-center gap-3'>
                  <div className="w-6 h-6 rounded-full bg-zinc-700 text-white  flex items-center justify-center">{n.split(' ').map(x => x[0]).slice(0, 1).join('')}</div>
                  <div className="text-sm font-medium text-white">{n}</div>
                </div>
                <div className=" text-gray-400 text-xs font-medium">16 Feb, 2024</div>
                {/* </div> */}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#1b2331] p-4 bg-[#190D29]">
          <div className='flex w-full justify-between mb-3'>
            <h4 className="text-base font-medium text-white ">Top Performing Codes</h4>
            <div className="text-[#A77ED3] text-sm font-bold cursor-pointer"> See all </div>
          </div>
          <ol className="list-decimal list-inside text-sm text-zinc-400 space-y-2">
            {topCodes.map((t, i) => (
              <li key={i} className="flex items-center justify-between py-4  border-b border-zinc-400/10 text-white">
                <div className='flex gap-4'>
                  <span className=" text-gray-400 text-sm font-normal ">{i + 1}</span>
                  <span>{t.code}</span>
                </div>
                <span className=" text-gray-400 text-xs font-medium">{t.signups} sign-ups</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-[#1b2331] p-4 bg-[#190D29]">
          <h4 className="text-base font-medium text-white mb-3">Top Referrers</h4>
          <ol className="space-y-2">
            {topReferrers.map((t, i) => (
              <li key={i} className="flex items-center justify-between py-3 border-b border-zinc-400/10 text-white text-sm">
                <div className="flex items-center gap-3">
                  <span className="pr-1 text-gray-400 text-sm font-normal ">{i + 1}</span>
                  <div className="w-6 h-6 rounded-full bg-zinc-700 text-white  flex items-center justify-center">{t.name.split(' ').map(x => x[0]).slice(0, 1).join('')}</div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                </div>
                <div className="text-sm text-white font-medium">{t.count}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </aside>
  );
}

export default function ReferralsDashboard() {
  return (
    <div className="min-h-fit w-full  bg-[#0D001D] text-white">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Referrals</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="ml-auto bg-[#7039AC] hover:bg-[#8A2CF4] text-white px-4 py-2 rounded-full text-sm">Create Referral Code</button>
          </div>
        </header>
        {/* <div className="flex flex-col lg:flex-row gap-6"> */}
          {/* Left main area */}
          <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[70%] space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard title="Total referrals" value="200,914" icon={<GiftIcon />} />
              <StatCard title="Available referrals" value="$500,000" icon={<PersonReferralIcon />} />
              <StatCard title="Used referrals" value="200,543" icon={<UsedReferralIcon />} />
            </div>

            <ConversionChart />

            {/* <div className="rounded-2xl border border-[#1b2331] py-4 bg-[#190D29]">
              <div className="flex items-center px-4 justify-between mb-4">

                <div className="w-full flex items-center gap-6">
                  <h3 className="text-white text-base font-medium">Referrals</h3>
                  <input placeholder="Search referral code" className="  border border-zinc-800 text-sm placeholder-zinc-500 px-4 py-2 bg-zinc-400/10 rounded-full w-[50%]" />
                </div>
                <button className="bg-[#7039AC] hover:bg-[#8A2CF4] cursor-pointer px-3 py-2 rounded-full text-white text-sm">Create</button>
              </div>

              <div className="space-y-2">
                <div className="w-full p-4 bg-zinc-400/10 inline-flex justify-start items-center">
                  <div className="w-[30%] pl-2 justify-start text-gray-400 text-xs font-medium leading-4">Holder</div>
                  <div className="w-[20%] pl-2 justify-start text-gray-400 text-xs font-medium leading-4">Status</div>
                  <div className="w-[20%]  pl-2 justify-start text-gray-400 text-xs font-medium leading-4">Code</div>
                  <div className="w-[10%]  justify-start text-gray-400 text-xs font-medium leading-4">Usage</div>
                  <div className="w-[20%]  pl-2 text-center text-gray-400 text-xs font-medium leading-4">Expiry date</div>
                </div>
                {sampleReferrals.map((r, idx) => (
                  <ReferralRow key={idx} r={r} />
                ))}
              </div>

            </div> */}
            <div className="rounded-2xl border border-[#1b2331] py-4 bg-[#190D29]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center px-4 justify-between gap-3 mb-4">
                <div className="w-full sm:w-auto flex items-center gap-4">
                  <h3 className="text-white text-base font-medium">Referrals</h3>
                  <input
                    placeholder="Search referral code"
                    className="border border-zinc-800 text-sm placeholder-zinc-500 px-4 py-2 bg-zinc-400/10 rounded-full w-full sm:w-[240px]"
                  />
                </div>
                <button className="bg-[#7039AC] hover:bg-[#8A2CF4] cursor-pointer px-4 py-2 rounded-full text-white text-sm whitespace-nowrap">
                  Create
                </button>
              </div>

              {/* ✅ Scrollable table wrapper */}
              {/* <div className="overflow-x-auto scrollbar-hide">
    <div className="min-w-[700px] space-y-2">
      <div className="w-full p-4 bg-zinc-400/10 inline-flex justify-start items-center">
        <div className="w-[35%] pl-2 text-gray-400 text-xs font-medium leading-4">Holder</div>
        <div className="w-[20%] pl-2 text-gray-400 text-xs font-medium leading-4">Status</div>
        <div className="w-[15%]  text-gray-400 text-xs font-medium leading-4">Code</div>
        <div className="w-[15%] text-gray-400 text-xs font-medium leading-4">Usage</div>
        <div className="w-[20%]  text-gray-400 text-center text-xs font-medium leading-4">Expiry date</div>
      </div>

      {sampleReferrals.map((r, idx) => (
        <ReferralRow key={idx} r={r} />
      ))}
    </div>
  </div> */}

              {/* ✅ Scrollable table wrapper */}
              <div className="overflow-x-auto scrollbar-hide">
                <div className="min-w-[600px]">

                  {/* Header Row */}
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 p-4 bg-zinc-400/10 text-gray-400 text-xs font-medium leading-4 min-w-[700px]">
                    <div>Holder</div>
                    <div className='text-cente'>Status</div>
                    <div>Code</div>
                    <div>Usage</div>
                    <div className="text-center">Expiry date</div>
                  </div>

                  {/* Data Rows */}
                  {sampleReferrals.map((r, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-5 p-4  text-sm text-white items-center min-w-[700px]"
                    >
                      <div className='flex items-center gap-1'><div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white">C</div>
                        <div className='flex flex-col'>
                          {r.holder}
                          <span className='text-gray-400 text-xs font-normal'>{r.email} </span> 
                          </div>
                          </div>
                      <div className="px-2 py-0.5 bg-emerald-900/25 rounded-2xl flex justify-center items-center">
                        <div className="text-center justify-start text-[#32D583] text-xs font-medium ">{r.status}</div>
                      </div>
                      <div>{r.code}</div>
                      <div>{r.usage}</div>
                      <div className="text-center">{r.expiry}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-[30%]">
            <RightSidebar />
          </div>
        </div>
     </div>
  );
}
