import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("pages/root.tsx"),
  ...prefix("auth", [
    route("sign-up", "pages/auth/sign-up.tsx"),
    route("sign-in", "pages/auth/sign-in.tsx"),
  ]),

  route("/connect/:providerName", "pages/auth/login-redirect.tsx"),
  layout("pages/home/layout.tsx", [
    ...prefix("home", [
      index("pages/home/index.tsx"),
      ...prefix("accounts", [
        index("pages/home/accounts/index.tsx"),
        route("new", "pages/home/accounts/new.tsx"),
        route(":documentId", "pages/home/accounts/update.tsx"),
      ]),

      ...prefix("journal-entries", [
        index("pages/home/journal-entries/index.tsx"),
        route("new", "pages/home/journal-entries/new.tsx"),
        route(":documentId", "pages/home/journal-entries/update.tsx"),
      ]),

      ...prefix("periods", [
        index("pages/home/periods/index.tsx"),
        route("new", "pages/home/periods/new.tsx"),
        route(":documentId", "pages/home/periods/update.tsx"),
      ]),
      route("balances", "pages/home/balances/index.tsx"),
      route("currencies", "pages/home/currencies.tsx"),
      route("settings", "pages/home/settings.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
