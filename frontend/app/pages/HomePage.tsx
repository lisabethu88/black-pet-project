// ├── <CallToActionButtons />
// ├── <WhyBlackPetsSection />
// ├── <JoinCommunityCTA />

import { Box, Typography } from "@mui/material";
import BlackDogSyndrome from "~/components/BlackDogSyndrome";
import FeaturedStories from "~/components/FeaturedStories";
import HeroBanner from "~/components/HeroBanner";
import RecentPetsSwiper from "~/components/RecentPetsSwiper";

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <Box sx={{ backgroundColor: "black" }}>
        <BlackDogSyndrome />
      </Box>
      <Box sx={{ backgroundColor: "white" }}>
        <FeaturedStories />{" "}
        <Typography></Typography>
      </Box>
      <Box sx={{ backgroundColor: "black" }}>
        <RecentPetsSwiper />
      </Box>
    </div>
  );
};

export default HomePage;
