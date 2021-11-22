import { App } from "./App.js";
import { container } from "./components/Container.js";

const app = new App();
app.setTitle("ISSoft Training");

app.init(container.html);
