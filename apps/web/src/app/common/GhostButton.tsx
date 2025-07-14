// /home/components/common/GhostButton.tsx
import styles from "./GhostButton.module.css";

interface GhostButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function GhostButton({ children, onClick }: GhostButtonProps) {
  return (
    <button className={styles.ctaSecondary} onClick={onClick}>
      {children}
    </button>
  );
}
