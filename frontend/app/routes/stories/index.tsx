import StoriesPage from "~/pages/StoriesPage";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Adoption Stories | Black Pet Project" },
    {
      name: "description",
      content:
        "Read heartwarming adoption stories from the Black Pet Project community. See how black pets found loving homes and inspired others to adopt.",
    },
  ];
}

export default function Home() {
  return <StoriesPage />;
}
