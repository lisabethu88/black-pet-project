import { Box, Container, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      component={"footer"}
      sx={{
        backgroundColor: "black",
        paddingTop: 3,
        width: "100%",
        height: 70,
        bottom: 0,
        position: "fixed",
        zIndex: 2,
      }}
    >
      <Container>
        <Typography
          variant="body2"
          sx={{ color: "white", textAlign: "center" }}
        >
          © {new Date().getFullYear()} Black Pet Project. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
