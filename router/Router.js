import { errorPage } from "../pages/ErrorPage.js";
import { storage } from "../storage/Storage.js";

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
      this.load(uri);
    };
    window.addEventListener("beforeunload", () => {
      const uri = window.location.hash.slice(1);
      storage.setItem("uri", JSON.stringify(uri));
    });
  }

  match(uri) {
    return this.routes.find((route) => route.path === uri);
  }

  load(uri) {
    const page = this.match(uri);
    page &&
      window.history.pushState(
        {},
        page.title,
        window.location.origin + "#" + uri
      );
    this.#removePage();
    page ? this.$root.append(page.template) : this.$root.append(errorPage.html);
  }

  firstLoad() {
    window.addEventListener("load", () => {
      const uri = JSON.parse(storage.getItem("uri"));
      uri ? this.load(uri) : this.load("/");
    });
  }

  init() {
    this.firstLoad();
    this.#listen();
  }
}
