import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  FileText,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Employees");

  const nav = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Employees", icon: Users },
    { name: "Add Employee", icon: UserPlus },
    { name: "Attendance", icon: Calendar },
    { name: "Reports", icon: FileText },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-slate-900 text-slate-300 flex flex-col transition-all duration-200`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
        {!collapsed && (
          <span className="text-white font-bold text-lg tracking-tight">
            Hire<span className="text-indigo-500">HQ</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {nav.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActive(name)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active === name
                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-900/50"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span>{name}</span>}
          </button>
        ))}
      </nav>

      {/* User card */}
      <div className="p-3 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2">
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="User avatar"
            className="w-9 h-9 rounded-full ring-2 ring-indigo-500/50"
          />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Sarah Malik</p>
              <p className="text-xs text-slate-400 truncate">HR Manager</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}