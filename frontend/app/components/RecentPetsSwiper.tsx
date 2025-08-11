import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation } from "swiper/modules";
import PetCard from "./PetCard";
import { useState, useEffect } from "react";
import type { PetfinderPet } from "~/types";
import LoadingCircle from "./LoadingCircle";
import PrimaryButton from "./buttons/PrimaryButton";

const RecentPetsSwiper = () => {
  const [pets, setPets] = useState<PetfinderPet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_RENDER_URL;

  useEffect(() => {
    fetch(`${API_URL}/fetch_recent_pets.php`)
      .then((res) => res.json())
      .then((data) => {
        setPets(data.animals);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [API_URL]);

  if (error) return <p>Error: {error}</p>;
  return (
    <Box
      id="recent-pets"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      {loading ? (
        <LoadingCircle loadingText="Loading pets..." />
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
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Typography
              variant="h3"
              textAlign={"center"}
              marginBottom={2}
              color={"black"}
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              Recent Adoptable Pets
            </Typography>
            <Avatar
              sx={{ width: { xs: 25, sm: 40 }, height: { xs: 25, sm: 40 } }}
              src="/bpp-logo.png"
              alt="Handrawn black pawprint logo"
            />
          </Box>

          <Swiper
            pagination={{ type: "progressbar" }}
            navigation
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {pets.map((pet) => (
              <SwiperSlide key={pet.id}>
                <PetCard pet={pet} />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <Card sx={{ height: 575, overflow: "scroll" }} elevation={0}>
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    height: 500,
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
                    Would you like to see more adoptable pets?
                  </Typography>
                  <PrimaryButton path={"pets"} buttonText={"View All"} />
                </CardContent>
              </Card>
            </SwiperSlide>
          </Swiper>
        </Box>
      )}{" "}
      {!loading && pets.length === 0 && <Typography>No pets found.</Typography>}
    </Box>
  );
};

export default RecentPetsSwiper;
