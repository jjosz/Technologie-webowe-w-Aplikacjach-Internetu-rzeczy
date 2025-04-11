import App from "./app";
import IndexController from "./controllers/index.controller";
import DataController from "./controllers/DataController";
import ItemController from "./controllers/item.controller";
import DeviceController from "./controllers/device.controller";


const app: App = new App([]);
const io = app.getIo();


const controllers = [
    new DataController(),
    new IndexController(io),
    new ItemController(),
    new DeviceController(io)
];

controllers.forEach((controller) => {
    app.app.use("/", controller.router);
});


app.listen();

