import * as express from "express";
import * as cors from "cors";

import index from "./Routers/index";
import visits from "./Routers/visits";
import users from "./Routers/users";
import procedures from "./Routers/procedures";

class App {
    private mountRoutes(): void {
        let router = express.Router();
        router.use(index);
        router.use(visits);
        router.use(users);
        router.use(procedures);
        this.express.use(router);
    }

    public express: express.Application;

    constructor() {
        this.express = express();
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.static(__dirname + '/Views'));
        this.mountRoutes();
    }

}
export default new App().express;