import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
      <p className="flex items-center gap-1.5">
        <span>© {year} HireHQ. All rights reserved.</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
          · Built with <Heart size={12} className="text-rose-400 fill-rose-400" />
        </span>
      </p>
      <div className="flex items-center gap-5">
        <a
          href="#"
          className="text-slate-500 hover:text-indigo-600 transition-colors underline-offset-4 hover:underline"
        >
          Privacy Policy
        </a>
        <span className="text-slate-200">|</span>
        <a
          href="#"
          className="text-slate-500 hover:text-indigo-600 transition-colors underline-offset-4 hover:underline"
        >
          Terms
        </a>
        <span className="text-slate-200">|</span>
        <a
          href="#"
          className="text-slate-500 hover:text-indigo-600 transition-colors underline-offset-4 hover:underline"
        >
          Support
        </a>
      </div>
    </footer>
  );
}