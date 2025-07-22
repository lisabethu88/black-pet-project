import { Box, Grid } from "@mui/material";
import StoryCard from "~/components/StoryCard";
import { stories } from "../data/DummyData";

const StoriesPage = () => {
  return (
    <Box sx={{ padding: 5, flexGrow: 1 }}>
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
    </Box>
  );
};

export default StoriesPage;
