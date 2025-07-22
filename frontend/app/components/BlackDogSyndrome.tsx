import { Box, Link, Typography } from "@mui/material";
import { motion } from "motion/react";

const BlackDogSyndrome = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        alignItems: "center",
        gap: 4,
        py: 10,
        px: 3,
        backgroundColor: "black",
        color: "white",
      }}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Box
          component="img"
          src="/dog-in-cage.png"
          alt="Black dog behind cage"
          sx={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            justifySelf: "center",
            objectFit: "cover",
            borderRadius: 5,
          }}
        />
      </motion.div>

      {/* Text */}
      <Box>
        <Typography
          variant="h3"
          gutterBottom
          fontFamily="'Playfair Display', serif"
          textAlign={{ xs: "center", md: "left" }}
        >
          What is Black Dog Syndrome?
        </Typography>

        <Typography
          variant="body1"
          maxWidth="sm"
          mx={{ xs: "auto", md: 0 }}
          sx={{
            "&::first-letter": {
              fontSize: "2.5rem",
              float: "left",
              lineHeight: 1,
              paddingRight: "0.1em",
              fontWeight: "bold",
              fontFamily: "'Radley', serif",
            },
          }}
        >
          Black Dog Syndrome is a term used to describe the way black dogs (and
          sometimes cats) are often overlooked at shelters and take longer to
          get adopted than pets with lighter fur. This website was created to
          help change that by showing how loving, beautiful, and special black
          pets really are.{" "}
          <Link
            sx={{
              fontWeight: "bold",
              color: "white",
              "--Link-underlineColor": "white",
            }}
            href="https://en.wikipedia.org/wiki/Black_dog_syndrome"
          >
            Learn More
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default BlackDogSyndrome;
