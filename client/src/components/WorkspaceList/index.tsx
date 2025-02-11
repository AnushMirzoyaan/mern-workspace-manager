"use client";

import { useEffect, useState } from "react";
import WorkspaceForm from "../WorkspacesForm";
import { getWorkspaces } from "@/services/workspaces/workspaces";
import styles from "./index.module.scss";
import { Workspace } from "@/utils/types";
import { Card, CardContent, CardHeader, CardTitle } from "../Card";
import { toast } from "react-toastify";

const WorkspacesList = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkspaces = async (userId: string) => {
    try {
      const response = await getWorkspaces(userId);
      setWorkspaces(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching workspaces");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.id);
    }

    if (userId) {
      fetchWorkspaces(userId);
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  return (
    <div className={styles.container}>
      <WorkspaceForm onWorkspaceCreated={() => fetchWorkspaces(userId)} />

      <Card className={styles.workspaceList}>
        <CardHeader>
          <CardTitle>Your Workspaces</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading workspaces...</p>
          ) : workspaces.length === 0 ? (
            <p>No workspaces found. Create your first one above!</p>
          ) : (
            <div className={styles.grid}>
              {workspaces.map((workspace) => (
                <Card key={workspace._id} className={styles.workspaceCard}>
                  <CardHeader>
                    <CardTitle>{workspace.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={styles.slug}>Slug: {workspace.slug}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspacesList;
