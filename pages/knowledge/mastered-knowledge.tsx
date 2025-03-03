"use client";

import { Search, X } from "lucide-react";
import { useState, useRef, useMemo } from "react";

interface MasteredSkillsProps {
  skills?: string[];
}

export default function MasteredSkills({
  skills = [
    "HTML CSS",
    "Back end Web Development",
    "Go lang",
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "RESTful APIs",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "CI/CD",
  ],
}: MasteredSkillsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Use useMemo instead of useState + useEffect for filtering
  const filteredSkills = useMemo(() => {
    if (searchTerm === "") {
      return skills;
    }
    return skills.filter((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, skills]);

  const handleClearSearch = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col text-center min-h-[70vh]">
      <h2 className="text-2xl font-medium mb-4">Mastered Knowledge</h2>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 rounded-3xl border border-gray-600 p-6 mb-4 overflow-hidden">
          <div className="h-96 overflow-y-auto pr-2 space-y-4 scrollbar-thin my-12 text-xl">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill, index) => (
                <div key={index} className="text-center">
                  {skill}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400">No skills found</div>
            )}
          </div>
        </div>
        <div className="rounded-3xl border border-gray-600 p-4">
          <div className="flex items-center justify-between relative">
            <Search className="absolute left-2 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent pl-9 pr-9 focus:outline-none"
            />
            {searchTerm && (
              <button onClick={handleClearSearch} className="absolute right-2">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
