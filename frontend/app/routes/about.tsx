import type { Route } from "./+types/about";
import AboutPage from "~/pages/AboutPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return <AboutPage />;
}
