import { Box, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "motion/react";
import ContactForm from "~/components/ContactForm";

const ContactPage = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("md"));
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
        gap: { xs: 0, md: 5 },
      }}
    >
      <ContactForm />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box
          component="img"
          src={isXs ? "/cat-landscape.png" : "/cat-portrait.png"}
          sx={{
            maxWidth: { xs: "100%", md: 400 },
            margin: "1rem",
            position: { xs: "relative", md: "unset" },
            top: { xs: "-100px", md: 0 },
            zIndex: -1,
          }}
        />
      </motion.div>
    </Box>
  );
};

export default ContactPage;
