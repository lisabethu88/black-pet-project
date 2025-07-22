import Navbar from "~/components/Navbar";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router";

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
