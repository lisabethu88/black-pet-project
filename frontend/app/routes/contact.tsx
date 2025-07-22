import type { Route } from "./+types/contact";
import ContactPage from "~/pages/ContactPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return <ContactPage />;
}
