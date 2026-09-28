import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/hundewissen": {};
  "/hundewissen/:area": {
    "area": string;
  };
  "/hundewissen/:area/:topic": {
    "area": string;
    "topic": string;
  };
  "/impressum": {};
  "/statistiken": {};
  "/rasse/:slug": {
    "slug": string;
  };
};