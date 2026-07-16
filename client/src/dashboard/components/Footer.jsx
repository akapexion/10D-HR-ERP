export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
      <p>© {year} HireHQ. All rights reserved.</p>
      <div className="flex gap-5">
        <a href="#" className="hover:text-indigo-600 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-indigo-600 transition-colors">
          Terms
        </a>
        <a href="#" className="hover:text-indigo-600 transition-colors">
          Support
        </a>
      </div>
    </footer>
  );
}