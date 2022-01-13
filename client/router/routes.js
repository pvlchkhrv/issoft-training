import { authPage } from "../pages/AuthPage.js";
import { UsersPage } from "../pages/UsersPage.js";
import {PostsPage} from "../pages/PostsPage.js";

export const routes = [
  {
    path: "/",
    template: authPage.html,
    title: "Auth",
  },
  {
    path: "/users",
    template: new UsersPage().html,
    title: "Users",
  },
  {
    path: "/posts",
    template: new PostsPage().html,
    title: "Users",
  }
];
