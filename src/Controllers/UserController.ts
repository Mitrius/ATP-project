import * as express from "express";
import * as path from "path";

import UserManagment from "../Services/UserManagment";
import User from "../Models/User";

class UserController {
    public async GetUserView(req: express.Request, resp: express.Response) {
        resp.status(200);
        resp.sendfile("/users.html");
    }
    public async AddUser(req: express.Request, resp: express.Response){
        let reqData = req.body;
        let newUserData = req.body["newUser"];

        let userData = await UserManagment.GetUser(reqData["username"]);
        if (!userData.roles.some((role) => role === "admin")) {
            resp.status(403);
        }
        else {
            let result = await UserManagment.AddUser(newUserData["login"], newUserData["password"], newUserData["roles"]).catch((err) => { console.log(err) });;
            if (result)
                resp.status(201);
            else
                resp.status(418)
        }
        resp.send({});
    }
    public async RemoveUser(req: express.Request, resp: express.Response){
        let reqData = req.body;
        let targetUsername = req.body["targetUser"];

        let userData = await UserManagment.GetUser(reqData["username"]);
        if (!userData.roles.some((role) => role === "admin")) {
            resp.status(403);
        }
        else {
            let result = await UserManagment.RemoveUser(targetUsername);
            resp.status(204);
        }
        resp.send({});
    }
    public async GetUser(req: express.Request, resp: express.Response) {
        let result: User = await UserManagment.GetUser(req.params["username"]);

        resp.send(result);
        resp.status(200);
    }
    public async GetUsers(req: express.Request, resp: express.Response) {
        let users: Array<User> = await UserManagment.GetUsers();
        resp.send(users);
        resp.status(200);
    }
}
export default new UserController();