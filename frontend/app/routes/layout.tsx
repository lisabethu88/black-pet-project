import Navbar from "~/components/Navbar";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
