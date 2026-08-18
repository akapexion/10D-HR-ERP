import { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, Settings, LogOut, User } from "lucide-react";

export default function TopNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 gap-4">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
        </button>

        <div className="w-px h-6 bg-slate-200 hidden sm:block" />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center gap-2 px-1.5 py-1 rounded-lg transition-colors ${
              menuOpen ? "bg-slate-100" : "hover:bg-slate-100"
            }`}
          >
            <img
              src="https://i.pravatar.cc/40?img=12"
              alt="Profile"
              className="w-8 h-8 rounded-full ring-2 ring-transparent"
            />
            <span className="text-sm font-medium text-slate-700 hidden sm:block">
              Sarah Malik
            </span>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1.5 z-20 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 mb-1">
                <p className="text-sm font-medium text-slate-700">Sarah Malik</p>
                <p className="text-xs text-slate-400">HR Manager</p>
              </div>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                <User size={15} /> Profile
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                <Settings size={15} /> Settings
              </button>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={15} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}