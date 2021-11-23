import { authPage } from "../pages/AuthPage.js";
import { usersPage } from "../pages/UsersPage.js";

export const routes = [
  {
    path: "/",
    template: authPage.html,
    title: "Auth",
  },
  {
    path: "/users",
    template: usersPage.html,
    title: "Users",
  },
];
