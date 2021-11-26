import { App } from "./components/App.js";
import { container } from "./components/container/Container.js";
import { Router } from "./router/Router.js";
import { routes } from "./router/routes.js";

const app = new App();
app.setTitle("ISSoft Training");

app.init(container.html);

export const router = new Router(routes, container.html);

router.init();
