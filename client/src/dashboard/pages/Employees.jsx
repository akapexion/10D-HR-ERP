import { useState } from "react";
import { Search, MoreVertical, Mail, Pencil, Trash2 } from "lucide-react";

const EMPLOYEES = [
  {
    name: "Ayesha Khan",
    email: "ayesha.khan@hirehq.com",
    role: "Product Designer",
    department: "Design",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    name: "Bilal Ahmed",
    email: "bilal.ahmed@hirehq.com",
    role: "Backend Engineer",
    department: "Engineering",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=8",
  },
  {
    name: "Hina Raza",
    email: "hina.raza@hirehq.com",
    role: "HR Executive",
    department: "Human Resources",
    status: "On Leave",
    avatar: "https://i.pravatar.cc/40?img=9",
  },
  {
    name: "Omar Farooq",
    email: "omar.farooq@hirehq.com",
    role: "Marketing Lead",
    department: "Marketing",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=15",
  },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  "On Leave": "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  Inactive: "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
};

export default function Employees() {
  const [query, setQuery] = useState("");

  const filtered = EMPLOYEES.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Employees</h2>
          <p className="text-sm text-slate-500">
            {filtered.length} of {EMPLOYEES.length} team members
          </p>
        </div>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name..."
            className="pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all w-full sm:w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 uppercase text-xs tracking-wide">
              <th className="px-5 py-3 font-medium">Employee</th>
              <th className="px-5 py-3 font-medium">Department</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr
                key={emp.email}
                className="border-t border-slate-100 hover:bg-slate-50/70 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-slate-800">{emp.name}</p>
                      <p className="text-slate-400 text-xs flex items-center gap-1">
                        <Mail size={12} /> {emp.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-600">
                  {emp.department}
                  <p className="text-xs text-slate-400">{emp.role}</p>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[emp.status]}`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1 text-slate-400">
                    <button className="p-1.5 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 transition-colors">
                      <MoreVertical size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-slate-400">
                  No employees match "{query}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}