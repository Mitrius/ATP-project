import * as express from "express";
import VisitController from "../Controllers/UserController";

let router = express.Router();

router.post("/users",VisitController.addUser);

export default router;