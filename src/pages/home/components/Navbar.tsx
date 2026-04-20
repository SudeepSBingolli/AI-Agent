import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="https://framerusercontent.com/images/Lo1O0F6geJ5mTnLFDqcUCsY0eEI.svg"
            alt="Senior Care"
            width={140}
            height={38}
            className="h-9 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                scrolled ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="whitespace-nowrap px-5 py-2.5 rounded-md bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer"
          >
            Sign up
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-3-line'} text-2xl text-gray-800`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex gap-3 pt-1">
            <a
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap px-4 py-2.5 rounded-md border border-gray-300 text-gray-700 text-sm font-medium"
            >
              Log in
            </a>
            <a
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap px-4 py-2.5 rounded-md bg-teal-600 text-white text-sm font-medium"
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
