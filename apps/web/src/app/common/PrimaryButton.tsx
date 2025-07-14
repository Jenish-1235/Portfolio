// /home/components/common/PrimaryButton.tsx
import styles from "./PrimaryButton.module.css";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function PrimaryButton({ children, onClick }: PrimaryButtonProps) {
  return (
    <button className={styles.ctaPrimary} onClick={onClick}>
      {children}
    </button>
  );
}
