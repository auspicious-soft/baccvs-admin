// "use client";
// import React from "react";
// import { Calendar } from "lucide-react";
// import DonutGauge from "../components/SubscriptionRevenueChart";
// import RevenuePieChart from "../components/GenericFullPieChart";
// import { DataItem } from "../page";
// import { BoostIcon, SuperLikes, UnlimitedLikesIcon } from "@/utils/svgicons";
// import Image from "next/image";


// export default function Page() {
//     const data = [
//         { name: "Subscriptions", value: 500000 },
//         { name: "Tickets", value: 1000000 },
//         { name: "Unlimited Likes", value: 2000000 },
//         { name: "Super Likes", value: 200000 },
//         { name: "Boost", value: 100000 },
//     ];

//     const transactions = [
//         {
//             type: "Subscription",
//             plan: "Elite",
//             price: "$20",
//             date: "13 March, 2024",
//             time: "09:20 PM",
//             status: "Successful",
//             purchaser: "Cody Fisher",
//             icon: <BoostIcon />,
//             image: "/images/Frame 1321314235.svg"
//         },
//         {
//             type: "Ticket",
//             plan: "VIP",
//             price: "$10",
//             date: "13 March, 2024",
//             time: "07:04 PM",
//             status: "Successful",
//             purchaser: "Guy Hawkins",
//             icon: <UnlimitedLikesIcon />,
//             image: "/images/Frame 1321314235.svg",
//         },
//         {
//             type: "Unlimited Likes",
//             plan: "Basic",
//             price: "$15",
//             date: "13 March, 2024",
//             time: "07:00 PM",
//             status: "Successful",
//             purchaser: "James Watt",
//             icon: <BoostIcon />,
//             image: "/images/portrait-person-playing-music-saxophone 2.png"
//         },
//         {
//             type: "Super Likes",
//             plan: "Regular",
//             price: "$19",
//             date: "13 March, 2024",
//             time: "07:10 PM",
//             status: "Successful",
//             purchaser: "Ralph Edwards",
//             icon: <BoostIcon />,
//             image: "/images/portrait-person-playing-music-saxophone 2.png",

//         },
//         {
//             type: "Boost",
//             plan: "Regular",
//             price: "$19",
//             date: "13 March, 2024",
//             time: "08:00 PM",
//             status: "Successful",
//             purchaser: "Floyd Miles",
//             icon: <UnlimitedLikesIcon />,
//             image: "/images/portrait-person-playing-music-saxophone 2.png",
//         },
//     ];
//     const chartData = [
//         { label: "Subscriptions", value: 800000, color: "#A58FFF" },
//         { label: "Tickets", value: 2000000, color: "#7DE2D1" },
//         { label: "Unlimited Likes", value: 500000, color: "#F1C40F" },
//         { label: "Super Likes", value: 200000, color: "#BB86FC" },
//         { label: "Boost", value: 100000, color: "#6DD3F9" },
//     ];
//     const engagementData: DataItem[] = [
//         { "Event Ratings": 58000 },
//         { Reviews: 5000 },
//         { Interactions: 12000 },
//     ];
//     return (
//         <div className="min-h-screen bg-[#0B0614] text-white font-inter space-y-8">
//             {/* Header */}
//             <div className="flex flex-wrap items-center justify-between gap-4">
//                 <h1 className="text-2xl font-semibold">Revenue & Financial</h1>
//                 <button className="flex items-center gap-2 bg-[#1b1130] border border-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-[#2b1e45]">
//                     <Calendar size={16} /> Jan 20, 2024 - Feb 09, 2024
//                 </button>
//             </div>

//             {/* Top Section */}
//             <div className="w-full flex flex-col md:flex-row gap-6">
//                 {/* Revenue Breakdown */}
//                 <div className="bg-[#120a1f] w-full md:w-[70%] p-6 rounded-2xl shadow-lg">
//                     <h2 className="text-sm mb-4 text-gray-300">Revenue Breakdown</h2>
//                     {/* <div className="flex justify-center"> */}
//                     {/* <div className="w-full md:w-1/2 h-48"> */}
//                     <RevenuePieChart data={chartData} totalValue="4M+" totalLabel="Total revenue" />
//                     {/* </div> */}

