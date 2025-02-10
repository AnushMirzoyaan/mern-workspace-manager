import React from "react";
import { ButtonProps } from "@/utils/types";

import styles from "./index.module.scss";

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
