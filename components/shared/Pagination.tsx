"use client";
import React from "react";

const Pagination = () => {
  return (
    <nav>
      <ul className="flex">
        <li>
          <a
            className="border-blue-gray-100 text-blue-gray-500 hover:bg-light-300 mx-1 flex h-9 w-9 items-center justify-center rounded-full border bg-transparent p-0 text-sm transition duration-150 ease-in-out"
            href="#"
            aria-label="Previous"
          >
            <span className="material-icons text-sm">keyboard_arrow_left</span>
          </a>
        </li>
        <li>
          <a
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out"
            href="#"
          >
            1
          </a>
        </li>
        <li>
          <a
            className="border-blue-gray-100 text-blue-gray-500 hover:bg-light-300 mx-1 flex h-9 w-9 items-center justify-center rounded-full border bg-transparent p-0 text-sm transition duration-150 ease-in-out"
            href="#"
          >
            2
          </a>
        </li>
        <li>
          <a
            className="border-blue-gray-100 text-blue-gray-500 hover:bg-light-300 mx-1 flex h-9 w-9 items-center justify-center rounded-full border bg-transparent p-0 text-sm transition duration-150 ease-in-out"
            href="#"
          >
            3
          </a>
        </li>
        <li>
          <a
            className="border-blue-gray-100 text-blue-gray-500 hover:bg-light-300 mx-1 flex h-9 w-9 items-center justify-center rounded-full border bg-transparent p-0 text-sm transition duration-150 ease-in-out"
            href="#"
            aria-label="Next"
          >
            <span className="material-icons text-sm">keyboard_arrow_right</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
