import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useState } from "react";
import ImageModal from "./ImageModal";
import type { StoryType } from "~/types";
import AdminSettings from "./AdminSettings";

interface AdminStoryCardProps {
  story: StoryType;
  setStories: React.Dispatch<React.SetStateAction<StoryType[]>>;
  originPage?: "Admin" | "Stories";
}
// To Do:
// Must: add a toggle button that makes a post featured or not
// must: add a toggle button that approves of the post
// must: add a trash can icon button to delete a post
// must: change format so it's easier to see information as an admin since we wont be using the storypage component
// maybe: add a feature that lets you email the user with a message that their post was approved or not with suggestions for edits

const AdminStoryCard = ({ story, setStories }: AdminStoryCardProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const API_URL = import.meta.env.VITE_RENDER_URL;

  const updateFeatured = async () => {
    try {
      const response = await fetch(`${API_URL}/update_featured.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: story.id, featured: !story.featured }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Featured updated successfully:", result);
      } else {
        console.error("Error updating featured:", result);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const updateStatus = async () => {
    try {
      console.log("Function is running!");

      console.log("Sending update:", {
        id: story.id,
        status: story.status == "pending" ? "approved" : "pending",
      });

      const response = await fetch(`${API_URL}/update_status.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: story.id,
          status: story.status === "pending" ? "approved" : "pending",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Featured updated successfully:", result);
      } else {
        console.error("Error updating status:", result);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <>
      <Card sx={{ height: "100%", borderRadius: 5 }}>
        <CardMedia
          onClick={handleOpen}
          component="img"
          image={story.image_url}
          alt={story.title}
          sx={{ objectFit: "cover", height: 350, cursor: "pointer" }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h5" sx={{ color: "#5b7553", fontWeight: 700 }}>
              {story.title}
            </Typography>
          </Stack>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {story.pet_name} • {story.species}{" "}
            {story.breed && `- ${story.breed}`}
          </Typography>
          <Accordion sx={{ backgroundColor: "whitesmoke", borderRadius: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Full Story</Typography>
            </AccordionSummary>
            <AccordionDetails>{story.body}</AccordionDetails>
          </Accordion>

          <Box mt="1rem">
            <Typography variant="caption" color="text.secondary">
              Submitted by {story.author} on{" "}
              {new Date(story.submitted_at).toLocaleDateString()}
            </Typography>
          </Box>
          <Paper
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "baseline",
              padding: 1,
              backgroundColor: "#f5f5f57d",
              borderRadius: 3,
            }}
          >
            <AdminSettings
              initialFeatured={story.featured}
              initialStatus={story.status}
              onFeaturedChange={updateFeatured}
              onStatusChange={updateStatus}
              storyId={story.id}
              onDelete={() => {
                setStories((prev) => prev.filter((s) => s.id !== story.id));
              }}
            />
          </Paper>
        </CardContent>
      </Card>
      <ImageModal
        open={open}
        onClose={handleClose}
        imageUrl={story.image_url}
        alt={story.title}
      />
    </>
  );
};

export default AdminStoryCard;
