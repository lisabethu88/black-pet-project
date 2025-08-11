import PetsPage from "~/pages/PetsPage";
import type { Route } from "./+types/pets";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Adoptable Black Pets | Black Pet Project" },
    {
      name: "description",
      content:
        "Browse adoptable black dogs and cats from shelters near you. Help reduce stigma and find your perfect match through the Black Pet Project.",
    },
  ];
}

export default function Home() {
  return <PetsPage />;
}
