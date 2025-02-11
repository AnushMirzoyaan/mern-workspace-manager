import React from "react";
import { ButtonProps } from "@/utils/types";
import styles from "./index.module.scss";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
