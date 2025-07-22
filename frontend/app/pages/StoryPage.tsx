import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import ImageModal from "~/components/ImageModal";
import PrimaryButton from "~/components/PrimaryButton";
import type { StoryType } from "~/types";

interface StoryPageProps {
  story: StoryType;
}
const StoryPage = ({ story }: StoryPageProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Paper
        sx={{
          justifySelf: "center",
          padding: 5,
          width: "100%",
          height: "100%",
          maxWidth: 1000,
          margin: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#5b7553", fontWeight: 700 }}
          >
            {story.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {story.petName} • {story.speciesBreed}
          </Typography>
          <img
            onClick={handleOpen}
            src={story.imageUrl}
            alt={story.title}
            style={{
              width: "100%",
              maxHeight: 300,
              objectFit: "cover",
              marginBottom: 16,
              cursor: "pointer",
            }}
          />
          <Typography variant="body1">{story.body}</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mt={2}
          >
            Submitted by {story.author} on{" "}
            {new Date(story.submittedAt).toLocaleDateString()}
          </Typography>
        </Box>
        <PrimaryButton path={"stories"} buttonText={"Back to Stories"} />
      </Paper>
      <ImageModal
        open={open}
        onClose={handleClose}
        imageUrl={story.imageUrl}
        alt={story.title}
      />
    </>
  );
};

export default StoryPage;
