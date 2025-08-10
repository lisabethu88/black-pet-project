import type { Route } from "./+types/home";
import HomePage from "~/pages/HomePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Black Pet Project | Adopt. Share. Inspire." },
    {
      name: "description",
      content:
        "Discover adoptable black pets, share your adoption stories, and help raise awareness to end stigma and increase adoptions.",
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
