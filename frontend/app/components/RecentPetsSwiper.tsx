import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { dummyPets } from "~/data/DummyData";
import { Pagination, Navigation } from "swiper/modules";
import PetCard from "./PetCard";
import { useState, useEffect } from "react";
import type { PetfinderPet } from "~/types";

const RecentPetsSwiper = () => {
  const [pets, setPets] = useState<PetfinderPet[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/fetch_recent_pets.php`)
      .then((res) => res.json())
      .then((data) => {
        setPets(data.animals);
      });
  }, []);

  console.log(pets);
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
        Adopt a Black Pet Today!
      </Typography>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {pets.map((pet) => (
          <SwiperSlide>
            <PetCard pet={pet} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default RecentPetsSwiper;
