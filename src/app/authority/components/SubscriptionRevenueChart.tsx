"use client";
import { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  DoughnutController,
  ChartData,
  ChartOptions,
} from "chart.js";

Chart.register(ArcElement, DoughnutController, Tooltip);

interface DataItem {
  [key: string]: number;
}

interface DonutGaugeProps {
  title: string;
  data: DataItem[];
  valuePrefix?: string;
  layout?: "list" | "inline";
}

const DonutGauge: React.FC<DonutGaugeProps> = ({
  title,
  data,
  valuePrefix = "",
  layout = "list",
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const labels = data.map((item) => Object.keys(item)[0]);
    const values = data.map((item) => Object.values(item)[0]);

    const chartData: ChartData<"doughnut"> = {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ["#9565CA", "#5AD2F4", "#EEF596"],
          borderWidth: 0,
        },
      ],
    };

    const chartOptions: ChartOptions<"doughnut"> = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "90%",
      rotation: -90,
      circumference: 180,
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context) => {
              const label = context.label || "";
              const value = context.raw as number;
              return `${label}: ${value.toLocaleString()}`;
            },
          },
        },
        legend: { display: false },
      },
    };
 

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: chartOptions,
    });
  }, [data]);

  const totalValue = data.reduce((sum, d) => sum + Object.values(d)[0], 0);

  const formattedTotal =
    totalValue >= 1_000_000
      ? `${(totalValue / 1_000_000).toFixed(1)}M+`
      : totalValue >= 1_000
        ? `${(totalValue / 1_000).toFixed(0)}K`
        : totalValue.toString();

  const colors = ["#9565CA", "#5AD2F4", "#EEF596"];

  return (
    <div className="w-full flex flex-col items-center text-white">
      {/* Chart */}
      <div className="relative w-full aspect-[2/1] max-h-[200px]">
        <canvas ref={chartRef} className="w-full h-full" />
        <div className="absolute inset-0 flex flex-col justify-center items-center mt-6">
          <h3 className="text-white text-2xl font-semibold">
            {valuePrefix}
            {formattedTotal}
          </h3>
          <p className="text-sm text-[#9AA0B3]">{title}</p>
        </div>
      </div>

      {/* Legend */}
      {layout === "list" ? (
        // 🟣 Layout 1 → stacked vertically (like "Subscription Revenue")
        <div className="flex flex-col sm:flex-row w-full flex-wrap justify-center gap-6 mt-2 ">
          {data.map((item, idx) => {
            const label = Object.keys(item)[0];
            const value = Object.values(item)[0];
            return (
              <div key={label} className="flex flex-col  gap-1">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-[3px] h-full rounded-md"
                    style={{ backgroundColor: colors[idx] }}
                  ></span>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#9AA0B3]">{label}</span>
                    <strong className="text-sm font-normal text-white ">
                      {valuePrefix}
                      {value.toLocaleString()}
                    </strong>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // 💠 Layout 2 → inline horizontal (like "User Engagement")
        <div className="flex flex-col  justify-between items-start gap-3 w-full mt-4 ">
          {data.map((item, idx) => {
            const label = Object.keys(item)[0];
            const value = Object.values(item)[0];
            return (
              <div
                key={label}
                className="flex flex-row justify-between items-center w-full gap-6"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-[8px] h-[8px] rounded-full"
                    style={{ backgroundColor: colors[idx] }}
                  ></span>
                  <span className="text-sm text-[#9AA0B3]">{label}</span>
                </div>
                <strong className="text-sm font-normal text-white">
                  {valuePrefix}
                  {value.toLocaleString()}
                </strong>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DonutGauge;
