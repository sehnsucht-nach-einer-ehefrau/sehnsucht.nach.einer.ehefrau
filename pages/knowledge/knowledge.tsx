"use client";

import { useEffect } from "react";
import MasteredSkills from "@/pages/knowledge/mastered-knowledge";
import LearningProgress from "@/pages/knowledge/learning-progress";
import FutureSkills from "@/pages/knowledge/future-knowledge";

export default function KnowledgeDashboard() {
  return (
    <div className="p-8 max-w-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MasteredSkills />
        <LearningProgress />
        <FutureSkills />
      </div>
    </div>
  );
}