//                     {/* </div> */}
//                 </div>

//                 {/* Subscriptions */}
//                 <div className="bg-[#120a1f] w-full md:w-[30%] h-[20%] p-6 rounded-2xl shadow-lg space-y-4">
//                     <p className="text-sm text-gray-300 mb-0">Subscriptions</p>
//                     <DonutGauge
//                         title="Total subscription"
//                         data={engagementData}
//                         valuePrefix="$"
//                         layout="list"
//                     />
//                 </div>
//             </div>
//             {/* Metric Cards */}
//             <div className="flex flex-col lg:flex-row w-full gap-6">


//                 <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
//                     {[
//                         {
//                             title: "Unlimited Likes",
//                             value: "$500,000",
//                             icon: <UnlimitedLikesIcon />,
//                             breakdown: [
//                                 { label: "Basic", value: "$200,000" },
//                                 { label: "Regular", value: "$150,000" },
//                                 { label: "Gem", value: "$150,000" },
//                             ],
//                         },
//                         {
//                             title: "Super Likes",
//                             value: "$200,000",
//                             icon: <SuperLikes />,
//                             breakdown: [
//                                 { label: "Basic", value: "$50,000" },
//                                 { label: "Regular", value: "$50,000" },
//                                 { label: "Gem", value: "$100,000" },
//                             ],
//                         },
//                         {
//                             title: "Boost",
//                             value: "$100,000",
//                             icon: <BoostIcon />,
//                             breakdown: [
//                                 { label: "Basic", value: "$30,000" },
//                                 { label: "Regular", value: "$30,000" },
//                                 { label: "Gem", value: "$40,000" },
//                             ],
//                         },

//                     ].map((card, i) => (
//                         <div key={i} className="flex flex-col justify-between bg-[#190D29] p-4 rounded-2xl shadow-lg">
//                             <div className="flex items-center gap-2">
//                                 {card.icon}
//                                 <h3 className="text-sm text-gray-300">{card.title}</h3>
//                             </div>
//                             <div className="flex flex-col items-center">
//                                 <p className="text-xl font-semibold mt-2">{card.value}</p>
//                                 <p className="text-gray-400 text-xs font-normal">Total sales</p>
//                             </div>
//                             <div className="mt-3  text-sm text-gray-400">
//                                 {card.breakdown.map((b, j) => (
//                                     <p key={j} className="flex justify-between py-2 ">
//                                         <span className="text-gray-400 text-xs font-normal">{b.label}</span>
//                                         <span className="text-white text-xs font-bold">{b.value}</span>
//                                     </p>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="w-full md:w-[30%]">
//                     <div className=" bg-[#190D29] p-4 rounded-2xl shadow-lg">
//                         <h3 className="text-White text-base font-medium ">Ticket Commission</h3>
//                         <div className="flex flex-col items-center my-10">
//                             <p className="text-xl font-semibold ">$500,000</p>
//                             <p className="text-gray-400 text-xs font-normal">Total ticket sales</p>
//                         </div>
//                         <div className="mt-3 flex w-full gap-1 text-sm  text-gray-400">

