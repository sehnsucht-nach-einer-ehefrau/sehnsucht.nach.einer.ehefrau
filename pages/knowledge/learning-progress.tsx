"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Topic {
  title: string;
  items: string[];
  selectedIndex: number;
}

interface LearningProgressProps {
  topics?: Topic[];
  resetDelay?: number;
}

export default function LearningProgress({
  topics = [
    {
      title: "Foundations",
      selectedIndex: 4,
      items: [
        "Introduction to Programming",
        "Basic Data Structures",
        "Algorithm Fundamentals",
        "Computer Organization",
        "Digital Logic",
        "Boolean Algebra",
        "Number Systems",
        "Assembly Basics",
        "Memory Management",
        "Basic Operating Systems",
      ],
    },
    {
      title: "Mathematics",
      selectedIndex: 4,
      items: [
        "Discrete Mathematics",
        "Linear Algebra",
        "Calculus I",
        "Calculus II",
        "Multivariable Calculus",
        "Differential Equations",
        "Probability Theory",
        "Statistics",
        "Numerical Methods",
        "Mathematical Logic",
      ],
    },
    {
      title: "Intelligent Systems",
      selectedIndex: 4,
      items: [
        "Introduction to AI",
        "Machine Learning Basics",
        "Neural Networks",
        "Deep Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Reinforcement Learning",
        "Genetic Algorithms",
        "Expert Systems",
        "Knowledge Representation",
      ],
    },
    {
      title: "Advanced Computing",
      selectedIndex: 4,
      items: [
        "Distributed Systems",
        "Cloud Computing",
        "High Performance Computing",
        "Parallel Programming",
        "Quantum Computing",
        "Edge Computing",
        "Blockchain Technology",
        "IoT Architecture",
        "System Security",
        "Advanced Networking",
      ],
    },
    {
      title: "Specializations",
      selectedIndex: 4,
      items: [
        "Data Science",
        "Big Data Analytics",
        "Robotics",
        "Autonomous Systems",
        "Computer Graphics",
        "Game Development",
        "AR/VR Systems",
        "Bioinformatics",
        "Cryptography",
        "Ethics in Computing",
      ],
    },
  ],
  resetDelay = 3000, // 5 seconds default for reset
}: LearningProgressProps) {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(2);
  const [localTopics, setLocalTopics] = useState(topics);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const itemsListRef = useRef<HTMLDivElement>(null);

  // Number of items visible at once (2 above, selected, 2 below)
  const visibleItemCount = 7;

  const handleTopicClick = (index: number) => {
    setSelectedTopicIndex(index);
    if (topicsRef.current) {
      const container = topicsRef.current;
      const button = container.children[index] as HTMLElement;
      const containerWidth = container.offsetWidth;
      const buttonWidth = button.offsetWidth;
      const scrollLeft =
        button.offsetLeft - containerWidth / 2 + buttonWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  // Handle item click to update the selected index
  const handleItemClick = (itemIndex: number) => {
    // Create a new topics array with the updated selected index
    const updatedTopics = [...localTopics];
    if (
      updatedTopics[selectedTopicIndex].selectedIndex != itemIndex - 2 &&
      updatedTopics[selectedTopicIndex].selectedIndex != itemIndex + 2
    ) {
      updatedTopics[selectedTopicIndex].selectedIndex = itemIndex;
    } else {
      return;
    }
    setLocalTopics(updatedTopics);

    // Cancel any pending reset
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    // Set a timeout to reset to the original index
    resetTimeoutRef.current = setTimeout(() => {
      const resetTopics = [...localTopics];
      resetTopics[selectedTopicIndex].selectedIndex =
        topics[selectedTopicIndex].selectedIndex;
      setLocalTopics(resetTopics);
    }, resetDelay);
  };

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    handleTopicClick(selectedTopicIndex);
  }, [selectedTopicIndex]);

  const getItemOpacity = (relativeIndex: number) => {
    // relativeIndex is the position relative to the selected index
    // 0 is selected, -1 is one above, 1 is one below, etc.
    const distance = Math.abs(relativeIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.5;
    if (distance === 2) return 0.25;
    return 0;
  };

  const isOriginalSelectedIndex = (itemIndex: number) => {
    return itemIndex === topics[selectedTopicIndex].selectedIndex;
  };

  // Calculate which items should be visible
  const getCurrentItems = () => {
    const items = localTopics[selectedTopicIndex].items;
    const selectedIndex = localTopics[selectedTopicIndex].selectedIndex;

    // Calculate the range of items to show
    // We want to show (visibleItemCount) items with selected index in the middle
    const halfCount = Math.floor(visibleItemCount / 2);

    const result = [];

    for (let i = -halfCount; i <= halfCount; i++) {
      const itemIndex = selectedIndex + i;

      if (itemIndex >= 0 && itemIndex < items.length) {
        result.push({
          index: itemIndex,
          text: items[itemIndex],
          relativePosition: i,
        });
      }
    }

    return result;
  };

  const visibleItems = getCurrentItems();

  return (
    <div className="flex flex-col h-[75vh]">
      <h2 className="text-2xl font-medium mb-4 text-center">
        Currently Studying
      </h2>
      <div className="flex-1 rounded-3xl border border-gray-600 p-6">
        <div className="relative mb-6">
          <div
            ref={topicsRef}
            className="flex space-x-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {localTopics.map((topic, index) => (
              <Button
                key={index}
                className={`
          whitespace-nowrap flex-shrink-0
          ${selectedTopicIndex === index ? "bg-accent" : ""}
        `}
                onClick={() => handleTopicClick(index)}
                variant="ghost"
              >
                {topic.title}
              </Button>
            ))}
          </div>
          <div className="h-[1px] w-[90%] bg-border mx-auto"></div>
        </div>
        <div
          className="relative h-64 flex flex-col items-center justify-center overflow-hidden my-24"
          ref={itemsListRef}
        >
          {visibleItems.map((item) => (
            <div
              key={item.index}
              className="absolute w-full text-xl text-center transition-all duration-300 cursor-pointer flex items-center justify-center"
              style={{
                opacity: getItemOpacity(item.relativePosition),
                transform: `translateY(${item.relativePosition * 50}px)`,
              }}
              onClick={() => handleItemClick(item.index)}
            >
              {isOriginalSelectedIndex(item.index) && (
                <ChevronRight className="mr-2 h-4 w-4 mb-1" />
              )}
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
