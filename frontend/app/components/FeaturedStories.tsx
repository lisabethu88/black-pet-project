import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StoryCard from "./StoryCard";
import { Pagination, Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import type { StoryType } from "~/types";
import LoadingCircle from "./LoadingCircle";
import PrimaryButton from "./buttons/PrimaryButton";

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

  if (error) return <p>Error: {error}</p>;
  return (
    <Box
      id="featured-stories"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {loading ? (
        <LoadingCircle loadingText="Loading stories..." />
      ) : (
        <Box
          sx={{
            paddingY: 5,
            paddingX: 1,
            alignItems: "center",
            maxWidth: 500,
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h3"
              textAlign={"center"}
              marginBottom={2}
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              Featured Stor{stories.length > 1 ? "ies" : "y"}{" "}
            </Typography>
            <Avatar
              sx={{ width: { xs: 25, sm: 40 }, height: { xs: 25, sm: 40 } }}
              src="/bpp-logo.png"
              alt="Handrawn black pawprint logo"
            />
          </Box>

          <Swiper
            pagination={{
              type: "progressbar",
            }}
            navigation
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {stories.map(
              (story) =>
                story.featured && (
                  <SwiperSlide key={story.id}>
                    <StoryCard story={story} />
                  </SwiperSlide>
                )
            )}
            <SwiperSlide>
              <Card sx={{ height: 575 }} elevation={0}>
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
                    fontFamily="'Radley', serif"
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
      )}
      {!loading && stories.length === 0 && (
        <Typography>No featured stories found.</Typography>
      )}
    </Box>
  );
};

export default FeaturedStories;
