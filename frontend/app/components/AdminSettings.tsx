import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
interface AdminSettingsProps {
  initialFeatured: boolean;
  initialStatus: "pending" | "approved";
  storyId: string;
  onFeaturedChange?: (newValue: boolean) => void;
  onStatusChange?: (newStatus: "approved" | "pending") => void;
  onDelete?: () => void;
}
import DeleteIcon from "@mui/icons-material/Delete";
const API_URL = import.meta.env.VITE_RENDER_URL;

const AdminSettings = ({
  initialFeatured = false,
  initialStatus = "pending",
  onFeaturedChange,
  onStatusChange,
  storyId,
  onDelete,
}: AdminSettingsProps) => {
  const [featured, setFeatured] = useState(initialFeatured);
  const [status, setStatus] = useState(initialStatus);

  const handleFeaturedToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setFeatured(newValue);
    onFeaturedChange?.(newValue);
  };

  const handleStatusToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked ? "approved" : "pending";
    setStatus(newStatus);
    onStatusChange?.(newStatus);
    if (newStatus === "pending") {
      setFeatured(false);
      onFeaturedChange?.(false);
    }
  };
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          sx={{
            fontFamily: "Montserrat",
            fontSize: "1.5rem",
            color: "black",
            // "&.Mui-focused": {
            //   color: "rgba(0, 0, 0, 0.6)", // Prevent color change on focus
            // },
          }}
        >
          Admin Settings
        </FormLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={status == "approved"}
                onChange={handleStatusToggle}
              />
            }
            label="Approved"
            labelPlacement="end"
          />
          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={featured && status === "approved"}
                onChange={handleFeaturedToggle}
                disabled={status !== "approved"}
              />
            }
            label="Featured"
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
      <Tooltip title="Delete story">
        <IconButton
          color="error"
          onClick={() => {
            if (confirm("Are you sure you want to delete this story?")) {
              fetch(`${API_URL}/remove_story.php?id=${storyId}`, {
                method: "DELETE",
              })
                .then((res) => {
                  if (!res.ok) throw new Error("Failed to delete story");
                  return res.json();
                })
                .then(() => {
                  alert("Story deleted successfully!");
                  onDelete?.();
                })
                .catch((err) => {
                  console.error(err);
                  alert("Something went wrong while deleting.");
                });
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default AdminSettings;
