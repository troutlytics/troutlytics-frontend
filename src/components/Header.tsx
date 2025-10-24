import React, { useState } from "react";
import NavLink from "./NavLink"; // Adjust the import path as needed
import Image from "next/image";
// import troutImage from "../public/trout_image.png"; // Update the path as necessary

import Link from "next/link";

const Header: React.FC = () => {
  // State to manage the visibility of the menu on mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav>
        <div className="flex flex-wrap items-center justify-between p-4 lg:mx-20">
          <Link href="/" className="flex items-center">
            <Image
              className="w-10 h-8 mr-3"
              width={40}
              height={32}
              src={"/troutlytics_logo.png"}
              alt="Troutlytics"
            />
            <span className="self-center text-3xl font-bold font-groupo whitespace-nowrap">
              Troutlytics
            </span>
          </Link>

          <button
            className="md:hidden" // Button visible only on mobile
            onClick={toggleMenu}
          >
            {/* Icon for the menu button */}
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

          {/* Menu items - visibility toggled on mobile */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 border rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <NavLink href="/">Home</NavLink>
              </li>
              <li>
                <NavLink href="/hatcheries">Hatcheries</NavLink>
              </li>
              <li>
                <NavLink href="/about">About</NavLink>
              </li>
              <li>
                <NavLink href="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