//                             <p className="flex flex-col justify-between p-4 bg-zinc-400/10 gap-2 w-full rounded-lg">
//                                 <div className="flex flex-col">
//                                     <span>Baccvs</span>
//                                     <span className="text-white text-base font-bold">$25,000</span>
//                                 </div>
//                                 <span>5% commission</span>
//                             </p>
//                             <p className="flex flex-col justify-between w-full  p-4 bg-zinc-400/10 rounded-lg">
//                                 <div className="flex flex-col">
//                                     <span>Ticket sellers</span>
//                                     <span className="text-white text-base font-bold">$475,000</span>
//                                 </div>
//                                 <span>95% commission</span>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Sales & Transactions */}
//             <div className="bg-[#120a1f] p-6 rounded-2xl shadow-lg">
//                 <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
//                     <h2 className="text-lg font-semibold">Sales & Transactions</h2>
//                     <input
//                         type="text"
//                         placeholder="Search sales & transactions"
//                         className="bg-[#1b1130] border border-gray-700 text-sm px-3 py-2 rounded-lg w-full sm:w-64 placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6]"
//                     />
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="min-w-full text-sm">
//                         <thead>
//                             <tr className="text-gray-400 border-b border-gray-700 text-left">
//                                 <th className="pb-2">Type</th>
//                                 <th className="pb-2">Plan</th>
//                                 <th className="pb-2">Price</th>
//                                 <th className="pb-2">Date</th>
//                                 <th className="pb-2">Time</th>
//                                 <th className="pb-2">Status</th>
//                                 <th className="pb-2">Purchaser</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {transactions.map((t, i) => (
//                                 <tr key={i} className="border-b border-gray-800 last:border-none">
//                                     <td className="py-3 flex items-center gap-1">{t.icon}{t.type}</td>
//                                     <td>{t.plan}</td>
//                                     <td>{t.price}</td>
//                                     <td>{t.date}</td>
//                                     <td>{t.time}</td>
//                                     <td>
//                                         <span className="text-green-400 font-medium">
//                                             {t.status}
//                                         </span>
//                                     </td>
//                                     <td className="flex gap-2">
//                                         <Image src={t.image} alt={t.purchaser} width={20} height={20} className="rounded-full"/>
//                                         {t.purchaser}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }









// "use client";
// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// import { Calendar } from "lucide-react";
// import FinancialReportModal from "../components/Revenue/FinancialReportModal";
// import DonutGauge from "../components/SubscriptionRevenueChart";
// import RevenuePieChart from "../components/GenericFullPieChart";
// import { DataItem } from "../page";
// import { BoostIcon, SuperLikes, UnlimitedLikesIcon } from "@/utils/svgicons";
// import Image from "next/image";

// const COLORS = ["#8B5CF6", "#22D3EE", "#FBBF24", "#34D399", "#F87171"];

// export default function Page() {
//   const data = [
//     { name: "Subscriptions", value: 500000 },
//     { name: "Tickets", value: 1000000 },
//     { name: "Unlimited Likes", value: 2000000 },
//     { name: "Super Likes", value: 200000 },
//     { name: "Boost", value: 100000 },
//   ];

//   const transactions = [
//     {
//       type: "Subscription",
//       plan: "Elite",
//       price: "$20",
//       date: "13 March, 2024",
//       time: "09:20 PM",
//       status: "Successful",
//       purchaser: "Cody Fisher",
//       icon: <BoostIcon />,
//       image: "/images/Frame 1321314235.svg",
//     },
//     {
//       type: "Ticket",
//       plan: "VIP",
//       price: "$10",
//       date: "13 March, 2024",
//       time: "07:04 PM",
//       status: "Successful",
//       purchaser: "Guy Hawkins",
//       icon: <UnlimitedLikesIcon />,
//       image: "/images/Frame 1321314235.svg",
//     },
//     {
//       type: "Unlimited Likes",
//       plan: "Basic",
//       price: "$15",
//       date: "13 March, 2024",
//       time: "07:00 PM",
//       status: "Successful",
//       purchaser: "James Watt",
//       icon: <BoostIcon />,
//       image: "/images/portrait-person-playing-music-saxophone 2.png",
//     },
//     {
//       type: "Subscription",
//       plan: "Elite",
//       price: "$20",
//       date: "13 March, 2024",
//       time: "09:20 PM",
//       status: "Successful",
//       purchaser: "Cody Fisher",
//       icon: <BoostIcon />,
//       image: "/images/Frame 1321314235.svg",
//     },
//     {
//       type: "Ticket",
//       plan: "VIP",
//       price: "$10",
//       date: "13 March, 2024",
//       time: "07:04 PM",
//       status: "Successful",
//       purchaser: "Guy Hawkins",
//       icon: <UnlimitedLikesIcon />,
//       image: "/images/Frame 1321314235.svg",
//     },
//     {
//       type: "Unlimited Likes",
//       plan: "Basic",
//       price: "$15",
//       date: "13 March, 2024",
//       time: "07:00 PM",
//       status: "Successful",
//       purchaser: "James Watt",
//       icon: <BoostIcon />,
//       image: "/images/portrait-person-playing-music-saxophone 2.png",
//     },
//     {
//       type: "Super Likes",
//       plan: "Regular",
//       price: "$19",
//       date: "13 March, 2024",
//       time: "07:10 PM",
//       status: "Successful",
//       purchaser: "Ralph Edwards",
//       icon: <BoostIcon />,
//       image: "/images/portrait-person-playing-music-saxophone 2.png",
//     },
//     {
//       type: "Boost",
//       plan: "Regular",
//       price: "$19",
//       date: "13 March, 2024",
//       time: "08:00 PM",
//       status: "Successful",
//       purchaser: "Floyd Miles",
//       icon: <UnlimitedLikesIcon />,
//       image: "/images/portrait-person-playing-music-saxophone 2.png",
//     },
//   ];

