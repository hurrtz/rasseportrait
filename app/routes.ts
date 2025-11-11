import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/rasseportrait.tsx"),
  route("/hundewissen", "routes/hundewissen.tsx"),
  route("/impressum", "routes/imprint.tsx"),
  route("/statistiken", "routes/statistics.tsx"),
] satisfies RouteConfig;
