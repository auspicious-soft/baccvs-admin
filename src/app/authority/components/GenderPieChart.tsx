"use client";
import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { UserIcon } from "lucide-react";

Chart.register(ArcElement, Tooltip);

interface GenderPieChartProps {
  male: number; // percentage e.g. 76
  female: number; // percentage e.g. 24
  averageAge: number;
}
type CustomDataset = {
  data: number[];
  backgroundColor: string[];
  borderWidth: number;
  cutout?: string; // Add the 'cutout' property with an optional type
};

export default function GenderPieChart({ male, female, averageAge }: GenderPieChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Male", "Female"],
        datasets: [
          {
            data: [male, female],
            backgroundColor: ["#F8F8B5", "#9BE6F3"],
            borderWidth: 0,
            cutout: "80%",
          } as CustomDataset,
        ],
      },
      options: {
        rotation: -150, // rotate to tilt it slightly open top-right
        circumference: 300, // 3/4 circle
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
        },
      },
    });
  }, [male, female]);

  return (
    <div className=" text-white rounded-2xl w-full  flex flex-col items-center justify-center">
      {/* Chart container */}
      <div className="relative w-[80%] h-[250px]">
        <canvas ref={chartRef}></canvas>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
          <p className="text-gray-300 text-sm">Average age</p>
          <p className="text-4xl font-semibold">{averageAge} <span className="text-lg font-normal text-gray-400">y/o</span></p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col mt-6 space-y-3 w-full ">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-300">
            <UserIcon size={16} className="text-[#F8F8B5]" />
            <span>Male</span>
          </div>
          <span className="text-white font-medium">{male}%</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-300">
            <UserIcon size={16} className="text-[#9BE6F3]" />
            <span>Female</span>
          </div>
          <span className="text-white font-medium">{female}%</span>
        </div>
      </div>
    </div>
  );
}
