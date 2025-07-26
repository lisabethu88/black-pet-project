import { Box, Container, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PrimaryButton from "./PrimaryButton";
import { motion } from "motion/react";

const HeroBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box
        sx={{
          backgroundImage: `url('/bpp-hero.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
          height: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Black Pets Deserve Love, Too{" "}
            <FavoriteIcon sx={{ fontSize: "2.5rem" }} />
          </Typography>
          <Typography variant="h6" mb={4}>
            Discover adoptable black pets waiting for a home!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <PrimaryButton path="pets" buttonText="View Pets" />
            <PrimaryButton path="submit" buttonText="Share Your Story" />
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default HeroBanner;
