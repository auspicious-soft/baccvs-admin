// "use client";
// import { colors } from "@/styles/assets";
// import React from "react";

// type Column<T> = {
//   header: string;
//   accessor: keyof T | string;
//   render?: (row: T, rowIndex: number) => React.ReactNode;
// };

// type DynamicTableProps<T> = {
//   columns: Column<T>[];
//   data: T[];
//   maxHeight?: string;
//   headbg?: boolean;
// };

// export default function DynamicTable<T extends object>({
//   columns,
//   data,
//   maxHeight,
//   headbg = false,
// }: DynamicTableProps<T>) {
//   return (
//     <div className="overflow-x-auto">
//       <div
//         className="overflow-y-auto scrollbar-hide"
//         style={{ maxHeight: maxHeight ?? "auto" }}
//       >
//         <table className="min-w-full border-collapse">
//           {/* Table Head */}
//           <thead
//             className="sticky top-0 z-10"
//             style={
//               headbg ? { background: "#222222" } : { background: colors.bg2 }
//             }
//           >
//             <tr className="text-left border-b border-gray-200">
//               {columns?.map((col, idx) => (
//                 <th
//                   key={idx}
//                   style={headbg ? { color: "#ffffff" } : { color: "#464646" }}
//                   className="px-4 py-3 text-sm font-medium font-['Plus_Jakarta_Sans']"
//                 >
//                   {col.header}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {data?.map((row, rowIndex) => (
//               <tr
//                 key={rowIndex}
//                 style={
//                   headbg && rowIndex%2==0
//                     ? { background: colors.bg2}
//                     : { background: "#ffffff" }
//                 }
//                 className="border-b border-gray-200 last:border-none hover:bg-gray-50"
//               >
//                 {columns.map((col, colIndex) => (
//                   <td
//                     key={colIndex}
//                     className="px-4 py-3 text-sm text-gray-800"
//                   >
//                     {col.render
//                       ? col.render(row, rowIndex) // pass rowIndex also
//                       : typeof col.accessor === "string"
//                       ? ((row as Record<string, unknown>)[
//                           col.accessor
//                         ] as React.ReactNode)
//                       : (row[col.accessor] as React.ReactNode)}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



"use client";
import { colors } from "@/styles/assets";
import React from "react";

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  render?: (row: T, rowIndex: number) => React.ReactNode;
};

type DynamicTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  maxHeight?: string;
  headbg?: boolean;
};

export default function DynamicTable<T extends object>({
  columns,
  data,
  maxHeight,
  headbg = false,
}: DynamicTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <div
        className="overflow-y-auto scrollbar-hide"
        style={{ maxHeight: maxHeight ?? "auto" }}
      >
        <table className="min-w-full border-collapse text-sm md:text-base">
          {/* Table Head */}
          <thead
            className="sticky top-0 z-10"
            style={headbg ? { background: "#222222" } : { background: colors.bg2 }}
          >
            <tr className="text-left border-b border-gray-200">
              {columns?.map((col, idx) => (
                <th
                  key={idx}
                  style={headbg ? { color: "#ffffff" } : { color: "#464646" }}
                  className="px-3 py-3 md:px-4 font-medium whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={
                  headbg && rowIndex % 2 === 0
                    ? { background: colors.bg2 }
                    : { background: "#ffffff" }
                }
                className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-3 py-3 md:px-4 text-gray-800 break-words max-w-[200px]"
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : typeof col.accessor === "string"
                      ? ((row as Record<string, unknown>)[col.accessor] as React.ReactNode)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden mt-4 space-y-4">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            {columns.map((col, i) => (
              <div key={i} className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-500">{col.header}</span>
                <span className="text-gray-800">
                  {col.render
                    ? col.render(row, rowIndex)
                    : (row as any)[col.accessor] as React.ReactNode}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
