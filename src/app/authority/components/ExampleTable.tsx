import Image from "next/image";
import GenericTable from "./GenericTable";

export default function UsersPage() {
  const columns = [
    {
      key: "user",
      label: "Name",
      render: (value: any, row: any) => (
        <div className="flex items-center gap-3">
          <input type="checkbox" className="accent-[#8A2CF4] hidden" />
          <Image
            src={row.avatar}
            alt={row.name}
            width={36}
            height={36}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-gray-400 text-xs">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", label: "Phone number" },
    { key: "location", label: "Location" },
    { key: "subscription", label: "Subscription" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => {
        const colors: any = {
          Active: "bg-green-900 text-green-400",
          Inactive: "bg-gray-700 text-gray-400",
          Banned: "bg-red-900 text-red-400",
        };
        return (
          <span
            className={`px-3 py-1 rounded-lg text-xs font-medium ${colors[value]}`}
          >
            {value}
          </span>
        );
      },
    },
  ];

  const data = [
    {
      name: "Cody Fisher",
      email: "codyfisher@mail.com",
      phone: "+62302839254",
      location: "Jakarta, Indonesia",
      subscription: "Freemium",
      status: "Active",
      avatar: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
      name: "Wilson James",
      email: "wilsonjames@mail.com",
      phone: "+62302839254",
      location: "Jakarta, Indonesia",
      subscription: "Freemium",
      status: "Banned",
      avatar: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
      name: "Wilson James",
      email: "wilsonjames@mail.com",
      phone: "+62302839254",
      location: "Jakarta, Indonesia",
      subscription: "Freemium",
      status: "Banned",
      avatar: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
      name: "Wilson James",
      email: "wilsonjames@mail.com",
      phone: "+62302839254",
      location: "Jakarta, Indonesia",
      subscription: "Freemium",
      status: "Banned",
      avatar: "/images/portrait-person-playing-music-saxophone 2.png",
    },
    {
      name: "Wilson James",
      email: "wilsonjames@mail.com",
      phone: "+62302839254",
      location: "Jakarta, Indonesia",
      subscription: "Freemium",
      status: "Banned",
      avatar: "/images/portrait-person-playing-music-saxophone 2.png",
    },
  ];

  return <GenericTable columns={columns} data={data} />;
}
