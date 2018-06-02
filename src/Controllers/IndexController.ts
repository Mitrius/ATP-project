import * as express from "express";
import * as path from "path";

class IndexController{
    public home(req:express.Request,resp:express.Response):void{
        resp.sendfile("/index.html");
    }
    
}

export default new IndexController();