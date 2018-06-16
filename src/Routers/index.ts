import * as express from "express";
import IndexController from "../Controllers/IndexController";

let router = express.Router();

router.get("/", IndexController.Home);

export default router;