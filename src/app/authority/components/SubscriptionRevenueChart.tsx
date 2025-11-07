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
  layout: "list" | "inline"; // 👈 new prop for layout type
}

// const DonutGauge: React.FC<DonutGaugeProps> = ({
//   title,
//   data,
//   valuePrefix = "",
//   layout = "list",
// }) => {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const chartInstance = useRef<Chart | null>(null);

//   useEffect(() => {
//     if (!chartRef.current) return;
//     if (chartInstance.current) chartInstance.current.destroy();

//     const ctx = chartRef.current.getContext("2d");
//     if (!ctx) return;

//     const labels = data.map((item) => Object.keys(item)[0]);
//     const values = data.map((item) => Object.values(item)[0]);

//     const chartData: ChartData<"doughnut"> = {
//       labels,
//       datasets: [
//         {
//           data: values,
//           backgroundColor: ["#9565CA", "#5AD2F4", "#EEF596"],
//           borderWidth: 0,
//         },
//       ],
//     };

//     const chartOptions: ChartOptions<"doughnut"> = {
//       cutout: "85%",
//       rotation: -90,
//       circumference: 180,
//       responsive: true,
//       plugins: {
//         tooltip: {
//           enabled: true,
//           callbacks: {
//             label: (context) => {
//               const label = context.label || "";
//               const value = context.raw as number;
//               return `${label}: ${value.toLocaleString()}`;
//             },
//           },
//         },
//         legend: { display: false },
//       },
//     };

//     chartInstance.current = new Chart(ctx, {
//       type: "doughnut",
//       data: chartData,
//       options: chartOptions,
//     });
//   }, [data]);

//   const totalValue = data.reduce(
//     (sum, d) => sum + Object.values(d)[0],
//     0
//   );

//   const formattedTotal =
//     totalValue >= 1_000_000
//       ? `${(totalValue / 1_000_000).toFixed(1)}M`
//       : totalValue >= 1_000
//         ? `${(totalValue / 1_000).toFixed(0)}K`
//         : totalValue.toString();

//   const colors = ["#9565CA", "#5AD2F4", "#EEF596"];

//   return (
//     <div className="donut-gauge">
//       <div className="chart-container">
//         <canvas ref={chartRef} width={300} height={150}></canvas>
//         <div className="chart-text">
//           <h3>
//             {valuePrefix}
//             {formattedTotal}
//           </h3>
//           <p>{title}</p>
//         </div>
//       </div>

//       {/* ✅ Conditionally render layout */}
//       <div
//         className={`legend  w-full gap-[6px] ${layout === "inline" ? "legend-inline" : "legend-row"
//           }`}
//       >
//         {data.map((item, idx) => {
//           const label = Object.keys(item)[0];
//           const value = Object.values(item)[0];
//           return (
//             <>


//               {layout === "list" ? (
//                 <div
//                   className="legend-item"
//                   key={label}
//                   style={{
//                     width: (layout as "list" | "inline") === "inline" ? "100%" : "",
//                     flexDirection: (layout as "list" | "inline")=== "inline" ? "row" : "column",
//                     justifyContent:
//                       (layout as "list" | "inline") === "inline" ? "space-between" : "flex-start",
//                     alignItems: (layout as "list" | "inline") === "inline" ? "center" : "flex-start",
//                     marginRight: "10px",
//                   }}
//                 >
//                   <div
//                     className="legend-label"
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "8px",
//                       width: (layout as "list" | "inline") === "inline" ? "100%" : "auto",
//                     }}
//                   >
//                     <span
//                       className="color-box"
//                       style={{
//                         backgroundColor: colors[idx],
//                         borderRadius: layout === "list" ? "4px" : "50%",
//                         width: layout === "list" ? "4px" : "12px",   // 👈 thin width for vertical line
//                         height: layout === "list" ? "50px" : "12px", // 👈 tall height for vertical line
//                         display: "inline-block",
//                         marginRight: layout === "list" ? "4px" : "0",
//                       }}
//                     ></span>
//                     <div className="flex flex-col gap-1.5">

