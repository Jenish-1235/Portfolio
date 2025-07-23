import Link from "next/link";
import styles from "./ExploreMoreButton.module.css";

interface ExploreMoreButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function ExploreMoreButton({ href, children }: ExploreMoreButtonProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <button className={styles.exploreMoreButton}>
        <span>{children}</span>
      </button>
    </Link>
  );
}
