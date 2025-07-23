import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import type { StoryType } from "~/types";
import PrimaryButton from "./PrimaryButton";

interface StoryCardProps {
  story: StoryType;
}

const StoryCard = ({ story }: StoryCardProps) => {
  return (
    <Card sx={{ height: "100%", borderRadius: 5 }}>
      <CardMedia
        component="img"
        image={story.imageUrl}
        alt={story.title}
        sx={{ objectFit: "cover", height: 350 }}
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
        <PrimaryButton path={`stories/${story.id}`} buttonText={"View Story"} />

        <Box mt="1rem">
          <Typography variant="caption" color="text.secondary">
            Submitted by {story.author} on{" "}
            {new Date(story.submittedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
