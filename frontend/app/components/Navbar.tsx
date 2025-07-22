import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router";
import HideOnScroll from "./HideOnScroll";

const pages = ["about", "pets", "stories", "submit", "contact"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          sx={{ backgroundColor: "white" }}
          position="fixed"
          className="navbar"
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <NavLink to="/" end>
                <Avatar
                  sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
                  src="/bpp-logo.png"
                ></Avatar>
              </NavLink>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                id="nav-h6"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 800,
                  letterSpacing: "0.2rem",
                  color: "black",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Black Pet Project
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={handleCloseNavMenu}
                      component={NavLink}
                      to={`/${page}`}
                      sx={{
                        textTransform: "capitalize",
                        color: "black",
                        textDecoration: "none",
                        "&.active": {
                          fontWeight: "bold",
                          color: "#5b7553",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          textTransform: "capitalize",
                          color: "black",
                        }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <NavLink to="/" end>
                <Avatar
                  sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}
                  src="/bpp-logo.png"
                ></Avatar>
              </NavLink>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  flexGrow: 1,
                  fontSize: 15,
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontFamily: "'Radley', serif",
                  fontWeight: 800,
                  letterSpacing: "0.2rem",
                  color: "black",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Black Pet Project
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <NavLink
                    to={`/${page}`}
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      sx={{
                        m: 2,
                        color: "black",
                        display: "block",
                        textTransform: "capitalize",
                        transition: "all 0.1s ease-out",
                        position: "relative",
                        top: 0,
                        ":hover": {
                          top: "-3px",
                        },
                      }}
                    >
                      {page}
                    </Typography>
                  </NavLink>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};
export default NavBar;
