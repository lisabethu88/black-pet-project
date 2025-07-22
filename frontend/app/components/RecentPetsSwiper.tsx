import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StoryCard from "./StoryCard";
import { dummyPets } from "~/data/DummyData";
import { Pagination, Navigation } from "swiper/modules";
import PetCard from "./PetCard";

const RecentPetsSwiper = () => {
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
      <Typography
        variant="h3"
        textAlign={"center"}
        marginBottom={2}
        color={"white"}
      >
        Meet Your New Best Friend!
      </Typography>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {dummyPets.map((pet) => (
          <SwiperSlide>
            <PetCard pet={pet} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default RecentPetsSwiper;
