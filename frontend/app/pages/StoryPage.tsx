import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ImageModal from "~/components/ImageModal";
import PrimaryButton from "~/components/PrimaryButton";
import type { StoryType } from "~/types";
import { useParams, useNavigate } from "react-router";
import LoadingCircle from "~/components/LoadingCircle";

const StoryPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState<StoryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const API_URL = import.meta.env.VITE_RENDER_URL;

  useEffect(() => {
    fetch(`${API_URL}/fetch_story_by_id.php?id=${id}`)
      .then((res) => {
        if (!res.ok || res.headers.get("Content-Type")?.includes("text/html")) {
          throw new Error("Invalid response");
        }
        return res.json();
      })
      .then((data) => {
        if (!data || !data.id || data.status === "pending") {
          setError(true); // will trigger redirect
        } else {
          setStory(data);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(true); // will trigger redirect
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  useEffect(() => {
    if (error && !loading) {
      navigate("/stories", { replace: true });
    }
  }, [error, loading, navigate]);

  if (loading) return <LoadingCircle />;
  if (error) return null;

  return (
    <>
      <Box
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
            {story?.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {story?.pet_name} • {story?.species} - {story?.breed}
          </Typography>
          <Box
            component="img"
            onClick={handleOpen}
            src={story?.image_url}
            alt={story?.title}
            style={{
              width: "100%",
              maxHeight: 750,
              objectFit: "cover",
              marginBottom: 16,
              cursor: "pointer",
              borderRadius: 25,
            }}
          />
          <Typography variant="body1">{story?.body}</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mt={2}
          >
            Submitted by {story?.author} on{" "}
            {new Date(story?.submitted_at || Date()).toLocaleDateString()}
          </Typography>
        </Box>
        <PrimaryButton path={"stories"} buttonText={"Back to Stories"} />
      </Box>
      <ImageModal
        open={open}
        onClose={handleClose}
        imageUrl={story?.image_url || ""}
        alt={story?.title || ""}
      />
    </>
  );
};

export default StoryPage;
