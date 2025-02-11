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
    setSlugSuggestions([]);
    try {
      const response = await checkSlugAvailability(slug);
      if (!response.available) {
        toast.warning("Slug already taken, here are some suggestions.");
        setSlugSuggestions(response.suggestions);
        return;
      }

      const createResponse = await createWorkspace(userId, data.name, slug);

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

  const handleSlugClick = (slug: string) => {
    navigator.clipboard
      .writeText(slug)
      .then(() => {
        toast.success(`Slug "${slug}" copied to clipboard!`);

        setValue("slug", slug);
      })
      .catch((err) => {
        console.error("Error copying slug to clipboard", err);
      });
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
          <div className={styles.inputGroup}>
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

          <div className={styles.inputGroup}>
            <label htmlFor="slug">Slug</label>
            <WorkspaceSlugInput onSlugChange={setSlug} />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Creating..." : "Create Workspace"}
          </Button>

          {slugSuggestions.length > 0 && (
            <div className={styles.slugSuggestionsContainer}>
              <h4 className={styles.suggestionsHeader}>Slug Suggestions:</h4>
              <ul className={styles.suggestionsList}>
                {slugSuggestions.map((suggestion, index) => (
                  <li key={index} className={styles.suggestionItem}>
                    <button
                      type="button"
                      onClick={() => handleSlugClick(suggestion)}
                      className={styles.suggestionButton}
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
