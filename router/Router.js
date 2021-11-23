import { errorPage } from "../pages/ErrorPage.js";

export class Router {
  constructor(routes, $root) {
    this.routes = routes;
    this.$root = $root;
  }

  #removePage() {
    const $pageToUnmount = document.querySelector(".content");
    if ($pageToUnmount) {
      $pageToUnmount.remove();
    }
  }

  #listen() {
    window.onpopstate = () => {
      const uri = window.location.hash.slice(1);
      const page = this.match(uri);
      this.load(uri);
    };
    window.addEventListener("beforeunload", () => {
      const uri = window.location.hash.slice(1);
      localStorage.setItem("uri", JSON.stringify(uri));
    });

    window.addEventListener("load", () => {
      const uri = JSON.parse(localStorage.getItem("uri"));
      uri ? this.load(uri) : this.load("/");
    });
  }

  match(uri) {
    return this.routes.find((route) => route.path === uri);
  }

  load(uri) {
    const page = this.match(uri);
    window.location.hash = "#" + uri;
    this.#removePage();
    page ? this.$root.append(page.template) : this.$root.append(errorPage.html);
  }

  init() {
    this.#listen();
  }
}