//   const chartData = [
//     { label: "Subscriptions", value: 800000, color: "#A58FFF" },
//     { label: "Tickets", value: 2000000, color: "#7DE2D1" },
//     { label: "Unlimited Likes", value: 500000, color: "#F1C40F" },
//     { label: "Super Likes", value: 200000, color: "#BB86FC" },
//     { label: "Boost", value: 100000, color: "#6DD3F9" },
//   ];

//   const engagementData: DataItem[] = [
//     { "Event Ratings": 58000 },
//     { Reviews: 5000 },
//     { Interactions: 12000 },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0B0614] text-white font-inter space-y-8 ">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-2xl font-semibold text-center sm:text-left">
//           Revenue & Financial
//         </h1>
//         <button className="flex items-center justify-center gap-2 bg-[#1b1130] border border-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-[#2b1e45] w-full sm:w-auto">
//           <Calendar size={16} /> Jan 20, 2024 - Feb 09, 2024
//         </button>
//       </div>

//       {/* Top Section */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Revenue Breakdown */}
//         <div className="bg-[#120a1f] w-full lg:w-[70%] p-6 rounded-2xl shadow-lg">
//           <h2 className="text-sm mb-4 text-gray-300">Revenue Breakdown</h2>
//           <RevenuePieChart
//             data={chartData}
//             totalValue="4M+"
//             totalLabel="Total revenue"
//           />
//         </div>

//         {/* Subscriptions */}
//         <div className="bg-[#120a1f] w-full lg:w-[30%] p-6 rounded-2xl shadow-lg space-y-4">
//           <p className="text-sm text-gray-300 mb-0">Subscriptions</p>
//           <DonutGauge
//             title="Total subscription"
//             data={engagementData}
//             valuePrefix="$"
//             layout="list"
//           />
//         </div>
//       </div>

