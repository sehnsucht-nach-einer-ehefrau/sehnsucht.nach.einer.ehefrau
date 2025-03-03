"use client";

import { useEffect, useRef, useState } from "react";

export function Title({ props }: { props: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex justify-center mt-12 motion-preset-slide-down">
      <div className="flex flex-col items-center">
        <h1 ref={titleRef} className="text-3xl relative overflow-visible">
          {props}
          <div
            className="absolute -bottom-2 left-[-5%] h-[1px] bg-border transition-all duration-1000 ease-in-out"
            style={{
              width: isVisible ? "110%" : "0%",
              transitionDelay: "300ms",
            }}
          />
        </h1>
      </div>
    </div>
  );
}
