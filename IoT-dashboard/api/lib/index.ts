import App from './app';
import IndexController from "./controllers/index.controller";
import ItemController from "./controllers/item.controller";
import DataController from "./controllers/DataController";



const app: App = new App([
    new DataController(),
    new IndexController(),
    new ItemController()
]);


app.listen();