//       {/* Metric Cards */}
//       <div className="flex flex-col lg:flex-row max-w-[calc(100% - 500px)] md:w-full gap-6">
//         {/* Revenue Cards */}
//         <div className="w-full lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[
//             {
//               title: "Unlimited Likes",
//               value: "$500,000",
//               icon: <UnlimitedLikesIcon />,
//               breakdown: [
//                 { label: "Basic", value: "$200,000" },
//                 { label: "Regular", value: "$150,000" },
//                 { label: "Gem", value: "$150,000" },
//               ],
//             },
//             {
//               title: "Super Likes",
//               value: "$200,000",
//               icon: <SuperLikes />,
//               breakdown: [
//                 { label: "Basic", value: "$50,000" },
//                 { label: "Regular", value: "$50,000" },
//                 { label: "Gem", value: "$100,000" },
//               ],
//             },
//             {
//               title: "Boost",
//               value: "$100,000",
//               icon: <BoostIcon />,
//               breakdown: [
//                 { label: "Basic", value: "$30,000" },
//                 { label: "Regular", value: "$30,000" },
//                 { label: "Gem", value: "$40,000" },
//               ],
//             },
//           ].map((card, i) => (
//             <div
//               key={i}
//               className="flex flex-col justify-between bg-[#190D29] p-4 rounded-2xl shadow-lg  sm:max-w-full scrollbar-hide "
//             >
//               <div className="flex items-center gap-2 ">
//                 {card.icon}
//                 <h3 className="text-sm text-gray-300">{card.title}</h3>
//               </div>
//               <div className="flex flex-col items-center">
//                 <p className="text-xl font-semibold mt-2">{card.value}</p>
//                 <p className="text-gray-400 text-xs font-normal">Total sales</p>
//               </div>
//               <div className="mt-3 text-sm text-gray-400">
//                 {card.breakdown.map((b, j) => (
//                   <p key={j} className="flex justify-between py-1">
//                     <span className="text-gray-400 text-xs">{b.label}</span>
//                     <span className="text-white text-xs font-bold">{b.value}</span>
//                   </p>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Ticket Commission */}
//         <div className="w-full lg:w-[30%]">
//           <div className="bg-[#190D29] p-4 rounded-2xl shadow-lg">
//             <h3 className="text-base font-medium mb-4">Ticket Commission</h3>
//             <div className="flex flex-col items-center my-6">
//               <p className="text-xl font-semibold">$500,000</p>
//               <p className="text-gray-400 text-xs font-normal">
//                 Total ticket sales
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-400">
//               <div className="flex flex-col justify-between p-4 bg-zinc-400/10 gap-2 w-full rounded-lg">
//                 <div>
//                   <span>Baccvs</span>
//                   <p className="text-white text-base font-bold">$25,000</p>
//                 </div>
//                 <span>5% commission</span>
//               </div>
//               <div className="flex flex-col justify-between p-4 bg-zinc-400/10 w-full rounded-lg">
//                 <div>
//                   <span>Ticket sellers</span>
//                   <p className="text-white text-base font-bold">$475,000</p>
//                 </div>
//                 <span>95% commission</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sales & Transactions */}
//       {/* <div className="bg-[#120a1f] p-6 rounded-2xl shadow-lg">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//           <h2 className="text-lg font-semibold">Sales & Transactions</h2>
//           <input
//             type="text"
//             placeholder="Search sales & transactions"
//             className="bg-[#1b1130] border border-gray-700 text-sm px-3 py-2 rounded-lg w-full sm:w-64 placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6]"
//           />
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="text-gray-400 border-b border-gray-700 text-left">
//                 <th className="pb-2">Type</th>
//                 <th className="pb-2">Plan</th>
//                 <th className="pb-2">Price</th>
//                 <th className="pb-2">Date</th>
//                 <th className="pb-2">Time</th>
//                 <th className="pb-2">Status</th>
//                 <th className="pb-2">Purchaser</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((t, i) => (
//                 <tr
//                   key={i}
//                   className="border-b border-gray-800 last:border-none text-xs sm:text-sm"
//                 >
//                   <td className="py-3 flex items-center gap-1">
//                     {t.icon}
//                     {t.type}
//                   </td>
//                   <td>{t.plan}</td>
//                   <td>{t.price}</td>
//                   <td>{t.date}</td>
//                   <td>{t.time}</td>
//                   <td>
//                     <span className="text-green-400 font-medium">
//                       {t.status}
//                     </span>
//                   </td>
//                   <td className="flex items-center gap-2">
//                     <Image
//                       src={t.image}
//                       alt={t.purchaser}
//                       width={20}
//                       height={20}
//                       className="rounded-full"
//                     />
//                     {t.purchaser}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div> */}


//       {/* Sales & Transactions */}
// <div className="bg-[#120a1f] p-6 rounded-2xl shadow-lg">
//   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//     <h2 className="text-lg font-semibold">Sales & Transactions</h2>
//     <input
//       type="text"
//       placeholder="Search sales & transactions"
//       className="bg-[#1b1130] border border-gray-700 text-sm px-3 py-2 rounded-lg w-full sm:w-64 placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6]"
//     />
//   </div>

//   {/* Scrollable container */}
//   <div className="overflow-x-auto overflow-y-auto max-h-[400px] max-w-[400px] sm:max-w-full scrollbar-hide rounded-lg custom-scrollbar">
//     <table className="w-full text-sm">
//       <thead className="sticky top-0 bg-[#120a1f] z-10">
//         <tr className="text-gray-400 border-b border-gray-700 text-left">
//           <th className="pb-2">Type</th>
//           <th className="pb-2">Plan</th>
//           <th className="pb-2">Price</th>
//           <th className="pb-2">Date</th>
//           <th className="pb-2">Time</th>
//           <th className="pb-2">Status</th>
//           <th className="pb-2">Purchaser</th>
//         </tr>
//       </thead>
//       <tbody>
//         {transactions.map((t, i) => (
//           <tr
//             key={i}
//             className="border-b border-gray-800 last:border-none text-xs sm:text-sm hover:bg-[#1b1130]"
//           >
//             <td className="py-3 flex items-center gap-1">
//               {t.icon}
//               {t.type}
//             </td>
//             <td>{t.plan}</td>
//             <td>{t.price}</td>
//             <td>{t.date}</td>
//             <td>{t.time}</td>
//             <td>
//               <span className="text-green-400 font-medium">{t.status}</span>
//             </td>
//             <td className="flex items-center gap-2">
//               <Image
//                 src={t.image}
//                 alt={t.purchaser}
//                 width={20}
//                 height={20}
//                 className="rounded-full"
//               />
//               {t.purchaser}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

