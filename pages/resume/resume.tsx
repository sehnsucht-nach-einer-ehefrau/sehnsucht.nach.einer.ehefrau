"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ResumePage() {
  const [isHovered, setIsHovered] = useState(false);

  // Use the correct path for public files
  // Files in the public directory are served at the root path
  const resumePdfUrl = "/resume/Rezume.pdf";

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between">
        <div></div>
        <div></div>
        <h1 className="text-3xl mb-8 ml-3">Resume</h1>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="flex justify-center">
        <Link
          href={resumePdfUrl}
          target="_blank"
          className="block relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`relative transition-transform duration-300 ease-in-out ${
              isHovered ? "translate-y-[-20px]" : ""
            }`}
            style={{
              transformOrigin: "bottom center",
            }}
          >
            {/* Using Next.js Image component for better performance */}
            <div className="relative h-[500px] w-[350px] shadow-lg border border-gray-200 rounded-sm overflow-hidden">
              <Image
                src="/resume/Resume.png"
                alt="Resume preview"
                fill
                priority
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          <p className="text-center mt-4 text-sm text-muted-foreground">
            Click to view full resume
          </p>
        </Link>
      </div>
    </div>
  );
}
