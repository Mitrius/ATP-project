import * as express from "express";
import * as path from "path";

class IndexController{
    public Home(req:express.Request,resp:express.Response){
        resp.status(200);
        resp.sendfile("/index.html");
    }
    
}

export default new IndexController();