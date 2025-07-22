import type { Route } from "./+types/admin";
import AdminPage from "~/pages/AdminPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return <AdminPage />;
}
