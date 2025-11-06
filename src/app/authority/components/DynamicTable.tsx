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
    <div className="overflow-x-auto">
      <div
        className="overflow-y-auto scrollbar-hide"
        style={{ maxHeight: maxHeight ?? "auto" }}
      >
        <table className="min-w-full border-collapse">
          {/* Table Head */}
          <thead
            className="sticky top-0 z-10"
            style={
              headbg ? { background: "#222222" } : { background: colors.bg2 }
            }
          >
            <tr className="text-left border-b border-gray-200">
              {columns?.map((col, idx) => (
                <th
                  key={idx}
                  style={headbg ? { color: "#ffffff" } : { color: "#464646" }}
                  className="px-4 py-3 text-sm font-medium font-['Plus_Jakarta_Sans']"
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
                  headbg && rowIndex%2==0
                    ? { background: colors.bg2}
                    : { background: "#ffffff" }
                }
                className="border-b border-gray-200 last:border-none hover:bg-gray-50"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-3 text-sm text-gray-800"
                  >
                    {col.render
                      ? col.render(row, rowIndex) // pass rowIndex also
                      : typeof col.accessor === "string"
                      ? ((row as Record<string, unknown>)[
                          col.accessor
                        ] as React.ReactNode)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
