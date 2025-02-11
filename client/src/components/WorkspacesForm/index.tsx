"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import {
  checkSlugAvailability,
  createWorkspace,
} from "@/services/workspaces/workspaces";

import styles from "./index.module.scss";
import { WorkspaceFormData } from "@/utils/types";
import { Card, CardContent, CardHeader, CardTitle } from "../Card";
import Button from "../Button";
import { toast } from "react-toastify";
import WorkspaceSlugInput from "../WorkspaceSlugInput";

interface WorkspacesFormProps {
  onWorkspaceCreated?: () => void;
}

const WorkspacesForm = ({ onWorkspaceCreated }: WorkspacesFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkspaceFormData>();
  const [userId, setUserId] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [slugSuggestions, setSlugSuggestions] = useState<string[]>([]);
  const [workspaceCreated, setWorkspaceCreated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.id);
    }
  }, []);

  const onSubmit = async (data: WorkspaceFormData) => {
    try {
      const response = await checkSlugAvailability(slug);
      if (!response.available) {
        toast.warning("Slug already taken, here are some suggestions.");
        setSlugSuggestions(response.suggestions);
        return;
      }

      const createResponse = await createWorkspace(userId, data.name, slug);
      
      console.log(createResponse, '>>>>>>>>>>hee')
      if (createResponse.message) {
        toast.success("Workspace created successfully!");
        setWorkspaceCreated(true);
      } else {
        toast.error("Something went wrong while creating the workspace.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Workspace</CardTitle>
      </CardHeader>
      <Image
        src="/add.svg"
        alt=""
        height={40}
        width={40}
        className={styles.icon}
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Workspace Name</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Workspace name is required" })}
              className={styles.input}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.formGroup}>
              <label htmlFor="slug">Slug</label>
              <WorkspaceSlugInput onSlugChange={setSlug} />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Creating..." : "Create Workspace"}
          </Button>

          {/* Show slug suggestions if the slug is taken */}
          {slugSuggestions.length > 0 && (
            <div>
              <h4>Slug suggestions:</h4>
              <ul>
                {slugSuggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => setValue("slug", suggestion)} // Set the suggested slug
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkspacesForm;
