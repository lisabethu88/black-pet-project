import type { Route } from "./+types/about";
import AboutPage from "~/pages/AboutPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us | Black Pet Project" },
    {
      name: "description",
      content:
        "Learn about the mission behind Black Pet Project—raising awareness, reducing stigma, and helping black pets find loving homes through education and storytelling.",
    },
  ];
}
export default function About() {
  return <AboutPage />;
}
