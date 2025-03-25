"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ScrollNav: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Categories array 
  const categories = [
    "Easy Projects",
    "Beginner DSA",
    "Data structures",
    "Algorithms",
    "Difficulty rating wise",
    "Star wise paths",
    "Interview Questions",
    "Other Practice Paths",
    "Company Based Question",
  ];

  // Scroll left function
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Scroll right function
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gray-900 text-white py-2">
      <div className="container mx-auto  relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Nav Items */}
        <div
          ref={scrollRef}
          className="  flex overflow-x-auto scrollbar-hide space-x-6 px-12"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 whitespace-nowrap rounded-lg hover:bg-gray-700 transition text-base"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default ScrollNav;