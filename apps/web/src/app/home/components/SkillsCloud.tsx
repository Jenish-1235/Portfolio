"use client";

import { motion } from "framer-motion";
import { skillsData } from "../data/skills";
import styles from "./SkillsCloud.module.css";

interface Skill {
  name: string;
  icon: string;
  level: string;
  category: string;
}

export default function SkillsCloud() {
  const skills: Skill[] = skillsData.skills;

  const getLevelColor = (level: string) => {
    switch (level) {
      case "expert":
        return "expert";
      case "advanced":
        return "advanced";
      case "intermediate":
        return "intermediate";
      default:
        return "beginner";
    }
  };

  return (
    <div className={styles.skillsContainer}>
      <motion.h3
        className={styles.skillsTitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Skills & Technologies
      </motion.h3>

      <div className={styles.skillsCloud}>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className={`${styles.skillBubble} ${styles[getLevelColor(skill.level)]}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05,
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
            viewport={{ once: true }}
          >
            <span className={styles.skillIcon}>{skill.icon}</span>
            <span className={styles.skillName}>{skill.name}</span>
            <div className={styles.skillLevel}>{skill.level}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
