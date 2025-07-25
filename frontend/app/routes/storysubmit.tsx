import type { Route } from "./+types/storysubmit";
import SubmitStoryPage from "~/pages/SubmitStoryPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <SubmitStoryPage />;
}
