import { allProjects } from ".contentlayer/generated";
import { compareDesc } from "date-fns";
import ProjectHeroSection from "./ProjectHeroSection";
import ProjectShowcaseSection from "./ProjectShowcaseSection";
import styles from "./ProjectsContainer.module.css";

const ProjectsContainer = () => {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const showcasedProjects = projects.slice(0, 5);

  return (
    <main className={styles.container}>
      <ProjectHeroSection />
      <div id="project-showcase">
        <ProjectShowcaseSection projects={showcasedProjects} />
      </div>
    </main>
  );
};

export default ProjectsContainer;
