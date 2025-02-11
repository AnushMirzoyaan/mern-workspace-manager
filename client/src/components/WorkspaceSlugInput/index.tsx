"use client";

import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { checkSlugAvailability } from "@/services/workspaces/workspaces";

interface WorkspaceSlugInputProps {
  onSlugChange: (slug: string) => void;
}

const WorkspaceSlugInput = ({ onSlugChange }: WorkspaceSlugInputProps) => {
  const [slug, setSlug] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);

  const checkSlug = async (slugToCheck: string) => {
    try {
      const { data } = await checkSlugAvailability(slugToCheck);

      if (data.available) {
        setIsAvailable(true);
        setSuggestions([]);
      } else {
        setIsAvailable(false);
        if (data.suggestions && data.suggestions.length > 0) {
          setSuggestions(data.suggestions);
        } else {
          setSuggestions([`${slugToCheck}1`, `${slugToCheck}2`]);
        }
      }
    } catch (error) {
      console.error("Error checking slug availability:", error);
    }
  };

  const debouncedCheckSlug = useCallback(
    debounce((value: string) => {
      if (value) {
        checkSlug(value);
      }
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value;
    setSlug(newSlug);
    debouncedCheckSlug(newSlug);
    onSlugChange(newSlug);
  };

  const handleSuggestionClick = (suggestedSlug: string) => {
    setSlug(suggestedSlug);
    onSlugChange(suggestedSlug);
  };

  return (
    <div>
      <input
        type="text"
        value={slug}
        onChange={handleChange}
        placeholder="Enter workspace slug"
      />
      {!isAvailable && suggestions.length > 0 && (
        <div style={{ color: "red", marginTop: "0.5rem" }}>
          <p>Slug is taken. Choose one of the suggestions or type your own:</p>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ cursor: "pointer", margin: "0.2rem 0" }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSlugInput;
