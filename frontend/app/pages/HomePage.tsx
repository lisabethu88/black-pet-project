import { Box, Typography } from "@mui/material";
import BlackDogSyndrome from "~/components/BlackDogSyndrome";
import FeaturedStories from "~/components/FeaturedStories";
import HeroBanner from "~/components/HeroBanner";
import RecentPetsSwiper from "~/components/RecentPetsSwiper";
import ScrollDownButton from "~/components/buttons/ScrollDownButton";

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <Box
        sx={{
          width: "100%",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: { xs: "150px", md: "250px" },
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
              backgroundAttachment: "fixed",
              backgroundImage: "url('/black-fur.png')",
            }}
          ></Box>
        </Box>
      </Box>
      <BlackDogSyndrome />
      <Box
        sx={{
          width: "100%",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: { xs: "150px", md: "250px" },
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
              backgroundAttachment: "fixed",
              backgroundImage: "url('/black-fur.png')",
            }}
          ></Box>
        </Box>
      </Box>
      <Box
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <FeaturedStories />

        <RecentPetsSwiper />
      </Box>
    </div>
  );
};

export default HomePage;
