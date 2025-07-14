// /home/components/common/NavBar.tsx
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#resume">Resume</a>
        </li>
        <li>
          <a href="#blogs">Blogs</a>
        </li>
        <li>
          <a href="#papers">Papershelf</a>
        </li>
        <li>
          <a href="#now">Now</a>
        </li>
      </ul>
    </nav>
  );
}
