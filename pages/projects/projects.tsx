import ProjectItem from "@/components/project-item";
import Takina from "../../public/projectImages/takina-dark.png";
import WorkInProgress from "../../public/projectImages/work-in-progress.png";

// Sample project data
const inProgressProjects = [
  {
    id: 1,
    title: "Truman",
    description: "Self Tracking & Statistics Generator",
    imagePath: WorkInProgress,
  },
  {
    id: 2,
    title: "Senku",
    description: "Personal Book Library for Readers",
    imagePath: WorkInProgress,
  },
];

const completedProjects = [
  {
    id: 1,
    title: "TAKINA",
    description: "AI Powered Task Planner",
    imagePath: Takina,
    githubLink: "https://github.com/sehnsucht-nach-einer-ehefrau/takina",
  },
];

export default function ProjectsShowcase() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b">In Progress</h2>
      <section className="mb-12 max-w-fit">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {inProgressProjects.map((project) => (
            <ProjectItem
              key={project.id}
              title={project.title}
              description={project.description}
              imagePath={project.imagePath}
              githubLink={project.githubLink}
            />
          ))}
        </div>
      </section>
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
        Completed Projects
      </h2>
      <section className="max-w-fit">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {completedProjects.map((project) => (
            <ProjectItem
              key={project.id}
              title={project.title}
              description={project.description}
              imagePath={project.imagePath}
              githubLink={project.githubLink}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
