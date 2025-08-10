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
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
            My family and I are proud adopters of two wonderful black dogs,
            Kevin and Chloe. Through our journey with them, we discovered
            something called Black Dog Syndrome, a heartbreaking phenomenon
            where black dogs are often overlooked in shelters simply because of
            their color. This awareness inspired us to take action. We created
            this space to shine a light on the unique beauty and lovable nature
            of black dogs, and to help raise awareness so more of these amazing
            pets can find their forever homes. Our mission is to celebrate
            Kevin, Chloe, and all black dogs out there who deserve love,
            attention, and a second chance.
          </Typography>
        </motion.div>
      </Box>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
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
          alt="Two black dogs laying together in a bed"
        />
      </motion.div>
    </Box>
  );
};

export default AboutPage;