//                       <span>{label}</span>
//                       <strong>
//                         {valuePrefix}
//                         {value.toLocaleString()}
//                       </strong>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   className="legend-item"
//                   key={label}
//                   style={{
//                     width: layout === "inline" ? "100%" : "",
//                     flexDirection: layout === "inline" ? "row" : "column",
//                     justifyContent:
//                       layout === "inline" ? "space-between" : "flex-start",
//                     alignItems: layout === "inline" ? "center" : "flex-start",
//                     gap: layout === "inline" ? "8px" : "4px",
//                   }}
//                 >
//                   <div
//                     className="legend-label"
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "8px",
//                       width: layout === "inline" ? "100%" : "auto",
//                     }}
//                   >
//                     <span
//                       className="color-box"
//                       style={{
//                         backgroundColor: colors[idx],
//                         borderRadius:  "50%",
                        
//                       }}
//                     ></span>
//                     <span>{label}</span>
//                   </div>
//                   <strong>
//                     {valuePrefix}
//                     {value.toLocaleString()}
//                   </strong>
//                 </div>
//               )}

//             </>
//             // <div
//             //   className="legend-item"
//             //   key={label}
//             //   style={{
//             //     width: layout === "inline" ? "100%" : "",
//             //     flexDirection: layout === "inline" ? "row" : "column",
//             //     justifyContent: layout === "inline" ? "space-between" : "flex-start",
//             //   }}
//             // >
//             //   <div className="legend-label">
//             //     <span
//             //       className="color-box"

//             //     // style={{ backgroundColor: colors[idx], borderRadius: "50px" }}
//             //     ></span>
//             //     <span>{label}</span>
//             //   </div>
//             //   <strong>{valuePrefix}{value.toLocaleString()}</strong>
//             // </div>
//           );
//         })}
//       </div>

//       <style jsx>{`
//         .donut-gauge {
//         //   background-color: #1d1d2e;
//           color: white;
//           border-radius: 12px;
//         //   padding: 20px;
//           text-align: center;
//           max-width: 400px;
//           position: relative;
//         }

//         .chart-container {
//           position: relative;
//           display: inline-block;
//         }

//         .chart-text {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -20%);
//           text-align: center;
//         }

//         h3 {
//           font-size: 32px;
//           font-weight: bold;
//           margin: 0;
//         }

//         p {
//           font-size: 14px;
//           color: #a0a0a0;
//           margin-top: 4px;
//         }

//         .legend {
//           display: flex;
//           justify-content: center;
//           flex-wrap: wrap;
//         }

//         .legend-list {
//           flex-direction: column;
//           align-items: stretch;
//         }

//         .legend-inline {
//           flex-direction: row;
//           justify-content: space-between;
//         }

//         .legend-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 8px;
//         }

//         .legend-label {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .color-box {
//           width: 12px;
//           height: 12px;
//           border-radius: 2px;
//           display: inline-block;
//         }
//       `}</style>
//     </div>
//   );
// };



const DonutGauge: React.FC<{
  title: string;
  data: DataItem[];
  valuePrefix?: string;
  layout: "list" | "inline";
}> = ({ title, data, valuePrefix = "", layout = "list" }) => {
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
      cutout: "80%",
      rotation: -90,
      circumference: 180,
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
    };

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: chartOptions,
    });
  }, [data]);

  const totalValue = data.reduce(
    (sum, d) => sum + Object.values(d)[0],
    0
  );
  const formattedTotal =
    totalValue >= 1_000_000
      ? `${(totalValue / 1_000_000).toFixed(1)}M`
      : totalValue >= 1_000
      ? `${(totalValue / 1_000).toFixed(0)}K`
      : totalValue.toString();

  const colors = ["#9565CA", "#5AD2F4", "#EEF596"];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px]">
        {/* <div className="w-"> */}
        <canvas ref={chartRef} className="w-full h-full px-1"></canvas>
        {/* </div> */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold">
            {valuePrefix}
            {formattedTotal}
          </h3>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </div>

      <div
        className={`flex flex-wrap ${
          layout === "inline" ? "flex-row justify-between mt-4" : "flex-col mt-5"
        } w-full gap-3 text-sm`}
      >
        {data.map((item, idx) => {
          const label = Object.keys(item)[0];
          const value = Object.values(item)[0];
          return (
            <div key={idx} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[idx] }}
                ></span>
                <span>{label}</span>
              </div>
              <strong>
                {valuePrefix}
                {value.toLocaleString()}
              </strong>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonutGauge;
