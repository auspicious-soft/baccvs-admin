"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface GenericTableProps {
  title?: string;
  columns: Column[];
  data: any[];
  onDelete?: (row: any) => void;
  onBanUsers?: (selectedRows: any[]) => void;
}

export default function GenericTable({
  title = "Users",
  columns,
  data,
  onDelete,
  onBanUsers,
}: GenericTableProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleSelectRow = (row: any) => {
    setSelectedRows((prev) =>
      prev.includes(row) ? prev.filter((r) => r !== row) : [...prev, row]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData);
    }
  };

  return (
    <div className="w-full bg-[#150A24] text-white rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-6 items-center">
          <h2 className="text-lg font-semibold">{title}</h2>

          <div className="relative">
            <input
              type="text"
              placeholder="Search user"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#1E0E33] text-white p-3 pl-10 rounded-full focus:outline-none focus:ring-1 focus:ring-[#8A2CF4]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-[#1E0E33] rounded-lg text-white border border-gray-500/20 cursor-pointer"
          >
            <option className="w-44 px-4 py-3 border-b-[0.50px] border-gray-500/20 inline-flex justify-between items-center">All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Banned</option>
          </select>
        </div>
      </div>

      {/* Action Bar (when rows selected) */}
      {(selectedRows.length > 0) && (
        <div className="flex items-center justify-between bg-[#1E0E33] p-3 rounded-xl mb-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="accent-[#8A2CF4]"
              checked={selectedRows.length === filteredData.length}
              onChange={handleSelectAll}
            />
            <span className="text-sm text-gray-300">Select all</span>
            {selectedRows.length > 0 && (
              <span className="text-sm text-gray-400 ml-2">
                {selectedRows.length} of {data.length} selected
              </span>
            )}
          </div>

          {selectedRows.length > 0 && (
            <div className="flex gap-3 items-center">
              <button
                onClick={() => onBanUsers && onBanUsers(selectedRows)}
                className="bg-[#D82C4B] hover:bg-[#ff3b5c] text-white px-4 py-2 rounded-lg text-sm"
              >
                Ban User
              </button>
              <button
                onClick={() => {
                  selectedRows.forEach((row) => onDelete && onDelete(row));
                  setSelectedRows([]);
                }}
                className="bg-[#31204A] hover:bg-[#4a2c6d] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-[#2D1B4E] text-sm">
              <th className="p-3 text-left w-12"></th>
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-left font-medium">
                  {col.label}
                </th>
              ))}
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-[#2D1B4E] hover:bg-[#1A0C2D] transition-colors ${
                  selectedRows.includes(row) ? "bg-[#24113A]" : ""
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    className="accent-[#8A2CF4]"
                    checked={selectedRows.includes(row)}
                    onChange={() => handleSelectRow(row)}
                  />
                </td>

                {columns.map((col) => (
                  <td key={col.key} className="p-3 text-sm text-gray-200">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}

                <td className="p-3">
                  <button
                    onClick={() => onDelete && onDelete(row)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
