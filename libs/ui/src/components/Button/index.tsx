import { ReactNode, FC } from "react";
import styles from "./button.module.css";
export interface ButtonProps {
  children?: ReactNode;
  onClick?(): void;
  text?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button type="button" {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
