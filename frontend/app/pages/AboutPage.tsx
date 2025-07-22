import { Box, Divider, Typography } from "@mui/material";
import { motion } from "motion/react";

const AboutPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        paddingY: 5,
        width: "100%",
        margin: "0 auto",
        height: "100%",
        gap: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Typography
          color="#5b7553"
          variant="h1"
          fontSize={"3rem"}
          textTransform={"uppercase"}
          fontWeight={700}
          letterSpacing={1}
        >
          About Us
        </Typography>
        <Divider sx={{ maxWidth: 300 }} />
        <br />
        <Typography
          variant="body1"
          sx={{
            width: "100%",
            maxWidth: 500,
            "&::first-letter": {
              fontSize: "3rem",
              float: "left",
              lineHeight: 1,
              paddingRight: "0.1em",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "'Radley', serif",
            },
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
      </Box>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box
          sx={{
            maxWidth: 700,
            width: "100%",
            padding: "1rem",
            borderRadius: 10,
          }}
          component="img"
          src="/kevin-chloe.png"
        />
      </motion.div>
    </Box>
  );
};

export default AboutPage;
