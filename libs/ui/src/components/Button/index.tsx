import { ReactNode } from "react";

export interface ButtonProps {
  /**
   * This is custom description
   */
  children?: ReactNode;
  onClick?(event: any): void;
  text?: ReactNode;
}

/**
 * Button component
 */
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  text: "Default text",
};

export default Button;
