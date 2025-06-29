import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/impressum", "routes/imprint.tsx"),
] satisfies RouteConfig;
