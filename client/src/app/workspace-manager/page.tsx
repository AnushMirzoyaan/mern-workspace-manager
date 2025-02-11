"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Card/Card";
import WorkspacesList from "@/components/WorkspaceList";
import styles from "./page.module.scss";

const WorkspaceManagerPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Workspace Manager</h1>
      </div>
      <WorkspacesList />
    </div>
  );
};

export default WorkspaceManagerPage;
