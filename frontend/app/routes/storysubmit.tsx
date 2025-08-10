import type { Route } from "./+types/storysubmit";
import SubmitStoryPage from "~/pages/SubmitStoryPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Submit Your Story | Black Pet Project" },
    {
      name: "description",
      content:
        "Share your adoption story and help raise awareness for black pets in shelters. Submit your experience and inspire others today.",
    },
  ];
}

export default function Home() {
  return <SubmitStoryPage />;
}
