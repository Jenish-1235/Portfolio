import { allProjects } from ".contentlayer/generated";
import { compareDesc } from "date-fns";
import ArchiveHeroSection from "./ArchiveHeroSection";
import ProjectGrid from "./ProjectGrid";
import NavBar from "../../common/NavBar";
import styles from "./ProjectArchiveContainer.module.css";

const ProjectArchiveContainer = () => {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main className={styles.container}>
      <NavBar />
      <ArchiveHeroSection />
      <ProjectGrid projects={projects} />
    </main>
  );
};

export default ProjectArchiveContainer; 