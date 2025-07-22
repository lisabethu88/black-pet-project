import { Box, Typography } from "@mui/material";
import React from "react";
import SubmitStoryForm from "~/components/SubmitStoryForm";

const SubmitStoryPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
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
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        padding={1}
        maxWidth={500}
      >
        <Box
          sx={{ maxWidth: 500, width: "100%", borderRadius: 5 }}
          component="img"
          src="/submit-img.png"
        />
        <Typography
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
          Have a story to share? We’d love to hear about your black pet! 🐾 Tell
          us how you adopted them, what makes them special, or how they changed
          your life. Once you submit your story, our team will review it. If
          approved, it’ll be proudly featured on our website to help spread
          awareness and love for black pets! Thank you for being part of the
          movement to help black pets get the recognition they deserve.
        </Typography>{" "}
      </Box>
      <SubmitStoryForm />
    </Box>
  );
};

export default SubmitStoryPage;
