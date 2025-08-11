import {
  type RouteConfig,
  index,
  route,
  prefix,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    index("routes/home.tsx"),
    route("about", "./routes/about.tsx"),
    route("contact", "./routes/contact.tsx"),
    route("submit", "./routes/storysubmit.tsx"),
    ...prefix("stories", [
      index("./routes/stories/index.tsx"),
      route(":id", "./routes/stories/[id].tsx"),
    ]),
    route("pets", "./routes/pets.tsx"),
    route("admin", "./routes/admin.tsx"),
  ]),
] satisfies RouteConfig;
