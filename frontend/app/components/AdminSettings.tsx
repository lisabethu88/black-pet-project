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
        <FormLabel component="legend" sx={{ fontFamily: "Radley" }}>
          Admin Settings
        </FormLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={
              <Switch
                color="primary"
                defaultChecked={initialStatus == "approved"}
                checked={status == "approved"}
                onChange={handleStatusToggle}
              />
            }
            label="Approved?"
            labelPlacement="end"
          />
          <FormControlLabel
            value="end"
            control={
              <Switch
                color="primary"
                defaultChecked={initialFeatured}
                disabled={status === "pending"}
                checked={featured && status === "approved"}
                onChange={handleFeaturedToggle}
              />
            }
            label="Featured?"
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
      <Tooltip title="Delete story">
        <IconButton
          color="error"
          onClick={() => {
            if (confirm("Are you sure you want to delete this story?")) {
              fetch(`http://localhost:8000/remove_story.php?id=${storyId}`, {
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
