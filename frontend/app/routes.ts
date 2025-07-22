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
    route("admin", "./routes/admin.tsx"),
    ...prefix("pets", [
      index("./routes/pets/index.tsx"),
      route(":id", "./routes/pets/[id].tsx"),
    ]),
  ]),
] satisfies RouteConfig;
