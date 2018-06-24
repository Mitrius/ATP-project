import * as express from "express";
import * as path from "path";

import UserManagment from "../Services/UserManagment";
import User from "../Models/User";
import Doctor from "../Models/Doctor";

class UserController {
    public async GetUserView(req: express.Request, resp: express.Response) {
        resp.status(200);
        resp.sendfile("/users.html");
    }
    public async AddUser(req: express.Request, resp: express.Response) {
        let username = req.header("Username") as string;
        let newUserData = req.body["newUser"];

        let userData = await UserManagment.GetUser(username);
        if (!userData.roles.some((role) => role === "admin")) {
            resp.status(403);
        }
        else {
            let result = await UserManagment.AddUser(newUserData["username"], newUserData["password"], newUserData["roles"]);
            if (result)
                resp.status(201);
            else
                resp.status(418)
        }
        resp.send({});
    }
    public async RemoveUser(req: express.Request, resp: express.Response) {
        let targetUsername = req.body["targetUser"];

        let username = req.header("Username") as string;
        let userData = await UserManagment.GetUser(username);
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

        let username = req.header("Username") as string;

        let userData = await UserManagment.GetUser(username);
        if (!userData.roles.some((role) => role === "admin")) {
            resp.status(403);
        }
        else {
            let result: Array<User> = await UserManagment.GetUsers();

            resp.send(result);
            resp.status(200);
        }
    }
    public async GetPatients(req: express.Request, resp: express.Response) {
        let users: Array<User> = await UserManagment.GetUsers();
        resp.send(users);
        resp.status(200);
    }
    public async EditPatient(req: express.Request, resp: express.Response) {
        let username = req.body["username"];
        let userData = req.body["data"];
        let result = await UserManagment.EditUser(username, userData["roles"], userData["password"]);
        if (result)
            resp.status(200);
        else
            resp.status(500);
        resp.send({});
    }
}
export default new UserController();