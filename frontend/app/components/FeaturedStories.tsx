import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StoryCard from "./StoryCard";
import { stories } from "~/data/DummyData";
import { Pagination, Navigation } from "swiper/modules";
import PrimaryButton from "./PrimaryButton";

const FeaturedStories = () => {
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
        Featured Stories
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
      </Swiper>
    </Box>
  );
};

export default FeaturedStories;
