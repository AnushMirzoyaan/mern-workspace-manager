import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
}

export const Card = ({
  children,
  className = "",
  onClick,
  onEdit,
  onDelete,
  editable = false,
}: CardProps) => (
  <div className={`${styles.card} ${className}`} onClick={onClick}>
    {children}
    {editable && (
      <div className={styles.actionWrapper}>
        <Image
          src="/edit.svg"
          alt="edit"
          width={30}
          height={30}
          onClick={onEdit}
          className={styles.actionIcon}
        />
        <Image
          src="/delete.svg"
          alt="delete"
          width={30}
          height={30}
          onClick={onDelete}
          className={styles.actionIcon}

        />
      </div>
    )}
  </div>
);

export const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`${styles.header} ${className}`}>{children}</div>;

export const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <h3 className={`${styles.title} ${className}`}>{children}</h3>;

export const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`${styles.content} ${className}`}>{children}</div>;
