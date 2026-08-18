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
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const nav = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { name: "Employees", icon: Users, to: "employees" },
    { name: "Add Employee", icon: UserPlus, to: "addemployee" },
    { name: "Attendance", icon: Calendar, to: "attendance" },
    { name: "Reports", icon: FileText, to: "reports" },
    { name: "Settings", icon: Settings, to: "settings" },
  ];

  const isActive = (to) => location.pathname.toLowerCase().includes(to.toLowerCase());

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-slate-900 text-slate-300 flex flex-col transition-all duration-200 shrink-0`}
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
          className={`p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ${
            collapsed ? "mx-auto" : ""
          }`}
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {nav.map(({ name, icon: Icon, to }) => {
          const active = isActive(to);
          return (
            <Link
              key={name}
              to={to}
              title={collapsed ? name : undefined}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-900/40"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{name}</span>}
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 z-20">
                  {name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="p-3 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2">
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="User avatar"
            className="w-9 h-9 rounded-full ring-2 ring-indigo-500/50 shrink-0"
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