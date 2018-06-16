import * as express from "express";
import UserController from "../Controllers/UserController";

let router = express.Router();

router.get("/users", UserController.GetUsers);
router.post("/users", UserController.AddUser);

router.get("/users/:username", UserController.GetUser);
router.delete("/users/:username", UserController.RemoveUser);

export default router;