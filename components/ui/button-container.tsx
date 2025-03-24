"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";

type ButtonContainerProps = {
  props: string[];
  selectedIndex?: number;
  onSelectionChange?: (index: number) => void;
};

export function ButtonContainer({
  props,
  selectedIndex = 0,
  onSelectionChange,
}: ButtonContainerProps) {
  const [selected, setSelected] = useState(selectedIndex);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update selected index if prop changes
  useEffect(() => {
    setSelected(selectedIndex);
  }, [selectedIndex]);

  // Update the indicator position
  const updateIndicator = useCallback(() => {
    const currentButton = buttonsRef.current[selected];
    const container = containerRef.current;

    if (currentButton && container) {
      // Calculate the actual button width/position relative to its container
      const buttonRect = currentButton.getBoundingClientRect();

      setIndicatorStyle({
        width: `${buttonRect.width}px`,
        height: `${buttonRect.height}px`,
        transform: `translateX(${currentButton.offsetLeft - 4}px)`,
        // Ensure the indicator doesn't overflow
        maxWidth: "100%",
      });
    }
  }, [selected]);

  // Update indicator on selection change or window resize
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(updateIndicator, 0);

    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(timeoutId);
    };
  }, [updateIndicator]);

  const handleClick = (index: number) => {
    setSelected(index);
    onSelectionChange?.(index);
  };

  // Handle empty props array
  if (!props.length) {
    return null;
  }

  return (
    <div className="flex justify-center rounded-lg">
      <div ref={containerRef} className="p-1 flex gap-2 relative">
        {selected >= 0 && selected < props.length && (
          <div
            className="absolute bg-accent rounded-md transition-all duration-200"
            style={indicatorStyle}
          />
        )}
        {props.map((prop, index) => (
          <Button
            key={prop + index}
            variant="ghost"
            size="lg"
            className={`text-xl relative z-10 ${
              selected === index ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={() => handleClick(index)}
            ref={(el) => (buttonsRef.current[index] = el)}
          >
            {prop}
          </Button>
        ))}
      </div>
    </div>
  );
}
