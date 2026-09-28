import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/rasseportrait.tsx"),
  route("/hundewissen", "routes/hundewissen.tsx"),
  route("/hundewissen/:area", "routes/hundewissenArea.tsx"),
  route("/hundewissen/:area/:topic", "routes/hundewissenTopic.tsx"),
  route("/impressum", "routes/imprint.tsx"),
  route("/statistiken", "routes/statistics.tsx"),
  route("/rasse/:slug", "routes/rasse.tsx"),
] satisfies RouteConfig;
