"use client";

import { useEffect, useState } from "react";
import WorkspaceForm from "../WorkspacesForm";
import {
  deleteWorkspace,
  getWorkspaces,
  updateWorkspace,
} from "@/services/workspaces/workspaces";
import styles from "./index.module.scss";
import { Workspace } from "@/utils/types";
import { Card, CardContent, CardHeader, CardTitle } from "../Card";
import { toast } from "react-toastify";

const WorkspacesList = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingWorkspace, setEditingWorkspace] = useState<string | null>(null);
  const [newSlug, setNewSlug] = useState<string>("");
  const [name, setName] = useState<string>("");

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

  const handleEdit = (workspace: Workspace) => {
    if (editingWorkspace === workspace._id) {
      setEditingWorkspace(null);
    } else {
      setEditingWorkspace(workspace._id);
      setNewSlug(workspace.slug);
      setName(workspace.name);
    }
  };

  const handleSave = async (workspaceId: string) => {
    if (!editingWorkspace) return;

    try {
      await updateWorkspace(workspaceId, { slug: newSlug, name });
      setWorkspaces((prevWorkspaces) =>
        prevWorkspaces.map((ws) =>
          ws._id === workspaceId ? { ...ws, slug: newSlug } : ws
        )
      );
      setEditingWorkspace(null);
      toast.success("Workspace updated successfully");
    } catch (error) {
      setEditingWorkspace(null);
      toast.error("Failed to update workspace");
    }
  };

  const handleDelete = async (workspaceId: string) => {
    try {
      await deleteWorkspace(workspaceId);
      setWorkspaces(workspaces.filter((ws) => ws._id !== workspaceId));
      toast.success("Workspace deleted successfully");
    } catch (error) {
      toast.error("Failed to delete workspace");
    }
  };

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
                <Card
                  key={workspace._id}
                  className={styles.workspaceCard}
                  onEdit={() => handleEdit(workspace)}
                  onDelete={() => handleDelete(workspace._id)}
                  editable={true}
                >
                  <CardHeader>
                    <CardTitle>{workspace.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editingWorkspace === workspace._id ? (
                      <div className={styles.editContainer}>
                        <input
                          type="text"
                          value={newSlug}
                          onChange={(e) => setNewSlug(e.target.value)}
                        />
                        <button
                          onClick={() => handleSave(workspace._id)}
                          disabled={newSlug === workspace.slug || !newSlug}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p className={styles.slug}>Slug: {workspace.slug}</p>
                    )}
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
