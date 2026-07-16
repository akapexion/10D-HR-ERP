export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-6">
        {/* Brand */}
        <div>
          <h2 className="text-white text-lg font-bold">Brand</h2>
          <p className="text-sm mt-2 max-w-xs">
            Building simple, clean experiences one component at a time.
          </p>
        </div>

        {/* Links */}
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-white transition-colors text-sm"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 text-center text-sm py-4">
        © {year} Brand. All rights reserved.
      </div>
    </footer>
  );
}