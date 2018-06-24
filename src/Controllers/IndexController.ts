import * as express from "express";
import * as path from "path";
import { sha3_512 } from 'js-sha3';

import UserManagment from "../Services/UserManagment";
import User from "../Models/User";

class IndexController {
    public async Home(req: express.Request, resp: express.Response) {
        resp.status(200);
        resp.sendfile("/index.html");
    }
    public async Login(req: express.Request, resp: express.Response) {
        let username = req.body["username"];
        let password = req.body["password"];
        let hash = sha3_512(password);
        let user = await UserManagment.GetUser(username);

        if (user == null || user.hash !== hash)
            resp.status(403);
        else {
            resp.send(user);
            resp.status(200);
        }

    }
}

export default new IndexController();