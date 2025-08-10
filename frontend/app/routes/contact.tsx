import type { Route } from "./+types/contact";
import ContactPage from "~/pages/ContactPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us | Black Pet Project" },
    {
      name: "description",
      content:
        "Get in touch with the Black Pet Project team. We're here to answer your questions, hear your stories, and support black pet advocacy.",
    },
  ];
}

export default function About() {
  return <ContactPage />;
}
