import type { Route } from "./+types/admin";
import AdminPage from "~/pages/AdminPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard | Black Pet Project" },
    {
      name: "description",
      content:
        "Private admin panel for managing stories on the Black Pet Project platform.",
    },
  ];
}

export default function About() {
  return <AdminPage />;
}
