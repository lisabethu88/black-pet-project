import { Box, Grid } from "@mui/material";
import StoryCard from "~/components/StoryCard";
import { useState, useEffect } from "react";
import type { StoryType } from "~/types";
import LoadingCircle from "~/components/LoadingCircle";
import PaginationButtons from "~/components/buttons/PaginationButtons";
import ErrorMessage from "~/components/ErrorMessage";

const StoriesPage = () => {
  const [stories, setStories] = useState<StoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const API_URL = import.meta.env.VITE_RENDER_URL;

  useEffect(() => {
    fetch(`${API_URL}/fetch_stories.php?page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setStories(data.data);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <LoadingCircle />;

  if (error) return <ErrorMessage errMessage={error}></ErrorMessage>;
  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Grid container spacing={2}>
        {stories.map(
          (story) =>
            story.status == "approved" && (
              <Grid key={story.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <StoryCard story={story} />
              </Grid>
            )
        )}
      </Grid>
      {totalPages > 1 && (
        <PaginationButtons
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </Box>
  );
};

export default StoriesPage;
