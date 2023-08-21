"use client";

import Link from "next/link";
// Path: component/Navbar.tsx
// Compare this snippet from src/app/dashboard/layout.tsx:
// make a navbar component that will be used in the layout
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-16 bg-gray text-black relative shadow-sm font-mono mt-10">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="flex flex-col ml-2">
            <div className="flex">
              <h1 className="text-2xl font-bold">
                <Link href="/dashboard">F Rat</Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex">
          <div className="flex flex-col ml-2">
            <div className="flex">
              <h1 className="text-2xl font-bold">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Logout
                </button>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
