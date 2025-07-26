import { Box, Card, CardContent, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StoryCard from "./StoryCard";
import { Pagination, Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import type { StoryType } from "~/types";
import LoadingCircle from "./LoadingCircle";
import PrimaryButton from "./PrimaryButton";

const FeaturedStories = () => {
  const [stories, setStories] = useState<StoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_RENDER_URL;

  useEffect(() => {
    // Data
    fetch(`${API_URL}/fetch_featured_stories.php`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setStories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingCircle />;
  if (error) return null;
  return (
    <Box
      sx={{
        paddingY: 5,
        paddingX: 1,
        alignItems: "center",
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Typography variant="h3" textAlign={"center"} marginBottom={2}>
        Featured Stor{stories.length > 1 ? "ies" : "y"}
      </Typography>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {stories.map(
          (story) =>
            story.featured && (
              <SwiperSlide>
                <StoryCard story={story} />
              </SwiperSlide>
            )
        )}
        <SwiperSlide>
          <Card sx={{ height: 575, borderRadius: 5, margin: "0 auto" }}>
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                height: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                fontFamily="'Playfair Display', serif"
                textAlign="center"
                maxWidth={500}
                color={"#5b7753"}
              >
                Have an adoption story to share?
              </Typography>
              <PrimaryButton path={"submit"} buttonText={"Submit"} />
            </CardContent>
          </Card>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default FeaturedStories;
