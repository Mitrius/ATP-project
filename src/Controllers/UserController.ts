import * as express from "express";
import * as path from "path";

import UserManagment from "../Services/UserManagment";

class UserController {
    public async addUser(req: express.Request, resp: express.Response): Promise<void> {
        let reqData = req.body;
        let result = await UserManagment.addUser(reqData["username"], reqData["password"], reqData["roles"]).catch((err) => { console.log(err) });;
        if (result)
            resp.status(201);
        else
            resp.status(418)
        resp.send({});
    }
    public async removeUser(req: express.Request, resp: express.Response): Promise<void> {
        resp.status(204);
        resp.send({});
    }
}
export default new UserController();