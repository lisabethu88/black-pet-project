import StoryPage from "~/pages/StoryPage";
import type { Route } from "./+types";

export function meta({ }: Route.MetaArgs) {


  return [
    { title: "Adoption Story | Black Pet Project" },
    {
      name: "description",
      content:
        "Read this inspiring black pet adoption story on Black Pet Project.",
    },
  ];
}

export default function StoryDetailPage() {
  return <StoryPage />;
}
