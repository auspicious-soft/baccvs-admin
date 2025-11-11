"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip);

interface ChartItem {
  label: string;
  value: number;
  color: string;
}

interface RevenueDonutChartProps {
  data: ChartItem[];
  totalLabel?: string;
  totalValue?: string;
}

const RevenueDonutChart: React.FC<RevenueDonutChartProps> = ({
  data,
  totalLabel = "Total Revenue",
  totalValue = "4M+",
}) => {
  const chartData = {
    labels: data?.map((d) => d.label),
    datasets: [
      {
        data: data?.map((d) => d.value),
        backgroundColor: data?.map((d) => d.color),
        borderWidth: 0,
        cutout: "70%", // donut thickness
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "90%",
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed as number;
            return `${label}: $${value.toLocaleString()}`;
          },
        },
      },
      legend: { display: false },
    },
  };

  return (
    <div
      style={{
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // padding: "2rem",
        borderRadius: "12px",
        width: "100%",
        gap: "2rem",

      }}
      className="flex flex-col md:flex-row"
    >
      {/* Donut chart */}
      <div
        style={{
          width: "220px",
          height: "220px",
          position: "relative",
        }}
      >
        <Doughnut data={chartData} options={options} />
        {/* Center label */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{totalValue}</div>
          <div style={{ fontSize: "0.9rem", color: "#aaa" }}>{totalLabel}</div>
        </div>
      </div>

      {/* Right side legend */}
      <div style={{ flex: 1, paddingLeft: "2rem" } } className="w-full">
        {data?.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.6rem",
              color: "#ccc",
              fontSize: "0.95rem",
            }}
          >
            {/* Left label with color indicator */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  display: "inline-block",
                  marginRight: "0.6rem",
                }}
              ></span>
              {item.label}
            </div>

            {/* Dotted line + value */}
            <div
              style={{
                flexGrow: 1,
                borderBottom: "1px dotted #444",
                margin: "0 0.6rem",
              }}
            ></div>
            <div style={{ minWidth: "90px", textAlign: "right", color: "#fff" }}>
              ${item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueDonutChart;
