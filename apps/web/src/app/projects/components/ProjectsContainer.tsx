import { allProjects } from ".contentlayer/generated";
import { compareDesc } from "date-fns";
import ProjectShowcaseSection from "./ProjectShowcaseSection";
import styles from "./ProjectsContainer.module.css";

const ProjectsContainer = () => {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Selected Works</h1>
        <p className={styles.subtitle}>
          A collection of projects where I've turned complex problems into
          elegant, user-centric solutions.
        </p>
      </header>
      <ProjectShowcaseSection projects={projects} />
    </main>
  );
};

export default ProjectsContainer;
