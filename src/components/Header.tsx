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
    <header className=" top-0 z-0 bg-white/90 backdrop-blur-xl border-b border-white/50 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
      <nav className="container z-40 px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-between py-4 lg:py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12 shadow-lg rounded-2xl bg-gradient-to-br from-troutlytics-secondary to-troutlytics-primary">
              <Image
                width={32}
                height={32}
                src="/troutlytics_logo.png"
                alt="Troutlytics logo"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.45em] text-troutlytics-subtext">
                Troutlytics
              </p>
              <p className="text-xl font-bold text-slate-900 font-groupo">
                Washington Insights
              </p>
            </div>
          </Link>

          <button
            className="p-2 transition border rounded-lg md:hidden border-slate-200 text-slate-700 hover:border-troutlytics-primary"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <div className="glass-panel md:bg-transparent md:backdrop-blur-none md:shadow-none md:border-0 md:p-0">
              <ul className="flex flex-col gap-2 text-sm font-semibold text-slate-700 md:flex-row md:items-center md:gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLink href={link.href}>{link.label}</NavLink>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold hero-gradient text-white rounded-full bg-gradient-to-r from-troutlytics-primary to-troutlytics-accent shadow-lg hover:-translate-y-0.5 transition"
                  >
                    Say hello
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
