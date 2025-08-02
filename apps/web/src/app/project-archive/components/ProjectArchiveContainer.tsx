import { allProjects } from ".contentlayer/generated";
import { compareDesc } from "date-fns";
import ArchiveHeroSection from "./ArchiveHeroSection";
import ProjectGrid from "./ProjectGrid";
import styles from "./ProjectArchiveContainer.module.css";

const ProjectArchiveContainer = () => {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const topProjects = projects.slice(0, 5);

  return (
    <main className={styles.container}>
      <ArchiveHeroSection />
      <ProjectGrid projects={projects} />
    </main>
  );
};

export default ProjectArchiveContainer;