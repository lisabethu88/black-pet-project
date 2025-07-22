import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ImageModal from "./ImageModal";
import type { StoryType } from "~/types";

interface AdminStoryCardProps {
  story: StoryType;
  isAdmin?: boolean;
  originPage?: "Admin" | "Stories";
}
// To Do:
// Must: add a toggle button that makes a post featured or not
// must: add a toggle button that approves of the post
// must: add a trash can icon button to delete a post
// must: change format so it's easier to see information as an admin since we wont be using the storypage component
// maybe: add a feature that lets you email the user with a message that their post was approved or not with suggestions for edits

const AdminStoryCard = ({ story, isAdmin = false }: AdminStoryCardProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card sx={{ maxWidth: 345, height: "100%", borderRadius: 5 }}>
        <CardMedia
          onClick={handleOpen}
          component="img"
          image={story.imageUrl}
          alt={story.title}
          sx={{ objectFit: "cover", height: 200, cursor: "pointer" }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h6" sx={{ color: "#5b7553", fontWeight: 700 }}>
              {story.title}
            </Typography>
          </Stack>

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {story.petName} • {story.speciesBreed}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }} noWrap>
            {story.body}
          </Typography>

          <Box mt="1rem">
            <Typography variant="caption" color="text.secondary">
              Submitted by {story.author} on{" "}
              {new Date(story.submittedAt).toLocaleDateString()}
            </Typography>
          </Box>
          {isAdmin && (
            <Chip
              label={story.status}
              color={story.status === "approved" ? "success" : "warning"}
              size="small"
            />
          )}
        </CardContent>
      </Card>
      <ImageModal
        open={open}
        onClose={handleClose}
        imageUrl={story.imageUrl}
        alt={story.title}
      />
    </>
  );
};

export default AdminStoryCard;
