import React, { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/map", label: "Map" },
    { href: "/hatcheries", label: "Hatcheries" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="page-shell">
        <nav className="glass-panel rounded-[1.75rem] px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-100/16 bg-[linear-gradient(135deg,rgba(87,190,255,0.18),rgba(2,15,24,0.9))] shadow-[0_0_28px_rgba(99,215,255,0.12)]">
                <Image
                  width={30}
                  height={30}
                  src="/troutlytics_logo.png"
                  alt="Troutlytics logo"
                />
              </div>
              <div>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.5em] text-cyan-100/55">
                  Troutlytics
                </p>
                <p className="mt-1 text-xl font-semibold tracking-[-0.04em] text-white">
                  Night-Water Telemetry
                </p>
              </div>
            </Link>

            <button
              className="ghost-button px-3 py-2 md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Toggle navigation menu</span>
              <div className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-white" />
                <span className="block h-0.5 w-5 rounded-full bg-white/80" />
                <span className="block h-0.5 w-5 rounded-full bg-white/60" />
              </div>
            </button>

            <div className="hidden items-center gap-3 md:flex">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
              <Link href="/contact" className="primary-button px-4 py-2.5">
                Open channel
              </Link>
            </div>
          </div>

          {isMenuOpen ? (
            <div className="mt-4 border-t border-white/8 pt-4 md:hidden">
              <div className="grid gap-3">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
                <Link href="/contact" className="primary-button w-full">
                  Open channel
                </Link>
              </div>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Header;