//     </div>
//   );
// }






 "use client";
import React from "react";
import { Calendar } from "lucide-react";
import FinancialReportModal from "../components/Revenue/FinancialReportModal";
import DonutGauge from "../components/SubscriptionRevenueChart";
import RevenuePieChart from "../components/GenericFullPieChart";
import { DataItem } from "../page";
import { BoostIcon, SuperLikes, UnlimitedLikesIcon } from "@/utils/svgicons";
import Image from "next/image";

export default function Page() {
  const transactions = [
    {
      type: "Subscription",
      plan: "Elite",
      price: "$20",
      date: "13 March, 2024",
      time: "09:20 PM",
      status: "Successful",
      purchaser: "Cody Fisher",
      icon: <BoostIcon />,
      image: "/images/Frame 1321314235.svg",
    },
    {
      type: "Ticket",
      plan: "VIP",
      price: "$10",
      date: "13 March, 2024",
      time: "07:04 PM",
      status: "Successful",
      purchaser: "Guy Hawkins",
      icon: <UnlimitedLikesIcon />,
      image: "/images/Frame 1321314235.svg",
    },
    {
      type: "Unlimited Likes",
      plan: "Basic",
      price: "$15",
      date: "13 March, 2024",
      time: "07:00 PM",
      status: "Successful",
      purchaser: "James Watt",
      icon: <BoostIcon />,
      image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
      type: "Super Likes",
      plan: "Regular",
      price: "$19",
      date: "13 March, 2024",
      time: "07:10 PM",
      status: "Successful",
      purchaser: "Ralph Edwards",
      icon: <BoostIcon />,
      image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
      type: "Boost",
      plan: "Regular",
      price: "$19",
      date: "13 March, 2024",
      time: "08:00 PM",
      status: "Successful",
      purchaser: "Floyd Miles",
      icon: <UnlimitedLikesIcon />,
      image: "/images/portrait-person-playing-music-saxophone 2.png",
    },
  ];

  const chartData = [
    { label: "Subscriptions", value: 800000, color: "#A58FFF" },
    { label: "Tickets", value: 2000000, color: "#7DE2D1" },
    { label: "Unlimited Likes", value: 500000, color: "#F1C40F" },
    { label: "Super Likes", value: 200000, color: "#BB86FC" },
    { label: "Boost", value: 100000, color: "#6DD3F9" },
  ];

  const engagementData: DataItem[] = [
    { "Event Ratings": 58000 },
    { Reviews: 5000 },
    { Interactions: 12000 },
  ];

  return (
    <div className="min-h-screen bg-[#0B0614] text-white font-inter flex flex-col space-y-6 sm:space-y-8transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
          Revenue & Financial
        </h1>
        <button className="flex items-center justify-center gap-2 bg-[#1b1130] border border-gray-700 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg hover:bg-[#2b1e45] w-full sm:w-auto">
          <Calendar size={16} /> Jan 20, 2024 - Feb 09, 2024
        </button>
      </div>

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-[#120a1f] w-full lg:w-[70%] p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-xs sm:text-sm mb-4 text-gray-300">
            Revenue Breakdown
          </h2>
          <RevenuePieChart
            data={chartData}
            totalValue="4M+"
            totalLabel="Total revenue"
          />
        </div>

        {/* Subscriptions */}
        <div className="bg-[#120a1f] w-full lg:w-[32%] p-3 rounded-2xl shadow-lg">
          <p className="text-xs sm:text-sm text-gray-300 mb-0">Subscriptions</p>
          <DonutGauge
            title="Total subscription"
            data={engagementData}
            valuePrefix="$"
            layout="list"
          />
        </div>
      </div>

      {/* Metric Cards & Ticket Commission */}
      <div className="flex flex-col xl:flex-row w-full gap-6">
        {/* Revenue Cards */}
        <div className="w-full xl:w-[70%] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              title: "Unlimited Likes",
              value: "$500,000",
              icon: <UnlimitedLikesIcon />,
              breakdown: [
                { label: "Basic", value: "$200,000" },
                { label: "Regular", value: "$150,000" },
                { label: "Gem", value: "$150,000" },
              ],
            },
            {
              title: "Super Likes",
              value: "$200,000",
              icon: <SuperLikes />,
              breakdown: [
                { label: "Basic", value: "$50,000" },
                { label: "Regular", value: "$50,000" },
                { label: "Gem", value: "$100,000" },
              ],
            },
            {
              title: "Boost",
              value: "$100,000",
              icon: <BoostIcon />,
              breakdown: [
                { label: "Basic", value: "$30,000" },
                { label: "Regular", value: "$30,000" },
                { label: "Gem", value: "$40,000" },
              ],
            },
          ].map((card, i) => (
            <div
              key={i}
              className="flex flex-col justify-between bg-[#190D29] p-3 sm:p-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                {card.icon}
                <h3 className="text-gray-300">{card.title}</h3>
              </div>
              <div className="flex flex-col items-center mt-2">
                <p className="text-lg sm:text-xl font-semibold">{card.value}</p>
                <p className="text-gray-400 text-[10px] sm:text-xs font-normal">
                  Total sales
                </p>
              </div>
              <div className="mt-3 text-gray-400 text-[10px] sm:text-xs">
                {card.breakdown.map((b, j) => (
                  <p key={j} className="flex justify-between py-1">
                    <span>{b.label}</span>
                    <span className="text-white font-bold">{b.value}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ticket Commission */}
        <div className="w-full xl:w-[32%]">
          <div className="bg-[#190D29] p-4 rounded-2xl shadow-lg">
            <h3 className="text-base font-medium mb-4">Ticket Commission</h3>
            <div className="flex flex-col items-center my-6">
              <p className="text-lg sm:text-xl font-semibold">$500,000</p>
              <p className="text-gray-400 text-xs font-normal">
                Total ticket sales
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-xs sm:text-sm text-gray-400">
              <div className="flex flex-col justify-between p-3 sm:p-4 bg-zinc-400/10 gap-2 w-full rounded-lg">
                <div>
                  <span>Baccvs</span>
                  <p className="text-white text-base font-bold">$25,000</p>
                </div>
                <span>5% commission</span>
              </div>
              <div className="flex flex-col justify-between p-3 sm:p-4 bg-zinc-400/10 w-full rounded-lg">
                <div>
                  <span>Ticket sellers</span>
                  <p className="text-white text-base font-bold">$475,000</p>
                </div>
                <span>95% commission</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales & Transactions (Scrollable Table) */}
      <div className="bg-[#120a1f] p-4 sm:p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">Sales & Transactions</h2>
          <input
            type="text"
            placeholder="Search sales & transactions"
            className="bg-[#1b1130] border border-gray-700 text-xs sm:text-sm px-3 py-2 rounded-lg w-full sm:w-64 placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-[60vh] rounded-lg custom-scrollbar">
          <table className="min-w-[700px] w-full text-xs sm:text-sm">
            <thead className="sticky top-0 bg-[#120a1f] z-10">
              <tr className="text-gray-400 border-b border-gray-700 text-left">
                <th className="pb-2">Type</th>
                <th className="pb-2">Plan</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Time</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Purchaser</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-800 last:border-none text-xs hover:bg-[#1b1130]"
                >
                  <td className="py-3 flex items-center gap-1">{t.icon}{t.type}</td>
                  <td>{t.plan}</td>
                  <td>{t.price}</td>
                  <td>{t.date}</td>
                  <td>{t.time}</td>
                  <td><span className="text-green-400 font-medium">{t.status}</span></td>
                  <td className="flex items-center gap-2">
                    <Image
                      src={t.image}
                      alt={t.purchaser}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    {t.purchaser}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
