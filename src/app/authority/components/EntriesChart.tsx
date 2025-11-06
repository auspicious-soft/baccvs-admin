"use client";
import { colors } from "@/styles/assets";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define the expected shape of each data item
type EntriesChartData = {
  month: string;
  digitalRaffleEntries: number;
  physicalRaffleEntries: number;
};

// Define props type for the component
interface EntriesChartProps {
  data: EntriesChartData[];
}

export default function EntriesChart({ data }: EntriesChartProps) {
  return (
    <div className="p-4 rounded-[10px]" style={{ background: colors.bg2 }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={colors.bg2}
          />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="square"
            wrapperStyle={{ marginTop: 10 }}
          />
          {/* ✅ Custom names for legend and tooltip */}
          <Bar
            dataKey="digitalRaffleEntries"
            name="Digital Raffle"
            fill="#f50927"
            barSize={30}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="physicalRaffleEntries"
            name="Physical Raffle"
            fill="#64B6AC"
            barSize={30}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
