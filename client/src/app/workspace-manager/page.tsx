"use client";

import WorkspacesList from "@/components/WorkspaceList";
import Image from "next/image";
import styles from "./page.module.scss";
import { logout } from "@/services/auth/auth";

const WorkspaceManagerPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Workspace Manager</h1>
        <Image
          src="/logout.svg"
          alt="logout"
          height={25}
          width={25}
          onClick={() => logout()}
          className={styles.logout}
        />
      </div>
      <WorkspacesList />
    </div>
  );
};

export default WorkspaceManagerPage;
