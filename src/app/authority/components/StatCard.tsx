
export default function StatCard({ title, value, change, color, icon }: any) {
  return (
    <div className="bg-[#190D29] rounded-2xl p-5 flex flex-col gap-6">
      <div className="flex w-full justify-between items-center flex-wrap-reverse gap-2 ">
      <div className="flex gap-2 flex-col items-start">
        <p className="text-sm text-white/70">{title}</p>
      <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
        <div className="text-[#7b61ff]">{icon}</div>
      </div>
      {change &&
      <p
      className={`text-xs flex gap-1 items-center`}
      >
        <span className={`px-2 py-0.5 ${color === "green" ? "text-green-400 bg-emerald-900/25" : "text-red-400 bg-orange-900/25"
          } rounded-2xl inline-flex justify-center items-center`}>{change}</span>  from last month
      </p>
        }
    </div>
  );
}




